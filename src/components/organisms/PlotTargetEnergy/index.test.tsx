/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { render } from '@testing-library/react'
import { mockPlot } from 'utils/test'
import mockData from 'utils/test/mocks/data/mockReportData.json'

import { PlotTargetEnergy } from '.'

describe('<PlotTargetEnergy />', () => {
  it('Rendered well', async () => {
    const { container } = render(
      <PlotTargetEnergy
        data={mockData}
        instance="r_instance"
        useHistory
        label=""
      />,
    )

    const plot = mockPlot.mock.calls[0][0]
    expect(plot.style).toEqual({ flex: 1, height: '100%' })
    expect(plot.config).toEqual({
      toImageButtonOptions: {
        filename: 'TargetEnergy_r_instance_',
      },
      responsive: true,
    })
    expect(plot.layout).toEqual({
      showlegend: true,
      updatemenus: [
        {
          buttons: [
            {
              args: [
                {},
                {
                  xaxis: {
                    title: 'sampling_time[ms]',
                    type: 'log',
                  },
                },
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
        {
          buttons: [
            {
              args: [
                {
                  visible: [
                    true,
                    true,
                    true,
                    true,
                    true,
                    true,
                    true,
                    true,
                    true,
                    true,
                  ],
                },
              ],
              label: 'Scatter',
              method: 'update',
            },
            {
              args: [
                {
                  visible: [
                    true,
                    true,
                    true,
                    true,
                    true,
                    true,
                    true,
                    true,
                    true,
                    true,
                  ],
                },
              ],
              label: 'Box',
              method: 'update',
            },
          ],
          x: 0.2,
          xanchor: 'left',
          y: 1.2,
          yanchor: 'top',
        },
      ],
      xaxis: {
        autorange: true,
        title: 'sampling_time[ms]',
        type: 'log',
      },
      yaxis: {
        autorange: true,
        title: 'target_energy',
        type: 'linear',
      },
    })
    expect(plot.data).toHaveLength(10)
    expect(plot.data).toMatchObject([
      {
        x: expect.any(Array),
        y: expect.any(Array),
        name: 'a_client(v0.6.4-54-ge56964d-A100)_1',
        type: 'scatter',
        mode: 'lines',
        showlegend: false,
        legendgroup: 'a_client(v0.6.4-54-ge56964d-A100)_1',
        fillcolor: expect.any(String),
        line: { color: expect.any(String) },
      },
      {
        x: expect.any(Array),
        y: expect.any(Array),
        name: 'a_client(v0.6.4-54-ge56964d-A100)_1',
        type: 'scatter',
        mode: 'lines',
        showlegend: false,
        legendgroup: 'a_client(v0.6.4-54-ge56964d-A100)_1',
        fillcolor: expect.any(String),
        line: { color: expect.any(String) },
      },
      {
        x: expect.any(Array),
        y: expect.any(Array),
        name: 'a_client(v0.6.4-54-ge56964d-A100)_1',
        type: 'scatter',
        mode: 'lines',
        showlegend: true,
        legendgroup: 'a_client(v0.6.4-54-ge56964d-A100)_1',
        fillcolor: expect.any(String),
        line: { color: expect.any(String) },
      },
      {
        x: expect.any(Array),
        y: expect.any(Array),
        name: 'a_client(v0.6.4-54-ge56964d-V100)_1',
        type: 'scatter',
        mode: 'lines',
        showlegend: false,
        legendgroup: 'a_client(v0.6.4-54-ge56964d-V100)_1',
        fill: 'toself',
        fillcolor: expect.any(String),
        line: { color: expect.any(String) },
        text: 'max-min',
      },
      {
        x: expect.any(Array),
        y: expect.any(Array),
        name: 'a_client(v0.6.4-54-ge56964d-V100)_1',
        type: 'scatter',
        mode: 'lines',
        showlegend: false,
        legendgroup: 'a_client(v0.6.4-54-ge56964d-V100)_1',
        fill: 'toself',
        fillcolor: expect.any(String),
        line: { color: expect.any(String) },
        text: '75%-25%',
      },
      {
        x: expect.any(Array),
        y: expect.any(Array),
        name: 'a_client(v0.6.4-54-ge56964d-V100)_1',
        type: 'scatter',
        mode: 'lines',
        showlegend: true,
        legendgroup: 'a_client(v0.6.4-54-ge56964d-V100)_1',
        fillcolor: expect.any(String),
        line: { color: expect.any(String) },
      },
      {
        x: expect.any(Array),
        y: expect.any(Array),
        name: 'f_client(9.5.0)_1',
        type: 'scatter',
        mode: 'lines',
        showlegend: false,
        legendgroup: 'f_client(9.5.0)_1',
        fillcolor: expect.any(String),
        line: { color: expect.any(String) },
      },
      {
        x: expect.any(Array),
        y: expect.any(Array),
        name: 'f_client(9.5.0)_1',
        type: 'scatter',
        mode: 'lines',
        showlegend: false,
        legendgroup: 'f_client(9.5.0)_1',
        fillcolor: expect.any(String),
        line: { color: expect.any(String) },
      },
      {
        x: expect.any(Array),
        y: expect.any(Array),
        name: 'f_client(9.5.0)_1',
        type: 'scatter',
        mode: 'lines',
        showlegend: true,
        legendgroup: 'f_client(9.5.0)_1',
        fillcolor: expect.any(String),
        line: { color: expect.any(String) },
      },
      {
        x: expect.any(Array),
        y: expect.any(Array),
        name: 'best known',
        mode: 'lines',
        line: { color: expect.any(String) },
      },
    ])
    expect(container).toMatchSnapshot()
  })

  it('Rendered well when label is changed', async () => {
    render(
      <PlotTargetEnergy
        data={mockData}
        instance="r_instance"
        useHistory
        label="20220927_173640"
      />,
    )

    const plot = mockPlot.mock.calls[0][0]
    expect(plot.style).toEqual({ flex: 1, height: '100%' })
    expect(plot.config).toEqual({
      toImageButtonOptions: {
        filename: 'TargetEnergy_r_instance_20220927_173640',
      },
      responsive: true,
    })
    expect(plot.layout).toEqual({
      showlegend: true,
      updatemenus: [
        {
          buttons: [
            {
              args: [
                {},
                {
                  xaxis: {
                    title: 'sampling_time[ms]',
                    type: 'log',
                  },
                },
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
        {
          buttons: [
            {
              args: [
                {
                  visible: [true],
                },
              ],
              label: 'Scatter',
              method: 'update',
            },
            {
              args: [
                {
                  visible: [true],
                },
              ],
              label: 'Box',
              method: 'update',
            },
          ],
          x: 0.2,
          xanchor: 'left',
          y: 1.2,
          yanchor: 'top',
        },
      ],
      xaxis: {
        autorange: true,
        title: 'sampling_time[ms]',
        type: 'log',
      },
      yaxis: {
        autorange: true,
        title: 'target_energy',
        type: 'linear',
      },
    })
    expect(plot.data).toHaveLength(1)
  })
})
