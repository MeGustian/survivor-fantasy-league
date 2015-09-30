var React = require('react');

var AnswerTypes = {};

AnswerTypes.Contestants = React.createClass({displayName: "Contestants",
	render: function () {
		React.createElement("div", {className: "row"}, 
			this.thumbnails()
		)
	}
	,
	thumbnails: function () {
		var that = this;
		return this.props.tribes.map(function (contestant, id) {
			var name = contestant.get('firstName') + " " + contestant.get('lastName');
			return (
				React.createElement("div", {className: "col-xs-4 col-md-2", key: id}, 
					React.createElement("a", {onClick: that.props.changeAnswer.bind(that, contestant.get('name'))}, 
						React.createElement("img", {
							style: {marginRight: '0.25em', width: '40px', height: '40px'}, 
							src: "/images/contestants/" + name + ".jpg", 
							alt: name}
						), 
						name
					)
				)
			);
		});
	}
})
