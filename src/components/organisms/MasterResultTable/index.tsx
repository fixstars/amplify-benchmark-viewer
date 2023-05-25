/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { DataGrid } from '@mui/x-data-grid'
import type { MasterData } from '@types'

import { columnGroups, columns } from './helpers'

interface Props {
  readonly hideProblem?: boolean
  readonly data: ReadonlyArray<MasterData>
}

export const MasterResultTable = ({ hideProblem = false, data }: Props) => {
  let chartData = []

  for (let i = 0, ien = data.length; i < ien; i++) {
    let index = 0
    for (const r of data[i]['results']) {
      const j = Object.create(data[i])
      for (const [key, value] of Object.entries(r)) {
        j[key] = value
      }
      j.id = `${index}-${j.group_id}`
      chartData.push(j)
      index++
    }
  }

  chartData = chartData.sort((a, b) => {
    const prevClass = a.problem_class.toLowerCase()
    const nextClass = b.problem_class.toLowerCase()

    if (prevClass === nextClass) {
      const prevInstance = a.problem_instance.toLowerCase()
      const nextInstance = b.problem_instance.toLowerCase()
      return prevInstance > nextInstance ? 1 : -1
    }

    return prevClass > nextClass ? 1 : -1
  })

  return (
    <DataGrid
      sx={{
        '&.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
          outline: 'none !important',
        },
      }}
      rows={chartData}
      columns={columns}
      columnVisibilityModel={{
        problem_class: !hideProblem,
        problem_instance: !hideProblem,
      }}
      initialState={{
        pagination: {
          pageSize: chartData.length,
        },
      }}
      getRowId={(row) => row.id as string}
      hideFooter
      disableColumnMenu
      experimentalFeatures={{ columnGrouping: true }}
      columnGroupingModel={columnGroups}
    />
  )
}
