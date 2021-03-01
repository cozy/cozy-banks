import React from 'react'

import AppLike from 'test/AppLike'
import ImportGroupPanel from 'ducks/balance/ImportGroupPanel'

import { render } from '@testing-library/react'

import { createMockClient } from 'cozy-client'

describe('ImportGroupPanel', () => {
  const setup = ({ jobsInProgress }) => {
    const client = createMockClient({})

    const root = render(
      <AppLike client={client} jobsInProgress={jobsInProgress}>
        <ImportGroupPanel />
      </AppLike>
    )

    return { root }
  }

  it('should not be shown', () => {
    const { root } = setup({})
    expect(root.queryByText('Import in progress')).toBeNull()
  })

  // TODO
  // it('should displays multiple konnector in progress', () => {
  //   const jobsInProgress = [
  //     { konnector: 'caissedepargne1', account: '1111' },
  //     { konnector: 'caissedepargne1', account: '2222' }
  //   ]
  //   const { root } = setup({ jobsInProgress })
  //
  //   expect(root.getByText('Importing accounts')).toBeTruthy()
  //   expect(root.getAllByText('Import in progress').length).toEqual(3)
  // })
})
