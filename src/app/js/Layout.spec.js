import React from "react";
import LayoutWithConnect, { Layout } from "./Layout";
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';

describe("Layout tests", function() {
	let subject;
	beforeEach(() => {
		let movies = {
			featuredId: null,
			currentTitles: {
				movies: []
			}
		};
		let dispatchedAction;
		let dispatch = (action) => dispatchedAction = action;
		subject = shallow(<Layout movies={movies} dispatch={dispatch} />);
	});

	it("It should render app content wrap", () => {
		expect(subject.find('#content-wrap')).to.have.length(1);
	});
});
