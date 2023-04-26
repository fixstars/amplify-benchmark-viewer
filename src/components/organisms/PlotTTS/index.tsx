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

export const PlotTTS = ({
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

  const plotData: Plotly.Data[] = []
  const listOfTTSPercentage = ['0%', '1%', '5%', '10%', '20%', '50%']
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
  for (const p of listOfTTSPercentage) {
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
      const ttsList: number[] = []
      const texts: string[] = []
      for (const r of results) {
        const tts = r.time_to_solution[p as keyof typeof r.time_to_solution]
        if (tts != null) {
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
          ttsList.push(tts)
        }
      }
      const visible = p === '0%'
      const parameterName = `${i + 1}_${name}(${version})`
      parameters[parameterName] = {
        clientParameters,
        problemParameters,
      }
      plotData.push({
        x: samplingTime,
        y: ttsList,
        name: parameterName,
        type: 'scatter',
        mode: 'lines+markers',
        visible: visible,
        text: texts,
      })
    }
  }
  const visibleTrue = Array<boolean>(groupIDs.length).fill(true)
  const visibleFalse = Array<boolean>(groupIDs.length).fill(false)

  const layout: Partial<Plotly.Layout> = {
    xaxis: {
      title: 'sampling_time[ms]',
      type: xtype,
      autorange: true,
    },
    yaxis: {
      title: 'TTS[ms]',
      type: ytype,
      autorange: true,
    },
    showlegend: true,
    updatemenus: [
      {
        y: 1.2,
        yanchor: 'top',
        x: 0.1,
        xanchor: 'top',
        buttons: [
          {
            method: 'restyle',
            args: [
              'visible',
              visibleTrue
                .concat(visibleFalse)
                .concat(visibleFalse)
                .concat(visibleFalse)
                .concat(visibleFalse)
                .concat(visibleFalse),
            ],
            label: '0%',
          },
          {
            method: 'restyle',
            args: [
              'visible',
              visibleFalse
                .concat(visibleTrue)
                .concat(visibleFalse)
                .concat(visibleFalse)
                .concat(visibleFalse)
                .concat(visibleFalse),
            ],
            label: '1%',
          },
          {
            method: 'restyle',
            args: [
              'visible',
              visibleFalse
                .concat(visibleFalse)
                .concat(visibleTrue)
                .concat(visibleFalse)
                .concat(visibleFalse)
                .concat(visibleFalse),
            ],
            label: '5%',
          },
          {
            method: 'restyle',
            args: [
              'visible',
              visibleFalse
                .concat(visibleFalse)
                .concat(visibleFalse)
                .concat(visibleTrue)
                .concat(visibleFalse)
                .concat(visibleFalse),
            ],
            label: '10%',
          },
          {
            method: 'restyle',
            args: [
              'visible',
              visibleFalse
                .concat(visibleFalse)
                .concat(visibleFalse)
                .concat(visibleFalse)
                .concat(visibleTrue)
                .concat(visibleFalse),
            ],
            label: '20%',
          },
          {
            method: 'restyle',
            args: [
              'visible',
              visibleFalse
                .concat(visibleFalse)
                .concat(visibleFalse)
                .concat(visibleFalse)
                .concat(visibleFalse)
                .concat(visibleTrue),
            ],
            label: '50%',
          },
        ],
      },
    ],
  }

  const config: Partial<Plotly.Config> = {
    toImageButtonOptions: {
      filename: `TTS_${instance}_${label}`,
    },
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
      divId="PlotTTS"
      style={{ flex: 1, height: '100%' }}
      data={plotData}
      layout={layout}
      config={config}
      onInitialized={() =>
        registerTooltip({ divId: 'PlotTTS', tooltipContents })
      }
      onUpdate={() => registerTooltip({ divId: 'PlotTTS', tooltipContents })}
    />
  )
}
