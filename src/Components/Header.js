import React from 'react';
import { Jumbotron } from 'reactstrap';

function Header() {
	return (
		<div>
			<Jumbotron fluid className="bg-dark text-center text-light">
				<h1 className="display-3">Microblog</h1>
				<p>Like a blog, but one one-millionth the size!!</p>
			</Jumbotron>
		</div>
	);
}

export default Header;
