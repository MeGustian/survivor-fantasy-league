var React = require('react');
var Bs = require('react-bootstrap');
var I = require('immutable');
var PropTypes = React.PropTypes;
var ImmutablePropTypes = require('react-immutable-proptypes');

var MyThumbnail = React.createClass({displayName: "MyThumbnail",
	shouldComponentUpdate: function (nextProps) {
		return !(this.props.selected === nextProps.selected);
	}
	,
	render: function () {
		var p = this.props;
		var that = this;
		var tooltip = React.createElement(Bs.Tooltip, null, p.name);
		return (
			React.createElement(Bs.OverlayTrigger, {placement: "top", overlay: tooltip, key: p.id, id: p.name}, 
				React.createElement(Bs.Thumbnail, {
					onClick: that.props.choose.bind(null, p.id), 
					src: "/images/contestants/thumbnails/" + p.name + ".jpg", 
					alt: p.name, 
					style: {display: 'inline-block', border: (p.selected ? "3px solid green" : ""), width: '80px', marginRight: '10px', marginLeft: '10px'}}
				)
			)
		);
	}
	,
	propTypes: {
		selected: PropTypes.bool.isRequired
		,
		name: PropTypes.string.isRequired
		,
		id: PropTypes.any.isRequired
	}
});

module.exports = MyThumbnail;
