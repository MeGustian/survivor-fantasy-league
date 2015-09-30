var React = require('react');
var Bs = require('react-bootstrap');

var MyThumbnail = React.createClass({displayName: "MyThumbnail",
	shouldComponentUpdate: function (nextProps) {
		var equal = I.is(this.props.correct, nextProps.correct);
		return !equal;
	}
	,
	render: function () {
		var p = this.props;
		var that = this;
		var tooltip = React.createElement(Bs.Tooltip, null, p.name);
		return (
			React.createElement(Bs.OverlayTrigger, {placement: "top", overlay: tooltip, key: p.id}, 
				React.createElement(Bs.Thumbnail, {
					onClick: that.choose.bind(that, (p.correct ? null : p.id)), 
					src: "/images/contestants/" + p.name + ".jpg", 
					alt: p.name, 
					style: {border: (p.correct ? "3px solid green" : ""), width: '80px', height: '80px', marginRight: '20px', marginLeft: '5px'}}
				)
			)
		);
	}
	,
	choose: function (id) {
		this.props.changeAnswer(id);
	}
});

module.exports = MyThumbnail;
