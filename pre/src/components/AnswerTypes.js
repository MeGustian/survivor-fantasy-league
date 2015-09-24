var React = require('react');
var Bs = require('react-bootstrap');

var AnswerTypes = {};

AnswerTypes.Contestants = React.createClass({
	render: function () {
		var style = {
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'flex-start',
			flexWrap: 'wrap',
			alignItems: 'flex-basis'
		};
		return (
			<div style={style}>
				{this.thumbnails()}
			</div>
		);
	}
	,
	thumbnails: function () {
		var that = this;
		return this.props.tribes.map(function (contestant, id) {
			var name = contestant.get('firstName') + " " + contestant.get('lastName');
			var tooltip = <Bs.Tooltip>{name}</Bs.Tooltip>;
			return (
				<Bs.OverlayTrigger placement="top" overlay={tooltip} key={id}>
					<Bs.Thumbnail
						onClick={that.choose.bind(that, id)}
						src={"/images/contestants/" + name + ".jpg"}
						alt={name}
						style={{width: '80px', height: '80px', marginRight: '20px', marginLeft: '5px'}}
					/>
				</Bs.OverlayTrigger>
			);
		});
	}
	,
	choose: function (id) {
		this.props.changeAnswer(id)
	}
});

module.exports = AnswerTypes;
