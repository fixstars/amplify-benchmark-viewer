/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { ReactElement } from 'react'

import { Tooltip } from '@mui/material'
import type { GridColumns } from '@mui/x-data-grid'
import { Link } from 'react-router-dom'

export interface Parameter {
  readonly [key: string]: unknown
}

export interface ProblemData {
  readonly benchmark_id: string
  readonly client: string
  readonly version: string
  readonly clientParameters: Parameter
  readonly clientSettings: Parameter
  readonly problemParameters: Parameter
  readonly label: string
  readonly num_samples: number
  readonly specified_time: number
  readonly 'target_energy(min)': number | null
  readonly 'target_energy(25%)': number | null
  readonly 'target_energy(50%)': number | null
  readonly 'target_energy(75%)': number | null
  readonly 'target_energy(max)': number | null
  readonly 'TTS(0%)': number | null
  readonly 'TTS(1%)': number | null
  readonly 'TTS(5%)': number | null
  readonly 'TTS(10%)': number | null
  readonly 'TTS(20%)': number | null
  readonly 'TTS(50%)': number | null
  readonly reach_best_rate: number
  readonly feasible_rate: number
}

const renderTooltip = (
  {
    clientParameters,
    clientSettings,
    problemParameters,
    client,
    version,
  }: ProblemData,
  field: ReactElement | string,
) => {
  return (
    <Tooltip
      title={
        <>
          <span>Client parameters</span>
          <br />
          {Object.entries(clientParameters).map(
            ([parameterName, parameterValue]) =>
              typeof parameterValue === 'object' && parameterValue != null ? (
                <div key={`${client}_${version}_${parameterName}`}>
                  <div>- {parameterName}</div>
                  {Object.entries(parameterValue).map(([key, value]) => (
                    <div
                      key={`${parameterName}_${key}`}
                      style={{ paddingLeft: 10 }}
                    >
                      - {`${key}: ${value?.toString()}`}
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  key={`${client}_${version}_${parameterName}_${parameterValue}`}
                >
                  - {parameterName}: {parameterValue?.toString()}
                </div>
              ),
          )}
          <br />
          <span>Client settings</span>
          <br />
          {Object.entries(clientSettings).map(
            ([parameterName, parameterValue]) =>
              typeof parameterValue === 'object' && parameterValue != null ? (
                <div key={`${client}_${version}_${parameterName}`}>
                  <div>- {parameterName}</div>
                  {Object.entries(parameterValue).map(([key, value]) => (
                    <div
                      key={`${parameterName}_${key}`}
                      style={{ paddingLeft: 10 }}
                    >
                      - {`${key}: ${value?.toString()}`}
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  key={`${client}_${version}_${parameterName}_${parameterValue}`}
                >
                  - {parameterName}: {parameterValue?.toString()}
                </div>
              ),
          )}
          <br />
          <span>Problem parameters</span>
          <br />
          {Object.entries(problemParameters).map(
            ([parameterName, parameterValue]) =>
              typeof parameterValue === 'object' && parameterValue != null ? (
                <div key={`${client}_${version}_${parameterName}`}>
                  <div>- {parameterName}</div>
                  {Object.entries(parameterValue).map(([key, value]) => (
                    <div
                      key={`${parameterName}_${key}`}
                      style={{ paddingLeft: 10 }}
                    >
                      - {`${key}: ${value?.toString()}`}
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  key={`${client}_${version}_${parameterName}_${parameterValue}`}
                >
                  - {parameterName}: {parameterValue?.toString()}
                </div>
              ),
          )}
        </>
      }
    >
      <span>{field}</span>
    </Tooltip>
  )
}

const renderClientCell = (row: ProblemData) => {
  return <Link to={`/clients/${row.client}`}>{row.client}</Link>
}

const renderOptionalNumberCell = (value: number | null) => {
  return value == null ? '-' : value.toString()
}

const columns: GridColumns<ProblemData> = [
  {
    field: 'client',
    headerName: 'Client',
    sortable: false,
    minWidth: 180,
    renderCell: ({ row }) => renderTooltip(row, renderClientCell(row)),
  },
  {
    field: 'version',
    headerName: 'Version',
    sortable: false,
    minWidth: 220,
    renderCell: ({ row }) => renderTooltip(row, row.version),
  },
  {
    field: 'label',
    headerName: 'Label',
    sortable: false,
    minWidth: 220,
    renderCell: ({ row }) => renderTooltip(row, row.label),
  },
  {
    field: 'specified_time',
    headerName: 'SpecifiedTime',
    sortable: true,
    minWidth: 220,
    renderCell: ({ row }) => renderTooltip(row, row.specified_time.toString()),
  },
  {
    field: 'num_samples',
    headerName: 'NumSamples',
    sortable: false,
    minWidth: 220,
    renderCell: ({ row }) => renderTooltip(row, row.num_samples.toString()),
  },
  {
    field: 'feasible_rate',
    headerName: 'FeasibleRate',
    sortable: true,
    minWidth: 220,
    renderCell: ({ row }) => renderTooltip(row, row.feasible_rate.toString()),
  },
  {
    field: 'reach_best_rate',
    headerName: 'ReachBestRate',
    sortable: true,
    minWidth: 220,
    renderCell: ({ row }) => renderTooltip(row, row.reach_best_rate.toString()),
  },
  {
    field: 'target_energy(min)',
    headerName: 'TargetEnergy(min)',
    sortable: true,
    minWidth: 220,
    renderCell: ({ row }) =>
      renderTooltip(row, renderOptionalNumberCell(row['target_energy(min)'])),
  },
  {
    field: 'target_energy(25%)',
    headerName: 'TargetEnergy(25%)',
    sortable: true,
    minWidth: 220,
    renderCell: ({ row }) =>
      renderTooltip(row, renderOptionalNumberCell(row['target_energy(25%)'])),
  },
  {
    field: 'target_energy(50%)',
    headerName: 'TargetEnergy(50%)',
    sortable: true,
    minWidth: 220,
    renderCell: ({ row }) =>
      renderTooltip(row, renderOptionalNumberCell(row['target_energy(50%)'])),
  },
  {
    field: 'target_energy(75%)',
    headerName: 'TargetEnergy(75%)',
    sortable: true,
    minWidth: 220,
    renderCell: ({ row }) =>
      renderTooltip(row, renderOptionalNumberCell(row['target_energy(75%)'])),
  },
  {
    field: 'target_energy(max)',
    headerName: 'TargetEnergy(max)',
    sortable: true,
    minWidth: 220,
    renderCell: ({ row }) =>
      renderTooltip(row, renderOptionalNumberCell(row['target_energy(max)'])),
  },
  {
    field: 'TTS(0%)',
    headerName: 'TTS(0%)',
    sortable: true,
    flex: 1,
    minWidth: 140,
    renderCell: ({ row }) =>
      renderTooltip(row, renderOptionalNumberCell(row['TTS(0%)'])),
  },
  {
    field: 'TTS(1%)',
    headerName: 'TTS(1%)',
    sortable: true,
    flex: 1,
    minWidth: 140,
    renderCell: ({ row }) =>
      renderTooltip(row, renderOptionalNumberCell(row['TTS(1%)'])),
  },
  {
    field: 'TTS(5%)',
    headerName: 'TTS(5%)',
    sortable: true,
    flex: 1,
    minWidth: 140,
    renderCell: ({ row }) =>
      renderTooltip(row, renderOptionalNumberCell(row['TTS(5%)'])),
  },
  {
    field: 'TTS(10%)',
    headerName: 'TTS(10%)',
    sortable: true,
    flex: 1,
    minWidth: 140,
    renderCell: ({ row }) =>
      renderTooltip(row, renderOptionalNumberCell(row['TTS(10%)'])),
  },
  {
    field: 'TTS(20%)',
    headerName: 'TTS(20%)',
    sortable: true,
    flex: 1,
    minWidth: 140,
    renderCell: ({ row }) =>
      renderTooltip(row, renderOptionalNumberCell(row['TTS(20%)'])),
  },
  {
    field: 'TTS(50%)',
    headerName: 'TTS(50%)',
    sortable: true,
    flex: 1,
    minWidth: 140,
    renderCell: ({ row }) =>
      renderTooltip(row, renderOptionalNumberCell(row['TTS(50%)'])),
  },
]

export { columns }
