import { render } from '@testing-library/react'
import { mockGrid } from 'utils/test'

import { SectionTitle } from '.'

describe('<SectionTitle />', () => {
  it('Rendered well', async () => {
    const { container } = render(<SectionTitle title="section title" />)

    const grid = mockGrid.mock.calls[0][0]
    expect(grid.item).toBe(true)
    expect(grid.xs).toBe(12)
    expect(grid.children.length).toBe(2)

    const title = grid.children[0]
    expect(title.type.render.displayName).toBe('Styled(Typography)')
    expect(title.props.variant).toBe('h2')
    expect(title.props.children).toBe('section title')

    const rightComponent = grid.children[1]
    expect(rightComponent).toBe(undefined)

    expect(container).toMatchSnapshot()
  })

  it('Right component is rendered well', async () => {
    render(
      <SectionTitle
        title="section title"
        rightComponent={<div>right component</div>}
      />,
    )

    const grid = mockGrid.mock.calls[0][0]
    expect(grid.children.length).toBe(2)

    const title = grid.children[0]
    expect(title.props.children).toBe('section title')

    const rightComponent = grid.children[1]
    expect(rightComponent.type).toBe('div')
    expect(rightComponent.props.children).toBe('right component')
  })
})
