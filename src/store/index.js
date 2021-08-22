import { createStore } from 'vuex'
import base from '../assets/json/default'

const store = new createStore({
    state: {
        common: {
            header: true,
        },
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
                let evaluation = 0;
                if (state.config.format[parameter.format].players[parameter.position].score.correct === state.config.format[parameter.format].config.correct) {
                    evaluation = (10000 - (state.config.format[parameter.format].log.length + 1)) * 100000000
                } else {
                    evaluation = (10000 - (state.config.format[parameter.format].log.length + 1));
                }
                state.config.format[parameter.format].players[parameter.position].score.evaluation += evaluation;
                parameter.evaluation = evaluation;
                state.config.format[parameter.format].log.unshift(parameter);
            } else if (parameter.phase == "undo") {
                state.config.format[parameter.format].players[parameter.position].score.correct -= 1;
                const evaluation = state.config.format[parameter.format].log[0].evaluation
                state.config.format[parameter.format].players[parameter.position].score.evaluation -= evaluation;
                state.config.format[parameter.format].log.shift();
            }
        },
        wrong(state, parameter) {
            if (parameter.phase == "nomal") {
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
            } else if (parameter.phase == "undo") {
                state.config.format[parameter.format].players[parameter.position].score.wrong -= 1;
                let evaluation = state.config.format[parameter.format].log[0].evaluation
                state.config.format[parameter.format].players[parameter.position].score.evaluation += evaluation;
                state.config.format[parameter.format].log.shift();
            }
        },
        loadConfig(state, data) {
            state.config.format[data.type] = data
        },
    }
});

export default store;