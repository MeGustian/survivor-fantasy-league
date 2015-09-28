var React = require('react');
var Bs = require('react-bootstrap');

var Help = React.createClass({displayName: "Help",
	render: function () {
		return (
			React.createElement("div", null, 
			React.createElement("h1", null, React.createElement("a", {id: "Welcome_to_the_Survivor_Fantasy_League_0"}), "Welcome to the Survivor Fantasy League!"), 
			React.createElement("p", null, "Compete against your friends in the ultimate Survivor League manager and fight" + ' ' +
			"for the title of sole survivor!"), 
			React.createElement("h2", null, React.createElement("a", {id: "The_Rules_5"}), "The Rules:"), 
			React.createElement("p", null, "You will need to select FOUR castaways to make up your team. You do NOT have to select both men and women, nor people from both tribes - though, of course, you can if you want to!" + ' ' +
			"There is no limit to how many people can select a single contestant, but no two people can have the EXACT SAME line-up." + ' ' +
			"For instance, everybody can have Spencer on their team if they want, but only one person could have the team of Spencer, Kelly, Joe and Andrew."), 
			React.createElement("p", null, "The four people on your team will score points on a weekly basis, based on the achievements below." + ' ' +
			"There are points on offer for post-elimination events, so just because one of your castaways is eliminated, it doesn’t mean they’ll stop scoring you points!"), 
			React.createElement("p", null, "At the end of the season, the person with the Highest Combined Score (counting Team Points and Bonus Points) will win the League!"), 
			React.createElement("h3", null, React.createElement("a", {id: "GOOD_ACHIEVEMENTS_15"}), "GOOD ACHIEVEMENTS:"), 
			React.createElement("ul", null, 
			React.createElement("li", null, "Survives week X    X*10"), 
			React.createElement("li", null, "3rd place      200"), 
			React.createElement("li", null, "2nd place      250"), 
			React.createElement("li", null, "1st place      300"), 
			React.createElement("li", null, "Wins tribal reward          30"), 
			React.createElement("li", null, "Wins personal reward 60"), 
			React.createElement("li", null, "Wins tribal immunity  40"), 
			React.createElement("li", null, "Wins personal immunity 80"), 
			React.createElement("li", null, "Reward shared with    30"), 
			React.createElement("li", null, "Surrenders reward 40"), 
			React.createElement("li", null, "Gets to jury      50"), 
			React.createElement("li", null, "Finds hidden  immunity        50"), 
			React.createElement("li", null, "Hidden immunity given to      70"), 
			React.createElement("li", null, "Plays hidden immunity successfully        100"), 
			React.createElement("li", null, "Plays hidden immunity successfully on someone else 200"), 
			React.createElement("li", null, "Fan favorite in reunion           100"), 
			React.createElement("li", null, "Creates a #hashtag             70"), 
			React.createElement("li", null, "Names the merged tribe             150"), 
			React.createElement("li", null, "Votes for winner as jury           50"), 
			React.createElement("li", null, "Reads tree mail                10"), 
			React.createElement("li", null, "Name mentioned after eliminated    10"), 
			React.createElement("li", null, "Beats previous season ranking          70"), 
			React.createElement("li", null, "Names episode              100"), 
			React.createElement("li", null, "Votes for eliminatee       30"), 
			React.createElement("li", null, "Wins fire challenge            50"), 
			React.createElement("li", null, "Lies about background      30")
			), 
			React.createElement("h3", null, React.createElement("a", {id: "BAD_ACHIEVEMENTS_44"}), "BAD ACHIEVEMENTS:"), 
			React.createElement("ul", null, 
			React.createElement("li", null, "Receives medical attention        -20"), 
			React.createElement("li", null, "Sits out challenge        -30"), 
			React.createElement("li", null, "Audibly prays     -50"), 
			React.createElement("li", null, "Tempted with gift in challenge    -100"), 
			React.createElement("li", null, "Quits             -200"), 
			React.createElement("li", null, "Gets in a screaming fight  -10"), 
			React.createElement("li", null, "Female cries   -10"), 
			React.createElement("li", null, "Male cries         -20"), 
			React.createElement("li", null, "For each vote against -10"), 
			React.createElement("li", null, "Does not vote for eliminatee  -30"), 
			React.createElement("li", null, "Votes for loser   as jury         -30"), 
			React.createElement("li", null, "Medically evacuated from the game                 -50"), 
			React.createElement("li", null, "Gets voted out by hidden immunity protecting someone else             -50"), 
			React.createElement("li", null, "Play hidden immunity unsuccessfully -50"), 
			React.createElement("li", null, "Lose fire challenge -50")
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
		);
	}
});

module.exports = Help;
