import type { ReactElement } from 'react'

import { Tooltip } from '@mui/material'
import type { GridColumns } from '@mui/x-data-grid'
import { Link } from 'react-router-dom'

export interface Parameter {
  readonly [key: string]: unknown
}

export interface ProblemData {
  readonly client: string
  readonly version: string
  readonly clientParameters: Parameter
  readonly problemParameters: Parameter
  readonly label: string
  readonly '0%': number | null
  readonly '1%': number | null
  readonly '5%': number | null
  readonly '10%': number | null
  readonly '20%': number | null
  readonly '50%': number | null
}

const renderTooltip = (
  { clientParameters, problemParameters, client, version }: ProblemData,
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

const renderTTSCell = (value: number | null) => {
  return value == null ? '-' : value.toString()
}

const columns: GridColumns<ProblemData> = [
  {
    field: 'client',
    headerName: 'Client',
    sortable: false,
    minWidth: 140,
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
    field: '0%',
    headerName: 'TTS(0%)',
    sortable: false,
    flex: 1,
    minWidth: 140,
    renderCell: ({ row }) => renderTooltip(row, renderTTSCell(row['0%'])),
  },
  {
    field: '1%',
    headerName: 'TTS(1%)',
    sortable: false,
    flex: 1,
    minWidth: 140,
    renderCell: ({ row }) => renderTooltip(row, renderTTSCell(row['1%'])),
  },
  {
    field: '5%',
    headerName: 'TTS(5%)',
    sortable: false,
    flex: 1,
    minWidth: 140,
    renderCell: ({ row }) => renderTooltip(row, renderTTSCell(row['5%'])),
  },
  {
    field: '10%',
    headerName: 'TTS(10%)',
    sortable: false,
    flex: 1,
    minWidth: 140,
    renderCell: ({ row }) => renderTooltip(row, renderTTSCell(row['10%'])),
  },
  {
    field: '20%',
    headerName: 'TTS(20%)',
    sortable: false,
    flex: 1,
    minWidth: 140,
    renderCell: ({ row }) => renderTooltip(row, renderTTSCell(row['20%'])),
  },
  {
    field: '50%',
    headerName: 'TTS(50%)',
    sortable: false,
    flex: 1,
    minWidth: 140,
    renderCell: ({ row }) => renderTooltip(row, renderTTSCell(row['50%'])),
  },
]

export { columns }
