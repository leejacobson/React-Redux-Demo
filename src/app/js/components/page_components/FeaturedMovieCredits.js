import React from "react";
import { connect } from "react-redux";

import { getMovieCreditsInit, getMovieCredits } from "../../actions/movieActions";
import TMDB from "../../lib/TMDB";

class FeaturedMovieCredits extends React.Component {
	componentWillMount() {
		this.getCredits();
	}
	componentDidUpdate() {
		this.getCredits();
	}

	getCredits() {
		var { movieInfo, featuredId } = this.props.movies;
		if (movieInfo[featuredId] == undefined) {
			return;
		}

		if (!movieInfo[featuredId].credits.loading && !movieInfo[featuredId].credits.complete) {
			this.props.dispatch((dispatch) => {
				dispatch(getMovieCreditsInit(featuredId));
				const tmdb = new TMDB();
				tmdb.getMovieCredits(featuredId).success((success) => {
					dispatch(getMovieCredits(featuredId, success.data));
				});
			});
		}
	}

	render() {
		var { movieInfo, featuredId } = this.props.movies;
		if (movieInfo[featuredId] != undefined && movieInfo[featuredId].credits.complete) {
			return (
				<div>
				<div className="half">
					<h2>Cast</h2><br />
					<table><tbody>{
					movieInfo[featuredId].credits.creditsList.cast.slice(0, 8).map(function(credit){
						return <tr key={credit.id}><td><b>{ credit.character }: </b></td><td>{ credit.name }</td></tr>
					})
					}</tbody></table><br />
				</div>
				<div className="half">
					<h2>Crew</h2><br />
					<table><tbody>{
					movieInfo[featuredId].credits.creditsList.crew.slice(0, 8).map(function(credit){
						return <tr key={credit.id}><td><b>{ credit.job } ({ credit.department }): </b></td><td>{ credit.name }</td></tr>
					})
					}</tbody></table><br />
				</div>
				<div className="clear"></div>
				</div>
			);
		}

		return null;
	}
}

export default connect((store) => {
	return {
		movies: store.movies
	};
})(FeaturedMovieCredits);