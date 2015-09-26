var React = require('react');
var Bs = require('react-bootstrap');

var Navigation = React.createClass({displayName: "Navigation",
	render: function () {
		return (
			React.createElement(Bs.Navbar, {brand: "Survivor Fantasy League"}, 
				React.createElement(Bs.Nav, null, 
					React.createElement(Bs.NavItem, {eventKey: 1, onClick: this.navigate.bind(this, 1)}, 
						"Profile"
					), 
					React.createElement(Bs.NavItem, {eventKey: 2, onClick: this.navigate.bind(this, 2)}, 
						"Weekly"
					), 
					React.createElement(Bs.NavItem, {eventKey: 3, onClick: this.navigate.bind(this, 3)}, 
						"Help"
					)
				)
			)
		);
	}
	,
	navigate: function (item) {
		switch (item) {
			case 2:
			alert('clicked 2');
			default:

		}
	}
})
