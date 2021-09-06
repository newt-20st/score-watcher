import store from "../store";
import Menu from '../components/ConfigMenu.vue'
import QuizLoad from '../components/QuizLoad.vue'
export default {
    components: { Menu, QuizLoad },
    updated() {
        store.commit("update", this.data);
    },
}