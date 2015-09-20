var I = require('immutable');
var Map = I.Map;
var List = I.List;

// Just some dummy data.
var dummyDB = {};
dummyDB.Weeks = List.of(
	Map({
		"questions": Map({
			"idOf-1q1:boolean": true,
			"idOf-1q2:Contestant": "1q2"
		}),
		"contestants": Map({
			"id:1": Map({
				name: "Spencer",
				tribe: "Abu",
				votedFor: "Kass",
				"achievements": List.of(
					"CRIED",
					"HASHTAG"
				),
			}),
			"id:2": Map({
				name: "Kass",
				tribe: "Abu",
				votedFor: "Spencer",
				"achievements": List.of(
					"CRIED",
					"HASHTAG"
				),
			}),
		})
	})
);
dummyDB.Players = Map({
	'id:135325': Map({
		"player": "P1",
		"answers": List.of(
			Map({
				"idOf-1q1:boolean": true,
				"idOf-1q2:Contestant": "1q2-wrong"
			})
		)
	}),
	'id:13508': Map({
		"player": "P2",
		"answers": List.of(
			Map({
				"idOf-1q1:boolean": false,
				"idOf-1q2:Contestant": "1q2"
			})
		)
	})
});

module.exports = dummyDB;
