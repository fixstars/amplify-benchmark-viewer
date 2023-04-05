import { render } from '@testing-library/react'
import { mockPlot } from 'utils/test'
import mockData from 'utils/test/mocks/data/mockReportData.json'

import { PlotTargetEnergy } from '.'

describe('<PlotTargetEnergy />', () => {
  it('Rendered well', async () => {
    const { container } = render(
      <PlotTargetEnergy
        data={mockData}
        instance="pr124"
        useHistory
        xtype="log"
        ytype="log"
        label=""
      />,
    )

    const plot = mockPlot.mock.calls[0][0]
    expect(plot.style).toEqual({ flex: 1, height: '100%' })
    expect(plot.config).toEqual({
      toImageButtonOptions: {
        filename: 'TargetEnergy_pr124_',
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
        title: 'target_energy',
        type: 'log',
        autorange: true,
      },
      showlegend: true,
    })
    expect(plot.data).toHaveLength(6)
    expect(plot.data).toMatchObject([
      {
        fill: 'toself',
        fillcolor: '#1f77b455',
        legendgroup: '1_FixstarsClient(v0.6.4-54-ge56964d-V100)',
        mode: 'lines',
        name: '1_FixstarsClient(v0.6.4-54-ge56964d-V100)',
        showlegend: false,
        text: 'max-min',
        type: 'scatter',
      },
      {
        fill: 'toself',
        fillcolor: '#1f77b466',
        legendgroup: '1_FixstarsClient(v0.6.4-54-ge56964d-V100)',
        mode: 'lines',
        name: '1_FixstarsClient(v0.6.4-54-ge56964d-V100)',
        showlegend: false,
        text: '75%-25%',
        type: 'scatter',
      },
      {
        fillcolor: '#1f77b4ff',
        legendgroup: '1_FixstarsClient(v0.6.4-54-ge56964d-V100)',
        mode: 'lines',
        name: '1_FixstarsClient(v0.6.4-54-ge56964d-V100)',
        showlegend: true,
        type: 'scatter',
      },
      {
        fill: 'toself',
        fillcolor: '#ff7f0e55',
        legendgroup: '2_FixstarsClient(v0.6.4-54-ge56964d-A100)',
        mode: 'lines',
        name: '2_FixstarsClient(v0.6.4-54-ge56964d-A100)',
        showlegend: false,
        text: 'max-min',
        type: 'scatter',
      },
      {
        fill: 'toself',
        fillcolor: '#ff7f0e66',
        legendgroup: '2_FixstarsClient(v0.6.4-54-ge56964d-A100)',
        mode: 'lines',
        name: '2_FixstarsClient(v0.6.4-54-ge56964d-A100)',
        showlegend: false,
        text: '75%-25%',
        type: 'scatter',
      },
      {
        fillcolor: '#ff7f0eff',
        legendgroup: '2_FixstarsClient(v0.6.4-54-ge56964d-A100)',
        mode: 'lines',
        name: '2_FixstarsClient(v0.6.4-54-ge56964d-A100)',
        showlegend: true,
        type: 'scatter',
      },
    ])
    expect(container).toMatchSnapshot()
  })

  it('Rendered well when label is changed', async () => {
    render(
      <PlotTargetEnergy
        data={mockData}
        instance="pr124"
        useHistory
        xtype="log"
        ytype="log"
        label="20220927_173640"
      />,
    )

    const plot = mockPlot.mock.calls[0][0]
    expect(plot.style).toEqual({ flex: 1, height: '100%' })
    expect(plot.config).toEqual({
      toImageButtonOptions: {
        filename: 'TargetEnergy_pr124_20220927_173640',
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
        title: 'target_energy',
        type: 'log',
        autorange: true,
      },
      showlegend: true,
    })
    expect(plot.data).toHaveLength(0)
  })
})
