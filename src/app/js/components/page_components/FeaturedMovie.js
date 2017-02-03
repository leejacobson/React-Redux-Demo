import React from "react";
import { connect } from "react-redux";

import FeaturedMovieImages from "./FeaturedMovieImages";
import FeaturedMovieCredits from "./FeaturedMovieCredits";
import { getFeaturedInit, getFeaturedInfo, setFeatured } from "../../actions/movieActions";
import TMDB from "../../lib/TMDB";

class FeaturedMovie extends React.Component {
	componentWillMount() {
		this.getFeaturedTitle();
	}
	componentDidUpdate() {
		this.getFeaturedTitle();
	}

	getFeaturedTitle() {
		let featuredTitle;

		const { currentTitles } = this.props.movies;
		if (currentTitles.movies.length == 0) {
			return null;
		}

		if (this.props.featuredMovie !== undefined) {
			featuredTitle = currentTitles.movies.find((movie) => {
				return movie.id == parseInt(this.props.featuredMovie);
			});
		}

		if (featuredTitle === undefined) {
			featuredTitle = currentTitles.movies[0];
		}

		const { movieInfo } = this.props.movies;
		if (movieInfo[featuredTitle.id] == undefined 
			|| (!movieInfo[featuredTitle.id].loading && !movieInfo[featuredTitle.id].complete)
		) {
			this.props.dispatch((dispatch) => {
				dispatch(getFeaturedInit(featuredTitle.id));
				const tmdb = new TMDB();
				tmdb.getMovieInfo(featuredTitle.id).success((success) => {
					dispatch(getFeaturedInfo(featuredTitle.id, success.data));
				});
			});
		}
		
		if (featuredTitle.id != this.props.movies.featuredId && movieInfo[featuredTitle.id] != undefined && movieInfo[featuredTitle.id].complete) { 
			this.props.dispatch(setFeatured(featuredTitle.id));
		}

	}
	
	render() {
		if (this.props.movies.featuredId == undefined) {
			return null;
		}

		const { featuredId, movieInfo } = this.props.movies;

		if (movieInfo[featuredId] !== undefined && movieInfo[featuredId].complete) {
			const featuredMovieInfo = movieInfo[featuredId].info;
			return (
				<div id="movie-info-wrap" className="pad">
					<h1>{ featuredMovieInfo.title }</h1><br />
					<div className="half large">
						<div className="right-pad">
							<div>{ featuredMovieInfo.overview }</div>
						</div><br />
					</div>
					<div className="half">
						<table><tbody><tr><td><b>Genre: </b></td><td>{ 
								featuredMovieInfo.genres.map(function(genre, index) { 
									return genre.name + (index < featuredMovieInfo.genres.length-1 ? " / " : "");
								}) 
							}</td></tr>
							<tr><td><b>Rating: </b></td><td>{ featuredMovieInfo.vote_average }/10</td></tr>
							<tr><td><b>Release Date: </b></td><td>{ featuredMovieInfo.release_date }</td></tr>
							{featuredMovieInfo.homepage &&
								<tr>
									<td><b>Homepage: </b></td>
									<td><a target="_blank" href={ featuredMovieInfo.homepage }>{ featuredMovieInfo.homepage }</a></td>
								</tr>
							}</tbody></table><br />
					</div>
					<div className="clear"></div>
					<FeaturedMovieCredits/>
					<FeaturedMovieImages/>
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
})(FeaturedMovie);