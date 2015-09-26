var React = require('react');
var Bs = require('react-bootstrap');

var Navigation = React.createClass({displayName: "Navigation",
	render: function () {
		return (
			React.createElement(Bs.Navbar, {brand: "Survivor Fantasy League"}, 
				React.createElement(Bs.Nav, null, 
					React.createElement(Bs.NavItem, {eventKey: 'profile'}, 
						"Profile"
					), 
					React.createElement(Bs.NavItem, {eventKey: 'weekly'}, 
						"Weekly"
					), 
					React.createElement(Bs.NavItem, {eventKey: 'help'}, 
						"Help"
					)
				)
			)
		);
	}
	,
	navigate: function (target) {
		alert(target)
		this.props.navigate(target);
	}
});

module.exports = Navigation;
