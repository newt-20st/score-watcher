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
        plus(state, parameter) {
            state.config.format[parameter.format].players[parameter.position].score.correct += 1;
        },
        minus(state, parameter) {
            state.config.format[parameter.format].players[parameter.position].score.wrong += 1;
        },
        log(state, parameter) {
            state.config.format[parameter.format].log.push(parameter);
        },
        loadConfig(state, data) {
            state.config.format[data.type] = data
        },
    }
});

export default store;