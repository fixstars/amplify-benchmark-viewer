import type { GridColumns } from '@mui/x-data-grid'
import { Link } from 'react-router-dom'

export interface ClientParameter {
  readonly [key: string]:
    | string
    | boolean
    | number
    | ClientParameter
    | undefined
}

export interface ClientData {
  readonly class: string
  readonly instance: string
  readonly problemParameters: ClientParameter
  readonly version: string
  readonly '0%': number | null
  readonly '1%': number | null
  readonly '5%': number | null
  readonly '10%': number | null
  readonly '20%': number | null
  readonly '50%': number | null
}

const renderInstanceCell = (row: ClientData) => {
  return (
    <Link to={`/classes/${row.class}/instances/${row.instance}`}>
      {row.instance}
    </Link>
  )
}

const renderProblemParametersCell = ({
  problemParameters,
  ...client
}: ClientData) => {
  return Object.entries(problemParameters).map(
    ([parameterName, parameterValue]) =>
      typeof parameterValue === 'object' ? (
        <div
          key={`${client.class}_${client.instance}_${client.version}_${parameterName}`}
        >
          <div>{parameterName}</div>
          {Object.entries(parameterValue).map(([key, value]) => (
            <div
              key={`${parameterName}_${key}`}
              style={{ paddingLeft: 10 }}
            >{`${key}: ${value?.toString()}`}</div>
          ))}
        </div>
      ) : (
        <div
          key={`${client.class}_${client.instance}_${client.version}_${parameterName}_${parameterValue}`}
        >
          {parameterName}: {parameterValue?.toString()}
        </div>
      ),
  )
}

const renderTTSCell = (value: number | null) => {
  return value == null ? '-' : value.toString()
}

const columns: GridColumns<ClientData> = [
  {
    field: 'class',
    headerName: 'Class',
    sortable: false,
  },
  {
    field: 'instance',
    headerName: 'Instance',
    sortable: false,
    minWidth: 140,
    renderCell: (params) => renderInstanceCell(params.row),
  },
  {
    field: 'problemParameters',
    headerName: 'Problem parameters',
    sortable: false,
    cellClassName: 'problemParameters',
    minWidth: 180,
    renderCell: (params) => renderProblemParametersCell(params.row),
  },
  {
    field: 'version',
    headerName: 'Version',
    sortable: false,
    minWidth: 220,
  },
  {
    field: '0%',
    headerName: 'TTS(0%)',
    sortable: false,
    minWidth: 160,
    renderCell: (params) => renderTTSCell(params.row['0%']),
  },
  {
    field: '1%',
    headerName: 'TTS(1%)',
    sortable: false,
    minWidth: 160,
    renderCell: (params) => renderTTSCell(params.row['1%']),
  },
  {
    field: '5%',
    headerName: 'TTS(5%)',
    sortable: false,
    minWidth: 160,
    renderCell: (params) => renderTTSCell(params.row['5%']),
  },
  {
    field: '10%',
    headerName: 'TTS(10%)',
    sortable: false,
    minWidth: 160,
    renderCell: (params) => renderTTSCell(params.row['10%']),
  },
  {
    field: '20%',
    headerName: 'TTS(20%)',
    sortable: false,
    minWidth: 160,
    renderCell: (params) => renderTTSCell(params.row['20%']),
  },
  {
    field: '50%',
    headerName: 'TTS(50%)',
    sortable: false,
    minWidth: 160,
    renderCell: (params) => renderTTSCell(params.row['50%']),
  },
]

export { columns }
