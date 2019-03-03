<template>
  <div>
    <v-layout row justify-center align-center>
      <v-flex xs6 class="mx-1">
        <v-card class="mt-3 mx-auto">
          <v-sheet
            class="v-sheet--offset mx-auto"
            color="cyan"
            elevation="12"
            max-width="calc(100% - 32px)"
          >
            <v-sparkline
              :labels="labels"
              :value="value"
              color="white"
              line-width="2"
              padding="16"
            />
          </v-sheet>

          <v-card-text class="pt-0">
            <div class="title font-weight-light mb-2">
              ユーザー登録
            </div>
            <div class="subheading font-weight-light grey--text">
              Last Campaign Performance
            </div>
            <v-divider class="my-2" />
            <v-icon class="mr-2" small>
              mdi-clock
            </v-icon>
            <span class="caption grey--text font-weight-light">last registration 26 minutes ago</span>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs6 class="mx-1">
        <v-card class="mt-3 mx-auto">
          <v-sheet
            class="v-sheet--offset mx-auto"
            color="cyan"
            elevation="12"
            max-width="calc(100% - 32px)"
          >
            <v-sparkline
              :labels="labels"
              :value="value"
              color="white"
              line-width="2"
              padding="16"
            />
          </v-sheet>

          <v-card-text class="pt-0">
            <div class="title font-weight-light mb-2">
              セッション作成
            </div>
            <div class="subheading font-weight-light grey--text">
              Last Campaign Performance
            </div>
            <v-divider class="my-2" />
            <v-icon class="mr-2" small>
              mdi-clock
            </v-icon>
            <span class="caption grey--text font-weight-light">last registration 26 minutes ago</span>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout class="mt-4" row justify-center align-center>
      <v-flex xs4 class="mx-1">
        <v-card class="mt-3 mx-auto">
          <v-sheet
            class="v-sheet--offset mx-auto"
            color="cyan"
            elevation="12"
            max-width="calc(100% - 32px)"
          >
            <v-sparkline
              :labels="labels"
              :value="value"
              color="white"
              line-width="2"
              padding="16"
            />
          </v-sheet>

          <v-card-text class="pt-0">
            <div class="title font-weight-light mb-2">
              グループ
            </div>
            <div class="subheading font-weight-light grey--text">
              Last Campaign Performance
            </div>
            <v-divider class="my-2" />
            <v-icon class="mr-2" small>
              mdi-clock
            </v-icon>
            <span class="caption grey--text font-weight-light">last registration 26 minutes ago</span>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs4 class="mx-1">
        <v-card class="mt-3 mx-auto">
          <v-sheet
            class="v-sheet--offset mx-auto"
            color="cyan"
            elevation="12"
            max-width="calc(100% - 32px)"
          >
            <v-sparkline
              :labels="labels"
              :value="value"
              color="white"
              line-width="2"
              padding="16"
            />
          </v-sheet>

          <v-card-text class="pt-0">
            <div class="title font-weight-light mb-2">
              デフォルト設定
            </div>
            <div class="subheading font-weight-light grey--text">
              Last Campaign Performance
            </div>
            <v-divider class="my-2" />
            <v-icon class="mr-2" small>
              mdi-clock
            </v-icon>
            <span class="caption grey--text font-weight-light">last registration 26 minutes ago</span>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs4 class="mx-1">
        <v-card class="mt-3 mx-auto">
          <v-sheet
            class="v-sheet--offset mx-auto"
            color="cyan"
            elevation="12"
            max-width="calc(100% - 32px)"
          >
            <v-sparkline
              :labels="labels"
              :value="value"
              color="white"
              line-width="2"
              padding="16"
            />
          </v-sheet>

          <v-card-text class="pt-0">
            <div class="title font-weight-light mb-2">
              属性
            </div>
            <div class="subheading font-weight-light grey--text">
              Last Campaign Performance
            </div>
            <v-divider class="my-2" />
            <v-icon class="mr-2" small>
              mdi-clock
            </v-icon>
            <span class="caption grey--text font-weight-light">last registration 26 minutes ago</span>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <!--<v-layout-->
    <!--column-->
    <!--&gt;-->
    <!--<v-flex-->
    <!--xs12-->
    <!--sm8-->
    <!--md6-->
    <!--class="mt-5"-->
    <!--&gt;-->
    <!--<v-card>-->
    <!--<v-card-title class="headline">HEWのプロジェクト「ホイッスル」の管理者画面です。</v-card-title>-->
    <!--<v-card-text>-->
    <!--<p>フロントエンド（アンドロイドJava）のgitリポジトリ<a-->
    <!--href="https://github.com/YoshijiFujiwara/hew-2-android-master"-->
    <!--target="_blank"-->
    <!--&gt;こちら</a>.</p>-->
    <!--<p>バックエンド(laravelAPIサーバ)のgitリポジトリ<a-->
    <!--href="https://github.com/YoshijiFujiwara/hew-2-backend"-->
    <!--target="_blank"-->
    <!--title="chat"-->
    <!--&gt;こちら</a>.</p>-->
    <!--<p>管理者画面(nuxt.js)のgitリポジトリ<a-->
    <!--href="https://github.com/YoshijiFujiwara/hew-2-admin-panel"-->
    <!--target="_blank"-->
    <!--title="contribute"-->
    <!--&gt;こちら</a>.</p>-->
    <!--<h3 class="red&#45;&#45;text">ユーザー以外の削除ボタンは推しても反応しません。一覧が見れれば、2月18日時点ではいいでしょうと。</h3>-->
    <!--<span>パンくずリストとかもつけたい気もするけど、それ以外にすべきことがおおい</span><br>-->
    <!--<span>adminテンプレートは、あまりにも「キレイにできている」ので、HEWでうけないと思って使わなかった。<br>-->
    <!--<br>(あと、技術力向上のため。あと、がちの管理を意識したものばかりで、大半の項目がいらない。<br>-->
    <!--また、ユーザーテーブルのnameカラムに依存するテンプレートばかりで、インストールした瞬間にエラーだらけだったよ)</span><br>-->
    <!--<span>SPAやからサクサク見せれると思います</span>-->

    <!--</v-card-text>-->
    <!--</v-card>-->
    <!--</v-flex>-->
    <!--</v-layout>-->
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue"
import VuetifyLogo from "~/components/VuetifyLogo.vue"

export default {
  components: {
    Logo,
    VuetifyLogo
  },
  data: () => ({
    labels: ["12am", "3am", "6am", "9am", "12pm", "3pm", "6pm", "9pm"],
    value: [200, 675, 410, 390, 310, 460, 250, 240]
  })
}
</script>

<style>
.v-sheet--offset {
  top: -24px;
  position: relative;
}
</style>
