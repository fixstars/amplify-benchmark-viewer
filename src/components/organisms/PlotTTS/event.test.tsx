/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { render, screen, fireEvent } from '@testing-library/react'
import mockData from 'utils/test/mocks/data/mockReportData.json'

import { PlotTTS } from '.'

describe('<PlotTTS /> event test', () => {
  it('Change TTS percentage well', async () => {
    render(
      <PlotTTS
        data={mockData}
        instance="r_instance"
        useHistory
        xtype="log"
        ytype="log"
        label=""
      />,
    )

    expect(
      screen.queryByText('1_a_client(v0.6.4-54-ge56964d-V100)'),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByText('2_a_client(v0.6.4-54-ge56964d-A100)'),
    ).not.toBeInTheDocument()

    await screen.findByText('0%')
    expect(screen.queryByText('0%')).toBeInTheDocument()
    expect(screen.queryByText('5%')).not.toBeInTheDocument()
    expect(screen.queryByText('10%')).not.toBeInTheDocument()
    expect(screen.queryByText('20%')).not.toBeInTheDocument()
    expect(screen.queryByText('50%')).not.toBeInTheDocument()

    // Show dropdown of TTS
    fireEvent.click(screen.getByText('0%'))
    expect(screen.queryAllByText('0%').length).toBe(2)
    expect(screen.queryByText('5%')).toBeInTheDocument()
    expect(screen.queryByText('10%')).toBeInTheDocument()
    expect(screen.queryByText('20%')).toBeInTheDocument()
    expect(screen.queryByText('50%')).toBeInTheDocument()

    // Change TTS
    fireEvent.click(screen.getByText('5%'))
    await screen.findByText('5%')
    expect(screen.queryByText('0%')).not.toBeInTheDocument()
    expect(screen.queryByText('5%')).toBeInTheDocument()
    expect(screen.queryByText('10%')).not.toBeInTheDocument()
    expect(screen.queryByText('20%')).not.toBeInTheDocument()
    expect(screen.queryByText('50%')).not.toBeInTheDocument()

    expect(
      screen.queryByText('1_a_client(v0.6.4-54-ge56964d-V100)'),
    ).toBeInTheDocument()
    expect(
      screen.queryByText('2_a_client(v0.6.4-54-ge56964d-A100)'),
    ).toBeInTheDocument()
  })

  it('Show tooltip well', async () => {
    render(
      <PlotTTS
        data={mockData}
        instance="r_instance"
        useHistory
        xtype="log"
        ytype="log"
        label=""
      />,
    )

    expect(
      screen.queryByText('1_a_client(v0.6.4-54-ge56964d-V100)'),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByText('2_a_client(v0.6.4-54-ge56964d-A100)'),
    ).not.toBeInTheDocument()

    await screen.findByText('0%')
    // Show dropdown of TTS
    fireEvent.click(screen.getByText('0%'))
    // Change TTS
    fireEvent.click(screen.getByText('5%'))
    await screen.findByText('5%')

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
