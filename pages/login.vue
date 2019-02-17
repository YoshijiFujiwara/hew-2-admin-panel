<template>
    <v-form v-model="valid" @submit.prevent="submit">
        <v-container>
            <v-layout column>
                <p class="display-1">ログイン{{loggedIn}}</p>
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
                    <v-btn type="submit" color="primary">ログイン</v-btn>
                    <nuxt-link to="/register">登録する</nuxt-link>
                </div>
            </v-layout>
        </v-container>
    </v-form>
</template>

<script>
    // import {mapGetters} from 'vuex';
    export default {
        layout: 'guest',
        // computed: {
        //     ...mapGetters({
        //         loggedIn: 'auth/authenticated'
        //     }),
        // },
        data: () => ({
            valid: false,
            form: {
                password: '',
                email: '',
            },
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
                await this.$auth.loginWith("local", {
                    data: this.form
                });
                this.$router.push('/');
            },
        },      
    }
</script>

<style>
</style>