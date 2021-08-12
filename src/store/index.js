import { createStore } from 'vuex'
import base from '../assets/json/default'

const store = new createStore({
    state: {
        config: {
            format: base
        }
    },
    mutations: {
        reset(state, data) {
            state.config.format[data.type] = data
        },
        update(state, data) {
            state.config.format[data.type] = data
        },
        correct(state, parameter) {
            if (parameter.phase == "nomal") {
                state.config.format[parameter.format].players[parameter.position].score.correct += 1;
            } else if (parameter.phase == "undo") {
                state.config.format[parameter.format].players[parameter.position].score.correct -= 1;
            }
        },
        wrong(state, parameter) {
            if (parameter.phase == "nomal") {
                state.config.format[parameter.format].players[parameter.position].score.wrong += 1;
            } else if (parameter.phase == "undo") {
                state.config.format[parameter.format].players[parameter.position].score.wrong -= 1;
            }
        },
        log(state, parameter) {
            if (parameter.phase == "nomal") {
                state.config.format[parameter.format].log.unshift(parameter);
            } else if (parameter.phase == "undo") {
                state.config.format[parameter.format].log.shift();
            }
        },
        loadConfig(state, data) {
            state.config.format[data.type] = data
        },
    }
});

export default store;