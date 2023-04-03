import { Tooltip } from '@mui/material'
import type { GridColumnGroupingModel, GridColumns } from '@mui/x-data-grid'
import type { MasterData } from '@types'

const renderCell = (row: MasterData, field: string) => {
  return (
    <Tooltip
      title={
        <>
          {row.client_parameters != null && (
            <>
              <span>Client parameters</span>
              <br />
              {Object.entries(row.client_parameters).map(
                ([key, value], index) => (
                  <div key={`${key}-${index}`}>
                    <span>- {key}: </span>
                    <span>{`${value}`}</span>
                  </div>
                ),
              )}
            </>
          )}
          {row.problem_parameters != null && (
            <>
              {row.client_parameters != null && <br />}
              <span>Problem parameters</span>
              <br />
              {Object.entries(row.problem_parameters).map(
                ([key, value], index) => (
                  <div key={`${key}-${index}`}>
                    <span>- {key}: </span>
                    <span>{`${value}`}</span>
                  </div>
                ),
              )}
            </>
          )}
        </>
      }
    >
      <span>{row[field as never]}</span>
    </Tooltip>
  )
}

const columns: GridColumns<MasterData> = [
  {
    field: 'problem_class',
    headerName: 'Problem class',
    sortable: false,
    minWidth: 120,
    renderCell: (params) => renderCell(params.row, params.field),
  },
  {
    field: 'problem_instance',
    headerName: 'Problem instance',
    sortable: false,
    minWidth: 140,
    renderCell: (params) => renderCell(params.row, params.field),
  },
  {
    field: 'client_name',
    headerName: 'Client name',
    sortable: false,
    minWidth: 120,
    renderCell: (params) => renderCell(params.row, params.field),
  },
  {
    field: 'client_version',
    headerName: 'Client version',
    sortable: false,
    minWidth: 200,
    renderCell: (params) => renderCell(params.row, params.field),
  },
  {
    field: 'setting_time',
    headerName: 'Setting time',
    sortable: false,
    minWidth: 120,
    renderCell: (params) => renderCell(params.row, params.field),
  },
  {
    field: 'num_samples',
    headerName: 'Num samples',
    sortable: false,
    minWidth: 120,
    renderCell: (params) => renderCell(params.row, params.field),
  },
  {
    field: 'num_feasibles',
    headerName: 'Num feasibles',
    sortable: false,
    minWidth: 120,
    renderCell: (params) => renderCell(params.row, params.field),
  },
  {
    field: 'num_reach_best',
    headerName: 'Num reach best',
    sortable: false,
    minWidth: 140,
    renderCell: (params) => renderCell(params.row, params.field),
  },
  {
    field: 'min',
    headerName: 'Min',
    sortable: false,
    minWidth: 120,
    renderCell: (params) => renderCell(params.row, params.field),
  },
  {
    field: '25%',
    headerName: '25%',
    sortable: false,
    minWidth: 120,
    renderCell: (params) => renderCell(params.row, params.field),
  },
  {
    field: '50%',
    headerName: '50%',
    sortable: false,
    minWidth: 120,
    renderCell: (params) => renderCell(params.row, params.field),
  },
  {
    field: '75%',
    headerName: '75%',
    sortable: false,
    minWidth: 120,
    renderCell: (params) => renderCell(params.row, params.field),
  },
  {
    field: 'max',
    headerName: 'Max',
    sortable: false,
    minWidth: 120,
    renderCell: (params) => renderCell(params.row, params.field),
  },
]

const columnGroups: GridColumnGroupingModel = [
  {
    groupId: 'Basic information',
    children: [
      { field: 'problem_class' },
      { field: 'problem_instance' },
      { field: 'client_name' },
      { field: 'client_version' },
      { field: 'setting_time' },
      { field: 'num_samples' },
      { field: 'num_feasibles' },
      { field: 'num_reach_best' },
    ],
  },
  {
    groupId: 'Target energy',
    children: [
      { field: 'min' },
      { field: '25%' },
      { field: '50%' },
      { field: '75%' },
      { field: 'max' },
    ],
  },
]

export { columns, columnGroups }
