import { createStore } from 'vuex'

const store = new createStore({
    state: {
        players: [],
    },
    mutations: {
        plus(state, parameter) {
            state.players[parameter].score += 1;
        },
        minus(state, parameter) {
            state.players[parameter].score -= 1;
        },
        update(state, parameter) {
            state.players = parameter
        }
    }
});

export default store;