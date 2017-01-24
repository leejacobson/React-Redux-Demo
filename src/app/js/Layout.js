import React from "react";
import { connect } from "react-redux";

import Header from "./components/Header";
import TMDB from "./lib/TMDB";

import { getMoviesInit, getMovies } from "./actions/movieActions";

import "../css/style.less";

class Layout extends React.Component {
	componentWillMount() {
		if (this.props.movies.currentTitles.movies.length == 0) {
			this.props.dispatch((dispatch) => {
				dispatch(getMoviesInit());
				var tmdbApi = new TMDB();
				tmdbApi.getCurrentReleases().success((result) => {
					dispatch(getMovies(result.data.results));
				});
			});
		}
	}

	render() {
		var bgImg = {};
		var { movies } = this.props;
		if (movies.featuredId != null || movies.currentTitles.complete) {
			var movieBg;
			if (movies.featuredId == null) {
				movieBg = movies.currentTitles.movies[0].backdrop_path;
			} else {
				movieBg = movies.movieInfo[movies.featuredId].info.backdrop_path;
			}
			var tmdbApi = new TMDB();
			bgImg = {
				backgroundImage: 'url("' + tmdbApi.getFullImageUrl(movieBg) + '")',
				backgroundSize: 'cover',
				backgroundPosition: 'center center',
			};
		}
		
		return (
			<div id="content-wrap">
			<div id="top-content-bg">
				<div className="bg-img" style={bgImg}></div>
				<div className="bottom"></div>
			</div>
			<Header/>
			{this.props.children}
			</div>
		);
	};
};

export default connect((store) => {
	return {
		movies: store.movies
	};
})(Layout);