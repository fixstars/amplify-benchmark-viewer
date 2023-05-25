/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { ReportData } from '@types'
import Plot from 'react-plotly.js'

import { registerTooltip } from '../LegendTooltip'

interface Props {
  readonly data: ReportData
  readonly instance: string
  readonly useHistory: boolean
  readonly xtype: 'linear' | 'log'
  readonly label: string
}

export const PlotReachBestRate = ({
  data,
  instance,
  useHistory,
  xtype,
  label,
}: Props) => {
  const groupIDs = Object.values(data.problems)
    .filter((value) => value.instance === instance)
    .map(({ benchmarks }) =>
      Object.values(benchmarks).map((benchmark) => benchmark.group_id),
    )
    .flat()

  const plotData: Plotly.Data[] = []
  const parameters: {
    [k: string]: {
      clientParameters: {
        [k: string]: unknown
      }
      problemParameters: {
        [k: string]: unknown
      }
    }
  } = {}

  for (let i = 0; i < groupIDs.length; i++) {
    const groupID = groupIDs[i]
    const {
      client_id: clientID,
      problem_id: problemID,
      history,
    } = data.benchmarks[groupID]
    const {
      name,
      version,
      parameters: clientParameters,
    } = data.clients[clientID]
    const { parameters: problemParameters } = data.problems[problemID]
    const results =
      useHistory && history != null
        ? history[label]
        : data.benchmarks[groupID].results[label]
    if ((results as typeof results | undefined) == null) continue

    const samplingTime: number[] = []
    const reachBestRate: number[] = []
    const texts: string[] = []
    for (const r of results) {
      let time = 0
      if ('sampling_time' in r) {
        time = r.sampling_time
      }
      if ('raw_data' in r) {
        for (const raw of r.raw_data) {
          time += raw.sampling_time
        }
        time /= r.raw_data.length
        texts.push(`specified time:${r.specified_time}`)
      }
      samplingTime.push(time)
      reachBestRate.push(r.reach_best_rate)
    }

    const parameterName = `${i + 1}_${name}(${version})`
    plotData.push({
      x: samplingTime,
      y: reachBestRate,
      name: parameterName,
      type: 'scatter',
      mode: 'lines+markers',
      text: texts,
    })
    parameters[parameterName] = {
      clientParameters,
      problemParameters,
    }
  }
  const layout: Partial<Plotly.Layout> = {
    xaxis: {
      title: 'sampling_time[ms]',
      type: xtype,
      autorange: true,
    },
    yaxis: {
      title: 'reach best rate',
      autorange: true,
    },
    showlegend: true,
  }
  const config: Partial<Plotly.Config> = {
    toImageButtonOptions: { filename: `ReachBestRate_${instance}_${label}` },
    responsive: true,
  }

  const tooltipContents = (name: string) => {
    let result = name
    result += '<br /><br /><span>Client parameters</span>'
    for (const [key, value] of Object.entries(
      parameters[name].clientParameters,
    )) {
      if (typeof value === 'object' && value != null) {
        result += `<br /><span>- ${key}:</span>`
        for (const [subKey, subValue] of Object.entries(value)) {
          result += `<br /><span>&nbsp;&nbsp;- ${subKey}: ${subValue}</span>`
        }
      } else {
        result += `<br /><span>- ${key}: ${value}</span>`
      }
    }

    result += '<br /><br /><span>Problem parameters</span>'
    for (const [key, value] of Object.entries(
      parameters[name].problemParameters,
    )) {
      if (typeof value === 'object' && value != null) {
        result += `<br /><span>- ${key}:</span>`
        for (const [subKey, subValue] of Object.entries(value)) {
          result += `<br /><span>&nbsp;&nbsp;- ${subKey}: ${subValue}</span>`
        }
      } else {
        result += `<br /><span>- ${key}: ${value}</span>`
      }
    }

    return result
  }

  return (
    <Plot
      divId="PlotReachBestRate"
      style={{ flex: 1, height: '100%' }}
      data={plotData}
      layout={layout}
      config={config}
      onInitialized={() =>
        registerTooltip({ divId: 'PlotReachBestRate', tooltipContents })
      }
      onUpdate={() =>
        registerTooltip({ divId: 'PlotReachBestRate', tooltipContents })
      }
    />
  )
}
