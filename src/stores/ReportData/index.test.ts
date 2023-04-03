import { snapshot_UNSTABLE as snapshot } from 'recoil'
import mockData from 'utils/test/mocks/data/mockReportData.json'

import { reportDataState } from './index'

describe('[Data] report data', () => {
  test('set reportDataState', () => {
    const initialSnapshot = snapshot()
    expect(initialSnapshot.getLoadable(reportDataState).valueOrThrow()).toEqual(
      null,
    )

    const testSnapshot = snapshot(({ set }) => set(reportDataState, mockData))
    expect(testSnapshot.getLoadable(reportDataState).valueOrThrow()).toEqual(
      mockData,
    )
  })
})
