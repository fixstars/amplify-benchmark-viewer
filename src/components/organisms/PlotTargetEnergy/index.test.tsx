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
                  visible: [true, true, true, true, true, true],
                },
              ],
              label: 'Scatter',
              method: 'update',
            },
            {
              args: [
                {
                  visible: [true, true, true, true, true, true],
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
    expect(plot.data).toHaveLength(7)
    expect(plot.data).toMatchObject([
      {
        fill: 'toself',
        fillcolor: '#1f77b455',
        legendgroup: '1_a_client(v0.6.4-54-ge56964d-V100)',
        mode: 'lines',
        name: '1_a_client(v0.6.4-54-ge56964d-V100)',
        showlegend: false,
        text: 'max-min',
        type: 'scatter',
      },
      {
        fill: 'toself',
        fillcolor: '#1f77b466',
        legendgroup: '1_a_client(v0.6.4-54-ge56964d-V100)',
        mode: 'lines',
        name: '1_a_client(v0.6.4-54-ge56964d-V100)',
        showlegend: false,
        text: '75%-25%',
        type: 'scatter',
      },
      {
        fillcolor: '#1f77b4ff',
        legendgroup: '1_a_client(v0.6.4-54-ge56964d-V100)',
        mode: 'lines',
        name: '1_a_client(v0.6.4-54-ge56964d-V100)',
        showlegend: true,
        type: 'scatter',
      },
      {
        fill: 'toself',
        fillcolor: '#ff7f0e55',
        legendgroup: '2_a_client(v0.6.4-54-ge56964d-A100)',
        mode: 'lines',
        name: '2_a_client(v0.6.4-54-ge56964d-A100)',
        showlegend: false,
        text: 'max-min',
        type: 'scatter',
      },
      {
        fill: 'toself',
        fillcolor: '#ff7f0e66',
        legendgroup: '2_a_client(v0.6.4-54-ge56964d-A100)',
        mode: 'lines',
        name: '2_a_client(v0.6.4-54-ge56964d-A100)',
        showlegend: false,
        text: '75%-25%',
        type: 'scatter',
      },
      {
        fillcolor: '#ff7f0eff',
        legendgroup: '2_a_client(v0.6.4-54-ge56964d-A100)',
        mode: 'lines',
        name: '2_a_client(v0.6.4-54-ge56964d-A100)',
        showlegend: true,
        type: 'scatter',
      },
      {
        line: {
          color: 'black',
          dash: 'dot',
          width: 4,
        },
        mode: 'lines',
        name: 'best known',
        showlegend: false,
        x: [265.358596, 1000000],
        y: [59030, 59030],
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
                  visible: [],
                },
              ],
              label: 'Scatter',
              method: 'update',
            },
            {
              args: [
                {
                  visible: [],
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
