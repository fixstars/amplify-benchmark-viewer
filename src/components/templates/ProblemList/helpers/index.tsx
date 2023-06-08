/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { GridColumns } from '@mui/x-data-grid'
import { Link } from 'react-router-dom'
import { renderClientsCell } from 'utils/DataGridCell'

export interface ProblemClients {
  readonly class: string
  readonly instance: string
  readonly clients: ReadonlyArray<string>
}

const renderInstanceCell = (row: ProblemClients) => {
  return (
    <Link to={`/classes/${row.class}/instances/${row.instance}`}>
      {row.instance}
    </Link>
  )
}

const columns: GridColumns<ProblemClients> = [
  {
    field: 'class',
    headerName: 'Class',
    minWidth: 180,
    sortable: false,
  },
  {
    field: 'instance',
    headerName: 'Instance',
    sortable: false,
    minWidth: 180,
    renderCell: (params) => renderInstanceCell(params.row),
  },
  {
    field: 'clients',
    headerName: 'Clients',
    sortable: false,
    flex: 1,
    renderCell: ({ row }) =>
      renderClientsCell(`${row.class}_${row.instance}`, row.clients),
  },
]

export { columns }
