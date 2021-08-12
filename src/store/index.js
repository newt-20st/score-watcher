import { createStore } from 'vuex'

const store = new createStore({
    state: {
        config: {
            format: {
                nomx: {
                    type: "nomx",
                    config: {
                        correct: 7,
                        wrong: 3,
                    },
                    players: [
                        { name: "Player 1", score: { correct: 0, wrong: 0 } }
                    ],
                    log: []
                }
            }
        }
    },
    mutations: {
        plus(state, parameter, type) {
            state.config.format[type].players[parameter].score.correct += 1;
        },
        minus(state, parameter, type) {
            state.config.format[type].players[parameter].score.wrong += 1;
        },
        update(state, parameter, type) {
            state.config.format[type] = parameter
        },
        log(state, parameter, type) {
            state.config.format[type].log.push(parameter);
        }
    }
});

export default store;