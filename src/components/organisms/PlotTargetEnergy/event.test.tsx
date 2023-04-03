import { render, screen, fireEvent } from '@testing-library/react'
import mockData from 'utils/test/mocks/data/mockReportData.json'

import { PlotTargetEnergy } from '.'

describe('<PlotTargetEnergy /> event test', () => {
  it('Show tooltip well', async () => {
    render(
      <PlotTargetEnergy
        data={mockData}
        instance="pr124"
        useHistory
        xtype="log"
        ytype="log"
        label=""
      />,
    )

    await screen.findByText('1_FixstarsClient(v0.6.4-54-ge56964d-V100)')
    await new Promise((r) => setTimeout(r))

    expect(
      screen.queryByText('1_FixstarsClient(v0.6.4-54-ge56964d-V100)'),
    ).toBeInTheDocument()
    expect(
      screen.queryByText('2_FixstarsClient(v0.6.4-54-ge56964d-A100)'),
    ).toBeInTheDocument()

    // Hover legend to show tooltip
    expect(screen.queryByText('Client parameters')).not.toBeInTheDocument()
    fireEvent.mouseOver(
      screen.getByText('2_FixstarsClient(v0.6.4-54-ge56964d-A100)'),
    )

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
