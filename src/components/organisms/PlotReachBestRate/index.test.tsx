import { render } from '@testing-library/react'
import { mockPlot } from 'utils/test'
import mockData from 'utils/test/mocks/data/mockReportData.json'

import { PlotReachBestRate } from '.'

describe('<PlotReachBestRate />', () => {
  it('Rendered well', async () => {
    const { container } = render(
      <PlotReachBestRate
        data={mockData}
        instance="pr124"
        useHistory
        xtype="log"
        label=""
      />,
    )

    const plot = mockPlot.mock.calls[0][0]
    expect(plot.style).toEqual({ flex: 1, height: '100%' })
    expect(plot.config).toEqual({
      toImageButtonOptions: {
        filename: 'ReachBestRate_pr124_',
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
    expect(plot.data).toHaveLength(2)
    expect(plot.data).toMatchObject([
      {
        mode: 'lines+markers',
        name: '1_FixstarsClient(v0.6.4-54-ge56964d-V100)',
        type: 'scatter',
      },
      {
        mode: 'lines+markers',
        name: '2_FixstarsClient(v0.6.4-54-ge56964d-A100)',
        type: 'scatter',
      },
    ])
    expect(container).toMatchSnapshot()
  })

  it('Rendered well when label is changed', async () => {
    render(
      <PlotReachBestRate
        data={mockData}
        instance="pr124"
        useHistory
        xtype="log"
        label="20220927_173640"
      />,
    )

    const plot = mockPlot.mock.calls[0][0]
    expect(plot.style).toEqual({ flex: 1, height: '100%' })
    expect(plot.config).toEqual({
      toImageButtonOptions: {
        filename: 'ReachBestRate_pr124_20220927_173640',
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
