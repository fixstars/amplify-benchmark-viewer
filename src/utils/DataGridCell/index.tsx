/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { LinkButton } from 'components/atoms/LinkButton'

const clientColors = [
  '#0f66dc',
  '#f57bae',
  '#e75e75',
  '#e5f97c',
  '#1b000d',
  '#f6a695',
  '#692981',
  '#3cde29',
  '#591414',
  '#d66594',
  '#2d884a',
  '#400763',
  '#9d19f4',
  '#fcdeb9',
  '#1f4c48',
  '#909743',
  '#2dc1c8',
  '#c17913',
  '#b2a1f6',
]

const instanceColors = [
  '#ff66ff',
  '#0f66dc',
  '#f57bae',
  '#e75e75',
  '#e5f97c',
  '#1b000d',
  '#f6a695',
  '#692981',
  '#3cde29',
  '#591414',
  '#d66594',
  '#2d884a',
  '#400763',
  '#9d19f4',
  '#fcdeb9',
  '#718de6',
  '#1f4c48',
  '#909743',
  '#2dc1c8',
  '#c17913',
  '#b2a1f6',
  '#9a916d',
  '#406a0f',
  '#004b31',
  '#18729f',
  '#9997c3',
  '#9cf0ec',
  '#ce843c',
  '#2d326e',
  '#76ed60',
  '#d7f7e8',
  '#bb15d7',
  '#87a7d8',
  '#94053a',
  '#e5c8a6',
  '#e2f2c0',
]

export interface ProblemInstances {
  readonly [key: string]: ReadonlyArray<string> | undefined
}

const renderClientsCell = (key: string, clients: ReadonlyArray<string>) => {
  const getBackgroundColor = (client: string): string => {
    const cache = JSON.parse(localStorage.getItem('clientColorCache') ?? '{}')
    let cacheIndex = JSON.parse(
      localStorage.getItem('clientColorIndexCache') ?? '-1',
    )
    let backgroundColor = cache[client]

    if (backgroundColor === undefined) {
      const length = clientColors.length
      cacheIndex = cacheIndex >= length ? 0 : cacheIndex + 1
      backgroundColor = clientColors[cacheIndex]
      cache[client] = backgroundColor
      localStorage.setItem('clientColorCache', JSON.stringify(cache))
      localStorage.setItem('clientColorIndexCache', JSON.stringify(cacheIndex))
      return backgroundColor
    }

    return backgroundColor
  }

  return clients.map((client) => (
    <div key={`${key}_${client}`} style={{ marginRight: 10 }}>
      <LinkButton
        label={client}
        link={`/clients/${client}`}
        backgroundColor={getBackgroundColor(client)}
      />
    </div>
  ))
}

const renderProblemInstancesCell = (
  key: string,
  problemInstances: ProblemInstances,
) => {
  const getBackgroundColor = (instance: string): string => {
    const cache = JSON.parse(localStorage.getItem('instanceColorCache') ?? '{}')
    let cacheIndex = JSON.parse(
      localStorage.getItem('instanceColorIndexCache') ?? '-1',
    )
    let backgroundColor = cache[instance]

    if (backgroundColor === undefined) {
      const length = instanceColors.length
      cacheIndex = cacheIndex >= length ? 0 : cacheIndex + 1
      backgroundColor = instanceColors[cacheIndex]
      cache[instance] = backgroundColor
      localStorage.setItem('instanceColorCache', JSON.stringify(cache))
      localStorage.setItem(
        'instanceColorIndexCache',
        JSON.stringify(cacheIndex),
      )
      return backgroundColor
    }

    return backgroundColor
  }
  const pairs = Object.entries(problemInstances)
  pairs.sort(function (p1, p2) {
    const p1Key = p1[0]
    const p2Key = p2[0]
    if (p1Key < p2Key) {
      return -1
    }
    if (p1Key > p2Key) {
      return 1
    }
    return 0
  })
  problemInstances = Object.fromEntries(pairs)
  return Object.keys(problemInstances).map((className) => (
    <div
      key={`${key}_${className}`}
      style={{ margin: '5px 0 5px 0', display: 'flex' }}
    >
      <span style={{ marginRight: 10 }}>{className}:</span>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {problemInstances[className]?.map((instance) => (
          <div
            key={`${key}_${className}_${instance}`}
            style={{ marginRight: 10, marginBottom: 10 }}
          >
            <LinkButton
              label={instance}
              link={`/classes/${className}/instances/${instance}`}
              backgroundColor={getBackgroundColor(instance)}
            />
          </div>
        ))}
      </div>
    </div>
  ))
}

export { renderClientsCell, renderProblemInstancesCell }
