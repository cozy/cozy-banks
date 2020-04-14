import React, { useState, useMemo, useCallback } from 'react'
import { useQuery } from 'cozy-client'
import { transactionsConn } from 'doctypes'
import { findRecurringBundles, getRulesFromConfig, rulesPerName } from './rules'
import Card from 'cozy-ui/transpiled/react/Card'
import { Caption, SubTitle } from 'cozy-ui/transpiled/react/Text'
import { Padded } from 'components/Spacing'
import setWith from 'lodash/setWith'
import sortBy from 'lodash/sortBy'
import clone from 'lodash/clone'
import tree from 'ducks/categories/tree'
import defaultConfig from './config.json'
import RulesDetails from './RulesDetails'
import useStickyState from './useStickyState'

const immutableSet = (object, path, value) => {
  return setWith(clone(object), path, value, clone)
}

const RuleInput = ({ ruleName, config, onChange }) => {
  const handleChangeActive = () => {
    onChange(`${ruleName}.active`, !config.active)
  }

  const handleChangeOptions = ev => {
    const parsed = parseInt(ev.target.value, 10)
    if (isNaN(parsed)) {
      return
    }
    onChange(`${ruleName}.options`, parsed)
  }
  return (
    <div key={ruleName} className="u-m-half u-miw-6">
      {ruleName} (<em>{rulesPerName[ruleName].stage}</em>)
      <Caption>{rulesPerName[ruleName].description}</Caption>
      <input
        type="checkbox"
        onChange={handleChangeActive}
        checked={config.active}
      />
      {config.options !== undefined ? (
        <input
          type="text"
          onChange={handleChangeOptions}
          value={config.options}
        />
      ) : null}
    </div>
  )
}

const Rules = ({ rulesConfig, onChangeConfig, onResetConfig }) => {
  const handleChangeRule = useCallback(
    (path, value) => {
      const updatedConfig = immutableSet(rulesConfig, path, value)
      onChangeConfig(updatedConfig)
    },
    [rulesConfig, onChangeConfig]
  )
  return (
    <Card className="u-mv-1">
      <RulesDetails />
      <div className="u-flex u-flex-wrap">
        {Object.entries(rulesConfig).map(([ruleName, config]) => (
          <RuleInput
            key={ruleName}
            ruleName={ruleName}
            config={config}
            onChange={handleChangeRule}
          />
        ))}
        <button onClick={onResetConfig}>Reset</button>
      </div>
    </Card>
  )
}

const hash = function(str) {
  var hash = 0,
    i,
    chr
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i)
    hash = (hash << 5) - hash + chr
    hash |= 0 // Convert to 32bit integer
  }
  return hash
}

const palette = [
  '#71c554',
  '#d67cd3',
  '#c5d65b',
  '#8e87e7',
  '#d3a336',
  '#6ba5de',
  '#ec5f62',
  '#69cc8e',
  '#e2779d',
  '#5ccec4',
  '#de8251',
  '#bab16c'
]

const getColor = bundle => {
  const h = Math.abs(hash(bundle.ops[0].label))
  return palette[h % (palette.length - 1)]
}

const List = ({ children }) => {
  return <ul className="u-m-0 u-ph-1 u-pv-half">{children}</ul>
}

const CategoryNames = ({ categoryId }) => {
  const categoryIds = categoryId.split(' / ')
  return (
    <List>
      {categoryIds.map((catId, i) => (
        <li key={i}>{tree[catId]}</li>
      ))}
    </List>
  )
}

const RecurrenceBundle = ({ bundle }) => {
  return (
    <Card
      className="u-m-half"
      style={{ border: `2px solid ${getColor(bundle)}` }}
    >
      <SubTitle>{bundle.ops[0].label}</SubTitle>
      <p>
        categories: <CategoryNames categoryId={bundle.categoryId} />
        frequency: {bundle.stats.deltas.mean.toFixed(0)} days
        <br />
        amount: {bundle.amount}
        <br />
        sigma: {bundle.stats.deltas.sigma.toFixed(2)}
        <br />
        mad: {bundle.stats.deltas.mad.toFixed(2)}
      </p>
      <table style={{ fontSize: 'small' }}>
        {sortBy(bundle.ops, x => x.date).map(x => (
          <tr key={x._id}>
            <td>{x.label}</td>
            <td>{x.date.slice(0, 10)}</td>
            <td>{x.amount}</td>
          </tr>
        ))}
      </table>
    </Card>
  )
}

  }

  }

}

const RecurrencePage = () => {
  const { data: transactions } = useQuery(
    transactionsConn.query,
    transactionsConn
  )

  const [rulesConfig, setRulesConfig, clearSavedConfig] = useStickyState(
    defaultConfig,
    'banks.recurrence-config'
  )

  const handleResetConfig = useCallback(() => {
    clearSavedConfig()
    setRulesConfig(defaultConfig)
  }, [clearSavedConfig, setRulesConfig])

  const handleChangeRules = newRules => setRulesConfig(newRules)

  const rules = useMemo(() => getRulesFromConfig(rulesConfig), [rulesConfig])

  const bundles = useMemo(() => findRecurringBundles(transactions, rules), [
    transactions,
    rules
  ])
  return (
    <Padded>
      <Rules
        rulesConfig={rulesConfig}
        onResetConfig={handleResetConfig}
        onChangeConfig={handleChangeRules}
      />
      <div className="u-flex" style={{ flexWrap: 'wrap' }}>
        {bundles.map((bundle, i) => (
          <RecurrenceBundle key={i} bundle={bundle} />
        ))}
      </div>
    </Padded>
  )
}

export default RecurrencePage
