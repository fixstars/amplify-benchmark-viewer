/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { MasterData } from '@types'
import mockData from 'utils/test/mocks/data/mockMasterData.json'

import { getLayout, getPlotData } from './index'

describe('MasterResultChart helpers', () => {
  it('getLayout', () => {
    const layout = getLayout(10)
    expect(layout).toEqual({
      updatemenus: [
        {
          buttons: [
            {
              args: [
                {},
                { xaxis: { title: 'sampling_time[ms]', type: 'log' } },
              ],
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
          y0: 10,
          x1: 1,
          y1: 10,
          line: {
            dash: 'dash',
          },
        },
      ],
    })
  })

  it('getPlotData', () => {
    const clientChartType = {
      a_client: 'max-min',
      AClient: 'box',
    }

    const { plotData, problemBestKnown, plotOriginData } = getPlotData({
      data: mockData as ReadonlyArray<MasterData>,
      clientChartType,
    })

    expect(plotData).toEqual({
      b_instance: [
        {
          fill: 'toself',
          hoveron: 'points',
          mode: 'lines',
          name: '1_a_client(v1.0.0)',
          x: mockData[0]['plot_data']['max-min']?.x,
          y: mockData[0]['plot_data']['max-min']?.y,
          type: 'scatter',
          line: mockData[0]['plot_data']['max-min']?.line,
        },
        {
          name: '2_AClient(v1.0.0)',
          x: mockData[2]['plot_data']['box'].x,
          y: mockData[2]['plot_data']['box'].y,
          type: 'box',
        },
      ],
      r_instance: [
        {
          fill: 'toself',
          hoveron: 'points',
          mode: 'lines',
          name: '1_a_client(v1.0.1)',
          x: mockData[1]['plot_data']['max-min']?.x,
          y: mockData[1]['plot_data']['max-min']?.y,
          type: 'scatter',
          line: mockData[1]['plot_data']['max-min']?.line,
        },
      ],
    })

    expect(problemBestKnown).toEqual({ b_instance: 96772, r_instance: 59030 })

    expect('1_a_client(v1.0.0)_b_instance' in plotOriginData).toBe(true)
    expect('1_a_client(v1.0.1)_r_instance' in plotOriginData).toBe(true)
    expect('2_AClient(v1.0.0)_b_instance' in plotOriginData).toBe(true)
  })
})
