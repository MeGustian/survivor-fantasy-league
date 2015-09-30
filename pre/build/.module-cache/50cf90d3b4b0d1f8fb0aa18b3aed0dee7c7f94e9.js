var React = require('react');
var Bs = require('react-bootstrap');
var I = require('immutable');

var Profile = React.createClass({displayName: "Profile",
	render: function () {
		return (
			React.createElement(Bs.Row, null, 
				React.createElement(Bs.Col, {sm: 12, md: 10, mdOffset: 1}, 
				React.createElement("div", {style: {maxWidth: 900, maxHeight: 500, margin: '0 auto'}}, 
					React.createElement(Choices, {chosen: this.props.chosen, info: this.props.info})
				)
				)
			)
		);
	}
});

var Options = React.createClass({displayName: "Options",
	shouldComponentUpdate: function (prevProps) {

	}
})

var Choices = React.createClass({displayName: "Choices",
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
		return this.props.info
			.filter(function (contestant, id) {
				return that.props.chosen.has(id);
			})
			.map(function (contestant, id) {
				var name = contestant.get('firstName') + " " + contestant.get('lastName');
				return (
					React.createElement(Bs.CarouselItem, {key: id}, 
						React.createElement("img", {width: 900, height: 500, style: {width: 900, height: 500}, alt: name}), 
						React.createElement("div", {className: "carousel-caption"}, 
							React.createElement("h3", null, name)
						)
					)
				);
			})
			.toJS();
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
