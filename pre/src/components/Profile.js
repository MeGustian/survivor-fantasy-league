var React = require('react/addons');
var Bs = require('react-bootstrap');
var I = require('immutable');
var MyThumbnail = require('./MyThumbnail');
var Contestant = require('./Contestant');
var nameToImg = require('../helpers/image-name')('slide');

var Profile = React.createClass({
	render: function () {
		console.info('Profile');
		if (this.props.user.get('isAdmin')) {
			return <div/>;
		}
		if (this.props.submittedChoices) {
			return (
				<div>
				<Bs.Row>
					<Bs.Col sm={12} md={10} mdOffset={1}>
					<h2 style={{textAlign: 'center'}}>Your choices:</h2>
					<div style={{maxWidth: 900, maxHeight: 500, margin: '0 auto'}}>
						<Final key="final" chosen={this.props.chosen} info={this.props.info} />
					</div>
					</Bs.Col>
				</Bs.Row>
				</div>
			);
		}
		return (
			<div>
			<Bs.Row>
				<Bs.Col sm={12} md={10} mdOffset={1}>
				<div>
					<Bs.Alert bsStyle="info">
						<p>Please select the <strong>4</strong> contestants you wish to follow throughout the season.</p>
						<p style={{textAlign: 'center'}}><Bs.Button onClick={this.help}>Need help?</Bs.Button></p>
					</Bs.Alert>
					<Bs.Alert pullRight bsStyle="warning">
						<p><strong>Notice:</strong> Submitting choices is permanent! Make sure the selected contestants are the ones you wish to choose.</p>
						<p style={{textAlign: 'center'}}><Bs.Button onClick={this.submit} disabled={this.full()}>Submit your choices</Bs.Button></p>
					</Bs.Alert>
					<Options key="options" chosen={this.props.chosen} info={this.props.info} selector={this.props.selector} />
				</div>
				</Bs.Col>
			</Bs.Row>
			<Bs.Row>
				<Bs.Col sm={12} md={10} mdOffset={1}>
					<Selected key="selected" chosen={this.props.chosen} info={this.props.info} />
				</Bs.Col>
			</Bs.Row>
			</div>
		);
	}
	,
	submit: function () {
		this.props.submit(this.props.chosen);
	}
	,
	help: function () {
		this.props.navigate('help');
	}
	,
	full: function () {
		if (I.Set.isSet(this.props.chosen)) {
			return this.props.chosen.size !== 4;
		}
		return true;
	}
});

var Options = React.createClass({
	shouldComponentUpdate: function (prevProps) {
		return !I.is(this.props.chosen, prevProps.chosen);
	}
	,
	render: function () {
		var style = {
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'flex-start',
			flexWrap: 'no-wrap',
			alignItems: 'flex-basis',
			overflow: 'scroll'
		};
		return (
			<div style={{margin: 'auto', width: 'auto'}}>
				{this.items()}
			</div>
		);
	}
	,
	items: function () {
		var that = this;
		return React.addons.createFragment(
			that.props.info
				.map(function (contestant, id) {
					var name = contestant.get('firstName') + " " + contestant.get('lastName');
					var isChosen = that.props.chosen.has(id);
					return (
						<MyThumbnail key={id} id={id} selected={isChosen} name={name} choose={that.select} />
					);
				})
				.toJS()
		);
	}
	,
	select: function (id) {
		this.props.selector(id);
	}
});

var Selected = React.createClass({
	shouldComponentUpdate: function (prevProps) {
		return !I.is(this.props.chosen, prevProps.chosen);
	}
	,
	render: function () {
		return (
			<Bs.Row>
				{this.items()}
			</Bs.Row>
		);
	}
	,
	items: function () {
		var that = this;
		return React.addons.createFragment(
			that.props.info
				.filter(function (contestant, id) {
					return that.props.chosen.has(id);
				})
				.map(function (contestant, id) {
					var name = contestant.get('firstName') + " " + contestant.get('lastName');
					return (
						<Bs.Col xs={12} sm={6}>
						<Bs.Panel header={name} eventKey={id}>
							<Contestant
								contestant={id}
								name={name}
								age={contestant.get('age')}
								occupation={contestant.get('occupation')}
								previousSeason={contestant.get('previousSeason')}
								place={contestant.get('place')}
							/>
						</Bs.Panel>
						</Bs.Col>
					);
				})
				.toJS()
		);
	}
});

var Final = React.createClass({
	shouldComponentUpdate: function (prevProps) {
		return !I.is(this.props.chosen, prevProps.chosen);
	}
	,
	render: function () {
		return (
			<Bs.Carousel>
				{this.items()}
			</Bs.Carousel>
		);
	}
	,
	items: function () {
		var that = this;
		return React.addons.createFragment(
			that.props.info
				.filter(function (contestant, id) {
					return that.props.chosen.has(id);
				})
				.map(function (contestant, id) {
					var name = contestant.get('firstName') + " " + contestant.get('lastName');
					return (
						<Bs.CarouselItem key={id}>
							<img width={900} height={500} style={{width: 900, height: 500}} alt={name}
								src={nameToImg(name)}
							/>
							<div className="carousel-caption">
								<h3>{name}</h3>
							</div>
						</Bs.CarouselItem>
					);
				})
				.toJS()
		);
	}
});

// var MyCarouselItem = React.createClass({
// 	shouldComponentUpdate: function (prevProps) {
// 		return true;
// 	}
// 	,
// 	render: function () {
// 		return (
//
// 		);
// 	}
// })

module.exports = Profile;
