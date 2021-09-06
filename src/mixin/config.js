import store from "../store";
import Menu from '../components/ConfigMenu.vue'
import QuizLoad from '../components/QuizLoad.vue'
import JsonOutput from '../components/JsonOutput.vue'
export default {
    components: { Menu, QuizLoad, JsonOutput },
    updated() {
        store.commit("update", this.data);
    },
}