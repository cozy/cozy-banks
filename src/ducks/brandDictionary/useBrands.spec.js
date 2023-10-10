import { act, renderHook } from '@testing-library/react-hooks'
import { useBrands } from './useBrands'

jest.mock('ducks/brandDictionary', () => ({
  getBrands: jest.fn(() => Promise.resolve(['Brand A', 'Brand B']))
}))

describe('useBrands', () => {
  it('should return an empty array initially', async () => {
    const { result } = renderHook(() => useBrands())
    act(() => {
      expect(result.current).toEqual([])
    })
  })

  it('should fetch and return all brands', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useBrands())
    await waitForNextUpdate()
    act(() => {
      expect(result.current).toEqual(['Brand A', 'Brand B'])
    })
  })
})
