import store from "../store";
import { Timer } from 'easytimer.js'
var aTimer = new Timer()
export default {
    created() {
        this.InitTimer()
    },
    methods: {
        count(e) {
            store.commit("count", {
                format: this.data.type,
                phase: "normal",
                type: "correct",
                position: e,
                timestamp: new Date(),
            });
        },
        correct(e) {
            store.commit("correct", {
                format: this.data.type,
                phase: "normal",
                type: "correct",
                position: e,
                timestamp: new Date(),
            });
        },
        wrong(e) {
            store.commit("wrong", {
                format: this.data.type,
                phase: "normal",
                type: "wrong",
                position: e,
                timestamp: new Date(),
            });
        },
        getWidth() {
            return this.data.players.length * 115 > window.innerWidth
                ? "over"
                : "default";
        },
        getHMS(e) {
            return e.getHours() + ":" + e.getMinutes() + ":" + e.getSeconds() + " ";
        },
        InitTimer() {
            if (this.data.display.timer.countdown) {
                aTimer.start({ countdown: true, precision: 'seconds', startValues: { seconds: this.data.display.timer.start } })
            } else {
                aTimer.start({ precision: 'seconds', startValues: { seconds: 0 } })
            }
            aTimer.addEventListener('secondsUpdated', () => {
                this.timer = aTimer.getTimeValues().toString()
            })
            aTimer.addEventListener('started', () => {
                this.timer = aTimer.getTimeValues().toString()
            });
            aTimer.addEventListener('pause', () => {
                this.timer = aTimer.getTimeValues().toString()
            });
            aTimer.addEventListener('targetAchieved', () => {
                this.timer = "FINISH!"
            });
        },
        timerStart() {
            aTimer.start();
        },
        timerPause() {
            aTimer.pause();
        },
        undo() {
            if (this.data.log.length > 0) {
                const action = this.data.log[0];
                store.commit(action.type, {
                    format: this.data.type,
                    phase: "undo",
                    action: action,
                });
            }
        },
        through() {
            store.commit("through", {
                format: this.data.type,
                phase: "normal",
                type: "through",
                timestamp: new Date(),
            });
        },
    }
}