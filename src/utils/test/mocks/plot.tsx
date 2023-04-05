/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
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
