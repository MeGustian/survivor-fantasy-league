var React = require('react');
var Bs = require('react-bootstrap');

var Navigation = React.createClass({displayName: "Navigation",
	render: function () {
		return (
			React.createElement(Bs.Navbar, {brand: "Survivor Fantasy League", bsStyle: "primary"}, 
				React.createElement(Bs.Nav, null, 
					React.createElement(Bs.NavItem, {eventKey: 1, onClick: this.navigate.bind(this, 'profile')}, 
						"Profile"
					), 
					React.createElement(Bs.NavItem, {eventKey: 2, onClick: this.navigate.bind(this, 'weekly')}, 
						"Weekly"
					), 
					React.createElement(Bs.NavItem, {eventKey: 3, onClick: this.navigate.bind(this, 'help')}, 
						"Help"
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
