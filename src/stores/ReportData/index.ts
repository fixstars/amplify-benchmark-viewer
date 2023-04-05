import type { ReportData } from '@types'
import { atom } from 'recoil'

const DEFAULT_STATE: ReportData | null = null

export const reportDataState = atom<ReportData | null>({
  key: 'REPORT_DATA_STATE',
  default: DEFAULT_STATE,
})
