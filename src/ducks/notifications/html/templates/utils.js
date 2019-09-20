const Handlebars = require('handlebars')
const overEvery = require('lodash/overEvery')
const fromPairs = require('lodash/fromPairs')
const layouts = require('handlebars-layouts')
const mapValues = require('lodash/mapValues')

layouts.register(Handlebars)

const isOfType = type => node => {
  return node.type == type
}

const isPath = path => node => {
  return node.path.original == path
}

const isExtendBlock = overEvery([isOfType('BlockStatement'), isPath('extend')])
const isContentBlock = overEvery([
  isOfType('BlockStatement'),
  isPath('content')
])

/**
 * Collect info content and parenting infos from an Handlebars AST.
 * Will go up the chain of templates to collect all content blocks.
 *
 * @typedef {Object} PartialTemplateInfo
 * @property {AST[]} parts - All content blocks ASTs
 * @property {string[]} parents - Chain of parents for `ast`, outermost parent is last
 *
 * @return {PartialTemplateInfo}
 */
const collectInfo = (templateContent, partials) => {
  const ast = Handlebars.parse(templateContent)

  let curAST = ast
  let contentNodes = []
  let parents = []

  while (curAST) {
    const parentNode = curAST.body.find(isExtendBlock)
    const root = parentNode ? parentNode.program : curAST
    contentNodes = contentNodes.concat(root.body.filter(isContentBlock))

    if (!parentNode) {
      curAST = null
    } else {
      // Now go upper
      const parentName = parentNode.params[0].value
      const parent = partials[parentName]
      if (!parent) {
        throw new Error(`Cannot find partial ${parent}`)
      }
      parents.push(parentName)
      const parentAST = Handlebars.parse(parent)
      curAST = parentAST
    }
  }

  const contentASTByName = fromPairs(
    contentNodes.map(node => [node.params[0].value, node.program])
  )

  return {
    ast,
    contentASTByName,
    parents
  }
}

const createContentBlock = name => {
  if (!name) {
    throw new Error('Must pass "name" to createContentBlock')
  }
  return {
    type: 'BlockStatement',
    path: {
      type: 'PathExpression',
      original: 'content',
      value: 'content',
      parts: ['content']
    },
    params: [
      {
        value: name,
        original: name,
        type: 'StringLiteral'
      }
    ],
    program: {
      type: 'Program'
    }
  }
}

/**
 * Is used to replace content blocks of a template by rendered content.
 * If the replacement does not match an already existing block, it will
 * be inserted in `ast`.
 *
 * @param {Object} ast
 * @param {Object} blocks - Block name -> Block AST (references to part of the AST)
 * @param {Object} replacements - Block name -> Rendered content
 *
 * @example
 * ```
 * const { ast, blocks } = extractInfo(template)
 * injectContent(ast, blocks, { emailSubtitle: 'Content of email subtitle'})
 * ```
 *
 * ```
 * {{#content "emailSubtitle"}}
 *   {{ t('my-email-subtitle') }}
 * {{/content}}
 * ```
 *
 * ```
 * {{#content "emailSubtitle"}}
 *   Content of email subtitle
 * {{/content}}
 * ```
 */
const injectContent = (ast, replacements) => {
  const root = ast.body.find(isExtendBlock).program
  const contentBlocks = root.body.filter(isContentBlock)

  // Find the content blocks defined in the AST and index them by name
  const contentBlocksByName = fromPairs(
    contentBlocks.map(node => [node.params[0].value, node.program])
  )

  for (const [blockName, replacement] of Object.entries(replacements)) {
    let blockProgram = contentBlocksByName[blockName]

    // The block has not been found in the children template, let's create it.
    // It is for example the case when the content block is defined in
    // a parent template (hence it is not in the children template AST).
    // Since we have it already rendered, it is sufficient to inject directly
    // the content block inside the children template.
    if (!blockProgram) {
      const extendNode = ast.body.find(isExtendBlock)
      const newBlock = createContentBlock(blockName)
      extendNode.program.body.push(newBlock)
      blockProgram = newBlock.program
    }
    blockProgram.body = [
      {
        type: 'ContentStatement',
        original: replacement,
        value: replacement
      }
    ]
  }
}

/**
 * Does the two-phase templating that is in preparation for when the stack
 * supports email layouts.
 *
 * The goals is to separate the rendering of each part of the emails from
 * the wrapping inside a known template, and the MJML rendering.
 *
 */
const twoPhaseRender = (Handlebars, templateRaw, templateData, partials) => {
  const { contentASTByName, ast } = collectInfo(templateRaw, partials)

  Handlebars.registerPartial(mapValues(partials, Handlebars.compile))

  const renderedContentBlocks = mapValues(contentASTByName, contentAST => {
    const compiledContentBlock = Handlebars.compile(contentAST)
    return compiledContentBlock(templateData)
  })

  // Here we inject rendered content inside the AST so that the template AST
  // does not longer rely on templateData
  injectContent(ast, renderedContentBlocks)

  const fullTemplate = Handlebars.compile(ast)

  // When the stack implement layouts, we will no longer need to render the
  // full template and we will only return the renderedParts for the caller
  // to send them directly to the stack
  const fullContent = fullTemplate()

  return {
    renderedContentBlocks,
    fullContent
  }
}

module.exports = {
  twoPhaseRender,
  injectContent,
  collectInfo
}
