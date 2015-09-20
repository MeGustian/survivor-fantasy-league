var React = require('react');

var toolToGlyphcon = {
	'edit': "pencil",
	'remove': "remove",
	'add': "plus",
	'approve': "ok",
	'discard': "pencil"
}

var AdminToolbox = React.createClass({
	render: function () {
		var glyphicon = toolToGlyphcon[this.props.tool];
		return (
			<button type="button" className="btn btn-default btn-sm" onClick={this.props.handleClick}>
				<span className={"glyphicon glyphicon-" + glyphicon} aria-hidden="true"></span>
			</button>
		);
	}
});

module.exports = AdminToolbox;
