var I = require('immutable');
var Map = I.Map;
var List = I.List;

// Just some dummy data.
var dummyDB = {};
dummyDB.Weeks = List.of(
	Map({
		"questions": Map({
			"idOf-1q1:boolean": true,
			"idOf-1q2:Contestant": Contestant("1q2")
		}),
		"tribes": Map({
			"A": List.of(
				Map({
					"contestant": Contestant("1A1"),
					"achievements": List.of(
						"1A1a1",
						"1A1a2"
					),
					"voted-for": Contestant("1A1v")
				}),
				Map({
					"contestant": Contestant("1A2"),
					"achievements": List.of(
						"1A2a1",
						"1A2a2"
					),
					"voted-for": Contestant("1A2v")
				})
			),
			"B": List.of(
				Map({
					"contestant": Contestant("1B1"),
					"achievements": List.of(
						"1B1a1",
						"1B1a2"
					),
					"voted-for": Contestant("1B1v")
				}),
				Map({
					"contestant": Contestant("1B2"),
					"achievements": List.of(
						"1B2a1",
						"1B2a2"
					),
					"voted-for": Contestant("1B2v")
				}),
				Map({
					"contestant": Contestant("1B3"),
					"achievements": List.of(
						"1B3a1",
						"1B3a2"
					),
					"voted-for": Contestant("1B3v")
				})
			),
		})
	})
);
dummyDB.Players = List.of(
	Map({
		"player": Player("P1"),
		"answers": List.of(
			Map({
				"idOf-1q1:boolean": true,
				"idOf-1q2:Contestant": Contestant("1q2-wrong")
			})
		)
	}),
	Map({
		"player": Player("P2"),
		"answers": List.of(
			Map({
				"idOf-1q1:boolean": false,
				"idOf-1q2:Contestant": Contestant("1q2")
			})
		)
	})
);

module.exports = dummyDB;
