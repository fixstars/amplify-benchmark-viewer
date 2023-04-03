import { AppBar, styled, Toolbar, Typography } from '@mui/material'
import { Link, NavLink } from 'components/atoms'
import { useLocation } from 'react-router-dom'

const LogoContainer = styled('div')`
  flex: 1;
`

const NavLinks = styled('nav')`
  display: flex;
`

export const Header = () => {
  const location = useLocation()

  return (
    <AppBar position="fixed" elevation={0}>
      <Toolbar sx={{ flexWrap: 'wrap' }}>
        <LogoContainer>
          <Link to=".">
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              sx={{ color: '#fff' }}
            >
              Annealing Benchmark
            </Typography>
          </Link>
        </LogoContainer>
        <NavLinks>
          <NavLink
            url="/"
            label="Problems"
            isActive={location.pathname === '/'}
          />
          <NavLink
            url="/clients"
            label="Clients"
            isActive={location.pathname === '/clients'}
          />
          <NavLink
            url="/labels"
            label="Label"
            isActive={location.pathname === '/labels'}
          />
        </NavLinks>
      </Toolbar>
    </AppBar>
  )
}
