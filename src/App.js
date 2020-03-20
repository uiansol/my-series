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

function App () {
  const [open, setOpen] = useState(false)

  const toogle = () => {
    setOpen(!open)
  }

  return (
    <div>
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
    </div>
  )
}

export default App
