<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <v-card>
        <v-card-title class="headline">HEWのプロジェクト「ホイッスル」の管理者画面です。</v-card-title>
        <v-card-text>
          <p>フロントエンド（アンドロイドJava）のgitリポジトリ<a
            href="https://github.com/YoshijiFujiwara/hew-2-android-master"
            target="_blank"
          >こちら</a>.</p>
          <p>バックエンド(laravelAPIサーバ)のgitリポジトリ<a
            href="https://github.com/YoshijiFujiwara/hew-2-backend"
            target="_blank"
            title="chat"
          >こちら</a>.</p>
          <p>管理者画面(nuxt.js)のgitリポジトリ<a
            href="https://github.com/YoshijiFujiwara/hew-2-admin-panel"
            target="_blank"
            title="contribute"
          >こちら</a>.</p>
          <h3 class="red--text">ユーザー以外の削除ボタンは推しても反応しません。一覧が見れれば、2月18日時点ではいいでしょうと。</h3>
          <span>パンくずリストとかもつけたい気もするけど、それ以外にすべきことがおおい</span><br>
          <span>adminテンプレートは、あまりにも「キレイにできている」ので、HEWでうけないと思って使わなかった。<br>
            <br>(あと、技術力向上のため。あと、がちの管理を意識したものばかりで、大半の項目がいらない。<br>
            また、ユーザーテーブルのnameカラムに依存するテンプレートばかりで、インストールした瞬間にエラーだらけだったよ)</span><br>
          <span>SPAやからサクサク見せれると思います</span>

        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  components: {
    Logo,
    VuetifyLogo
  },
}
</script>
