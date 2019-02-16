<template>
    <v-form v-model="valid" @submit.prevent="submit">
        <v-container>
            <v-layout column>
                <p class="display-1">アカウント作成</p>
                <v-flex
                    xs12
                >
                    <v-text-field
                        v-model="form.name"
                        :rules="nameRules"
                        label="名前"
                        required
                    ></v-text-field>
                </v-flex>
                <v-flex
                    xs12
                >
                    <v-text-field
                        v-model="form.email"
                        :rules="emailRules"
                        label="メールアドレス"
                        required
                    ></v-text-field>
                </v-flex>
                    <v-flex
                    xs12
                >
                    <v-text-field
                        v-model="form.password"
                        :rules="passwordRules"
                        label="パスワード"
                        required
                    ></v-text-field>
                </v-flex>
                <div>
                    <v-btn type="submit" color="primary">登録</v-btn>
                    <nuxt-link to="/login">ログインする</nuxt-link>
                </div>
            </v-layout>
        </v-container>
    </v-form>
</template>

<script>
    export default {
        layout: 'guest',
        data: () => ({
            valid: false,
            form: {
                name: '',
                password: '',
                email: '',
            },
            nameRules: [
                v => !!v || '名前の入力が必須です',
            ],
            passwordRules: [
                v => !!v || 'パスワードの入力が必須です',
            ],
            emailRules: [
                v => !!v || 'メールアドレスの入力が必須です',
                v => /.+@.+/.test(v) || 'メールアドレスの形式が正しくありません'
            ]
        }),
        methods: {
            async submit() {
                 await this.$axios.$post('admin/register', this.form)
                     .catch(err => {
                         console.log(err.response);
                         return err.response;
                     });
                 await this.$auth.loginWith("local", {
                     data: {
                         email: this.form.email,
                         password: this.form.password,
                     }
                });
                // redirect
                this.$router.push('/')
            },
        }, 
    }
</script>

<style>
</style>