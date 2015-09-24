var React = require('react');
var Bs = require('react-bootstrap');
var I = require('immutable');

var AnswerTypes = {};

AnswerTypes.Contestants = React.createClass({
	shouldComponentUpdate: function (nextProps) {
		var equal = this.props.answer === nextProps.answer;
		return !equal;
	}
	,
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
		return this.props.tribes
			.map(function (contestant, id) {
				var name = contestant.get('firstName') + " " + contestant.get('lastName');
				var correct = id === that.props.answer;
				return (
					<MyThumbnail key={id} id={id} correct={correct} name={name} changeAnswer={that.props.changeAnswer} />
				);
			});
	}
});

var MyThumbnail = React.createClass({
	shouldComponentUpdate: function (nextProps) {
		var equal = this.props.correct === nextProps.correct;
		return !equal;
	}
	,
	render: function () {
		var p = this.props;
		var that = this;
		var tooltip = <Bs.Tooltip>{p.name}</Bs.Tooltip>;
		return (
			<Bs.OverlayTrigger placement="top" overlay={tooltip} key={p.id}>
				<Bs.Thumbnail
					onClick={that.choose.bind(that, (p.correct ? null : p.id))}
					src={"/images/contestants/" + p.name + ".jpg"}
					alt={p.name}
					style={{border: (p.correct ? "3px solid green" : ""), width: '80px', height: '80px', marginRight: '20px', marginLeft: '5px'}}
				/>
			</Bs.OverlayTrigger>
		);
	}
	,
	choose: function (id) {
		this.props.changeAnswer(id);
	}
});

module.exports = AnswerTypes;
