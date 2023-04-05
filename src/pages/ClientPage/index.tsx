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
import { Client } from 'components/templates'
import type { ClientData } from 'components/templates/Client/Helpers'
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

  const getBenchmarkIDList = (clients: ReportData['clients']) => {
    return Array.from(
      new Set(
        Object.entries(clients)
          .filter(([, client]) => client.name === clientName)
          .map(([, client]) =>
            client.benchmarks.map((benchmark) => benchmark.group_id),
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
  const benchmarkIDList = getBenchmarkIDList(data.clients)

  let clientData: Array<ClientData> = []
  benchmarkIDList.map((benchmarkID) => {
    const {
      client_id: clientID,
      problem_id: problemID,
      results,
    } = data.benchmarks[benchmarkID]

    const {
      version,
      parameters: clientParameters,
      settings: clientSettings,
    } = data.clients[clientID]
    const {
      parameters: problemParameters,
      class: className,
      instance,
    } = data.problems[problemID]
    Object.entries(results).map(([label, result]) => {
      result.map((item) => {
        if (
          clientData.find(
            (client) =>
              client.benchmarkID === benchmarkID &&
              client.class === className &&
              client.instance === instance &&
              client.version === version &&
              client.label === label &&
              client.specified_time === item.specified_time,
          ) != null
        ) {
          return
        }

        const targetEnergies = item.raw_data.map((d) => d.target_energy)

        clientData.push({
          benchmarkID,
          class: className,
          instance,
          version,
          clientParameters,
          clientSettings,
          problemParameters,
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

  return (
    <Client
      title={clientName ?? ''}
      labels={getLabels(benchmarkIDList)}
      data={clientData}
    />
  )
}
