import { format, tokenizer, categorize } from '.'

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
  it('Should categorize transactions', () => {
    expect(categorize('traineline')).toEqual('400110')
    expect(categorize('trainline')).toEqual('400280')
    expect(categorize('ndf cozy')).toEqual('600110')
    expect(categorize('cpam paris')).toEqual('400610')
    expect(categorize('argent de poche')).toEqual('400180')
    expect(categorize('kaiser boulangerie')).toEqual('400160')
    expect(categorize('apple store r277')).toEqual('400740')
    expect(categorize('apple store')).toEqual('400740')
    expect(categorize('cheque edf')).toEqual('401080')
    expect(categorize('cpam cozy')).toEqual('400610')
    expect(categorize('docteur weber')).toEqual('600110')
    expect(categorize('carte le kaiser')).toEqual('400160')
    expect(categorize('malakoff nespresso ndf')).toEqual('400110')
    expect(categorize('cheque edf titi')).toEqual('401080')
    expect(categorize('cpam cozy toto')).toEqual('400610')
    expect(categorize('carte le kaiser tutu')).toEqual('400160')
    expect(categorize('malakoff nespresso ndf toutou')).toEqual('400110')
    // TODO: François fix it near futur
    // expect(categorize('titi')).toEqual('600110') // 400110
    // expect(categorize('toto')).toEqual('600110') // 400110
    // expect(categorize('tata titi')).toEqual('600110') // 400110
  })

  it('Should return default category when proba is too small', () => {
    expect(categorize('docteur weber tata')).toEqual('0')
    expect(categorize('tutu tata toutou')).toEqual('0')
    expect(categorize('toutou titi toto tutu')).toEqual('0')
    expect(categorize('assurance habitation')).toEqual('0')
    expect(categorize('riendutout ndf')).toEqual('0')
  })
})
