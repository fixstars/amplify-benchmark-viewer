/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
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

  for (const [problemID, { class: problemClass, instance }] of Object.entries(
    data.problems,
  )) {
    let clients: Array<string> = []
    const existProblemClient = problemClients.find(
      (problemClient) =>
        problemClient.class === problemClass &&
        problemClient.instance === instance,
    )
    if (existProblemClient) clients = existProblemClient.clients

    for (const [, value] of Object.entries(data.benchmarks)) {
      const clientName = data.clients[value.client_id].name
      if (problemID === value.problem_id && !clients.includes(clientName)) {
        clients.push(clientName)
      }
    }

    if (existProblemClient) {
      existProblemClient.clients = clients
      continue
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
