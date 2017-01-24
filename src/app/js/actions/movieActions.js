export function getMoviesInit() {
	return {type: "GET_MOVIES_INIT"};
}

export function getMovies(movies) {
	return {type: "GET_MOVIES", payload: movies};
}

export function getFeaturedInit(movieId) {
	return {
		type: "GET_FEATURED_INIT",
		payload: {
			movieId: movieId,
		},
	};
}

export function getFeaturedInfo(movieId, movieInfo) {
	return {
		type: "GET_FEATURED_INFO",
		payload: {
			movieId: movieId,
			info: movieInfo,
		},
	};
}

export function setFeatured(movieId) {
	return {
		type: "SET_FEATURED",
		payload: movieId
	};
}

export function getMovieImagesInit(movieId) {
	return {
		type: "GET_MOVIES_IMAGES_INIT",
		payload: movieId,
	};
}

export function getMovieImages(movieId, images) {
	return {
		type: "GET_MOVIES_IMAGES",
		payload: {
			movieId: movieId,
			images: images,
		},
	};
}