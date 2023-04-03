import type { FilteringData, MasterData } from '@types'

interface FilteringOptions {
  readonly problemClassData: readonly FilteringData[]
  readonly clientNameData: readonly FilteringData[]
  readonly clientVersionData: readonly FilteringData[]
}

const createFilteringData = (
  data: ReadonlyArray<MasterData>,
): FilteringOptions => {
  const problemClassData: FilteringData[] = []
  const clientNameData: FilteringData[] = []
  const clientVersionData: FilteringData[] = []

  data.forEach(
    ({
      problem_class: problemClass,
      client_name: clientName,
      client_version: clientVersion,
    }) => {
      let index = problemClassData.findIndex(
        (problem) => problem.name === problemClass,
      )
      if (index < 0) {
        problemClassData.push({
          name: problemClass,
        })
      }

      index = clientNameData.findIndex((client) => client.name === clientName)
      if (index < 0) {
        clientNameData.push({
          name: clientName,
        })
      }

      index = clientVersionData.findIndex(
        (client) => client.name === clientVersion,
      )
      if (index < 0) {
        clientVersionData.push({
          name: clientVersion,
        })
      }
    },
  )

  return {
    problemClassData,
    clientNameData,
    clientVersionData,
  }
}

interface Filters {
  readonly data: readonly MasterData[]
  readonly problemClassFilter: ReadonlyArray<string>
  readonly clientNameFilter: ReadonlyArray<string>
  readonly clientVersionFilter: ReadonlyArray<string>
  readonly problemInstanceFilter?: string
}

const getFilteringData = ({
  data,
  problemClassFilter,
  clientNameFilter,
  clientVersionFilter,
  problemInstanceFilter,
}: Filters): MasterData[] => {
  return data
    .filter(({ problem_class: problemClass }) => {
      return problemClassFilter.length > 0
        ? problemClassFilter.includes(problemClass)
        : true
    })
    .filter(({ client_name: clientName }) => {
      return clientNameFilter.length > 0
        ? clientNameFilter.includes(clientName)
        : true
    })
    .filter(({ client_version: clientVersion }) => {
      return clientVersionFilter.length > 0
        ? clientVersionFilter.includes(clientVersion)
        : true
    })
    .filter(({ problem_instance: problemInstance }) => {
      return problemInstanceFilter != null
        ? problemInstance === problemInstanceFilter
        : true
    })
}

interface ChartOptions {
  // eslint-disable-next-line functional/prefer-readonly-type
  [key: string]: Set<string> | null
}

const getChartOptionsByClients = (
  data: readonly MasterData[],
): ChartOptions => {
  const options: ChartOptions = {}

  for (const element of data) {
    if (options[element['client_name']] == null) {
      options[element['client_name']] = new Set<string>()
    }

    for (const [key] of Object.entries(element['plot_data'])) {
      options[element['client_name']]?.add(key)
    }
  }

  return options
}

const getProblemInstances = (
  data: readonly MasterData[],
): ReadonlyArray<string> => {
  const problemInstances = new Set<string>()

  for (const element of data) {
    problemInstances.add(element.problem_instance)
  }

  return Array.from(problemInstances)
}

export {
  createFilteringData,
  getFilteringData,
  getChartOptionsByClients,
  getProblemInstances,
}
