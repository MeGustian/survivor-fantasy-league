var React = require('react');
var Bs = require('react-bootstrap');
var I = require('immutable');
var PropTypes = React.PropTypes;
var ImmutablePropTypes = require('react-immutable-proptypes');

var MyThumbnail = React.createClass({displayName: "MyThumbnail",
	shouldComponentUpdate: function (nextProps) {
		return I.is(this.props.selected, nextProps.selected);
	}
	,
	render: function () {
		var p = this.props;
		var that = this;
		var tooltip = React.createElement(Bs.Tooltip, null, p.name);
		return (
			React.createElement(Bs.OverlayTrigger, {placement: "top", overlay: tooltip, key: p.id}, 
				React.createElement(Bs.Thumbnail, {
					onClick: that.choose.bind(that, (p.selected ? null : p.id)), 
					src: "/images/contestants/" + p.name + ".jpg", 
					alt: p.name, 
					style: {border: (p.selected ? "3px solid green" : ""), width: '80px', height: '80px', marginRight: '20px', marginLeft: '5px'}}
				)
			)
		);
	}
	,
	choose: function (id) {
		this.props.changeAnswer(id);
	}
	,
	propTypes: {
		selected: PropTypes.oneOfType([PropTypes.string, ImmutablePropTypes.listOf(PropTypes.string)])
		,
		name: PropTypes.string.isRequired
		,
		id: PropTypes.string.isRequired
	}
});

module.exports = MyThumbnail;
