import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router, Route, IndexRoute, browserHistory } from "react-router";

import store from "./store";

import Layout from "./Layout";
import Index from "./components/pages/Index";
import About from "./components/pages/About";

import pjson from '../../../package.json'

ReactDOM.render(
	<Provider store={store}>
		<Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}>
			<Route path={pjson.baseUrl + "/"} component={Layout}>
				<IndexRoute component={Index}></IndexRoute>
				<Route path={pjson.baseUrl + "/movie/:movie/:movieId"} component={Index}></Route>
				<Route path={pjson.baseUrl + "/about"} component={About}></Route>
			</Route>
		</Router>
	</Provider>,
document.getElementById('app'));