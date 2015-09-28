var React = require('react');
var Bs = require('react-bootstrap');
var Achievements = require('./Achievements');
var Map = require('immutable').Map;

var Help = React.createClass({
	render: function () {
		return (
			<Bs.Row>
			<Bs.Col sm={12} md={8} mdOffset={2}>
			<h1><a id="Welcome_to_the_Survivor_Fantasy_League_0"></a>Welcome to the Survivor Fantasy League!</h1>
			<p>Compete against your friends in the ultimate Survivor League manager and fight
			for the title of sole survivor!</p>
			<h2><a id="The_Rules_5"></a>The Rules:</h2>
			<p>You will need to select FOUR castaways to make up your team. You do NOT have to select both men and women, nor people from both tribes - though, of course, you can if you want to!
			There is no limit to how many people can select a single contestant, but no two people can have the EXACT SAME line-up.
			For instance, everybody can have Spencer on their team if they want, but only one person could have the team of Spencer, Kelly, Joe and Andrew.</p>
			<p>The four people on your team will score points on a weekly basis, based on the achievements below.
			There are points on offer for post-elimination events, so just because one of your castaways is eliminated, it doesn’t mean they’ll stop scoring you points!</p>
			<p>At the end of the season, the person with the Highest Combined Score (counting Team Points and Bonus Points) will win the League!</p>
			<Achievements
				isAdmin={false}
				isHelp={true}
				achievements={Map()}
				scores={Map({good: '', bad: '', total: ''})}
			/>
			<h2><a id="The_Questions_62"></a>The Questions:</h2>
			<p>In addition, there will be a list of Bonus Questions every week. This will allow you to keep scoring points even if your whole team is eliminated!
			There will be Regular Questions as well as Special Questions that will change week-to-week! You will need to submit your answers before the next episode airs.
			Every correct answer will earn you an additional 30 points.</p>
			<h3><a id="Regular_Questions_68"></a>Regular Questions:</h3>
			<ul>
			<li>Who will win Reward?</li>
			<li>Who will win Immunity?</li>
			<li>Who will be voted out?</li>
			<li>How many votes will they receive (not including revotes)?</li>
			<li>Who says the episode title?</li>
			</ul>
			<h3><a id="Week_X_bonus_questions_76"></a>Week X bonus questions:</h3>
			<ul>
			<li>Who will have the first confessional of the season?</li>
			<li>Will the clue to the Hidden Immunity Idol be found?</li>
			<li>Will a Hidden Immunity Idol be found?</li>
			</ul>
			<p>For more information and exciting news, please visit <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Survivor Fantasy League - Extended</a>.</p>
			</Bs.Col>
			</Bs.Row>
		);
	}
});

module.exports = Help;
