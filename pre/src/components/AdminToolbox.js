var React = require('react');

var toolToGlyphcon = {
	'edit': "pencil",
	'remove': "remove",
	'add': "plus",
	'approve': "ok",
	'discard': "pencil"
};

// I am using the AdminToolbox for the `add` which has an adjacent dropdown,
// hence the state and the wierd `if` statement. This solution is not ideal.
var AdminToolbox = React.createClass({
	getInitialState: function () {
		return {
			type: 'boolean'
		};
	}
	,
	render: function () {
		var glyphicon = toolToGlyphcon[this.props.tool];
		if (this.props.tool === 'add') {
			return (
				<div className="btn-group" role="group" aria-label="...">
					<button type="button" className="btn btn-default btn-lg" onClick={this.props.handleClick.bind(null, this.state.type)}>
						<span className={"glyphicon glyphicon-" + glyphicon} aria-hidden="true"></span>
					</button>
					<div className="btn-group" role="group" aria-label="...">
						<button type="button" className="btn btn-default btn-lg dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							{this.state.type + " "}
							<span className="caret"></span>
						</button>
						<ul className="dropdown-menu">
							<li onClick={this.chooseType.bind(this, 'boolean')}><a>{"boolean"}</a></li>
							<li onClick={this.chooseType.bind(this, 'contestant')}><a>{"contestant"}</a></li>
						</ul>
					</div>
				</div>
			);
		}
		return (
			<button type="button" className="btn btn-default btn-sm" onClick={this.props.handleClick}>
				<span className={"glyphicon glyphicon-" + glyphicon} aria-hidden="true"></span>
			</button>
		);
	}
	,
	chooseType: function (type) {
		this.setState({type: type});
	}
});

module.exports = AdminToolbox;
