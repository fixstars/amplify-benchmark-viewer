import { useEffect } from 'react'

import type { ReportData } from '@types'
import { useGetReportData } from 'api'
import { Loading } from 'components/atoms'
import { Layout } from 'components/organisms'
import { Client } from 'components/templates'
import type {
  ClientData,
  ClientParameter,
} from 'components/templates/Client/Helpers'
import { useNavigate, useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { reportDataState } from 'stores'

export const ClientPage = () => {
  const navigate = useNavigate()
  const { clientName } = useParams()
  const [reportData, setReportData] = useRecoilState(reportDataState)
  const { data: apiData, isLoading, isFetching, isError } = useGetReportData()

  const isDataEmpty = apiData == null && reportData == null

  useEffect(() => {
    if (isDataEmpty && isError) {
      navigate('/upload')
    } else if (reportData == null && apiData != null) {
      setReportData(apiData)
    }
  }, [isDataEmpty, isError, reportData, apiData])

  if (isLoading || isFetching || isDataEmpty || reportData == null) {
    return (
      <Layout>
        <Loading />
      </Layout>
    )
  }

  const data = reportData as ReportData

  let clientData: Array<ClientData> = []
  Object.entries(data.clients)
    .filter(([, item]) => item.name === clientName)
    .map(([, item]) => {
      item.benchmarks
        .map((benchmark) => benchmark.group_id)
        .map((benchmarkID) => {
          const benchmark = data.benchmarks[benchmarkID]
          const problem = data.problems[benchmark.problem_id]

          clientData.push({
            class: problem.class,
            instance: problem.instance,
            problemParameters: item.parameters as ClientParameter,
            version: item.version,
            ...benchmark.results[''][0].time_to_solution,
          })
        })
    })

  clientData = clientData.sort((a, b) => {
    const prevClass = a.class.toLowerCase()
    const nextClass = b.class.toLowerCase()

    if (prevClass === nextClass) {
      const prevInstance = a.instance.toLowerCase()
      const nextInstance = b.instance.toLowerCase()

      if (prevInstance === nextInstance) {
        const prevVersion = a.version.toLowerCase()
        const nextVersion = b.version.toLowerCase()
        return prevVersion > nextVersion ? 1 : -1
      }

      return prevInstance > nextInstance ? 1 : -1
    }

    return prevClass > nextClass ? 1 : -1
  })

  return <Client title={clientName ?? ''} data={clientData} />
}
