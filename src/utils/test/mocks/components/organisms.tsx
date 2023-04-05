const mockHeader = jest.fn()
const mockLayout = jest.fn()
const mockFilteringTable = jest.fn()
const mockMasterResultChart = jest.fn()
const mockMasterResultTable = jest.fn()
const mockPlotFeasibleRate = jest.fn()
const mockPlotReachBestRate = jest.fn()
const mockPlotTargetEnergy = jest.fn()
const mockPlotTTS = jest.fn()
const mockMasterDataFiltering = jest.fn()

jest.mock('components/organisms', () => {
  const {
    Header: HeaderComponent,
    Layout: LayoutComponent,
    FilteringTable: FilteringTableComponent,
    MasterResultChart: MasterResultChartComponent,
    MasterResultTable: MasterResultTableComponent,
    PlotFeasibleRate: PlotFeasibleRateComponent,
    PlotReachBestRate: PlotReachBestRateComponent,
    PlotTargetEnergy: PlotTargetEnergyComponent,
    PlotTTS: PlotTTSComponent,
    MasterDataFiltering: MasterDataFilteringComponent,
    ...rest
  } = jest.requireActual('components/organisms')

  const Header = (props: typeof HeaderComponent) => {
    mockHeader(props)
    return <HeaderComponent {...props} />
  }

  const Layout = (props: typeof LayoutComponent) => {
    mockLayout(props)
    return <LayoutComponent {...props} />
  }

  const FilteringTable = (props: typeof FilteringTableComponent) => {
    mockFilteringTable(props)
    return <FilteringTableComponent {...props} />
  }

  const MasterResultChart = (props: typeof MasterResultChartComponent) => {
    mockMasterResultChart(props)
    return <MasterResultChartComponent {...props} />
  }

  const MasterResultTable = (props: typeof MasterResultTableComponent) => {
    mockMasterResultTable(props)
    return <MasterResultTableComponent {...props} />
  }

  const PlotFeasibleRate = (props: typeof PlotFeasibleRateComponent) => {
    mockPlotFeasibleRate(props)
    return <PlotFeasibleRateComponent {...props} />
  }

  const PlotReachBestRate = (props: typeof PlotReachBestRateComponent) => {
    mockPlotReachBestRate(props)
    return <PlotReachBestRateComponent {...props} />
  }

  const PlotTargetEnergy = (props: typeof PlotTargetEnergyComponent) => {
    mockPlotTargetEnergy(props)
    return <PlotTargetEnergyComponent {...props} />
  }

  const PlotTTS = (props: typeof PlotTTSComponent) => {
    mockPlotTTS(props)
    return <PlotTTSComponent {...props} />
  }

  const MasterDataFiltering = (props: typeof MasterDataFilteringComponent) => {
    mockMasterDataFiltering(props)
    return <MasterDataFilteringComponent {...props} />
  }

  return {
    Header,
    Layout,
    FilteringTable,
    MasterResultChart,
    MasterResultTable,
    PlotFeasibleRate,
    PlotReachBestRate,
    PlotTargetEnergy,
    PlotTTS,
    MasterDataFiltering,
    ...rest,
  }
})

export {
  mockHeader,
  mockLayout,
  mockFilteringTable,
  mockMasterResultChart,
  mockMasterResultTable,
  mockPlotFeasibleRate,
  mockPlotReachBestRate,
  mockPlotTargetEnergy,
  mockPlotTTS,
  mockMasterDataFiltering,
}
