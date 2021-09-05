import { createStore } from 'vuex'
import base from '../assets/json/default'

const store = new createStore({
    state: {
        common: {
            header: true,
        },
        config: {
            format: base
        },
        quiz: []
    },
    mutations: {
        reset(state, data) {
            state.config.format[data.type] = data
        },
        update(state, data) {
            state.config.format[data.type] = data
        },
        timerUpdate(state, data) {
            state.config.format[data.format].display.timer.start
        },
        quiz(state, data) {
            state.quiz = data
        },
        count(state, parameter) {
            if (parameter.phase == "normal") {
                state.config.format[parameter.format].players[parameter.position].score.count += 1;
                state.config.format[parameter.format].log.unshift(parameter);
            } else if (parameter.phase == "undo") {
                state.config.format[parameter.format].players[parameter.position].score.count -= 1;
                state.config.format[parameter.format].log.shift();
            }
        },
        correct(state, parameter) {
            if (parameter.phase == "normal") {
                state.config.format[parameter.format].players[parameter.position].score.correct += 1;
                let evaluation = 0;
                if (parameter.format === "nupdown") {
                    evaluation = (10000 - (state.config.format[parameter.format].log.length + 1));
                } else {
                    if (state.config.format[parameter.format].players[parameter.position].score.correct === state.config.format[parameter.format].config.correct) {
                        evaluation = (10000 - (state.config.format[parameter.format].log.length + 1)) * 100000000
                    } else {
                        evaluation = (10000 - (state.config.format[parameter.format].log.length + 1));
                    }
                }
                state.config.format[parameter.format].players[parameter.position].score.evaluation += evaluation;
                parameter.evaluation = evaluation;
                state.config.format[parameter.format].log.unshift(parameter);
                if (parameter.format == "AttackSurvival") {
                    for (let i = 0; i < state.config.format[parameter.format].players.length; i++) {
                        if (parameter.position == i) {
                            state.config.format[parameter.format].players[i].score.score += state.config.format[parameter.format].config.correct.me
                        } else {
                            state.config.format[parameter.format].players[i].score.score += state.config.format[parameter.format].config.correct.other
                        }
                    }
                } else if (parameter.format == "SquareX") {
                    if (state.config.format[parameter.format].log.length % 2 === 1) {
                        state.config.format[parameter.format].players[parameter.position].score.score.odd += state.config.format[parameter.format].config.odd
                    } else {
                        state.config.format[parameter.format].players[parameter.position].score.score.even += state.config.format[parameter.format].config.even
                    }
                }
            } else if (parameter.phase == "undo") {
                state.config.format[parameter.format].players[parameter.action.position].score.correct -= 1;
                const evaluation = state.config.format[parameter.format].log[0].evaluation
                state.config.format[parameter.format].players[parameter.action.position].score.evaluation -= evaluation;
                if (parameter.format == "AttackSurvival") {
                    for (let i = 0; i < state.config.format[parameter.format].players.length; i++) {
                        if (parameter.action.position == i) {
                            state.config.format[parameter.format].players[i].score.score -= state.config.format[parameter.format].config.correct.me
                        } else {
                            state.config.format[parameter.format].players[i].score.score -= state.config.format[parameter.format].config.correct.other
                        }
                    }
                } else if (parameter.format == "SquareX") {
                    if (state.config.format[parameter.format].log.length % 2 === 1) {
                        state.config.format[parameter.format].players[parameter.action.position].score.score.odd -= state.config.format[parameter.format].config.odd
                    } else {
                        state.config.format[parameter.format].players[parameter.action.position].score.score.even -= state.config.format[parameter.format].config.even
                    }
                }
                state.config.format[parameter.format].log.shift();
            }
        },
        wrong(state, parameter) {
            if (parameter.phase == "normal") {
                state.config.format[parameter.format].players[parameter.position].score.wrong += 1;
                let evaluation = 0;
                if (state.config.format[parameter.format].players[parameter.position].score.wrong === state.config.format[parameter.format].config.wrong) {
                    evaluation = (10000 - (state.config.format[parameter.format].log.length + 1)) * 100000000
                } else {
                    evaluation = (10000 - (state.config.format[parameter.format].log.length + 1));
                }
                state.config.format[parameter.format].players[parameter.position].score.evaluation -= evaluation;
                parameter.evaluation = evaluation;
                state.config.format[parameter.format].log.unshift(parameter);
                if (parameter.format == "AttackSurvival") {
                    for (let i = 0; i < state.config.format[parameter.format].players.length; i++) {
                        if (parameter.position == i) {
                            state.config.format[parameter.format].players[i].score.score += state.config.format[parameter.format].config.wrong.me
                        } else {
                            state.config.format[parameter.format].players[i].score.score += state.config.format[parameter.format].config.wrong.other
                        }
                    }
                } else if (parameter.format == "SquareX") {
                    if (state.config.format[parameter.format].log.length % 2 === 1) {
                        state.config.format[parameter.format].players[parameter.position].score.score.odd -= state.config.format[parameter.format].config.odd
                    } else {
                        state.config.format[parameter.format].players[parameter.position].score.score.even -= state.config.format[parameter.format].config.even
                    }
                }
            } else if (parameter.phase == "undo") {
                state.config.format[parameter.format].players[parameter.action.position].score.wrong -= 1;
                let evaluation = state.config.format[parameter.format].log[0].evaluation
                state.config.format[parameter.format].players[parameter.action.position].score.evaluation += evaluation;
                state.config.format[parameter.format].log.shift();
                if (parameter.format == "AttackSurvival") {
                    for (let i = 0; i < state.config.format[parameter.format].players.length; i++) {
                        if (parameter.action.position == i) {
                            state.config.format[parameter.format].players[i].score.score -= state.config.format[parameter.format].config.wrong.me
                        } else {
                            state.config.format[parameter.format].players[i].score.score -= state.config.format[parameter.format].config.wrong.other
                        }
                    }
                } else if (parameter.format == "SquareX") {
                    if (state.config.format[parameter.format].log.length % 2 === 1) {
                        state.config.format[parameter.format].players[parameter.action.position].score.score.odd += state.config.format[parameter.format].config.odd
                    } else {
                        state.config.format[parameter.format].players[parameter.action.position].score.score.even += state.config.format[parameter.format].config.even
                    }
                }
            }
        },
        through(state, parameter) {
            if (parameter.phase == "normal") {
                state.config.format[parameter.format].log.unshift(parameter);
                if (parameter.format === "AttackSurvival") {
                    for (let i = 0; i < state.config.format[parameter.format].players.length; i++) {
                        state.config.format[parameter.format].players[i].score.score += state.config.format[parameter.format].config.through
                    }
                }
            } else if (parameter.phase == "undo") {
                state.config.format[parameter.format].log.shift();
                if (parameter.format === "AttackSurvival") {
                    for (let i = 0; i < state.config.format[parameter.format].players.length; i++) {
                        state.config.format[parameter.format].players[i].score.score -= state.config.format[parameter.format].config.through
                    }
                }
            }
        },
        loadConfig(state, data) {
            state.config.format[data.type] = data
        },
    }
});

export default store;