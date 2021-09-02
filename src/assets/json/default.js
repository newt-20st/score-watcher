const jsonData = {
    "count": {
        "type": "count",
        "name": "カウンター",
        "config": {
            "minus": false,
        },
        "players": [
            {
                "name": "Player 1",
                "score": {
                    "count": 0
                }
            }
        ],
        "quiz": [],
        "log": []
    },
    "nomx": {
        "type": "nomx",
        "name": "〇〇大会",
        "config": {
            "correct": 7,
            "wrong": 3,
            "end": { "enable": true, "count": 15 },
            "winThrough": {
                "enable": true,
                "count": 1,
                "order": true
            }
        },
        "players": [
            {
                "name": "Player 1",
                "score": {
                    "correct": 0,
                    "wrong": 0,
                    "evaluation": 0
                }
            },
            {
                "name": "Player 2",
                "score": {
                    "correct": 0,
                    "wrong": 0,
                    "evaluation": 0
                }
            }, {
                "name": "Player 3",
                "score": {
                    "correct": 0,
                    "wrong": 0,
                    "evaluation": 0
                }
            }
        ],
        "quiz": [],
        "log": []
    },
    "nbyn": {
        "type": "nbyn",
        "name": "〇〇大会",
        "config": {
            "n": 7,
            "winThrough": {
                "count": 3,
            },
            "end": { "enable": true, "count": 15 },
        },
        "players": [
            {
                "name": "Player 1",
                "score": {
                    "correct": 0,
                    "wrong": 0,
                    "evaluation": 0
                }
            },
            {
                "name": "Player 2",
                "score": {
                    "correct": 0,
                    "wrong": 0,
                    "evaluation": 0
                }
            }, {
                "name": "Player 3",
                "score": {
                    "correct": 0,
                    "wrong": 0,
                    "evaluation": 0
                }
            }
        ],
        "quiz": [],
        "log": []
    }
}
export default jsonData