var React = require('react/addons');
var Bs = require('react-bootstrap');
var I = require('immutable');
var MyThumbnail = require('./MyThumbnail');

var Profile = React.createClass({
	render: function () {
		return (
			<div>
			<Bs.Row>
				<Bs.Col sm={12} md={10} mdOffset={1}>
				<div>
					<Bs.Alert bsStyle="info">
						Please select the 4 contestants you wish to follow throughout the season.
					</Bs.Alert>
					<Bs.Alert bsStyle="warning">
						<strong>Notice:</strong> At the stroke of midnight, -date-, your choices will lock.
						You will not be able to change them through out the season.
					</Bs.Alert>
					<Options chosen={this.props.chosen} info={this.props.info} selector={this.props.selector} />
				</div>
				</Bs.Col>
			</Bs.Row>
			<Bs.Row>
				<Bs.Col sm={12} md={10} mdOffset={1}>
				<div style={{maxWidth: 900, maxHeight: 500, margin: '0 auto'}}>
					<Choices chosen={this.props.chosen} info={this.props.info} />
				</div>
				</Bs.Col>
			</Bs.Row>
			</div>
		);
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
})

var Choices = React.createClass({
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
								src={"/images/contestants/slides/" + name + ".jpg"}
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
