<template>
  <div class="row">
    <div class="form-group col-sm-4">
      <div class="form-check">
        <input
          class="form-check-input"
          :value="timer.enable"
          @change="$emit('enable', $event.target.checked)"
          id="timerEnable"
          type="checkbox"
          checked
        />
        <label class="form-check-label" for="timerEnable">
          タイマーを
          <span v-if="timer.enable">表示する</span
          ><span v-else>表示しない</span>
        </label>
        <small class="form-text text-muted">右上に表示されます</small>
      </div>
    </div>
    <div class="form-group col-sm-4" v-show="timer.enable">
      <div class="form-check">
        <input
          class="form-check-input"
          :value="timer.countdown"
          @change="$emit('countdown', $event.target.checked)"
          id="timerCountdown"
          type="checkbox"
          checked
        />
        <label class="form-check-label" for="timerCountdown">
          カウント
          <span v-if="timer.countdown">ダウン</span><span v-else>アップ</span>
        </label>
        <small class="form-text text-muted"></small>
      </div>
    </div>
    <div class="form-group col-sm-4" v-show="timer.enable && timer.countdown">
      <label>初期値</label>
      <input
        class="form-control"
        :value="timer.start"
        @input="$emit('start', $event.target.value)"
      />
      <small class="form-text text-muted">秒数で指定してください</small>
    </div>
  </div>
</template>

<script>
export default {
  name: "TimerConfig",
  props: ["timer"],
};
</script>

<style>
</style>