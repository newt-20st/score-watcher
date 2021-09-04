<template>
  <div class="home">
    <div class="content">
      <p>Ver.0.8.0</p>
      <p>
        最新のバージョンは<a
          href="https://github.com/newt-20st/score-watcher/releases"
          target="_blank"
          >こちらのリポジトリ</a
        >から確認してください。
      </p>
      <h2>形式を選択</h2>
      <div class="formatList">
        <router-link to="/config?type=json">
          <h3>設定ファイルから読み込む</h3>
          <div>
            過去に設定した際に出力したファイルから形式データを読み込みます。
          </div>
        </router-link>
        <router-link to="/config?type=count"
          ><h3>スコア計算</h3>
          <div>単純にスコアを計算します。</div></router-link
        >
        <router-link to="/config?type=nomx">
          <h3>N o M x</h3>
          <div>N回正解で勝ち抜け、M回誤答で失格の形式です。</div></router-link
        >
        <router-link to="/config?type=nbyn">
          <h3>N by N</h3>
          <div>
            正答数と誤答数2つの変数を持ち、それぞれの初期値は0とNです。2つの変数の積がN
            ** 2に達したら勝ち抜けの形式です。
          </div></router-link
        >
        <router-link to="/config?type=nupdown">
          <h3>N updown</h3>
          <div>
            N回正解で勝ち抜けですが、途中で一度でも誤答すると0に戻る形式です。
          </div></router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>
<style lang="scss" scoped>
.home {
  margin: 1rem;
  border-top: 3px solid $base-color;
}
.formatList {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1vw;
  margin: 1vw 0;
  a {
    display: block;
    background-color: $back-color;
    color: $base-color;
    text-decoration: none;
    border: 0.3rem solid $base-color;
    border-radius: 2rem;
    padding: 1rem;
    height: 25vh;
    transition: all ease-in 0.3s;
    overflow-y: hidden;
    h3 {
      font-size: 1.5rem;
      font-weight: 800;
      line-height: 1.5rem;
    }
    div {
      font-size: 1rem;
      line-height: 1rem;
    }
    &.wait {
      color: gray;
      border: 0.3rem solid gray;
      &:hover {
        background-color: gray;
        color: $back-color;
      }
    }
    &:hover {
      background-color: $base-color;
      color: $back-color;
    }
    &:first-child {
      color: $correct-color;
      border: 0.3rem solid $correct-color;
      &:hover {
        background-color: $correct-color;
        color: $back-color;
      }
    }
  }
}
</style>