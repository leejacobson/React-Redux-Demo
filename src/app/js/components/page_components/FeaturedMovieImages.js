import React from "react";
import { connect } from "react-redux";

import { getMovieImagesInit, getMovieImages } from "../../actions/movieActions";
import TMDB from "../../lib/TMDB";

class FeaturedMovieImages extends React.Component {
	state = {
		showModalImage: false,
		modalImageUrl: null,
	}

	
	componentWillMount() {
		this.getImages();
	}
	componentDidUpdate() {
		this.getImages();
	}
	
	getImages() {
		var { movieInfo, featuredId } = this.props.movies;
		if (movieInfo[featuredId].images == undefined 
			|| (!movieInfo[featuredId].images.loading && !movieInfo[featuredId].images.complete)
		) {
			this.props.dispatch((dispatch) => {
				dispatch(getMovieImagesInit(featuredId));
				var tmdb = new TMDB();
				tmdb.getMovieImages(featuredId).success((success) => {
					dispatch(getMovieImages(featuredId, success.data));
				});
			});
		}
	}
	
	showImage(image) {
		if (image == undefined) {
			this.setState({
				showModalImage: false,
				modalImageUrl: null,
			});
		} else {
			this.setState({
				showModalImage: true,
				modalImageUrl: image,
			});
		}
	}

	render() {
		var { movieInfo, featuredId } = this.props.movies;
		if (movieInfo[featuredId].images == undefined || !movieInfo[featuredId].images.complete) {
			return null;
		}
		
		var tmdb = new TMDB();
		return (
			<div>
			{ this.state.showModalImage && 
				<div id="featured-image-popup-modal" onClick={ () => this.showImage() }>
					<div><span><img src={this.state.modalImageUrl} /></span></div>
				</div> 
			}
			<h2>Images</h2><br />
			<div className="featuredImages">{
				movieInfo[featuredId].images.images.backdrops.map((image, i) => {
					return (<span key={ i }><img 
						onClick={ () => { this.showImage(tmdb.getFullImageUrl(image.file_path, "w780")) } }
						src={ tmdb.getFullImageUrl(image.file_path, "w300") } /></span>);
				})
			}</div>
			</div>
		);
	}
}

export default connect((store) => {
	return {
		movies: store.movies
	};
})(FeaturedMovieImages);