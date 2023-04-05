import { columns } from './index'

describe('LabelList template childComponent helpers', () => {
  it('columns', () => {
    {
      const column = columns[0]
      expect(column.field).toBe('label')
      expect(column.headerName).toBe('Label')
      expect(column.sortable).toBe(false)
      expect(column.minWidth).toBe(220)
    }

    {
      const column = columns[1]
      expect(column.field).toBe('instance')
      expect(column.headerName).toBe('Instance')
      expect(column.sortable).toBe(false)
      expect(column.renderCell?.name).toBe('renderCell')
    }

    {
      const column = columns[2]
      expect(column.field).toBe('clients')
      expect(column.headerName).toBe('Clients')
      expect(column.sortable).toBe(false)
      expect(column.flex).toBe(1)
      expect(column.renderCell?.name).toBe('renderCell')
    }
  })
})
