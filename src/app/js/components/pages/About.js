import React from "react";

export default class About extends React.Component {
	render() {
		return (
			<div className="pad">
			<h1>About</h1>
			<p>This demo React/Dedux app was built by <a href="http://www.leejacobson.co.uk/" target="_black">Lee Jacobson</a> using <a href="https://www.themoviedb.org/documentation/api" target="_blank">TMDB's API</a>.</p>
			<p>GitHub: <a href="https://github.com/leejacobson/React-Redux-Demo/">https://github.com/leejacobson/React-Redux-Demo/</a><br />
			Contact: lee [at] leejacobson.co.uk</p>
			</div>
		);
	}
}