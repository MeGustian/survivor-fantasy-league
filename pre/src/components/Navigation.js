var React = require('react');
var Bs = require('react-bootstrap');

var Navigation = React.createClass({
	render: function () {
		return (
			<Bs.Navbar brand="Survivor Fantasy League">
				<Bs.Nav onSelect={this.navigate}>
					<Bs.NavItem eventKey={'profile'}>
						Profile
					</Bs.NavItem>
					<Bs.NavItem eventKey={'weekly'}>
						Weekly
					</Bs.NavItem>
					<Bs.NavItem eventKey={'help'}>
						Help
					</Bs.NavItem>
				</Bs.Nav>
			</Bs.Navbar>
		);
	}
	,
	navigate: function (target) {
		this.props.navigate(target);
	}
});

module.exports = Navigation;
