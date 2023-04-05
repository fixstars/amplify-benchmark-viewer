import { useEffect } from 'react'

import type { ReportData } from '@types'
import { useGetReportData } from 'api'
import { Loading } from 'components/atoms'
import { Layout } from 'components/organisms'
import { ClientList } from 'components/templates'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { reportDataState } from 'stores'

export const ClientListPage = () => {
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

  type problemInstances = {
    [key: string]: Array<string> | undefined
  }

  let clients: Array<{
    client: string
    version: string
    problemInstances: problemInstances
  }> = []

  for (const [clientID, { name, version }] of Object.entries(data.clients)) {
    const client = clients.find(
      (item) => item.client === name && item.version === version,
    )
    const problemInstances: problemInstances = {}

    Object.entries(data.benchmarks)
      .filter(([, benchmark]) => benchmark.client_id === clientID)
      .map(([, benchmark]) => benchmark.problem_id)
      .map((problemID) => {
        const problem = data.problems[problemID]
        problemInstances[problem.class] = Array.from(
          new Set([
            ...(problemInstances[problem.class] ?? []),
            ...(client?.problemInstances[problem.class] ?? []),
            problem.instance,
          ]),
        ).sort()
      })

    if (client == null) {
      clients.push({
        client: name,
        version: version,
        problemInstances,
      })
    } else {
      client.problemInstances = problemInstances
    }
  }

  clients = clients.sort((a, b) => {
    const prevClass = a.client.toLowerCase()
    const nextClass = b.client.toLowerCase()

    if (prevClass === nextClass) {
      const prevInstance = a.version.toLowerCase()
      const nextInstance = b.version.toLowerCase()
      return prevInstance > nextInstance ? 1 : -1
    }

    return prevClass > nextClass ? 1 : -1
  })

  return <ClientList data={clients} />
}
