import React from "react";
import { Link } from "react-router";

export default class Header extends React.Component {
	links() {
		const baseUrl = process.env.BASE_URL;

		return (
			<div>
				<Link to={ baseUrl + '/' }>Home</Link>
				<Link to={ baseUrl + '/about' }>About</Link>
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