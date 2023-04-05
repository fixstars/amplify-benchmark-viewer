/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useQuery } from '@tanstack/react-query'
import type { ReportData } from '@types'
import axios from 'axios'

const REPORT_DATA_URL = 'data/data.json'

const getReportDataData = async (): Promise<ReportData> => {
  const response = await axios.get(REPORT_DATA_URL)

  return response.data
}

export const useGetReportData = () => {
  return useQuery(['ReportDataData'], async () => getReportDataData(), {
    refetchOnWindowFocus: false,
  })
}
