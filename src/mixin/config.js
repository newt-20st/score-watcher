import store from "../store";
import Menu from '../components/ConfigMenu.vue'
import TimerConfig from '../components/TimerConfig.vue'
import QuizLoad from '../components/QuizLoad.vue'
import JsonOutput from '../components/JsonOutput.vue'
export default {
    components: { Menu, TimerConfig, QuizLoad, JsonOutput },
    updated() {
        store.commit("update", this.data);
    },
}