function quartile(data: readonly number[], q: number) {
  const sortedData = data.slice().sort((a, b) => a - b)
  const pos = Math.floor((sortedData.length - 1) * q)
  return sortedData[pos]
}
function quartile0(data: readonly number[]) {
  return quartile(data, 0)
}
function quartile25(data: readonly number[]) {
  return quartile(data, 0.25)
}

function quartile50(data: readonly number[]) {
  return quartile(data, 0.5)
}

function quartile75(data: readonly number[]) {
  return quartile(data, 0.75)
}

function quartile100(data: readonly number[]) {
  return quartile(data, 1)
}

export { quartile0, quartile25, quartile50, quartile75, quartile100 }
