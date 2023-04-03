import { useEffect } from 'react'

import type { ReportData } from '@types'
import { JsonFileUploader } from 'components/atoms'
import { Layout } from 'components/organisms'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { reportDataState } from 'stores'

export const UploadDataPage = () => {
  const navigate = useNavigate()
  const [reportData, setReportData] = useRecoilState(reportDataState)

  useEffect(() => {
    if (reportData != null) {
      navigate(-1)
    }
  }, [reportData])

  return (
    <Layout>
      <JsonFileUploader
        onLoad={(jsonData) => setReportData(jsonData as ReportData)}
      />
    </Layout>
  )
}
