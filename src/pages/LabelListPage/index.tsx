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
import { LabelList } from 'components/templates'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { reportDataState } from 'stores'

export const LabelListPage = () => {
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

  type Benchmark = {
    label: string
    problemInstances: {
      [key: string]: Array<string> | undefined
    }
    clients: Array<string>
  }

  let benchmarks: Array<Benchmark> = []

  for (const [
    ,
    { client_id: clientID, problem_id: problemID, results },
  ] of Object.entries(data.benchmarks)) {
    for (const label of Object.keys(results)) {
      if (label === '') continue

      const findBenchmark = benchmarks.find((item) => item.label === label)
      const benchmark = findBenchmark ?? {
        label: label,
        problemInstances: {},
        clients: [],
      }

      const problem = data.problems[problemID]
      benchmark.problemInstances[problem.class] = Array.from(
        new Set([
          ...(benchmark.problemInstances[problem.class] ?? []),
          problem.instance,
        ]),
      )

      const client = data.clients[clientID]
      benchmark.clients = Array.from(
        new Set([...benchmark.clients, client.name]),
      )

      if (findBenchmark == null) {
        benchmarks.push(benchmark)
      }
    }
  }

  benchmarks = benchmarks.sort((a, b) => {
    const prevClass = a.label.toLowerCase()
    const nextClass = b.label.toLowerCase()

    return prevClass > nextClass ? 1 : -1
  })

  return <LabelList data={benchmarks} />
}
