<template>
  <div class="row">
    <div class="form-group col-sm-4">
      <div class="form-check">
        <input
          class="form-check-input"
          v-model="data.display.timer.enable"
          id="timerEnable"
          type="checkbox"
          checked
        />
        <label class="form-check-label" for="timerEnable">
          タイマーを
          <span v-if="data.display.timer.enable">表示する</span
          ><span v-else>表示しない</span>
        </label>
        <small class="form-text text-muted">右上に表示されます</small>
      </div>
    </div>
    <div class="form-group col-sm-4">
      <div class="form-check">
        <input
          class="form-check-input"
          v-model="data.display.timer.countdown"
          id="timerCountdown"
          type="checkbox"
          checked
        />
        <label class="form-check-label" for="timerCountdown">
          カウント
          <span v-if="data.display.timer.countdown">ダウン</span
          ><span v-else>アップ</span>
        </label>
        <small class="form-text text-muted"></small>
      </div>
    </div>
    <div class="form-group col-sm-4" v-show="data.display.timer.countdown">
      <label>初期値</label>
      <input class="form-control" v-model="data.display.timer.start" />
      <small class="form-text text-muted">秒数で指定してください</small>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>