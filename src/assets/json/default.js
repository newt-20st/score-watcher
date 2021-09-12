const jsonData = {
    "Count": {
        "type": "Count",
        "name": "カウンター",
        "display": {
            "belong": false,
            "timer": {
                "enable": true,
                "countdown": true,
                "start": 600,
            },
        },
        "config": {
            "minus": false,
        },
        "players": [
            {
                "name": "Player 1",
                "belong": "",
                "score": {
                    "correct": 0,
                    "evaluation": 0
                }
            }
        ],
        "quiz": [],
        "log": []
    },
    "NoMx": {
        "type": "NoMx",
        "name": "〇〇大会",
        "display": {
            "belong": false,
            "timer": {
                "enable": true,
                "countdown": true,
                "start": 600,
            },
        },
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
                "belong": "",
                "score": {
                    "correct": 0,
                    "wrong": 0,
                    "evaluation": 0
                }
            },
            {
                "name": "Player 2",
                "belong": "",
                "score": {
                    "correct": 0,
                    "wrong": 0,
                    "evaluation": 0
                }
            }, {
                "name": "Player 3",
                "belong": "",
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
    "NbyN": {
        "type": "NbyN",
        "name": "〇〇大会",
        "display": {
            "belong": false,
            "timer": {
                "enable": true,
                "countdown": true,
                "start": 600,
            },
        },
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
                "belong": "",
                "score": {
                    "correct": 0,
                    "wrong": 0,
                    "evaluation": 0
                }
            },
            {
                "name": "Player 2",
                "belong": "",
                "score": {
                    "correct": 0,
                    "wrong": 0,
                    "evaluation": 0
                }
            }, {
                "name": "Player 3",
                "belong": "",
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
    "Nupdown": {
        "type": "Nupdown",
        "name": "〇〇大会",
        "display": {
            "belong": false,
            "timer": {
                "enable": true,
                "countdown": true,
                "start": 600,
            },
        },
        "config": {
            "n": 7,
            "end": { "enable": true, "count": 15 },
            "winThrough": {
                "count": 3,
            }
        },
        "players": [
            {
                "name": "Player 1",
                "belong": "",
                "score": {
                    "score": 0,
                    "correct": 0,
                    "wrong": 0,
                    "evaluation": 0
                }
            },
            {
                "name": "Player 2",
                "belong": "",
                "score": {
                    "score": 0,
                    "correct": 0,
                    "wrong": 0,
                    "evaluation": 0
                }
            }, {
                "name": "Player 3",
                "belong": "",
                "score": {
                    "score": 0,
                    "correct": 0,
                    "wrong": 0,
                    "evaluation": 0
                }
            }
        ],
        "quiz": [],
        "log": []
    },
    "SwedishX": {
        "type": "SwedishX",
        "name": "〇〇大会",
        "display": {
            "belong": false,
            "timer": {
                "enable": true,
                "countdown": true,
                "start": 600,
            },
        },
        "config": {
            "x": 10,
            "end": { "enable": true, "count": 15 },
            "winThrough": {
                "count": 3,
            }
        },
        "players": [
            {
                "name": "Player 1",
                "belong": "",
                "score": {
                    "score": 0,
                    "correct": 0,
                    "wrong": 0,
                    "evaluation": 0
                }
            },
            {
                "name": "Player 2",
                "belong": "",
                "score": {
                    "score": 0,
                    "correct": 0,
                    "wrong": 0,
                    "evaluation": 0
                }
            }, {
                "name": "Player 3",
                "belong": "",
                "score": {
                    "score": 0,
                    "correct": 0,
                    "wrong": 0,
                    "evaluation": 0
                }
            }
        ],
        "quiz": [],
        "log": []
    },
    "AttackSurvival": {
        "type": "AttackSurvival",
        "name": "〇〇大会",
        "display": {
            "belong": false,
            "timer": {
                "enable": true,
                "countdown": true,
                "start": 600,
            },
        },
        "config": {
            "n": 15,
            "correct": {
                "me": 0,
                "other": -1,
            },
            "wrong": {
                "me": -2,
                "other": 0,
            },
            "through": 0,
            "end": { "enable": true, "count": 15 },
            "winThrough": {
                "count": 3,
            }
        },
        "players": [
            {
                "name": "Player 1",
                "belong": "",
                "score": {
                    "score": 15,
                    "correct": 0,
                    "wrong": 0,
                    "evaluation": 0
                }
            },
            {
                "name": "Player 2",
                "belong": "",
                "score": {
                    "score": 15,
                    "correct": 0,
                    "wrong": 0,
                    "evaluation": 0
                }
            }, {
                "name": "Player 3",
                "belong": "",
                "score": {
                    "score": 15,
                    "correct": 0,
                    "wrong": 0,
                    "evaluation": 0
                }
            }, {
                "name": "Player 4",
                "belong": "",
                "score": {
                    "score": 15,
                    "correct": 0,
                    "wrong": 0,
                    "evaluation": 0
                }
            }, {
                "name": "Player 5",
                "belong": "",
                "score": {
                    "score": 15,
                    "correct": 0,
                    "wrong": 0,
                    "evaluation": 0
                }
            }
        ],
        "quiz": [],
        "log": []
    },
    "SquareX": {
        "type": "SquareX",
        "name": "〇〇大会",
        "display": {
            "belong": false,
            "timer": {
                "enable": true,
                "countdown": true,
                "start": 600,
            },
        },
        "config": {
            "x": 16,
            "score": 0,
            "odd": 1,
            "even": 1,
            "winThrough": {
                "count": 3,
            },
            "end": { "enable": true, "count": 15 },
        },
        "players": [
            {
                "name": "Player 1",
                "belong": "",
                "score": {
                    "score": {
                        "odd": 0,
                        "even": 0,
                    },
                    "correct": 0,
                    "wrong": 0,
                    "evaluation": 0
                }
            },
            {
                "name": "Player 2",
                "belong": "",
                "score": {
                    "score": {
                        "odd": 0,
                        "even": 0,
                    },
                    "correct": 0,
                    "wrong": 0,
                    "evaluation": 0
                }
            }, {
                "name": "Player 3",
                "belong": "",
                "score": {
                    "score": {
                        "odd": 0,
                        "even": 0,
                    },
                    "correct": 0,
                    "wrong": 0,
                    "evaluation": 0
                }
            }
        ],
        "quiz": [],
        "log": []
    },
}
export default jsonData