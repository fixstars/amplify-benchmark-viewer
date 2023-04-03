import * as d3 from 'd3'

interface RegisterTooltip {
  readonly divId: string
  readonly tooltipContents: (name: string) => string
}

export const registerTooltip = ({
  divId,
  tooltipContents,
}: RegisterTooltip) => {
  const element = document.getElementById(divId)

  const tooltip = document.getElementById('legendTooltip')
  if (tooltip === null) {
    const newTooltip = document.createElement('div')
    newTooltip.id = 'legendTooltip'
    newTooltip.style.position = 'absolute'
    newTooltip.style.textAlign = 'left'
    newTooltip.style.padding = '8px 16px'
    newTooltip.style.fontSize = '10px'
    newTooltip.style.backgroundColor = '#111'
    newTooltip.style.color = '#f4f1f4'
    newTooltip.style.border = '0px'
    newTooltip.style.borderRadius = '4px'
    newTooltip.style.pointerEvents = 'none'
    newTooltip.style.zIndex = '99999'
    newTooltip.style.opacity = '0'

    element?.parentNode?.insertBefore(newTooltip, element.nextSibling)
  }

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
    const name = `${(i as Item[])[0].trace.name}`
    const result = tooltipContents(name)
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
