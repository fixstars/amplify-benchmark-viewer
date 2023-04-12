import { LinkButton } from 'components/atoms/LinkButton'

const colors = [
  '#0F66DC',
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
      const length = colors.length
      cacheIndex = cacheIndex >= length ? 0 : cacheIndex + 1
      backgroundColor = colors[cacheIndex]
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
  const getBackgroundColor = (client: string): string => {
    let backgroundColor = '#FF66FF'

    switch (client) {
      case 'pr124':
        backgroundColor = '#0F66DC'
        break
      case 'pr136':
        backgroundColor = '#f57bae'
        break
      case 'pr144':
        backgroundColor = '#e75e75'
        break
      case 'si175':
        backgroundColor = '#e5f97c'
        break
      case 'pr299':
        backgroundColor = '#1b000d'
        break
      case 'sko56':
        backgroundColor = '#f6a695'
        break
      case 'sko100a':
        backgroundColor = '#692981'
        break
      case 'tai150b':
        backgroundColor = '#3cde29'
        break
      case 'G65':
        backgroundColor = '#591414'
        break
      case 'G77':
        backgroundColor = '#d66594'
        break
      case 'G81':
        backgroundColor = '#2d884a'
        break
      case '16x16_1_000':
        backgroundColor = '#400763'
        break
      case '25x25_000':
        backgroundColor = '#9d19f4'
        break
      case 'B-n31-k5':
        backgroundColor = '#fcdeb9'
        break
      case 'F-n45-k4':
        backgroundColor = '#718de6'
        break
      case 'burma14':
        backgroundColor = '#1f4c48'
        break
      case 'ulysses16':
        backgroundColor = '#909743'
        break
      case 'bayg29':
        backgroundColor = '#2dc1c8'
        break
      case 'kroA100':
        backgroundColor = '#c17913'
        break
      case 'esc32a':
        backgroundColor = '#b2a1f6'
        break
      case 'G1':
        backgroundColor = '#9a916d'
        break
      case 'G11':
        backgroundColor = '#406a0f'
        break
      case 'G32':
        backgroundColor = '#004b31'
        break
      case 'K2000':
        backgroundColor = '#18729f'
        break
      case '9x9_h39_022':
        backgroundColor = '#9997c3'
        break
      case '9x9_h17_055':
        backgroundColor = '#9cf0ec'
        break
      case '16x16_easy_233':
        backgroundColor = '#ce843c'
        break
      case '16x16_hard_194':
        backgroundColor = '#2d326e'
        break
      case 'P-n16-k8':
        backgroundColor = '#76ed60'
        break
      case 'P-n19-k2':
        backgroundColor = '#d7f7e8'
        break
      case 'tai256c':
        backgroundColor = '#bb15d7'
        break
      case 'eil51':
        backgroundColor = '#87a7d8'
        break
      case 'A-n32-k5':
        backgroundColor = '#94053a'
        break
      case 'chr12a':
        backgroundColor = '#e5c8a6'
        break
      case 'chr18a':
        backgroundColor = '#e2f2c0'
        break
    }

    return backgroundColor
  }

  return Object.keys(problemInstances).map((className) => (
    <div
      key={`${key}_${className}`}
      style={{ margin: '5px 0 5px 0', display: 'flex' }}
    >
      <span style={{ marginRight: 10 }}>{className}:</span>
      {problemInstances[className]?.map((instance) => (
        <div
          key={`${key}_${className}_${instance}`}
          style={{ marginRight: 10 }}
        >
          <LinkButton
            label={instance}
            link={`/classes/${className}/instances/${instance}`}
            backgroundColor={getBackgroundColor(instance)}
          />
        </div>
      ))}
    </div>
  ))
}

export { renderClientsCell, renderProblemInstancesCell }
