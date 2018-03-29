import { format, tokenizer, categorize, createClassifier } from '.'

describe('format', () => {
  it('Should convert to lowercase', () => {
    expect(format('Ok')).toBe('ok')
    expect(format('KO')).toBe('ko')
  })
  it('Should remove accents', () => {
    expect(format('testé')).toBe('teste')
    expect(format('ça fonctionne plutôt')).toBe('ca fonctionne plutot')
  })
  it('Should replace date', () => {
    const DATE_TAG = 'tag_date'
    expect(format('test 20/12/2017')).toBe(`test ${DATE_TAG}`)
    expect(format('test 20/12/17')).toBe(`test ${DATE_TAG}`)
    expect(format('test 20/12')).toBe(`test ${DATE_TAG}`)
  })
  it('Should remove unnecessary chars', () => {
    expect(format('test,;:/\\^...')).toBe('test')
  })
})

describe('tokenizer', () => {
  it('Should tokenizer transactions', () => {
    expect(tokenizer('j ai une phrase comme ca')).toEqual([
      'ai une phrase', 'une phrase comme', 'phrase comme ca',
      'ai une', 'une phrase', 'phrase comme', 'comme ca',
      'ai', 'une', 'phrase', 'comme', 'ca'
    ])
  })
})

describe('categorize', () => {
  const classifier = createClassifier(null, { tokenizer })

  it('Should categorize transactions', () => {
    expect(categorize(classifier, 'traineline')).toEqual('400110')
    expect(categorize(classifier, 'trainline')).toEqual('400280')
    expect(categorize(classifier, 'ndf cozy')).toEqual('600110')
    expect(categorize(classifier, 'cpam paris')).toEqual('400610')
    expect(categorize(classifier, 'argent de poche')).toEqual('400180')
    expect(categorize(classifier, 'kaiser boulangerie')).toEqual('400160')
    expect(categorize(classifier, 'apple store r277')).toEqual('400740')
    expect(categorize(classifier, 'apple store')).toEqual('400740')
    expect(categorize(classifier, 'cheque edf')).toEqual('401080')
    expect(categorize(classifier, 'cpam cozy')).toEqual('400610')
    expect(categorize(classifier, 'docteur weber')).toEqual('600110')
    expect(categorize(classifier, 'carte le kaiser')).toEqual('400160')
    expect(categorize(classifier, 'malakoff nespresso ndf')).toEqual('400110')
    expect(categorize(classifier, 'cheque edf titi')).toEqual('401080')
    expect(categorize(classifier, 'cpam cozy toto')).toEqual('400610')
    expect(categorize(classifier, 'carte le kaiser tutu')).toEqual('400160')
    expect(categorize(classifier, 'malakoff nespresso ndf toutou')).toEqual('400110')
    // TODO: François fix it near futur
    // expect(categorize('titi')).toEqual('600110') // 400110
    // expect(categorize('toto')).toEqual('600110') // 400110
    // expect(categorize('tata titi')).toEqual('600110') // 400110
  })

  it('Should return default category when proba is too small', () => {
    expect(categorize(classifier, 'docteur weber tata')).toEqual('0')
    expect(categorize(classifier, 'tutu tata toutou')).toEqual('0')
    expect(categorize(classifier, 'toutou titi toto tutu')).toEqual('0')
    expect(categorize(classifier, 'assurance habitation')).toEqual('0')
    expect(categorize(classifier, 'riendutout ndf')).toEqual('0')
  })
})
