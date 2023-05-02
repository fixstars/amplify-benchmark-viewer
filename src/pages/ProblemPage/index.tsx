import { useEffect } from 'react'

import type { ReportData } from '@types'
import { useGetReportData } from 'api'
import { Loading } from 'components/atoms'
import { Layout } from 'components/organisms'
import { Problem } from 'components/templates'
import type { ProblemData } from 'components/templates/Problem/Helpers'
import { useNavigate, useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { reportDataState } from 'stores'
import {
  quartile0,
  quartile100,
  quartile25,
  quartile50,
  quartile75,
} from 'utils/statistics'

export const ProblemPage = () => {
  const navigate = useNavigate()
  const { className, instance } = useParams()
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

  if (
    className == null ||
    instance == null ||
    isLoading ||
    isFetching ||
    isDataEmpty ||
    reportData == null
  ) {
    return (
      <Layout>
        <Loading />
      </Layout>
    )
  }

  const data = reportData as ReportData

  const getBenchmarkIDList = (problems: ReportData['problems']) => {
    return Array.from(
      new Set(
        Object.entries(problems)
          .filter(
            ([, problem]) =>
              problem.class === className && problem.instance === instance,
          )
          .map(([, problem]) =>
            problem.benchmarks.map((benchmark) => benchmark.group_id),
          )
          .flat(),
      ),
    )
  }

  const getLabels = (benchmarkIDList: ReadonlyArray<string>) => {
    return Array.from(
      new Set(
        benchmarkIDList
          .map((benchmarkID) =>
            Object.keys(data.benchmarks[benchmarkID].results),
          )
          .flat(),
      ),
    ).map((label) => (label === '' ? 'all' : label))
  }

  const benchmarkIDList = getBenchmarkIDList(data.problems)
  let problemData: Array<ProblemData> = []

  benchmarkIDList.map((benchmarkID) => {
    const {
      client_id: clientID,
      problem_id: problemID,
      results,
    } = data.benchmarks[benchmarkID]

    const {
      name: client,
      version,
      parameters: clientParameters,
    } = data.clients[clientID]
    const { parameters: problemParameters } = data.problems[problemID]
    Object.entries(results).map(([label, result]) => {
      result.map((item) => {
        if (
          problemData.find(
            (problem) =>
              problem.benchmark_id === benchmarkID &&
              problem.client === client &&
              problem.version === version &&
              problem.label === label &&
              problem.specified_time === item.specified_time,
          ) != null
        ) {
          return
        }

        const targetEnergies = item.raw_data.map((d) => d.target_energy)

        problemData.push({
          benchmark_id: benchmarkID,
          client,
          version,
          clientParameters,
          problemParameters: problemParameters,
          label,
          num_samples: item.num_samples,
          specified_time: item.specified_time,
          'target_energy(min)': quartile0(targetEnergies),
          'target_energy(25%)': quartile25(targetEnergies),
          'target_energy(50%)': quartile50(targetEnergies),
          'target_energy(75%)': quartile75(targetEnergies),
          'target_energy(max)': quartile100(targetEnergies),
          'TTS(0%)': item.time_to_solution['0%'],
          'TTS(1%)': item.time_to_solution['1%'],
          'TTS(5%)': item.time_to_solution['5%'],
          'TTS(10%)': item.time_to_solution['10%'],
          'TTS(20%)': item.time_to_solution['20%'],
          'TTS(50%)': item.time_to_solution['50%'],
          reach_best_rate: item.reach_best_rate,
          feasible_rate: item.feasible_rate,
        })
      })
    })
  })

  problemData = problemData.sort((a, b) => {
    const prevClient = a.client.toLowerCase()
    const nextClient = b.client.toLowerCase()

    if (prevClient === nextClient) {
      const prevVersion = a.version.toLowerCase()
      const nextVersion = b.version.toLowerCase()

      if (prevVersion === nextVersion) {
        const prevLabel = a.label.toLowerCase()
        const nextLabel = b.label.toLowerCase()
        return prevLabel > nextLabel ? 1 : -1
      }

      return prevVersion > nextVersion ? 1 : -1
    }

    return prevClient > nextClient ? 1 : -1
  })

  return (
    <Problem
      className={className}
      instance={instance}
      labels={getLabels(benchmarkIDList)}
      data={problemData}
      reportData={data}
    />
  )
}
