import React, { useState } from 'react'
import {
  Navbar,
  NavbarBrand,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  NavbarToggler
} from 'reactstrap'

const Header = () => {
  const [open, setOpen] = useState(false)
  const toogle = () => {
    setOpen(!open)
  }

  return (
    <Navbar color='light' light expand='md'>
      <NavbarBrand>My series</NavbarBrand>
      <NavbarToggler onClick={toogle} />
      <Collapse isOpen={open} navbar>
        <Nav className='m1-auto' navbar>
          <NavItem>
            <NavLink href='/'>Gender</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  )
}

export default Header
