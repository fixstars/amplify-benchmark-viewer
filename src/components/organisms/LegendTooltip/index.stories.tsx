import Plot from 'react-plotly.js'

import { registerTooltip } from '.'

export default {
  title: 'Organisms/LegendTooltip',
}

const Template = () => {
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

export const Default = Template.bind({})
