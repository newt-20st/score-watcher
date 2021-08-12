import { createStore } from 'vuex'

const store = new createStore({
    state: {
        players: [{ name: "aaa", score: 0 },
        { name: "bbb", score: 0 },
        { name: "ccc", score: 0 },],
    }, mutations: {
        plus(state, parameter) {
            state.players[parameter].score += 1;
        },
        minus(state, parameter) {
            state.players[parameter].score -= 1;
        }
    }
});

export default store;