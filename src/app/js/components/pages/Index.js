import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router";

import FeaturedMovie from "../page_components/FeaturedMovie";

import TMDB from "../../lib/TMDB";

class Index extends React.Component {
	render() {
		const baseUrl = process.env.BASE_URL;
		
		var tmdbApi = new TMDB();
		return (
			<div>
				<FeaturedMovie featuredMovie={ this.props.params.movieId } />
				<div className="pad"><h2>Other Showing Movies</h2><br />
					<div className="center">
					{this.props.movies.currentTitles.movies.map(function(movie) {
						var bgImg = {
							backgroundImage: 'url("' + tmdbApi.getFullImageUrl(movie.backdrop_path, "w300") + '")',
							backgroundSize: 'cover',
							backgroundPosition: 'center center',
						};
						return <Link key={movie.id} className="movie-box-link" to={
							baseUrl + "/movie/" + movie.title.toLowerCase().replace(/[^a-z\s]/g, '').replace(/[\s]/g, "-") + "/"+movie.id
						}><span style={bgImg} className="bg"></span><span className="darken"><span>{movie.title.trim()}</span></span></Link>;
					})}
					</div>
				</div>
			</div>
		);
	}
};

export default connect((store) => {
	return {
		movies: store.movies
	};
})(Index);