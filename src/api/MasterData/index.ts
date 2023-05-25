/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useQuery } from '@tanstack/react-query'
import type { MasterData } from '@types'
import axios from 'axios'

const MASTER_DATA_URL = 'data/data_deprecated.json'

const getMasterData = async (): Promise<ReadonlyArray<MasterData>> => {
  const response = await axios.get(MASTER_DATA_URL)

  return response.data
}

export const useGetMasterData = () => {
  return useQuery(['MasterData'], async () => getMasterData(), {
    refetchOnWindowFocus: false,
  })
}
