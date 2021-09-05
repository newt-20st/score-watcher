<template>
  <div class="menu">
    <div class="timer">
      <span>{{ time }}</span>
      <button @click="timerPause()" class="timerBtn btn btn-outline-danger">
        <i class="bi bi-pause-fill"></i>
      </button>
      <button @click="timerStart()" class="timerBtn btn btn-outline-danger">
        <i class="bi bi-play-fill"></i>
      </button>
    </div>
    <div>
      <router-link class="btn btn-sm btn-success" :to="'/config?type=' + format"
        >設定に戻る</router-link
      >
    </div>
    <div>
      <button class="btn btn-sm btn-primary" @click="undo">一つ戻す</button>
    </div>
    <div>
      <button class="btn btn-sm btn-primary" @click="through">スルー</button>
    </div>
  </div>
</template>

<script>
import store from "../store";
import { Timer } from "easytimer.js";
export default {
  name: "DisplayMenu",
  props: ["format"],
  data() {
    return {
      timer: this.$store.state.config.format[this.format].display.timer,
      time: "",
      aTimer: null,
    };
  },
  created() {
    this.InitTimer();
  },
  methods: {
    InitTimer() {
      this.aTimer = new Timer();
      if (this.timer.countdown) {
        this.aTimer.start({
          countdown: true,
          precision: "seconds",
          startValues: { seconds: this.timer.start },
        });
      } else {
        this.aTimer.start({
          precision: "seconds",
          startValues: { seconds: 0 },
        });
      }
      this.aTimer.addEventListener("secondsUpdated", () => {
        this.time = this.aTimer.getTimeValues().toString();
        store.commit("timerUpdate", {
          format: this.format,
          time:
            this.aTimer.getTimeValues().seconds +
            this.aTimer.getTimeValues().minutes * 60 +
            this.aTimer.getTimeValues().hours * 3600,
        });
      });
      this.aTimer.addEventListener("targetAchieved", () => {
        this.time = "FINISH!";
      });
    },
    timerStart() {
      this.aTimer.start();
    },
    timerPause() {
      this.aTimer.pause();
    },
    undo() {
      this.$emit("undo");
    },
    through() {
      this.$emit("through");
    },
  },
};
</script>

<style>
</style>