var I = require('immutable');
var Map = I.Map;

var Achievements = Map({
	"TREE-MAIL": Map({
		text: 'Read tree mail for tribe.',
		points: 10
	})
	,
	"HASHTAG": Map({
		text: 'Said or did something that got hashtagged.',
		points: 100
	})
	,
	"NAMES-EPISODE": Map({
		text: 'Said or did something that named the episode.',
		points: 90
	})
	,
	"DESTROYED-GOODS": Map({
		text: 'Destroyed food or other tribe stuff.',
		points: -200
	})
	,
	"SCREAM-FIGHT": Map({
		text: 'Had a screaming fight with someone.',
		points: -20
	})
	,
	"FEMALE-CRIED": Map({
		text: 'Female: Cried at least once during the episode.',
		points: -10
	})
	,
	"MALE-CRIED": Map({
		text: 'Male: Cried at least once during the episode.',
		points: -30
	})
	,
	"LIES-ABOUT-BG": Map({
		text: 'Lied about his occupation or background.',
		points: 30
	})
	,
	"REWARD-TRIBE": Map({
		text: 'Part of the tribe that won reward.',
		points: 20
	})
	,
	"REWARD-INDIVIDUAL": Map({
		text: 'Won individual reward challenge.',
		points: 50
	})
	,
	"IMMUNITY-TRIBE": Map({
		text: 'Part of the tribe that won immunity.',
		points: 30
	})
	,
	"IMMUNITY-INDIVIDUAL": Map({
		text: 'Won individual immunity challenge.',
		points: 80
	})
	,
	"REWARD-SHARED-WITH": Map({
		text: 'Was chosen to be shared reward with.',
		points: 30
	})
	,
	"GAVE-REWARD": Map({
		text: 'Won reward and gave it to someone else.',
		points: 30
	})
	,
	"FINDS-HIDDEN": Map({
		text: 'Found hidden immunity idol with the help of a clue.',
		points: 70
	})
	,
	"FINDS-HIDDEN-NO-CLUE": Map({
		text: 'Found hidden immunity idol without a clue.',
		points: 90
	})
	,
	"HIDDEN-GIVEN-TO": Map({
		text: 'Was given a hidden immunity idol.',
		points: 90
	})
	,
	"PLAYS-HIDDEN-GOOD": Map({
		text: 'Played hidden immunity idol when otherwise voted out.',
		points: 100
	})
	,
	"PLAYS-HIDDEN-BAD": Map({
		text: 'Played hidden immunity idol when not necessary.',
		points: -50
	})
	,
	"GIVES-HIDDEN-GOOD": Map({
		text: 'Played hidden immunity idol for someone else and saved him\\her.',
		points: 150
	})
	,
	"GIVES-HIDDEN-BAD": Map({
		text: 'Played hidden immunity idol for someone else when not necessary.',
		points: -100
	})
	,
	"MAKES-ERIK": Map({
		text: 'Played hidden immunity idol for someone else and voted out.',
		points: -150
	})
	,
	"RECEIVES-MEDIC": Map({
		text: 'Receiceed treatment or checked out by medic.',
		points: -10
	})
	,
	"SITS-OUT-REWARD": Map({
		text: 'Sat out reward challenge.',
		points: -10
	})
	,
	"SITS-OUT-IMMUNITY": Map({
		text: 'Sat out immunity challenge.',
		points: -20
	})
	,
	"AUDIBLY-PRAYS": Map({
		text: 'Prayed out loud.',
		points: -50
	})
	,
	"TEMPTED-WITH-GIFT": Map({
		text: 'Quit a challenge for food\\goodies.',
		points: -100
	})
	,
	"QUITS": Map({
		text: 'Chose to quit game.',
		points: -200
	})
	,
	"MED-EVAC": Map({
		text: 'Forced to quit game due to medical reasons.',
		points: -50
	})
	,
	"MENTIONED": Map({
		text: 'Mentioned after being eliminated.',
		points: 30
	})
	,
	"NAMES-TRIBE": Map({
		text: 'Suggested the name for the merged tribe.',
		points: 150
	})
	,
	"VOTES-WINNER": Map({
		text: 'Voted for the winner of the game.',
		points: 50
	})
	,
	"VOTES-LOSER": Map({
		text: 'Voted for the loser of the game.',
		points: -50
	})
	,
	"VOTES-FOR-ELIM": Map({
		text: 'Voted for the person eliminated.',
		points: 30
	})
	,
	"VOTES-FOR-STAYS": Map({
		text: 'Voted for someone who was not eliminated.',
		points: -30
	})
	,
	"VOTED-FOR": Map({
		text: 'Got a vote at tribal council.',
		points: -10
	})
	,
	"FIRE-CHALL-WIN": Map({
		text: 'Won a fire challenge.',
		points: 50
	})
	,
	"FIRE-CHALL-LOSE": Map({
		text: 'Lost a fire challenge.',
		points: -50
	})
	,
	"BEATS-PREV-SEASON": Map({
		text: 'Got further than previous season.',
		points: 70
	})
	,
	"FAN-FAV": Map({
		text: 'Won the title of Fans Favorite.',
		points: 100
	})
	,
	"JURY": Map({
		text: 'Became a member of the jury.',
		points: 70
	})
	,
	"VOTED-OUT": Map({
		text: 'Got voted out!',
		points: 10,
		extra: '10*(weekNumber)'
	})
	,
	"3rd-PLACE": Map({
		text: 'Won Third Place!',
		points: 200
	})
	,
	"2nd-PLACE": Map({
		text: 'Won Second Place!',
		points: 250
	})
	,
	"1st-PLACE": Map({
		text: 'Won First Place!!!',
		points: 300
	})
});

module.exports = Achievements;
