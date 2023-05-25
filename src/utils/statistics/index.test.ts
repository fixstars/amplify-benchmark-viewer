/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {
  quartile0,
  quartile100,
  quartile25,
  quartile50,
  quartile75,
} from 'utils/statistics'

describe('quartile', (): void => {
  it('Check quartile well', async () => {
    const container: number[] = [10, 1, 2, 5, 8, 5, 4, 8, 3, 20]
    expect(quartile0(container)).toBe(1)
    expect(quartile25(container)).toBe(3)
    expect(quartile50(container)).toBe(5)
    expect(quartile75(container)).toBe(8)
    expect(quartile100(container)).toBe(20)
  })
})
