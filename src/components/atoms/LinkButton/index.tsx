/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { styled } from '@mui/system'
import { Link } from 'components/atoms/Link'

const StyledLink = styled(Link)`
  padding: 4px 8px;
  font-size: 0.8rem;
  font-weight: bold;
  border-radius: 4px;
`

interface Props {
  readonly label: string
  readonly link: string
  readonly backgroundColor?: string
}

export const LinkButton = ({
  label,
  link,
  backgroundColor = '#FF66FF',
}: Props) => {
  const _isHexColorLight = (color: string): boolean => {
    const hex = color.replace('#', '')
    const red = parseInt(hex.slice(0, 2), 16)
    const green = parseInt(hex.slice(2, 4), 16)
    const blue = parseInt(hex.slice(4, 6), 16)
    const brightness = (red * 299 + green * 587 + blue * 114) / 1000

    return brightness > 155
  }

  return (
    <StyledLink
      sx={{
        backgroundColor,
        color: _isHexColorLight(backgroundColor) ? '#111' : '#FFF',
      }}
      to={link}
    >
      {label}
    </StyledLink>
  )
}
