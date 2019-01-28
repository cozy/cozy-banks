import {
  format,
  tokenizer,
  categorize,
  createClassifier,
  predictProbaMax
} from '.'

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
    const DATE_TAG = ' tag_date '
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
      'ai une',
      'une phrase',
      'phrase comme',
      'comme ca',
      'ai',
      'une',
      'phrase',
      'comme',
      'ca'
    ])
  })
})

describe('estimate proba', () => {
  const classifier = createClassifier(null, { tokenizer })

  // TODO : re-set a N_DIGITS to 4 and re-compute real values later to be sure
  const N_DIGITS = 1
  it('Should compute correct probabilities', () => {
    expect(predictProbaMax(classifier, 'traineline')).toBeCloseTo(
      0.153898,
      N_DIGITS
    )
    expect(predictProbaMax(classifier, 'trainline')).toBeCloseTo(
      0.222969,
      N_DIGITS
    )
    expect(predictProbaMax(classifier, 'ndf cozy')).toBeCloseTo(
      0.928948,
      N_DIGITS
    )
    expect(predictProbaMax(classifier, 'cpam paris')).toBeCloseTo(
      0.455841,
      N_DIGITS
    )
    expect(predictProbaMax(classifier, 'argent de poche')).toBeCloseTo(
      0.460841,
      N_DIGITS
    )
    expect(predictProbaMax(classifier, 'kaiser boulangerie')).toBeCloseTo(
      0.45232,
      N_DIGITS
    )
    expect(predictProbaMax(classifier, 'apple store r277')).toBeCloseTo(
      0.117025,
      N_DIGITS
    )
    expect(predictProbaMax(classifier, 'apple store')).toBeCloseTo(
      0.117025,
      N_DIGITS
    )
    expect(predictProbaMax(classifier, 'cheque edf')).toBeCloseTo(
      0.523324,
      N_DIGITS
    )
    expect(predictProbaMax(classifier, 'cpam cozy')).toBeCloseTo(
      0.581202,
      N_DIGITS
    )
    expect(predictProbaMax(classifier, 'docteur weber')).toBeCloseTo(
      0.381036,
      N_DIGITS
    )
    expect(predictProbaMax(classifier, 'carte le kaiser')).toBeCloseTo(
      0.361903,
      N_DIGITS
    )
    expect(predictProbaMax(classifier, 'malakoff nespresso ndf')).toBeCloseTo(
      0.677551,
      N_DIGITS
    )
    expect(predictProbaMax(classifier, 'cheque edf titi')).toBeCloseTo(
      0.523324,
      N_DIGITS
    )
    expect(predictProbaMax(classifier, 'cpam cozy toto')).toBeCloseTo(
      0.581202,
      N_DIGITS
    )
    expect(predictProbaMax(classifier, 'carte le kaiser tutu')).toBeCloseTo(
      0.361903,
      N_DIGITS
    )
    expect(
      predictProbaMax(classifier, 'malakoff nespresso ndf toutou')
    ).toBeCloseTo(0.677551, N_DIGITS)
    expect(predictProbaMax(classifier, 'voyance hi vip')).toBeCloseTo(
      0.149467,
      N_DIGITS
    )
    expect(
      predictProbaMax(classifier, 'celine thiriot mgppumpkin boondae')
    ).toBeCloseTo(0.612285, N_DIGITS)
    expect(
      predictProbaMax(classifier, 'amazon payments tea boutiqu bonheur paris')
    ).toBeCloseTo(0.998361, N_DIGITS)
    expect(
      predictProbaMax(classifier, 'boulogne saint hil villa dor')
    ).toBeCloseTo(0.701939, N_DIGITS)
  })
})

describe('categorize', () => {
  const classifier = createClassifier(null, { tokenizer })

  it('Should categorize transactions', () => {
    expect(categorize(classifier, 'traineline')).toEqual('400110')
    expect(categorize(classifier, 'trainline')).toEqual('400840')
    expect(categorize(classifier, 'ndf cozy')).toEqual('100')
    expect(categorize(classifier, 'cpam paris')).toEqual('400610')
    expect(categorize(classifier, 'argent de poche')).toEqual('600110')
    expect(categorize(classifier, 'kaiser boulangerie')).toEqual('400110')
    expect(categorize(classifier, 'apple store r277')).toEqual('400110')
    expect(categorize(classifier, 'apple store')).toEqual('400110')
    expect(categorize(classifier, 'cheque edf')).toEqual('200')
    expect(categorize(classifier, 'cpam cozy')).toEqual('100')
    expect(categorize(classifier, 'docteur weber')).toEqual('400610')
    expect(categorize(classifier, 'carte le kaiser')).toEqual('400810')
    expect(categorize(classifier, 'malakoff nespresso ndf')).toEqual('100')
    expect(categorize(classifier, 'cheque edf titi')).toEqual('200')
    expect(categorize(classifier, 'cpam cozy toto')).toEqual('100')
    expect(categorize(classifier, 'carte le kaiser tutu')).toEqual('400810')
    expect(categorize(classifier, 'malakoff nespresso ndf toutou')).toEqual(
      '100'
    )
    // TODO: François fix it near futur
    // expect(categorize('titi')).toEqual('600110') // 400110
    // expect(categorize('toto')).toEqual('600110') // 400110
    // expect(categorize('tata titi')).toEqual('600110') // 400110
  })

  it('Should return default category when proba is too small', () => {
    expect(categorize(classifier, 'kadrioru muuseu nemours')).toEqual('0')
    expect(categorize(classifier, 'db refa')).toEqual('0')
    expect(categorize(classifier, 'wp cais')).toEqual('0')
    expect(categorize(classifier, 'loto reglt')).toEqual('0')
    expect(categorize(classifier, 'comtal madecom')).toEqual('0')
  })
})
