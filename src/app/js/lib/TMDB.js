import axios from "axios";

export default class TMDB {	
	constructor() {
		// https://www.themoviedb.org/documentation/api
		const baseUrl = process.env.TMDB_API_KEY;
		this.API_KEY = baseUrl;

		this.imageUrl = "http://image.tmdb.org/t/p/";
		this.backdrop_sizes = ["w300","w780","w1280","original"];
		this.logo_sizes = ["w45","w92","w154","w185","w300","w500","original"];
		this.poster_sizes = ["w92","w154","w185","w342","w500","w780","original"];
		this.profile_sizes = ["w45","w185","h632","original"];
		this.still_sizes = ["w92","w185","w300","original"];
	}

	getCurrentReleases() {
		return this.get('movie/now_playing');
	}
	
	getMovieInfo(movieId) {
		return this.get('movie/' + movieId);
	}
	
	getMovieImages(movieId) {
		return this.get('movie/' + movieId + '/images');
	}

	get(resource, params) {
		var tmdbRequest = new TMDBRequest(this.API_KEY);
		tmdbRequest.makeRequest(resource, params);
		return tmdbRequest;
	}

	getFullImageUrl(image, size = "original") {
		return this.imageUrl + size + image;
	}
}

class TMDBRequest {
	constructor(apiKey) {
		this.apiKey = apiKey;
		
		this.apiUrl = "https://api.themoviedb.org/3/";
		
		this.success;
		this.error;
	}

	toQueryString(params={}) {
		var queryString = [];
		if (Object.keys(params).length > 0) {
			for (let key in params) {
				queryString.push(encodeURIComponent(key) + "=" + encodeURIComponent(params[key]));
			}
		}
		
		if (Object.keys(queryString).length > 0) {
			return "&" + queryString.join('&');
		} else {
			return "";
		}
	}	
	
	makeRequest(resource, params) {
		axios.get(this.apiUrl
			+ resource
			+ "?api_key=" + this.apiKey
			+ this.toQueryString(params)
		).then((response) => {
			if (typeof this.success === "function") {
				this.success(response);
			}
		}).catch((err) => {
			console.error(err);
			if (err.response != undefined) {
				console.error(err.response.data.status_message);
			}
			if (typeof this.error === "function") {
				this.error(err);
			}
		});

		return this;
	}
	
		
	success(callback) {
		this.success = callback;
		return this;
	}
	
	error(callback) {
		this.error = callback;
		return this;
	}
}