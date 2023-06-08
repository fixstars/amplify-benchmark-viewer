/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
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
    minWidth: 180,
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
