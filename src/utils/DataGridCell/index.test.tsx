import mockLabelListData from 'utils/test/mocks/data/mockLabelListData.json'
import mockProblemListData from 'utils/test/mocks/data/mockProblemListData.json'

import { renderClientsCell, renderProblemInstancesCell } from './index'

describe('DataGridCell utils', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('renderClientsCell', () => {
    it('show clients with colors well', () => {
      const clientComponents = renderClientsCell(
        'test_key',
        mockProblemListData[0].clients,
      )

      {
        const component = clientComponents[0]
        expect(component.type).toBe('div')
        expect(component.key).toBe('test_key_a_client')
        expect(component.props.style).toEqual({ marginRight: 10 })
        expect(component.props.children.type.name).toBe('LinkButton')
        expect(component.props.children.props).toEqual({
          label: 'a_client',
          link: '/clients/a_client',
          backgroundColor: '#0F66DC',
        })
      }

      {
        const component = clientComponents[1]
        expect(component.type).toBe('div')
        expect(component.key).toBe('test_key_b_client')
        expect(component.props.style).toEqual({ marginRight: 10 })
        expect(component.props.children.type.name).toBe('LinkButton')
        expect(component.props.children.props).toEqual({
          label: 'b_client',
          link: '/clients/b_client',
          backgroundColor: '#f57bae',
        })
      }

      {
        const component = clientComponents[2]
        expect(component.type).toBe('div')
        expect(component.key).toBe('test_key_c_client')
        expect(component.props.style).toEqual({ marginRight: 10 })
        expect(component.props.children.type.name).toBe('LinkButton')
        expect(component.props.children.props).toEqual({
          label: 'c_client',
          link: '/clients/c_client',
          backgroundColor: '#e75e75',
        })
      }

      {
        const component = clientComponents[3]
        expect(component.type).toBe('div')
        expect(component.key).toBe('test_key_d_client')
        expect(component.props.style).toEqual({ marginRight: 10 })
        expect(component.props.children.type.name).toBe('LinkButton')
        expect(component.props.children.props).toEqual({
          label: 'd_client',
          link: '/clients/d_client',
          backgroundColor: '#e5f97c',
        })
      }

      {
        const component = clientComponents[4]
        expect(component.type).toBe('div')
        expect(component.key).toBe('test_key_e_client')
        expect(component.props.style).toEqual({ marginRight: 10 })
        expect(component.props.children.type.name).toBe('LinkButton')
        expect(component.props.children.props).toEqual({
          label: 'e_client',
          link: '/clients/e_client',
          backgroundColor: '#1b000d',
        })
      }
    })

    it('show clients with cached colors', () => {
      localStorage.setItem(
        'clientColorCache',
        JSON.stringify({
          a_client: 'red',
          b_client: 'blue',
          c_client: 'green',
          d_client: 'yellow',
          e_client: 'purple',
        }),
      )

      const clientComponents = renderClientsCell(
        'test_key',
        mockProblemListData[0].clients,
      )

      {
        const component = clientComponents[0]
        expect(component.props.children.props).toEqual({
          label: 'a_client',
          link: '/clients/a_client',
          backgroundColor: 'red',
        })
      }

      {
        const component = clientComponents[1]
        expect(component.props.children.props).toEqual({
          label: 'b_client',
          link: '/clients/b_client',
          backgroundColor: 'blue',
        })
      }

      {
        const component = clientComponents[2]
        expect(component.props.children.props).toEqual({
          label: 'c_client',
          link: '/clients/c_client',
          backgroundColor: 'green',
        })
      }

      {
        const component = clientComponents[3]
        expect(component.props.children.props).toEqual({
          label: 'd_client',
          link: '/clients/d_client',
          backgroundColor: 'yellow',
        })
      }

      {
        const component = clientComponents[4]
        expect(component.props.children.props).toEqual({
          label: 'e_client',
          link: '/clients/e_client',
          backgroundColor: 'purple',
        })
      }
    })
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
