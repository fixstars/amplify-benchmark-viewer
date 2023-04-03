import type { Data } from 'plotly.js'

import type { ReportData } from './report_data'

export interface ProblemParameters {
  readonly [key: string]: number | null
}

export interface ProblemNumVars {
  readonly input: number
  readonly logical: number
  readonly physical: number
}

export interface ClientParameters {
  readonly [key: string]: boolean
}

export interface ResultData {
  readonly num_feasibles: number
  readonly mean: number
  readonly std: number
  readonly min: number
  readonly '25%': number
  readonly '50%': number
  readonly '75%': number
  readonly max: number
  readonly num_samples: number
  readonly num_reach_best: number
  readonly setting_time: number
}

export interface MasterData {
  readonly id?: string
  readonly group_id: string
  readonly problem_id: string
  readonly client_id: string
  readonly problem_class: string
  readonly problem_instance: string
  readonly problem_best_known: number
  readonly problem_parameters: ProblemParameters | null
  readonly problem_num_vars: ProblemNumVars
  readonly client_name: string
  readonly client_version: string
  readonly client_parameters: ClientParameters | null
  readonly amplify_version: string
  readonly setting_times: ReadonlyArray<number>
  readonly results: ReadonlyArray<ResultData>
  readonly plot_data: {
    readonly [key: string]: Data
  }
}

export type FilteringData = { readonly name: string }
export { ReportData }
