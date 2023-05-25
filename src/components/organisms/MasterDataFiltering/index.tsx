/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useState } from 'react'

import AddCircleIcon from '@mui/icons-material/AddCircle'
import { Box, Chip, IconButton, Menu, Typography } from '@mui/material'
import type { FilteringData } from '@types'

import { FilteringTable } from '../FilteringTable'

interface Props {
  readonly label: string
  readonly data: ReadonlyArray<FilteringData>
  readonly selectedData: ReadonlyArray<string>
  readonly onSelected: (data: ReadonlyArray<string>) => void
}

export const MasterDataFiltering = ({
  label,
  data,
  selectedData,
  onSelected,
}: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  return (
    <Box sx={{ marginBottom: '4px' }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', minWidth: '140px' }}>
          <Typography>{label}</Typography>
          <IconButton
            size="small"
            onClick={(event) => {
              setAnchorEl(event.currentTarget)
            }}
          >
            <AddCircleIcon data-testid="AddCircleIcon" fontSize="inherit" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            sx={{
              'li:hover': {
                backgroundColor: '#FFF',
              },
            }}
          >
            <Box sx={{ width: '500px', height: '400px', padding: '4px 8px' }}>
              <FilteringTable
                title={label}
                data={data}
                selectedData={selectedData}
                onSelected={onSelected}
              />
            </Box>
          </Menu>
        </Box>
        <Box>
          {selectedData.map((selectedItem) => (
            <Chip
              key={`master_data_filtering_chip_${selectedItem}`}
              label={selectedItem}
              variant="outlined"
              size="small"
              sx={{ marginRight: '8px', marginBottom: '4px' }}
              color="primary"
              onDelete={() => {
                onSelected(
                  [...selectedData].filter((item) => item !== selectedItem),
                )
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  )
}
