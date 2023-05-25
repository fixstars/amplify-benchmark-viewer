/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { render, screen, fireEvent } from '@testing-library/react'
import mockData from 'utils/test/mocks/data/mockReportData.json'

import { PlotReachBestRate } from '.'

describe('<PlotReachBestRate /> event test', () => {
  it('Show tooltip well', async () => {
    render(
      <PlotReachBestRate
        data={mockData}
        instance="r_instance"
        useHistory={false}
        xtype="log"
        label=""
      />,
    )

    await screen.findByText('1_a_client(v0.6.4-54-ge56964d-V100)')
    await new Promise((r) => setTimeout(r))

    expect(
      screen.queryByText('1_a_client(v0.6.4-54-ge56964d-V100)'),
    ).toBeInTheDocument()
    expect(
      screen.queryByText('2_a_client(v0.6.4-54-ge56964d-A100)'),
    ).toBeInTheDocument()

    // Hover legend to show tooltip
    expect(screen.queryByText('Client parameters')).not.toBeInTheDocument()
    fireEvent.mouseOver(screen.getByText('2_a_client(v0.6.4-54-ge56964d-A100)'))

    await screen.findByText('Client parameters')
    expect(screen.queryByText('Client parameters')).toBeInTheDocument()
    expect(
      screen.queryByText('- outputs.feasibilities: true'),
    ).toBeInTheDocument()

    expect(screen.queryByText('Problem parameters')).toBeInTheDocument()
    expect(screen.queryByText('- num_vars:')).toBeInTheDocument()
    expect(screen.queryByText('- input: 15376')).toBeInTheDocument()
    expect(screen.queryByText('- logical: 15376')).toBeInTheDocument()
    expect(screen.queryByText('- physical: 15376')).toBeInTheDocument()
    expect(screen.queryByText('- constraint_weight: 1')).toBeInTheDocument()
    expect(screen.queryByText('- seed: null')).toBeInTheDocument()
  })
})
