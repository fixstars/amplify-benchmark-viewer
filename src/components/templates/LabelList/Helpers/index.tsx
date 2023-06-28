/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { GridColDef } from '@mui/x-data-grid'
import type { ProblemInstances } from 'utils/DataGridCell'
import {
  renderClientsCell,
  renderProblemInstancesCell,
} from 'utils/DataGridCell'

export interface LabelData {
  readonly label: string
  readonly problemInstances: ProblemInstances
  readonly clients: ReadonlyArray<string>
}

// eslint-disable-next-line functional/prefer-readonly-type
const columns: GridColDef<LabelData>[] = [
  {
    field: 'label',
    headerName: 'Label',
    sortable: false,
    minWidth: 220,
  },
  {
    field: 'instance',
    headerName: 'Instance',
    sortable: false,
    flex: 1,
    cellClassName: 'instance',
    renderCell: ({ row: { label, problemInstances } }) =>
      renderProblemInstancesCell(label, problemInstances),
  },
  {
    field: 'clients',
    headerName: 'Clients',
    sortable: false,
    flex: 1,
    renderCell: ({ row }) => renderClientsCell(row.label, row.clients),
  },
]

export { columns }
