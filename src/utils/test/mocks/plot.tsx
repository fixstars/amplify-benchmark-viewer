const mockPlot = jest.fn()

jest.mock('react-plotly.js', () => {
  const ReactPlotly = jest.requireActual('react-plotly.js')

  const Plotly = (props: typeof ReactPlotly) => {
    mockPlot(props)
    return <div />
  }

  return Plotly
})

export { mockPlot }
