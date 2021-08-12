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
        plus(state, parameter) {
            state.config.format[parameter.format].players[parameter.position].score.correct += 1;
        },
        minus(state, parameter) {
            state.config.format[parameter.format].players[parameter.position].score.wrong += 1;
        },
        update(state, parameter, type) {
            state.config.format[type] = parameter
        },
        log(state, parameter) {
            state.config.format[parameter.format].log.push(parameter);
        },
        loadConfig(state, data) {
            state.config.format[data.type] = data
        }
    }
});

export default store;