const mockAppBar = jest.fn()
const mockToolbar = jest.fn()
const mockTypography = jest.fn()
const mockGrid = jest.fn()
const mockSnackbar = jest.fn()
const mockDataGrid = jest.fn()
const mockTooltip = jest.fn()
const mockBox = jest.fn()
const mockFormControl = jest.fn()
const mockSelect = jest.fn()
const mockTabs = jest.fn()
const mockFab = jest.fn()

jest.mock('@mui/material', () => {
  const {
    AppBar: MUIAppBar,
    Toolbar: MUIToolbar,
    Typography: MUITypography,
    Grid: MUIGrid,
    Snackbar: MUISnackbar,
    Tooltip: MUITooltip,
    Box: MUIBox,
    FormControl: MUIFormControl,
    Select: MUISelect,
    Tabs: MUITabs,
    Fab: MUIFab,
    ...rest
  } = jest.requireActual('@mui/material')

  const AppBar = (props: typeof MUIAppBar) => {
    mockAppBar(props)
    return <MUIAppBar {...props} />
  }

  const Toolbar = (props: typeof MUIToolbar) => {
    mockToolbar(props)
    return <MUIToolbar {...props} />
  }

  const Typography = (props: typeof MUITypography) => {
    mockTypography(props)
    return <MUITypography {...props} />
  }

  const Grid = (props: typeof MUIGrid) => {
    mockGrid(props)
    return <MUIGrid {...props} />
  }

  const Snackbar = (props: typeof MUISnackbar) => {
    mockSnackbar(props)
    return <MUISnackbar {...props} />
  }

  const Tooltip = (props: typeof MUITooltip) => {
    mockTooltip(props)
    return <MUITooltip {...props} />
  }

  const Box = (props: typeof MUIBox) => {
    mockBox(props)
    return <MUIBox {...props} />
  }

  const FormControl = (props: typeof MUIFormControl) => {
    mockFormControl(props)
    return <MUIFormControl {...props} />
  }

  const Select = (props: typeof MUISelect) => {
    mockSelect(props)
    return <MUISelect {...props} />
  }

  const Tabs = (props: typeof MUITabs) => {
    mockTabs(props)
    return <MUITabs {...props} />
  }

  const Fab = (props: typeof MUIFab) => {
    mockFab(props)
    return <MUIFab {...props} />
  }

  return {
    AppBar,
    Toolbar,
    Typography,
    Grid,
    Snackbar,
    Tooltip,
    Box,
    FormControl,
    Select,
    Tabs,
    Fab,
    ...rest,
  }
})

jest.mock('@mui/x-data-grid', () => {
  const { DataGrid: MUIDataGrid, ...rest } =
    jest.requireActual('@mui/x-data-grid')

  const DataGrid = (props: typeof MUIDataGrid) => {
    mockDataGrid(props)
    return <MUIDataGrid {...props} />
  }

  return {
    DataGrid,
    ...rest,
  }
})

export {
  mockAppBar,
  mockToolbar,
  mockTypography,
  mockGrid,
  mockSnackbar,
  mockDataGrid,
  mockTooltip,
  mockBox,
  mockFormControl,
  mockSelect,
  mockTabs,
  mockFab,
}
