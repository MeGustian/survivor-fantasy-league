var React = require('react');
var Bs = require('react-bootstrap');

var Navigation = React.createClass({displayName: "Navigation",
	render: function () {
		React.createElement(Bs.Navbar, {brand: "Survivor Fantasy League"}, 
			React.createElement(Bs.Nav, null, 
				React.createElement(Bs.NavItem, {eventKey: 1}, 
					"Profile"
				), 
				React.createElement(Bs.NavItem, {eventKey: 2}, 
					"Weekly"
				), 
				React.createElement(Bs.NavItem, {eventKey: 3}, 
					"Help"
				)
			)
		)
	}
})
