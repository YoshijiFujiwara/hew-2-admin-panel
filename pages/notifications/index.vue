<template lang="pug">
  div
    v-card
      v-card-title
        h2 プッシュ通知を試す
        span &nbsp;&nbsp;プッシュ通知が動いているか試したいときに使う
        v-spacer
      v-form(@submit.prevent="submit" ref="form" lazy-validation class="mx-5 pb-5")
        v-textarea(outline v-model="sendMessage" name="input-7-4" label="送信メッセージ" value="")
        v-text-field(v-model="deviceToken" :rules="deviceTokenRules" label="送信先デバイスID" required)
        v-btn(v-if="sendMessage != '' && deviceToken != ''" type="submit" color="blue white--text") 送信
    v-snackbar(v-model="snackbar"
                :bottom="y === 'bottom'"
                :left="x === 'left'"
                :multi-line="mode === 'multi-line'"
                :right="x === 'right'"
                :timeout="timeout"
                :top="y === 'top'"
                :vertical="mode === 'vertical'") {{ text }}
      v-btn(color="pink" flat @click="snackbar = false") Close
</template>

<script>
export default {
  data() {
    return {
      sendMessage: "",
      deviceToken: "",
      deviceTokenRules: [v => !!v || "送信先デバイスIDが入力されていません"],
      snackbar: false,
      y: "top",
      x: null,
      mode: "",
      timeout: 6000,
      text: "プッシュ!"
    }
  },
  methods: {
    async submit() {
      await this.$axios
        .$post("/admin/test/notification", {
          sendMessage: this.sendMessage,
          deviceToken: this.deviceToken
        })
        .then(res => {
          this.snackbar = true
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style></style>
