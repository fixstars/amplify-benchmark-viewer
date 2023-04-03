import type { GridColumns } from '@mui/x-data-grid'
import { Link } from 'react-router-dom'
import type { ProblemInstances } from 'utils/DataGridCell'
import { renderProblemInstancesCell } from 'utils/DataGridCell'

export interface ClientInstances {
  readonly client: string
  readonly version: string
  readonly problemInstances: ProblemInstances
}

const renderClientCell = (row: ClientInstances) => {
  return <Link to={`/clients/${row.client}`}>{row.client}</Link>
}

const columns: GridColumns<ClientInstances> = [
  {
    field: 'client',
    headerName: 'Client',
    sortable: false,
    minWidth: 140,
    renderCell: (params) => renderClientCell(params.row),
  },
  {
    field: 'version',
    headerName: 'Version',
    sortable: false,
    minWidth: 220,
  },
  {
    field: 'instance',
    headerName: 'Instance',
    sortable: false,
    flex: 1,
    cellClassName: 'instance',
    renderCell: ({ row: { client, version, problemInstances } }) =>
      renderProblemInstancesCell(`${client}_${version}`, problemInstances),
  },
]

export { columns }
