import React from "react";
import { Link } from "react-router";

import pjson from '../../../../package.json'

export default class Header extends React.Component {
	links() {
		return (
			<div>
				<Link to={ pjson.baseUrl + '/' }>Home</Link>
				<Link to={ pjson.baseUrl + '/about' }>About</Link>
			</div>
		);
	}
	
	render() {
		return 	(
			<div>
				<div className="mobile-menu mobile-only">
					<this.links />
				</div>
				<div id="header" className="pad">
					<div className="title">
						Now Showing
					</div>
					<div className="links">
						<div className="desktop-only">
							<this.links />
						</div>
					</div>
				</div>
			</div>
		);
	};
}