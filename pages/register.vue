<template lang="pug">
  v-form(v-model="valid" @submit.prevent="submit")
    v-container
      v-layout(column)
        p.display-1 アカウント作成
        v-flex(xs12)
          v-text-field(v-model="form.name"
                       :rules="nameRules"
                       label="名前"
                       required)
        v-flex(xs12)
          v-text-field(v-model="form.email"
                       :rules="emailRules"
                       label="メールアドレス"
                       required)
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
          v-btn(type="submit" color="primary") 登録
          nuxt-link(style="text-decoration: none;" to="/login") ログインする
</template>

<script>
export default {
  layout: "guest",
  data: () => ({
    valid: false,
    form: {
      name: "",
      password: "",
      email: ""
    },
    nameRules: [v => !!v || "名前の入力が必須です"],
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
      await this.$axios.$post("admin/auth/register", this.form).catch(err => {
        console.log(err.response)
        return err.response
      })
      await this.$auth.loginWith("local", {
        data: {
          email: this.form.email,
          password: this.form.password
        }
      })
      // redirect
      this.$router.push("/")
    }
  }
}
</script>

<style></style>
