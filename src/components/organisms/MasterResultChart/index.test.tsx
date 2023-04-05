/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { render, screen } from '@testing-library/react'
import type { MasterData } from '@types'
import { mockPlot } from 'utils/test'
import mockData from 'utils/test/mocks/data/mockMasterData.json'

import { MasterResultChart } from '.'

describe('<MasterResultChart />', () => {
  it('Rendered well', async () => {
    const { container } = render(
      <MasterResultChart
        problemInstance="b_instance"
        data={mockData as ReadonlyArray<MasterData>}
        clientChartType={{
          a_client: 'max-min',
          AClient: 'box',
        }}
      />,
    )

    const plot = mockPlot.mock.calls[0][0]
    expect(plot.style).toEqual({ flex: 1, height: '100%' })
    expect(plot.config).toEqual({
      responsive: true,
      toImageButtonOptions: {
        filename: 'Tsp_b_instance',
      },
    })
    expect(plot.data).toEqual([
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
    ])
    expect(plot.onInitialized.name).toBe('registerTooltip')
    expect(plot.onUpdate.name).toBe('registerTooltip')

    const legendTooltip = screen.getByTestId('legendTooltip')
    expect(legendTooltip).toHaveStyle('opacity: 0')

    expect(container).toMatchSnapshot()
  })
})
