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
          <p>Thank you for developing with Vuetify and I look forward to bringing more exciting features in the future.</p>
          <div class="text-xs-right">
            <em><small>&mdash; John Leider</small></em>
          </div>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  middleware: ['auth'],
  components: {
    Logo,
    VuetifyLogo
  }
}
</script>
