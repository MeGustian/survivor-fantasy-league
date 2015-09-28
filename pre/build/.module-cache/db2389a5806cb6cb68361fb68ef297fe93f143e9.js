var React = require('react');
var Bs = require('react-bootstrap');
var Achievements = require('./Achievements');
var Map = require('immutable').Map;

var Help = React.createClass({displayName: "Help",
	render: function () {
		return (
			React.createElement(Bs.Row, null, 
			React.createElement(Bs.Col, {sm: 12, md: 8, mdOffset: 2}, 
			React.createElement("h1", null, React.createElement("a", {id: "Welcome_to_the_Survivor_Fantasy_League_0"}), "Welcome to the Survivor Fantasy League!"), 
			React.createElement("p", null, "Compete against your friends in the ultimate Survivor League manager and fight" + ' ' +
			"for the title of sole survivor!"), 
			React.createElement("h2", null, React.createElement("a", {id: "The_Rules_5"}), "The Rules:"), 
			React.createElement("p", null, "In your profile page, select FOUR castaways to make up your team. You do NOT have to select both men and women, nor people from both tribes - though, of course, you can if you want to!" + ' ' +
			"There is no limit to how many people can select a single contestant, but no two people can have the EXACT SAME line-up." + ' ' +
			"For instance, everybody can have Spencer on their team if they want, but only one person could have the team of Spencer, Kelly, Joe and Andrew."), 
			React.createElement("p", null, "The four people on your team will score points on a weekly basis, based on the achievements below." + ' ' +
			"There are points on offer for post-elimination events, so just because one of your castaways is eliminated, it doesn’t mean they’ll stop scoring you points!"), 
			React.createElement("p", null, "At the end of the season, the person with the Highest Combined Score (counting Team Points and Bonus Points) will win the League!"), 
			React.createElement(Achievements, {
				isAdmin: false, 
				isHelp: true, 
				achievements: Map(), 
				scores: Map({good: '', bad: '', total: ''})}
			), 
			React.createElement("h2", null, React.createElement("a", {id: "The_Questions_62"}), "The Questions:"), 
			React.createElement("p", null, "In addition, there will be a list of Bonus Questions every week. This will allow you to keep scoring points even if your whole team is eliminated!" + ' ' +
			"There will be Regular Questions as well as Special Questions that will change week-to-week! You will need to submit your answers before the next episode airs." + ' ' +
			"Every correct answer will earn you an additional 30 points."), 
			React.createElement("h3", null, React.createElement("a", {id: "Regular_Questions_68"}), "Regular Questions:"), 
			React.createElement("ul", null, 
			React.createElement("li", null, "Who will win Reward?"), 
			React.createElement("li", null, "Who will win Immunity?"), 
			React.createElement("li", null, "Who will be voted out?"), 
			React.createElement("li", null, "How many votes will they receive (not including revotes)?"), 
			React.createElement("li", null, "Who says the episode title?")
			), 
			React.createElement("h3", null, React.createElement("a", {id: "Week_X_bonus_questions_76"}), "Week X bonus questions:"), 
			React.createElement("ul", null, 
			React.createElement("li", null, "Who will have the first confessional of the season?"), 
			React.createElement("li", null, "Will the clue to the Hidden Immunity Idol be found?"), 
			React.createElement("li", null, "Will a Hidden Immunity Idol be found?")
			), 
			React.createElement("p", null, "For more information and exciting news, please visit ", React.createElement("a", {href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"}, "Survivor Fantasy League - Extended"), ".")
			)
			)
		);
	}
});

module.exports = Help;
