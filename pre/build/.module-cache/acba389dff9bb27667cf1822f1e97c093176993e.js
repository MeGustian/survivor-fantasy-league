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
		"tribes": Map({
			"Abu": Map({
				"Spencer": Map({
					"achievements": List.of(
						"CRIED",
						"HASHTAG"
					),
					"voted-for": "Kass"
				}),
				"Kass": Map({
					"achievements": List.of(
						"CRIED",
						"TREE-MAIL"
					),
					"voted-for": "Spencer"
				})
			}),
			"Bau": Map({
				"Joel": Map({
					"achievements": List.of(
					),
					"voted-for": "Andy"
				}),
				"Andy": Map({
					"achievements": List.of(
						"GAVE-IMMUNITY",
						"TREE-MAIL"
					),
					"voted-for": "Joel"
				})
			})
		})
	})
);
dummyDB.Players = List.of(
	Map({
		"player": "P1",
		"answers": List.of(
			Map({
				"idOf-1q1:boolean": true,
				"idOf-1q2:Contestant": "1q2-wrong"
			})
		)
	}),
	Map({
		"player": "P2",
		"answers": List.of(
			Map({
				"idOf-1q1:boolean": false,
				"idOf-1q2:Contestant": "1q2"
			})
		)
	})
);

module.exports = dummyDB;
