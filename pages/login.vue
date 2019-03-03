<template lang="pug">
  v-form(v-model="valid" @submit.prevent="submit")
    v-container
      v-layout(column)
        p.display-1 ログイン
        v-flex(xs12)
          v-text-field(v-model="form.email" :rules="emailRules" label="メールアドレス" required)
        v-flex(xs12)
          v-text-field(v-model="form.password"
                       :append-icon="passwordShow ? 'visibility_off' : 'visibility'"
                       :rules="[rules.required, rules.min]"
                       :type="passwordShow ? 'text' : 'password'"
                       name="input-10-1"
                       label="パスワード"
                       hint="8文字以上必要"
                       counter
                       @click:append="passwordShow = !passwordShow")
        div
          v-btn(type="submit" color="primary") ログイン
          nuxt-link(style="text-decoration: none;" to="/register") 登録する
</template>

<script>
// import {mapGetters} from 'vuex';
export default {
  layout: "guest",
  // computed: {
  //     ...mapGetters({
  //         loggedIn: 'auth/authenticated'
  //     }),
  // },
  data: () => ({
    valid: false,
    form: {
      password: "",
      email: ""
    },
    passwordRules: [v => !!v || "パスワードの入力が必須です"],
    emailRules: [
      v => !!v || "メールアドレスの入力が必須です",
      v => /.+@.+/.test(v) || "メールアドレスの形式が正しくありません"
    ],
    passwordShow: false,
    rules: {
      required: value => !!value || "入力が必須です。",
      min: v => v.length >= 8 || "最低８文字必要です",
      emailMatch: () => "The email and password you entered don't match"
    }
  }),
  methods: {
    async submit() {
      await this.$auth
        .loginWith("local", {
          data: this.form
        })
        .catch(err => {
          console.log(err)
        })
      this.$router.push("/")
    }
  }
}
</script>

<style></style>
