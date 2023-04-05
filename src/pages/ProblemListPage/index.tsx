import { useEffect } from 'react'

import type { ReportData } from '@types'
import { useGetReportData } from 'api'
import { Loading } from 'components/atoms'
import { Layout } from 'components/organisms'
import { ProblemList } from 'components/templates'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { reportDataState } from 'stores'

export const ProblemListPage = () => {
  const navigate = useNavigate()
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

  let problemClients: Array<{
    class: string
    instance: string
    clients: Array<string>
  }> = []

  for (const [
    problemID,
    { class: problemClass, instance: instance },
  ] of Object.entries(data.problems)) {
    if (
      problemClients.find(
        (problemClient) =>
          problemClient.class === problemClass &&
          problemClient.instance === instance,
      )
    ) {
      continue
    }
    const clients: Array<string> = []

    for (const [, value] of Object.entries(data.benchmarks)) {
      const clientName = data.clients[value.client_id].name
      if (problemID === value.problem_id && !clients.includes(clientName)) {
        clients.push(clientName)
      }
    }

    problemClients.push({
      class: problemClass,
      instance: instance,
      clients,
    })
  }

  problemClients = problemClients.sort((a, b) => {
    const prevClass = a.class.toLowerCase()
    const nextClass = b.class.toLowerCase()

    if (prevClass === nextClass) {
      const prevInstance = a.instance.toLowerCase()
      const nextInstance = b.instance.toLowerCase()
      return prevInstance > nextInstance ? 1 : -1
    }

    return prevClass > nextClass ? 1 : -1
  })

  return <ProblemList data={problemClients} />
}
