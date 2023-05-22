/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface ReportData {
  benchmarks: {
    /**
     * Group ID
     *
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "[0-9a-fA-F]{32}".
     */
    [k: string]: {
      /**
       * Problem ID
       */
      problem_id: string
      /**
       * Client ID
       */
      client_id: string
      /**
       * 実験ラベル、設定時間ごとの結果
       */
      results: {
        /**
         * 実験ラベル。実験ラベルが空文字以外は、その実験ラベルにおけるデータで統計量を算出。実験ラベルが空文字列の場合は、group_idのすべてのデータを母集団として統計量を算出したデータを表す。
         *
         * This interface was referenced by `undefined`'s JSON-Schema definition
         * via the `patternProperty` ".*".
         */
        [k: string]: {
          /**
           * 設定時間[ms]
           */
          specified_time: number
          /**
           * サンプル数
           */
          num_samples: number
          /**
           * 実行可能解率
           */
          feasible_rate: number
          /**
           * 最適解到達率
           */
          reach_best_rate: number
          /**
           * Time To Solution
           */
          time_to_solution: {
            '0%': number | null
            '1%': number | null
            '5%': number | null
            '10%': number | null
            '20%': number | null
            '50%': number | null
          }
          /**
           * (sampling_time, target_energy)×実行可能解の数
           */
          raw_data: {
            sampling_time: number
            target_energy: number
          }[]
        }[]
      }
      /**
       * 実験ラベルごとの解の履歴
       */
      history?: {
        /**
         * 実験ラベル。実験ラベルが空文字以外は、その実験ラベルにおけるデータで統計量を算出。実験ラベルが空文字列の場合は、group_idのすべてのデータを母集団として統計量を算出したデータを表す。
         *
         * This interface was referenced by `undefined`'s JSON-Schema definition
         * via the `patternProperty` ".*".
         */
        [k: string]: {
          /**
           * サンプリング時間[ms]
           */
          sampling_time: number
          /**
           * サンプル数
           */
          num_samples: number
          /**
           * 実行可能解率
           */
          feasible_rate: number
          /**
           * 最適解到達率
           */
          reach_best_rate: number
          /**
           * Time To Solution
           */
          time_to_solution: {
            '0%': number | null
            '1%': number | null
            '5%': number | null
            '10%': number | null
            '20%': number | null
            '50%': number | null
          }
          /**
           * 目的関数の値
           */
          target_energy: {
            min: number | null
            '25%': number | null
            '50%': number | null
            '75%': number | null
            max: number | null
          }
        }[]
      }
    }
  }
  problems: {
    /**
     * Problem ID
     *
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "[0-9a-fA-F]{32}".
     */
    [k: string]: {
      /**
       * 問題クラス
       */
      class: string
      /**
       * 問題インスタンス
       */
      instance: string
      /**
       * 最適解のエネルギー値
       */
      best_known: number | null
      /**
       * 定式化パラメータ
       */
      parameters: {
        /**
         * This interface was referenced by `undefined`'s JSON-Schema definition
         * via the `patternProperty` ".".
         */
        [k: string]:
          | string
          | number
          | boolean
          | null
          | {
              /**
               * This interface was referenced by `undefined`'s JSON-Schema definition
               * via the `patternProperty` ".".
               */
              [k: string]: string | number | boolean | null
            }
      }
      /**
       * このproblem idを取り扱っているgroup_idのリスト
       */
      benchmarks: {
        /**
         * Group ID
         */
        group_id: string
      }[]
    }
  }
  clients: {
    /**
     * Client ID
     *
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "[0-9a-fA-F]{32}".
     */
    [k: string]: {
      /**
       * クライアント名
       */
      name: string
      /**
       * クライアントバージョン
       */
      version: string
      /**
       * クライアントパラメータ
       */
      parameters: {
        /**
         * This interface was referenced by `undefined`'s JSON-Schema definition
         * via the `patternProperty` ".".
         */
        [k: string]:
          | string
          | number
          | boolean
          | null
          | {
              /**
               * This interface was referenced by `undefined`'s JSON-Schema definition
               * via the `patternProperty` ".".
               */
              [k: string]: string | number | boolean | null
            }
      }
      /**
       * このclient idを取り扱っているgroup_idのリスト
       */
      benchmarks: {
        /**
         * Group ID
         */
        group_id: string
      }[]
    }
  }
}
