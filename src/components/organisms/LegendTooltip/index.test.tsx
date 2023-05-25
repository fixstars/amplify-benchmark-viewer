/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { render, screen, waitFor } from '@testing-library/react'
import * as d3 from 'd3'
import Plot from 'react-plotly.js'

import { registerTooltip } from '.'

describe('<LegendTooltip />', () => {
  it('Tooltip is shown well', async () => {
    const tooltipContents = (name: string) => {
      return `Name: ${name}`
    }

    render(
      <Plot
        divId="SampleChart"
        data={[
          {
            x: [1, 2, 3],
            y: [2, 6, 3],
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: 'red' },
          },
          { type: 'bar', x: [1, 2, 3], y: [2, 5, 3] },
        ]}
        layout={{ width: 320, height: 240, title: 'A Fancy Plot' }}
        onInitialized={() =>
          registerTooltip({ divId: 'SampleChart', tooltipContents })
        }
        onUpdate={() =>
          registerTooltip({ divId: 'SampleChart', tooltipContents })
        }
      />,
    )

    expect(screen.queryByText('Name: trace 0')).not.toBeInTheDocument()
    await screen.findByText('trace 0')

    await new Promise((r) => setTimeout(r))

    const element = document.getElementById('SampleChart')
    const widget = d3.select(element)
    const legendLayer = widget.selectAll('g.legend')
    const items = legendLayer.selectAll('g.traces')
    const label = items.filter(function (d, i) {
      return i === 0
    })
    label.dispatch('mouseover')

    await waitFor(() =>
      expect(screen.queryByText('Name: trace 0')).toBeInTheDocument(),
    )
  })
})
