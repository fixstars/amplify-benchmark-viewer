import { styled } from '@mui/material'
import type { ClientParameters, MasterData, ProblemParameters } from '@types'
import * as d3 from 'd3'
import Plot from 'react-plotly.js'

import { getLayout, getPlotData } from './helpers'

const LegendTooltip = styled('div')`
  position: absolute;
  text-align: left;
  padding: 8px 16px;
  font-size: 10px;
  background-color: #111;
  color: #f4f1f4;
  border: 0px;
  border-radius: 4px;
  pointer-events: none;
  z-index: 9999;
`

interface Props {
  readonly problemInstance: string
  readonly data: ReadonlyArray<MasterData>
  readonly clientChartType: {
    readonly [key: string]: string
  }
}

export const MasterResultChart = ({
  problemInstance,
  data,
  clientChartType,
}: Props) => {
  const { plotData, plotOriginData, problemBestKnown } = getPlotData({
    data,
    clientChartType,
  })
  const problemClass = data[0].problem_class

  const registerTooltip = () => {
    const element = document.getElementById('MasterResultChart')
    const widget = d3.select(element)
    const legendLayer = widget.selectAll('g.legend')
    const items = legendLayer.selectAll('g.traces')
    const tooltipDiv = d3.select('#legendTooltip')
    legendLayer.selectAll('.tooltip').remove()

    type Item = {
      readonly trace: {
        readonly name: string
      }
    }
    items.on('mouseover', (event, i) => {
      const name = `${(i as Item[])[0].trace.name}_${problemInstance}`
      let result = name

      if (plotOriginData[name].client_parameters != null) {
        result += '<br /><br /><span>client_parameters</span>'
        for (const [key, value] of Object.entries(
          plotOriginData[name].client_parameters as ClientParameters,
        )) {
          result += `<br /><span>- ${key}: </span><span>${value}</span>`
        }
      }

      if (plotOriginData[name].problem_parameters != null) {
        result += '<br /><br /><span>problem_parameters</span>'
        for (const [key, value] of Object.entries(
          plotOriginData[name].problem_parameters as ProblemParameters,
        )) {
          result += `<br /><span>- ${key}: </span><span>${value}</span>`
        }
      }

      tooltipDiv.transition().duration(200).style('opacity', 0.9)
      tooltipDiv
        .html(result)
        .style('left', `${event.pageX - 45}px`)
        .style('top', `${event.pageY + 14}px`)
    })

    items.on('mouseout', () => {
      tooltipDiv.transition().duration(500).style('opacity', 0)
    })
  }

  return (
    <>
      <Plot
        divId="MasterResultChart"
        style={{ flex: 1, height: '100%' }}
        config={{
          responsive: true,
          toImageButtonOptions: {
            filename: `${problemClass}_${problemInstance}`,
          },
        }}
        data={plotData[problemInstance]}
        layout={getLayout(problemBestKnown[problemInstance])}
        onInitialized={registerTooltip}
        onUpdate={registerTooltip}
      />
      <LegendTooltip
        id="legendTooltip"
        data-testid="legendTooltip"
        style={{ opacity: 0 }}
      ></LegendTooltip>
    </>
  )
}
