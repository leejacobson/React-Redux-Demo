import React from "react";
import { connect } from "react-redux";

import Header from "./components/Header";
import TMDB from "./lib/TMDB";

import { getMoviesInit, getMovies } from "./actions/movieActions";

import "../css/style.less";

class Layout extends React.Component {
	constructor() {
		super();
		this.loadingBgImgs = [];
	}
	
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
		var bgImgStyle = {};
		var { movies } = this.props;
		if (movies.featuredId != null || movies.currentTitles.complete) {
			var movieBg;
			if (movies.featuredId == null) {
				movieBg = movies.currentTitles.movies[0].backdrop_path;
			} else {
				movieBg = movies.movieInfo[movies.featuredId].info.backdrop_path;
			}

			var tmdbApi = new TMDB();
			var bgImgSrc = tmdbApi.getFullImageUrl(movieBg);
			bgImgStyle = {
				backgroundImage: 'url("' + bgImgSrc + '")',
				backgroundSize: 'cover',
				backgroundPosition: 'center center',
				opacity: '0',
			};
			this.prettyBGLoad(bgImgSrc, 'bg-img');
		}

		return (
			<div id="content-wrap">
			<div id="top-content-bg">
				<div id="bg-img" style={bgImgStyle}></div>
				<div className="bottom"></div>
			</div>
			<Header/>
			{this.props.children}
			</div>
		);
	}
	
	prettyBGLoad(imgUrl, ele) {
		if (!this.loadingBgImgs.find((i) => i == imgUrl)) {		
			var nwImg = new Image();
			nwImg.src = imgUrl;
			nwImg.onload = () => {
				document.getElementById(ele).style.opacity = '0.5';
				this.loadingBgImgs.pop(imgUrl);
			}
			this.loadingBgImgs.push(imgUrl);
		}
	}
};

export default connect((store) => {
	return {
		movies: store.movies
	};
})(Layout);