var React = require('react');
var Bs = require('react-bootstrap');

var Navigation = React.createClass({displayName: "Navigation",
	render: function () {
		return (
			React.createElement(Bs.Navbar, {brand: "Survivor Fantasy League"}, 
				React.createElement(Bs.Nav, {onSelect: this.navigate}, 
					React.createElement(Bs.NavItem, {eventKey: 'profile'}, 
						"Profile"
					), 
					React.createElement(Bs.NavItem, {eventKey: 'weekly'}, 
						"Weekly"
					), 
					React.createElement(Bs.NavItem, {eventKey: 'help'}, 
						"Help"
					), 
					React.createElement(Bs.Nav, {right: true}, 
						React.createElement(Bs.NavItem, {href: "/sign-out"}, 
							"Sign Out"
						)
					)
				)
			)
		);
	}
	,
	navigate: function (target) {
		this.props.navigate(target);
	}
});

module.exports = Navigation;
