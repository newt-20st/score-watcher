<template>
  <div class="quizLoad">
    <h2>問題の読み込み</h2>
    <div class="form-group">
      <textarea
        id="quizRaw"
        v-model="quizRaw"
        class="form-control"
        placeholder="quiz data"
      ></textarea>
    </div>
    <button class="btn btn-primary" type="button" @click="quizUpdate()">
      問題データを更新
    </button>
  </div>
</template>

<script>
import store from "../store";
export default {
  name: "QuizLoad",
  data() {
    return {
      quizRaw: this.$store.state.quiz,
    };
  },
  methods: {
    quizUpdate() {
      if (this.quizRaw.length !== 0) {
        const quizRaw = this.quizRaw.split("\n");
        const dataArray = [];
        for (let i = 0; i < quizRaw.length; i++) {
          dataArray[i] = quizRaw[i].split(",");
        }
        store.commit("quiz", this.quizRaw);
        this.$emit("quiz-update", dataArray);
      }
    },
  },
};
</script>

<style>
</style>