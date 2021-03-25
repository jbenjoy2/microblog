import React, { useState } from 'react';

import { NavLink } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from 'reactstrap';

function NavBar() {
	const [ isOpen, setIsOpen ] = useState(false);

	const toggle = () => setIsOpen(!isOpen);
	return (
		<div>
			<Navbar color="dark" dark expand="md" className="border-bottom">
				<NavbarBrand href="/">Microblog</NavbarBrand>
				<NavbarToggler onClick={toggle} />
				<Collapse isOpen={isOpen} navbar>
					<Nav className="ml-auto" navbar>
						<NavItem>
							<NavLink exact to="/" className="nav-link">
								Blog
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink exact to="/new" className="nav-link">
								New Blog Post
							</NavLink>
						</NavItem>
					</Nav>
				</Collapse>
			</Navbar>
		</div>
	);
}

export default NavBar;
