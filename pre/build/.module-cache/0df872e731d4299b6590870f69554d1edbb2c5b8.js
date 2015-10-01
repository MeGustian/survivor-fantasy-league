var React = require('react');
var Bs = require('react-bootstrap');
var I = require('immutable');
var PropTypes = React.PropTypes;
var ImmutablePropTypes = require('react-immutable-proptypes');
var nameToImg = require('../helpers/image-name')('contestant');

var MyThumbnail = React.createClass({displayName: "MyThumbnail",
	shouldComponentUpdate: function (nextProps) {
		return !(
			this.props.disabled === nextProps.disabled &&
			this.props.selected === nextProps.selected &&
			this.props.emphasized === nextProps.emphasized &&
			this.props.muted === nextProps.muted
		);
	}
	,
	render: function () {
		var p = this.props;
		var that = this;
		var tooltip = React.createElement(Bs.Tooltip, null, p.name);
		return (
			React.createElement(Bs.OverlayTrigger, {placement: "top", overlay: tooltip, key: p.id, id: p.name}, 
				React.createElement(Bs.Thumbnail, {
					onClick: that.props.choose && that.props.choose.bind(null, p.id), 
					src: nameToImg(p.name), 
					alt: p.name, 
					style: {display: 'inline-block', border: (p.selected ? "3px solid green" : ""), width: '80px', marginBottom: '3px', marginRight: '10px', marginLeft: '10px', opacity: p.disabled ? '0.5' : ''}}
				)
			)
		);
	}
	,
	propTypes: {
		selected: PropTypes.bool
		,
		emphasized: PropTypes.bool
		,
		disabled: PropTypes.bool
		,
		name: PropTypes.string.isRequired
		,
		id: PropTypes.any.isRequired
		,
		choose: PropTypes.func
	}
});

module.exports = MyThumbnail;
