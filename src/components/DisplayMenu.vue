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
import { Timer } from "easytimer.js";
var aTimer = new Timer();
export default {
  name: "DisplayMenu",
  props: ["format"],
  data() {
    return {
      timer: this.$store.state.config.format[this.format].display.timer,
      time: "",
    };
  },
  created() {
    this.InitTimer();
  },
  methods: {
    InitTimer() {
      if (this.timer.countdown) {
        aTimer.start({
          countdown: true,
          precision: "seconds",
          startValues: { seconds: this.timer.start },
        });
      } else {
        aTimer.start({ precision: "seconds", startValues: { seconds: 0 } });
      }
      aTimer.addEventListener("secondsUpdated", () => {
        this.time = aTimer.getTimeValues().toString();
      });
      aTimer.addEventListener("started", () => {
        this.time = aTimer.getTimeValues().toString();
      });
      aTimer.addEventListener("pause", () => {
        this.time = aTimer.getTimeValues().toString();
      });
      aTimer.addEventListener("targetAchieved", () => {
        this.time = "FINISH!";
      });
    },
    timerStart() {
      aTimer.start();
    },
    timerPause() {
      aTimer.pause();
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