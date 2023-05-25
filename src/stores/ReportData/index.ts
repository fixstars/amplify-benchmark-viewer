/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { ReportData } from '@types'
import { atom } from 'recoil'

const DEFAULT_STATE: ReportData | null = null

export const reportDataState = atom<ReportData | null>({
  key: 'REPORT_DATA_STATE',
  default: DEFAULT_STATE,
})
