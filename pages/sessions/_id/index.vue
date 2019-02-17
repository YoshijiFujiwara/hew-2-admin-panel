<template>
    <div>
        <h1>セッション詳細</h1>
        <v-flex
            xs12
            md12
        >
            <v-card
                color="white"
                title="Edit Profile"
                text="Complete your profile"
            >
                <v-container py-0>
                    <v-layout wrap>
                        <v-flex
                            xs12
                            md6
                            class="pr-3"
                        >
                            <v-text-field
                                class="purple-input"
                                disabled
                                label="リーダー"
                                v-model="session.manager.username"
                            />
                        </v-flex>
                        <v-flex
                            xs12
                            md6
                            class="pr-3"
                        >
                            <v-text-field
                                class="purple-input"
                                label="セッション名"
                                v-model="session.name"
                            />
                        </v-flex>
                        <v-flex
                            xs12
                            md6
                            class="pr-3"
                        >
                            <v-text-field
                                    label="店ID"
                                    class="purple-input"
                                    v-model="session.shop_id"/>
                        </v-flex>
                        <v-flex
                            xs12
                            md6
                            class="pr-3"
                        >
                            <v-text-field
                                label="予算"
                                class="purple-input"
                                v-model="session.budget"/>
                        </v-flex>
                        <v-flex
                            xs12
                            md6
                            class="pr-3"
                        >
                            <v-text-field
                                label="実額"
                                class="purple-input"
                                v-model="session.actual"/>
                        </v-flex>
                        <v-flex
                            xs12
                            md6
                            class="pr-3"
                        >
                            <v-text-field
                                label="開始日時"
                                class="purple-input"
                                v-model="session.start_time"/>
                        </v-flex>
                        <v-flex
                            xs12
                            md6
                            class="pr-3"
                        >
                            <v-text-field
                                label="終了日時"
                                class="purple-input"
                                v-model="session.endtime_time"/>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card>
        </v-flex>

        <v-flex
            xs12
            md12
            class="mt-5"
        >
            <h3>このセッションの参加メンバー</h3>
            <v-data-table
                :headers="headers"
                :items="sessionUsers"
                class="elevation-1"
            >
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.id }}</td>
                    <td class="text-xs-center">{{ props.item.unique_id }}</td>
                    <td class="text-xs-center">{{ props.item.name }}</td>
                    <td class="text-xs-center">{{ props.item.username }}</td>
                    <td class="text-xs-center">{{ props.item.email }}</td>
                    <td class="text-xs-center">{{ props.item.join_status }}</td>
                    <td class="text-xs-center">{{ (props.item.paid)? 'はい': 'いいえ' }}</td>
                    <td class="text-xs-center">{{ props.item.plus_minus }}</td>
                    <td class="text-xs-center">{{ props.item.ratio }}</td>
                    <td class="text-xs-center">
                        <v-btn small color="info"><nuxt-link :to="{name: 'users-id', params: {id: props.item.id}}" class="white--text">詳細</nuxt-link></v-btn>
                        <v-btn small color="error">削除</v-btn>
                    </td>
                </template>
            </v-data-table>

        </v-flex>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                session: [],
                sessionUsers: [],

                headers: [
                    { text: 'id', value: 'id' },
                    { text: 'ユニークID', value: 'unique_id' },
                    { text: '名前', value: 'name' },
                    { text: 'ユーザー名', value: 'username' },
                    { text: 'メールアドレス', value: 'email' },
                    { text: '参加ステータス', value: 'join_status' },
                    { text: '支払い済みか', value: 'paid' },
                    { text: '加減算', value: 'plus_minus' },
                    { text: '割合', value: 'ratio' },
                    { text: '操作', value: '' },
                ],
            }
        },
        async asyncData({ $axios, route }) {
            let { data } = await $axios.$get(`/admin/sessions/${route.params.id}`);
            console.log(data);
            return {
                session: data,
                sessionUsers: data.users
            }
        },
    }
</script>