/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { Meta, StoryObj } from '@storybook/react'
import Plot from 'react-plotly.js'

import { registerTooltip } from '.'

const TestComponent = () => {
  const tooltipContents = (name: string) => {
    return `Name: ${name}`
  }

  return (
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
    />
  )
}

const meta: Meta = {
  title: 'Organisms/LegendTooltip',
  component: TestComponent,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
