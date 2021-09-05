import store from "../store";
import Menu from '../components/ConfigMenu.vue'
export default {
    components: { Menu },
    updated() {
        store.commit("update", this.data);
        store.commit("quiz", this.quizRaw);
    },
}