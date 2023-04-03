import type { MasterData } from '@types'
import type { Data, Layout } from 'plotly.js'

const getLayout = (bestKnown: number): Partial<Layout> => {
  return {
    updatemenus: [
      {
        buttons: [
          {
            args: [{}, { xaxis: { title: 'sampling_time[ms]', type: 'log' } }],
            label: 'Log Scale',
            method: 'update',
          },
          {
            args: [
              {},
              {
                xaxis: {
                  title: 'sampling_time[ms]',
                  type: 'linear',
                },
              },
            ],
            label: 'Linear Scale',
            method: 'update',
          },
        ],
        xanchor: 'left',
        y: 1.2,
        yanchor: 'top',
      },
    ],
    xaxis: {
      title: 'sampling_time[ms]',
      type: 'log',
      autorange: true,
    },
    yaxis: {
      title: 'target_energy',
      autorange: true,
    },
    showlegend: true,
    shapes: [
      {
        type: 'line',
        xref: 'paper',
        x0: 0,
        y0: bestKnown,
        x1: 1,
        y1: bestKnown,
        line: {
          dash: 'dash',
        },
      },
    ],
  }
}

interface PlotDataParameter {
  readonly data: ReadonlyArray<MasterData>
  readonly clientChartType: {
    readonly [key: string]: string
  }
}

const getPlotData = ({
  data,
  clientChartType,
}: PlotDataParameter): {
  readonly plotData: { readonly [key: string]: Data[] }
  readonly plotOriginData: { readonly [key: string]: MasterData }
  readonly problemBestKnown: { readonly [key: string]: number }
} => {
  const plotGroupIDList = []
  for (const item of data) {
    const groupID = item.group_id
    if (groupID === '') continue

    plotGroupIDList.push(groupID)
  }

  const problemBestKnown: { [key: string]: number } = {}
  const plotData: { [key: string]: Data[] | undefined } = {}
  const plotOriginData: { [key: string]: MasterData } = {}
  for (const item of data) {
    const groupID = item['group_id']
    if (plotGroupIDList.includes(groupID)) {
      const type = clientChartType[item['client_name']]
      const instance = item['problem_instance']
      problemBestKnown[instance] = item['problem_best_known']

      if ((item['plot_data'][type] as string | null) == null) continue

      const index = (plotData[instance]?.length ?? 0) + 1
      const name = `${index}_${item['client_name']}(${item['client_version']})`
      item['plot_data'][type]['name'] = name
      plotOriginData[`${name}_${instance}`] = item

      if (instance in plotData) {
        plotData[instance]?.push(item['plot_data'][type])
      } else {
        plotData[instance] = [item['plot_data'][type]]
      }
    }
  }

  return {
    plotData: plotData as { readonly [key: string]: Data[] },
    plotOriginData,
    problemBestKnown,
  }
}

export { getLayout, getPlotData }
