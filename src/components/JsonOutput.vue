<template>
  <div class="jsonOutput">
    <h2>その他の情報</h2>
    <div class="row">
      <div class="form-group col-sm-12">
        <label>json config data</label>
        <textarea
          id="jsonConfigOutput"
          :value="JSON.stringify(data)"
          class="form-control"
          placeholder="json config data"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "JsonOutput",
  props: ["data"],
};
</script>

<style>
</style>