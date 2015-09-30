var React = require('react/addons');
var Bs = require('react-bootstrap');
var I = require('immutable');
var MyThumbnail = require('./MyThumbnail');

var Profile = React.createClass({displayName: "Profile",
	render: function () {
		if (this.props.submittedChoices) {
			return (
				React.createElement("div", null, 
				React.createElement(Bs.Row, null, 
					React.createElement(Bs.Col, {sm: 12, md: 10, mdOffset: 1}, 
					React.createElement("div", {style: {maxWidth: 900, maxHeight: 500, margin: '0 auto'}}, 
						React.createElement(Final, {chosen: this.props.chosen, info: this.props.info})
					)
					)
				)
				)
			);
		}
		return (
			React.createElement("div", null, 
			React.createElement(Bs.Row, null, 
				React.createElement(Bs.Col, {sm: 12, md: 10, mdOffset: 1}, 
				React.createElement("div", null, 
					React.createElement(Bs.Alert, {bsStyle: "info"}, 
						"Please select the ", React.createElement("strong", null, "4"), " contestants you wish to follow throughout the season."
					), 
					React.createElement(Bs.Alert, {bsStyle: "warning"}, 
						React.createElement("strong", null, "Notice:"), " Submitting choices is permanent!"
					), 
					React.createElement(Options, {chosen: this.props.chosen, info: this.props.info, selector: this.props.selector})
				)
				)
			), 
			React.createElement(Bs.Row, null, 
				React.createElement(Bs.Col, {sm: 12, md: 10, mdOffset: 1}, 
					React.createElement(Selected, {chosen: this.props.chosen, info: this.props.info})
				)
			)
			)
		);
	}
});

var Options = React.createClass({displayName: "Options",
	shouldComponentUpdate: function (prevProps) {
		return !I.is(this.props.chosen, prevProps.chosen);
	}
	,
	render: function () {
		var style = {
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'flex-start',
			flexWrap: 'no-wrap',
			alignItems: 'flex-basis',
			overflow: 'scroll'
		};
		return (
			React.createElement("div", {style: {margin: 'auto', width: 'auto'}}, 
				this.items()
			)
		);
	}
	,
	items: function () {
		var that = this;
		return React.addons.createFragment(
			that.props.info
				.map(function (contestant, id) {
					var name = contestant.get('firstName') + " " + contestant.get('lastName');
					var isChosen = that.props.chosen.has(id);
					return (
						React.createElement(MyThumbnail, {key: id, id: id, selected: isChosen, name: name, choose: that.select})
					);
				})
				.toJS()
		);
	}
	,
	select: function (id) {
		this.props.selector(id);
	}
})

var Selected = React.createClass({displayName: "Selected",
	shouldComponentUpdate: function (prevProps) {
		return !I.is(this.props.chosen, prevProps.chosen);
	}
	,
	render: function () {
		return (
			React.createElement(Bs.Carousel, null, 
				this.items()
			)
		);
	}
	,
	items: function () {
		var that = this;
		return React.addons.createFragment(
			that.props.info
				.filter(function (contestant, id) {
					return that.props.chosen.has(id);
				})
				.map(function (contestant, id) {
					return (
						React.createElement(Contestant, {
							contestant: id, 
							name: contestant.get('firstName') + " " + contestant.get('lastName'), 
							age: contestant.get('age'), 
							occupation: contestant.get('occupation'), 
							previousSeason: contestant.get('previousSeason'), 
							place: contestant.get('place')}
						)
					);
				})
				.toJS()
		);
	}
});

var Final = React.createClass({displayName: "Final",
	shouldComponentUpdate: function (prevProps) {
		return !I.is(this.props.chosen, prevProps.chosen);
	}
	,
	render: function () {
		return (
			React.createElement(Bs.Carousel, null, 
				this.items()
			)
		);
	}
	,
	items: function () {
		var that = this;
		return React.addons.createFragment(
			that.props.info
				.filter(function (contestant, id) {
					return that.props.chosen.has(id);
				})
				.map(function (contestant, id) {
					var name = contestant.get('firstName') + " " + contestant.get('lastName');
					return (
						React.createElement(Bs.CarouselItem, {key: id}, 
							React.createElement("img", {width: 900, height: 500, style: {width: 900, height: 500}, alt: name, 
								src: "/images/contestants/slides/" + name + ".jpg"}
							), 
							React.createElement("div", {className: "carousel-caption"}, 
								React.createElement("h3", null, name)
							)
						)
					);
				})
				.toJS()
		);
	}
});

// var MyCarouselItem = React.createClass({
// 	shouldComponentUpdate: function (prevProps) {
// 		return true;
// 	}
// 	,
// 	render: function () {
// 		return (
//
// 		);
// 	}
// })

module.exports = Profile;
