/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { render } from '@testing-library/react'
import { mockPlot } from 'utils/test'
import mockData from 'utils/test/mocks/data/mockReportData.json'

import { PlotTTS } from '.'

describe('<PlotTTS />', () => {
  it('Rendered well', async () => {
    const { container } = render(
      <PlotTTS
        data={mockData}
        instance="r_instance"
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
        filename: 'TTS_r_instance_',
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
        title: 'TTS[ms]',
        type: 'log',
        autorange: true,
      },
      showlegend: true,
      updatemenus: [
        {
          buttons: [
            {
              args: ['visible', expect.any(Array)],
              label: '0%',
              method: 'restyle',
            },
            {
              args: ['visible', expect.any(Array)],
              label: '1%',
              method: 'restyle',
            },
            {
              args: ['visible', expect.any(Array)],
              label: '5%',
              method: 'restyle',
            },
            {
              args: ['visible', expect.any(Array)],
              label: '10%',
              method: 'restyle',
            },
            {
              args: ['visible', expect.any(Array)],
              label: '20%',
              method: 'restyle',
            },
            {
              args: ['visible', expect.any(Array)],
              label: '50%',
              method: 'restyle',
            },
          ],
          x: 0.1,
          xanchor: 'top',
          y: 1.2,
          yanchor: 'top',
        },
      ],
    })
    expect(plot.data).toHaveLength(18)
    expect(container).toMatchSnapshot()
  })

  it('Rendered well when label is changed', async () => {
    render(
      <PlotTTS
        data={mockData}
        instance="r_instance"
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
        filename: 'TTS_r_instance_20220927_173640',
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
        title: 'TTS[ms]',
        type: 'log',
        autorange: true,
      },
      showlegend: true,
      updatemenus: [
        {
          buttons: [
            {
              args: [
                'visible',
                [
                  true,
                  true,
                  true,
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                ],
              ],
              label: '0%',
              method: 'restyle',
            },
            {
              args: [
                'visible',
                [
                  false,
                  false,
                  false,
                  true,
                  true,
                  true,
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                ],
              ],
              label: '1%',
              method: 'restyle',
            },
            {
              args: [
                'visible',
                [
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                  true,
                  true,
                  true,
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                ],
              ],
              label: '5%',
              method: 'restyle',
            },
            {
              args: [
                'visible',
                [
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                  true,
                  true,
                  true,
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                ],
              ],
              label: '10%',
              method: 'restyle',
            },
            {
              args: [
                'visible',
                [
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                  true,
                  true,
                  true,
                  false,
                  false,
                  false,
                ],
              ],
              label: '20%',
              method: 'restyle',
            },
            {
              args: [
                'visible',
                [
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                  true,
                  true,
                  true,
                ],
              ],
              label: '50%',
              method: 'restyle',
            },
          ],
          x: 0.1,
          xanchor: 'top',
          y: 1.2,
          yanchor: 'top',
        },
      ],
    })
    expect(plot.data).toHaveLength(0)
  })
})
