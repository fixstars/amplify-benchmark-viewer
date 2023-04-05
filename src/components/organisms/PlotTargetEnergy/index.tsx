import type { ReportData } from '@types'
import Plot from 'react-plotly.js'

import { registerTooltip } from '../LegendTooltip'

interface Props {
  readonly data: ReportData
  readonly instance: string
  readonly useHistory: boolean
  readonly xtype: 'linear' | 'log'
  readonly ytype: 'linear' | 'log'
  readonly label: string
}

export const PlotTargetEnergy = ({
  data,
  instance,
  useHistory,
  xtype,
  ytype,
  label,
}: Props) => {
  const groupIDs = Object.values(data.problems)
    .filter((value) => value.instance === instance)
    .map(({ benchmarks }) =>
      Object.values(benchmarks).map((benchmark) => benchmark.group_id),
    )
    .flat()

  const colors = [
    '#1f77b4', // muted blue
    '#ff7f0e', // safety orange
    '#2ca02c', // cooked asparagus green
    '#d62728', // brick red
    '#9467bd', // muted purple
    '#8c564b', // chestnut brown
    '#e377c2', // raspberry yogurt pink
    '#7f7f7f', // middle gray
    '#bcbd22', // curry yellow-green
    '#17becf', // blue-teal
  ]
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

  const plotData: Plotly.Data[] = []
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

    if (useHistory && history != null) {
      const results = history[label]
      if ((results as typeof results | undefined) == null) continue

      const samplingTime: number[] = []
      const targetEnergy: { [key: string]: number[] } = {
        min: [],
        '25%': [],
        '50%': [],
        '75%': [],
        max: [],
      }
      for (const r of results) {
        const min = r.target_energy.min
        const q1 = r.target_energy['25%']
        const median = r.target_energy['50%']
        const q3 = r.target_energy['75%']
        const max = r.target_energy.max
        if (min != null) {
          samplingTime.push(r.sampling_time)
          targetEnergy['min'].push(min)
        }
        if (q1 != null) {
          targetEnergy['25%'].push(q1)
        }
        if (median != null) {
          targetEnergy['50%'].push(median)
        }
        if (q3 != null) {
          targetEnergy['75%'].push(q3)
        }
        if (max != null) {
          targetEnergy['max'].push(max)
        }
      }
      targetEnergy['75%'].reverse()
      targetEnergy['max'].reverse()
      const rSamplingTime = [...samplingTime].reverse()

      const parameterName = `${i + 1}_${name}(${version})`
      plotData.push({
        x: samplingTime.concat(rSamplingTime),
        y: targetEnergy['min'].concat(targetEnergy['max']),
        name: parameterName,
        type: 'scatter',
        mode: 'lines',
        showlegend: false,
        legendgroup: parameterName,
        fill: 'toself',
        fillcolor: colors[i % colors.length] + '55',
        line: { color: colors[i % colors.length] + '00' },
        text: 'max-min',
      })
      plotData.push({
        x: samplingTime.concat(rSamplingTime),
        y: targetEnergy['25%'].concat(targetEnergy['75%']),
        name: parameterName,
        type: 'scatter',
        mode: 'lines',
        showlegend: false,
        legendgroup: parameterName,
        fill: 'toself',
        fillcolor: colors[i % colors.length] + '66',
        line: { color: colors[i % colors.length] + '00' },
        text: '75%-25%',
      })
      plotData.push({
        x: samplingTime,
        y: targetEnergy['50%'],
        type: 'scatter',
        mode: 'lines',
        name: parameterName,
        showlegend: true,
        legendgroup: parameterName,
        fillcolor: colors[i % colors.length] + 'ff',
        line: { color: colors[i % colors.length] },
      })

      parameters[parameterName] = {
        clientParameters,
        problemParameters,
      }
    } else {
      const parameterName = `${i + 1}_${name}(${version})`
      const results = data.benchmarks[groupID].results[label]
      if ((results as typeof results | undefined) == null) continue

      const samplingTime: number[] = []
      const targetEnergy: number[] = []
      for (const r of results) {
        for (const e of r.raw_data) {
          samplingTime.push(e.sampling_time)
          targetEnergy.push(e.target_energy)
        }
      }
      plotData.push({
        x: samplingTime,
        y: targetEnergy,
        type: 'scatter',
        mode: 'markers',
        name: parameterName,
        legendgroup: parameterName,
        marker: { color: colors[i % colors.length] },
      })

      parameters[parameterName] = {
        clientParameters,
        problemParameters,
      }
    }
  }
  const layout: Partial<Plotly.Layout> = {
    xaxis: {
      title: 'sampling_time[ms]',
      type: xtype,
      autorange: true,
    },
    yaxis: {
      title: 'target_energy',
      type: ytype,
      autorange: true,
    },
    showlegend: true,
  }
  const config: Partial<Plotly.Config> = {
    toImageButtonOptions: { filename: `TargetEnergy_${instance}_${label}` },
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
      divId="PlotTargetEnergy"
      style={{ flex: 1, height: '100%' }}
      data={plotData}
      layout={layout}
      config={config}
      onInitialized={() =>
        registerTooltip({ divId: 'PlotTargetEnergy', tooltipContents })
      }
      onUpdate={() =>
        registerTooltip({ divId: 'PlotTargetEnergy', tooltipContents })
      }
    />
  )
}
