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
