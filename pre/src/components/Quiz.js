var React = require('react');
var Bs = require('react-bootstrap');
var AdminToolbox = require('./AdminToolbox');
var AnswerTypes = require('./AnswerTypes');

module.exports = React.createClass({
	render: function () {
		return (
			<Bs.Row>
				<Bs.Col xs={12} sm={10} smOffset={1} md={8} mdOffset={2}>
					<Bs.Panel header="some q?">
						some a
					</Bs.Panel>
					<Bs.Pager>
						<Bs.PageItem previous>Previous</Bs.PageItem>
						<Bs.PageItem next>Next</Bs.PageItem>
					</Bs.Pager>
				</Bs.Col>
			</Bs.Row>
		);
	}
})
