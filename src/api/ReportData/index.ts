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
