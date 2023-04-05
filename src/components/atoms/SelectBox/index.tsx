/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useState } from 'react'

import { FormControl, MenuItem, Select, Typography } from '@mui/material'

interface Props {
  readonly label: string
  readonly options: ReadonlyArray<string>
  readonly initValue?: string
  readonly onChange?: (option: string) => void
}

export const SelectBox = ({ label, options, initValue, onChange }: Props) => {
  const [selectedOption, setSelectedOption] = useState(initValue ?? options[0])

  return (
    <FormControl
      sx={{ flexDirection: 'row', alignItems: 'center' }}
      size="small"
    >
      <Typography sx={{ fontSize: '1rem', marginRight: '8px' }}>
        {label}:
      </Typography>
      <Select
        sx={{ minWidth: 120 }}
        value={selectedOption}
        onChange={(event) => {
          const value = event.target.value
          setSelectedOption(value)

          if (typeof onChange === 'function') onChange(value)
        }}
      >
        {options.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
