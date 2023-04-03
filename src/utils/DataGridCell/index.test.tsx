import mockLabelListData from 'utils/test/mocks/data/mockLabelListData.json'
import mockProblemListData from 'utils/test/mocks/data/mockProblemListData.json'

import { renderClientsCell, renderProblemInstancesCell } from './index'

describe('DataGridCell utils', () => {
  it('renderClientsCell', () => {
    const clientComponents = renderClientsCell(
      'test_key',
      mockProblemListData[0].clients,
    )

    {
      const component = clientComponents[0]
      expect(component.type).toBe('div')
      expect(component.key).toBe('test_key_FixstarsClient')
      expect(component.props.style).toEqual({ marginRight: 10 })
      expect(component.props.children.type.name).toBe('LinkButton')
      expect(component.props.children.props).toEqual({
        label: 'FixstarsClient',
        link: '/clients/FixstarsClient',
        backgroundColor: '#0F66DC',
      })
    }

    {
      const component = clientComponents[1]
      expect(component.type).toBe('div')
      expect(component.key).toBe('test_key_DWaveSamplerClient')
      expect(component.props.style).toEqual({ marginRight: 10 })
      expect(component.props.children.type.name).toBe('LinkButton')
      expect(component.props.children.props).toEqual({
        label: 'DWaveSamplerClient',
        link: '/clients/DWaveSamplerClient',
        backgroundColor: '#1b000d',
      })
    }

    {
      const component = clientComponents[2]
      expect(component.type).toBe('div')
      expect(component.key).toBe('test_key_FujitsuDASolverClient')
      expect(component.props.style).toEqual({ marginRight: 10 })
      expect(component.props.children.type.name).toBe('LinkButton')
      expect(component.props.children.props).toEqual({
        label: 'FujitsuDASolverClient',
        link: '/clients/FujitsuDASolverClient',
        backgroundColor: '#692981',
      })
    }

    {
      const component = clientComponents[3]
      expect(component.type).toBe('div')
      expect(component.key).toBe('test_key_ToshibaClient')
      expect(component.props.style).toEqual({ marginRight: 10 })
      expect(component.props.children.type.name).toBe('LinkButton')
      expect(component.props.children.props).toEqual({
        label: 'ToshibaClient',
        link: '/clients/ToshibaClient',
        backgroundColor: '#f57bae',
      })
    }

    {
      const component = clientComponents[4]
      expect(component.type).toBe('div')
      expect(component.key).toBe('test_key_NECClient')
      expect(component.props.style).toEqual({ marginRight: 10 })
      expect(component.props.children.type.name).toBe('LinkButton')
      expect(component.props.children.props).toEqual({
        label: 'NECClient',
        link: '/clients/NECClient',
        backgroundColor: '#FF66FF',
      })
    }
  })

  it('renderProblemInstancesCell', () => {
    const childComponent = renderProblemInstancesCell(
      'test_key',
      mockLabelListData[1].problemInstances,
    )

    const instance = childComponent[0]
    expect(instance.type).toBe('div')
    expect(instance.key).toBe('test_key_Tsp')
    expect(instance.props.style).toEqual({
      margin: '5px 0 5px 0',
      display: 'flex',
    })
    const label = instance.props.children[0]
    expect(label.type).toBe('span')
    expect(label.props.style).toEqual({ marginRight: 10 })
    expect(label.props.children).toEqual(['Tsp', ':'])
    const instances = instance.props.children[1]

    {
      const linkContainer = instances[0]
      expect(linkContainer.type).toBe('div')
      expect(linkContainer.key).toBe('test_key_Tsp_pr299')
      expect(linkContainer.props.style).toEqual({ marginRight: 10 })

      const link = linkContainer.props.children
      expect(link.type.name).toBe('LinkButton')
      expect(link.props).toEqual({
        label: 'pr299',
        link: '/classes/Tsp/instances/pr299',
        backgroundColor: '#1b000d',
      })
    }

    {
      const linkContainer = instances[1]
      expect(linkContainer.type).toBe('div')
      expect(linkContainer.key).toBe('test_key_Tsp_burma14')
      expect(linkContainer.props.style).toEqual({ marginRight: 10 })

      const link = linkContainer.props.children
      expect(link.type.name).toBe('LinkButton')
      expect(link.props).toEqual({
        label: 'burma14',
        link: '/classes/Tsp/instances/burma14',
        backgroundColor: '#1f4c48',
      })
    }

    {
      const linkContainer = instances[2]
      expect(linkContainer.type).toBe('div')
      expect(linkContainer.key).toBe('test_key_Tsp_ulysses16')
      expect(linkContainer.props.style).toEqual({ marginRight: 10 })

      const link = linkContainer.props.children
      expect(link.type.name).toBe('LinkButton')
      expect(link.props).toEqual({
        label: 'ulysses16',
        link: '/classes/Tsp/instances/ulysses16',
        backgroundColor: '#909743',
      })
    }
  })
})
