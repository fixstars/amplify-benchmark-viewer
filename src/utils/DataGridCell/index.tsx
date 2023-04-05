import { LinkButton } from 'components/atoms/LinkButton'

export interface ProblemInstances {
  readonly [key: string]: ReadonlyArray<string> | undefined
}

const renderClientsCell = (key: string, clients: ReadonlyArray<string>) => {
  const getBackgroundColor = (client: string): string => {
    let backgroundColor = '#FF66FF'

    switch (client) {
      case 'FixstarsClient':
        backgroundColor = '#0F66DC'
        break
      case 'ToshibaClient':
        backgroundColor = '#f57bae'
        break
      case 'ToshibaSQBM2Client':
        backgroundColor = '#e75e75'
        break
      case 'GurobiClient':
        backgroundColor = '#e5f97c'
        break
      case 'DWaveSamplerClient':
        backgroundColor = '#1b000d'
        break
      case 'LeapHybridSamplerClient':
        backgroundColor = '#f6a695'
        break
      case 'FujitsuDASolverClient':
        backgroundColor = '#692981'
        break
      case 'FujitsuDASolverExpertClient':
        backgroundColor = '#3cde29'
        break
      case 'FujitsuDAPTSolverClient':
        backgroundColor = '#591414'
        break
      case 'FujitsuDAMixedModeSolverClient':
        backgroundColor = '#d66594'
        break
      case 'FujitsuDA2SolverClient':
        backgroundColor = '#2d884a'
        break
      case 'FujitsuDA2SolverExpertClient':
        backgroundColor = '#400763'
        break
      case 'FujitsuDA2PTSolverClient':
        backgroundColor = '#9d19f4'
        break
      case 'FujitsuDA2MixedModeSolverClient':
        backgroundColor = '#fcdeb9'
        break
      case 'FujitsuDA3SolverClient':
        backgroundColor = '#718de6'
        break
      case 'FujitsuDA4SolverClient':
        backgroundColor = '#1f4c48'
        break
      case 'HitachiClient':
        backgroundColor = '#909743'
        break
      case 'ABSClient':
        backgroundColor = '#2dc1c8'
        break
      case 'QiskitClient':
        backgroundColor = '#c17913'
        break
      case 'QulacsClient':
        backgroundColor = '#b2a1f6'
        break
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
