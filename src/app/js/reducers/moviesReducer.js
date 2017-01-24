const defaultState = {
	currentTitles: {
		loading: false,
		complete: false,
		movies: []
	},
	movieInfo: {},
	featuredId: null,
};

var moviesReducer = (state=defaultState, action) => {
	console.log(action.type);
	switch (action.type) {
		case "GET_MOVIES_INIT": {
			return {
				...state,
				currentTitles: {
					loading: true,
					complete: false,
					movies: [],
				}
			};
		}
		case "GET_MOVIES": {			
			return {
				...state,
				currentTitles: {
					loading: false,
					complete: true,
					movies: action.payload,
				}
			};
		}
		case "GET_FEATURED_INIT": {
			var newMovieInfo = {...state.movieInfo};
			newMovieInfo[action.payload.movieId] = {
				loading: true,
				complete: false,
				info: {},
			}
			return {
				...state,
				movieInfo: newMovieInfo,
			};
		}
		case "GET_FEATURED_INFO": {
			var newMovieInfo = {...state.movieInfo};
			newMovieInfo[action.payload.movieId] = {
				loading: false,
				complete: true,
				info: action.payload.info,
			}
			return {
				...state,
				movieInfo: newMovieInfo,
			};
		}
		case "SET_FEATURED": {
			return {
				...state,
				featuredId: action.payload,
			};
		}
		case "GET_MOVIES_IMAGES_INIT": {
			var newMovieInfo = {...state.movieInfo};
			newMovieInfo[action.payload].images = {
				loading: true,
				complete: false,
				images: {},
			};
			return {
				...state,
				movieInfo: newMovieInfo,
			};
		}
		case "GET_MOVIES_IMAGES": {
			var newMovieInfo = {...state.movieInfo};
			newMovieInfo[action.payload.movieId].images = {
				loading: false,
				complete: true,
				images: action.payload.images,
			}
			return {
				...state,
				movieInfo: newMovieInfo,
			};
		}
	}
	return state;
};

export default moviesReducer;