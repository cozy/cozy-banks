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
      'ai une phrase',
      'une phrase comme',
      'phrase comme ca',
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

  const N_DIGITS = 4
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
    expect(
      predictProbaMax(classifier, 'bnp paribas massy vieux lil hisler bd metz')
    ).toBeCloseTo(0.990732, N_DIGITS)
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
      predictProbaMax(classifier, 'dim gare st cozycloudmd hfiol')
    ).toBeCloseTo(0.481481, N_DIGITS)
    expect(
      predictProbaMax(classifier, 'boulogne saint hil villa dor')
    ).toBeCloseTo(0.701939, N_DIGITS)
    expect(
      predictProbaMax(classifier, 'gassin tassi da tassin evi evane trait')
    ).toBeCloseTo(0.569187, N_DIGITS)
    expect(
      predictProbaMax(classifier, 'new yorusd bourg la nina missir')
    ).toBeCloseTo(0.38534, N_DIGITS)
    expect(
      predictProbaMax(classifier, 'nourisse framasoft vandek')
    ).toBeCloseTo(0.066066, N_DIGITS)
    expect(predictProbaMax(classifier, 'tartes voyageurs com op')).toBeCloseTo(
      0.948949,
      N_DIGITS
    )
    expect(
      predictProbaMax(classifier, 'nany re dab crcam reunion phcie de')
    ).toBeCloseTo(0.97077, N_DIGITS)
    expect(
      predictProbaMax(
        classifier,
        'loretta paris paks margareeta relay px annecy'
      )
    ).toBeCloseTo(0.997483, N_DIGITS)
    expect(
      predictProbaMax(classifier, 'comete cafe lateral paris olivie clamart')
    ).toBeCloseTo(0.999572, N_DIGITS)
    expect(
      predictProbaMax(
        classifier,
        'cora massy massy massy scmonceau fleu mantes'
      )
    ).toBeCloseTo(0.980373, N_DIGITS)
    expect(
      predictProbaMax(classifier, 'hopper du au carte cnp pret habitat')
    ).toBeCloseTo(0.884901, N_DIGITS)
    expect(
      predictProbaMax(classifier, 'plan ccb tag_date google kongregat')
    ).toBeCloseTo(0.999985, N_DIGITS)
    expect(
      predictProbaMax(classifier, 'marniere plaisir bel air pradecembre meti')
    ).toBeCloseTo(0.890242, N_DIGITS)
    expect(predictProbaMax(classifier, 'cph riv hotel la')).toBeCloseTo(
      0.242485,
      N_DIGITS
    )
    expect(
      predictProbaMax(classifier, 'bancaires frais plaisir paiement par carte')
    ).toBeCloseTo(0.999981, N_DIGITS)
    expect(
      predictProbaMax(classifier, 'nautes paris saem des oceanopolis')
    ).toBeCloseTo(0.37766, N_DIGITS)
    expect(
      predictProbaMax(classifier, 'nouvel an decathlon espa ras cdf fitness')
    ).toBeCloseTo(0.273505, N_DIGITS)
    expect(
      predictProbaMax(classifier, 'confreres cpte dedgfip impot diman')
    ).toBeCloseTo(0.999925, N_DIGITS)
    expect(
      predictProbaMax(
        classifier,
        'universal circui maurepas vt de le someva boutique gruissan'
      )
    ).toBeCloseTo(0.999778, N_DIGITS)
    expect(
      predictProbaMax(classifier, 'help st vincent dgfip impot')
    ).toBeCloseTo(0.996317, N_DIGITS)
    expect(
      predictProbaMax(classifier, 'sclalsacien achat tag_date google le port')
    ).toBeCloseTo(0.999997, N_DIGITS)
    expect(
      predictProbaMax(classifier, 'uber trip wsyj stibmivb go gourmet')
    ).toBeCloseTo(0.999076, N_DIGITS)
    expect(
      predictProbaMax(classifier, 'bozova applygovee bimag guerande')
    ).toBeCloseTo(0.166482, N_DIGITS)
    expect(
      predictProbaMax(
        classifier,
        'eglise immeuble db paris pel vandekerckhove pierre'
      )
    ).toBeCloseTo(0.833429, N_DIGITS)
    expect(
      predictProbaMax(classifier, 'saveurs et li tourbes motif parents')
    ).toBeCloseTo(0.49771, N_DIGITS)
    expect(predictProbaMax(classifier, 'bleu evry de compte avec')).toBeCloseTo(
      0.999852,
      N_DIGITS
    )
    expect(
      predictProbaMax(classifier, 'courant perso prevoya nce zig')
    ).toBeCloseTo(0.526194, N_DIGITS)
    expect(
      predictProbaMax(classifier, 'zooplusfr parents cafe pierre paris')
    ).toBeCloseTo(0.988517, N_DIGITS)
    expect(
      predictProbaMax(classifier, 'kfc tolbiac wwwdhlfr le iard sa icontrat')
    ).toBeCloseTo(0.967956, N_DIGITS)
    expect(
      predictProbaMax(classifier, 'motif manque argent awp tille')
    ).toBeCloseTo(0.99938, N_DIGITS)
    expect(
      predictProbaMax(classifier, 'dac vl chq deplace bp aire')
    ).toBeCloseTo(0.984078, N_DIGITS)
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
