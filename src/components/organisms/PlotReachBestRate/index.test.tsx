/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { render } from '@testing-library/react'
import { mockPlot } from 'utils/test'
import mockData from 'utils/test/mocks/data/mockReportData.json'

import { PlotReachBestRate } from '.'

describe('<PlotReachBestRate />', () => {
  it('Rendered well', async () => {
    const { container } = render(
      <PlotReachBestRate
        data={mockData}
        instance="r_instance"
        useHistory
        xtype="log"
        label=""
      />,
    )

    const plot = mockPlot.mock.calls[0][0]
    expect(plot.style).toEqual({ flex: 1, height: '100%' })
    expect(plot.config).toEqual({
      toImageButtonOptions: {
        filename: 'ReachBestRate_r_instance_',
      },
      responsive: true,
    })
    expect(plot.layout).toEqual({
      xaxis: {
        title: 'sampling_time[ms]',
        type: 'log',
        autorange: true,
      },
      yaxis: {
        title: 'reach best rate',
        autorange: true,
      },
      showlegend: true,
    })
    expect(plot.data).toHaveLength(3)
    expect(plot.data).toMatchObject([
      {
        mode: 'lines+markers',
        name: '1_a_client(v0.6.4-54-ge56964d-V100)',
        text: [],
        type: 'scatter',
        x: expect.any(Array),
        y: expect.any(Array),
      },
      {
        mode: 'lines+markers',
        name: '2_a_client(v0.6.4-54-ge56964d-A100)',
        text: [],
        type: 'scatter',
        x: expect.any(Array),
        y: expect.any(Array),
      },
      {
        mode: 'lines+markers',
        name: '3_f_client(9.5.0)',
        text: [],
        type: 'scatter',
        x: expect.any(Array),
        y: expect.any(Array),
      },
    ])
    expect(container).toMatchSnapshot()
  })

  it('Rendered well when label is changed', async () => {
    render(
      <PlotReachBestRate
        data={mockData}
        instance="r_instance"
        useHistory
        xtype="log"
        label="20220927_173640"
      />,
    )

    const plot = mockPlot.mock.calls[0][0]
    expect(plot.style).toEqual({ flex: 1, height: '100%' })
    expect(plot.config).toEqual({
      toImageButtonOptions: {
        filename: 'ReachBestRate_r_instance_20220927_173640',
      },
      responsive: true,
    })
    expect(plot.layout).toEqual({
      xaxis: {
        title: 'sampling_time[ms]',
        type: 'log',
        autorange: true,
      },
      yaxis: {
        title: 'reach best rate',
        autorange: true,
      },
      showlegend: true,
    })
    expect(plot.data).toHaveLength(0)
  })
})
