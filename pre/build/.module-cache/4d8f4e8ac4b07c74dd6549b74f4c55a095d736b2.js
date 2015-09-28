var React = require('react');
var Bs = require('react-bootstrap');

var Navigation = React.createClass({displayName: "Navigation",
	render: function () {
		return (
			React.createElement(Bs.Navbar, {brand: "Survivor Fantasy League", toggleNavKey: 0}, 
			React.createElement(Bs.CollapsibleNav, {eventKey: 0}, 
				React.createElement(Bs.Nav, {onSelect: this.navigate}, 
					React.createElement(Bs.Nav, {navbar: true}, 
						React.createElement(Bs.NavItem, {eventKey: 'profile'}, 
							"Profile"
						), 
						React.createElement(Bs.NavDropdown, {title: 'Weekly', eventKey: 'weekly'}, 
							React.createElement(Bs.MenuItem, {eventKey: 'upcoming'}, "The upcoming week"), 
							React.createElement(Bs.MenuItem, {eventKey: 'previous'}, "The previous week")
						)
					), 
					React.createElement(Bs.Nav, {navbar: true, right: true}, 
						React.createElement(Bs.NavItem, {eventKey: 'help'}, 
							"Help"
						), 
						React.createElement(Bs.NavItem, {eventKey: 'sign-out'}, 
							"Sign Out"
						)
					)
				)
			)
			)
		);
	}
	,
	navigate: function (target) {
		console.log(target);
		if (target === 'sign-out') {
			window.location.replace('/sign-out');
		} else {
			this.props.navigate(target);
		}
	}
});

module.exports = Navigation;
