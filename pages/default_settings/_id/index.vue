<template>
    <div>
        <v-flex
            xs12
            md12
        >
            <v-card
                    color="white"
                    title="Edit Profile"
                    text="Complete your profile"
            >
                <v-card-title>
                    <h1>デフォルト設定詳細</h1>
                </v-card-title>
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
                                    label="この設定の所持者"
                                    v-model="defaultSetting.manager.username"
                            />
                        </v-flex>
                        <v-flex
                                xs12
                                md6
                                class="pr-3"
                        >
                            <v-text-field
                                    class="purple-input"
                                    label="設定名称"
                                    v-model="defaultSetting.name"
                            />
                        </v-flex>
                        <v-flex
                                xs12
                                md6
                                class="pr-3"
                        >
                            <v-text-field
                                    label="何時間後か"
                                    class="purple-input"
                                    v-model="defaultSetting.timer"/>
                        </v-flex>
                        <v-flex
                                xs12
                                md6
                                class="pr-3"
                        >
                            <v-text-field
                                    label="グループID"
                                    class="purple-input"
                                    v-model="defaultSetting.group.id"/>
                        </v-flex>
                        <v-flex
                                xs12
                                md6
                                class="pr-3"
                        >
                            <v-text-field
                                    label="グループ名"
                                    class="purple-input"
                                    v-model="defaultSetting.group.name"/>
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
            <v-card>
                <v-card-title>
                    <h2>この設定のグループのユーザー一覧</h2>
                    <v-spacer></v-spacer>
                    <v-text-field
                        v-model="groupUserSearch"
                        append-icon="search"
                        label="検索"
                        single-line
                        hide-details
                    ></v-text-field>
                </v-card-title>
                <v-data-table
                    :headers="headers"
                    :items="groupUsers"
                    :search="groupUserSearch"
                >
                    <template slot="items" slot-scope="props">
                        <td>{{ props.item.id }}</td>
                        <td class="text-xs-left">{{ props.item.unique_id }}</td>
                        <td class="text-xs-left">{{ props.item.name }}</td>
                        <td class="text-xs-left">{{ props.item.username }}</td>
                        <td class="text-xs-left">{{ props.item.email }}</td>
                        <td class="text-xs-left">
                            <v-btn small color="info"><nuxt-link :to="{name: 'users-id', params: {id: props.item.id}}" class="white--text">詳細</nuxt-link></v-btn>
                            <v-btn small color="error">削除</v-btn>
                        </td>
                    </template>
                </v-data-table>
            </v-card>
        </v-flex>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                defaultSetting: [],
                groupUsers: [],
                groupUserSearch: '',
                headers: [
                    { text: 'id', value: 'id' },
                    { text: 'ユニークID', value: 'unique_id' },
                    { text: '名前', value: 'name' },
                    { text: 'ユーザー名', value: 'username' },
                    { text: 'メールアドレス', value: 'email' },
                    { text: '操作', value: '' },
                ],
            }
        },
        async asyncData({ $axios, route }) {
            let { data } = await $axios.$get(`/admin/default_settings/${route.params.id}`);
            console.log(data);
            return {
                defaultSetting: data,
                groupUsers: data.group.users
            }
        },
        methods: {
            async updateDefaultSettingInfo() {
                await this.$axios.$get(`/admin/default_settings/${this.$route.params.id}`)
                    .then(res => {
                        console.log(res)
                        this.defaultSetting = res.data;
                        this.groupUsers = res.data.group.users;
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        },
        created() {
            window.Pusher.subscribe('admin_channel');
            window.Pusher.bind('default_setting_update', response => {
                if (response.message.manager_id == this.$route.params.id) {
                    this.updateDefaultSettingInfo();
                }
            })
            window.Pusher.bind('default_setting_delete', response => {
                if (response.message.manager_id == this.$route.params.id) {
                    this.$router.push('/default_settings');
                }
            })

            // userネームの更新があるかもしれません
            window.Pusher.bind('user_update', response => {
                if (response.message.user_id = this.defaultSetting.manager.id) {
                    this.updateDefaultSettingInfo();
                }
            })
        }
    }
</script>