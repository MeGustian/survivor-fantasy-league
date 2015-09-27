var React = require('react');
var Bs = require('react-bootstrap');

var Navigation = React.createClass({
	render: function () {
		return (
			<Bs.Navbar brand="Survivor Fantasy League" toggleNavKey={0}>
			<Bs.CollapsibleNav eventKey={0}>
				<Bs.Nav onSelect={this.navigate}>
					<Bs.Nav navbar>
						<Bs.NavItem eventKey={'profile'}>
							Profile
						</Bs.NavItem>
						<Bs.NavItem eventKey={'weekly'}>
							Weekly
						</Bs.NavItem>
					</Bs.Nav>
					<Bs.Nav navbar right>
						<Bs.NavItem eventKey={'help'}>
							Help
						</Bs.NavItem>
						<Bs.NavItem eventKey={'sign-out'}>
							Sign Out
						</Bs.NavItem>
					</Bs.Nav>
				</Bs.Nav>
			</Bs.CollapsibleNav>
			</Bs.Navbar>
		);
	}
	,
	navigate: function (target) {
		if (target === 'sign-out') {
			window.location.replace('/sign-out');
		} else {
			this.props.navigate(target);
		}
	}
});

module.exports = Navigation;
