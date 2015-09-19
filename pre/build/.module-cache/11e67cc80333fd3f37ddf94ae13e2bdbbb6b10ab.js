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
			"A": List.of(
				Map({
					"contestant": "1A1",
					"achievements": List.of(
						"1A1a1",
						"1A1a2"
					),
					"voted-for": "1A1v"
				}),
				Map({
					"contestant": "1A2",
					"achievements": List.of(
						"1A2a1",
						"1A2a2"
					),
					"voted-for": "1A2v"
				})
			),
			"B": List.of(
				Map({
					"contestant": "1B1",
					"achievements": List.of(
						"1B1a1",
						"1B1a2"
					),
					"voted-for": "1B1v"
				}),
				Map({
					"contestant": "1B2",
					"achievements": List.of(
						"1B2a1",
						"1B2a2"
					),
					"voted-for": "1B2v"
				}),
				Map({
					"contestant": "1B3",
					"achievements": List.of(
						"1B3a1",
						"1B3a2"
					),
					"voted-for": "1B3v"
				})
			),
		})
	}),
	Map({
		"questions": Map({
			"idOf-2q1:boolean": true,
			"idOf-2q2:Contestant": "2q2"
		}),
		"tribes": Map({
			"A": List.of(
				Map({
					"contestant": "2A1",
					"achievements": List.of(
						"2A1a1",
						"2A1a2"
					),
					"voted-for": "2A1v"
				}),
				Map({
					"contestant": "2A2",
					"achievements": List.of(
						"2A2a1",
						"2A2a2"
					),
					"voted-for": "2A2v"
				})
			),
			"B": List.of(
				Map({
					"contestant": "2B1",
					"achievements": List.of(
						"2B1a1",
						"2B1a2"
					),
					"voted-for": "2B1v"
				}),
				Map({
					"contestant": "2B2",
					"achievements": List.of(
						"1B2a1",
						"1B2a2"
					),
					"voted-for": "1B2v"
				}),
				Map({
					"contestant": "1B3",
					"achievements": List.of(
						"2B3a1",
						"2B3a2"
					),
					"voted-for": "2B3v"
				})
			),
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
