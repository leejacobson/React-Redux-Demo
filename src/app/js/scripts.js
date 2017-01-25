import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router, Route, IndexRoute, browserHistory } from "react-router";

import store from "./store";

import Layout from "./Layout";
import Index from "./components/pages/Index";
import About from "./components/pages/About";

const baseUrl = process.env.BASE_URL;

ReactDOM.render(
	<Provider store={store}>
		<Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}>
			<Route path={baseUrl + "/"} component={Layout}>
				<IndexRoute component={Index}></IndexRoute>
				<Route path={baseUrl + "/movie/:movie/:movieId"} component={Index}></Route>
				<Route path={baseUrl + "/about"} component={About}></Route>
			</Route>
		</Router>
	</Provider>,
document.getElementById('app'));