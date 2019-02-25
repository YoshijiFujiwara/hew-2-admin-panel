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
                    <h1>ユーザー詳細</h1>
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
                                label="User Name"
                                v-model="showUser.username"
                            />
                        </v-flex>
                        <v-flex
                            xs12
                            md6
                            class="pr-3"
                        >
                            <v-text-field
                                label="Email Address"
                                class="purple-input"
                                v-model="showUser.email"/>
                        </v-flex>
                        <v-flex
                            xs12
                            md6
                            class="pr-3"
                        >
                            <v-text-field
                                    label="name"
                                    class="purple-input"
                                    :value="showUser.name"/>
                        </v-flex>
                        <v-flex xs3>
                            <v-switch color="info" value input-value="true" label="usernameでの検索" v-model="showUser.unique_id_search_flag"></v-switch>
                        </v-flex>
                        <v-flex xs3>
                            <v-switch color="info" value input-value="true" label="unique_idでの検索" v-model="showUser.username_search_flag == 1"></v-switch>
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
                    <h2>フレンド一覧</h2>
                    <v-spacer></v-spacer>
                    <v-text-field
                            v-model="friendSearch"
                            append-icon="search"
                            label="検索"
                            single-line
                            hide-details
                    ></v-text-field>
                </v-card-title>
                <v-data-table
                    :headers="headers.friends"
                    :items="friends"
                    :search="friendSearch"
                >
                    <template slot="items" slot-scope="props">
                        <td>{{ props.item.id }}</td>
                        <td class="text-xs-left">{{ props.item.unique_id }}</td>
                        <td class="text-xs-left">{{ props.item.name }}</td>
                        <td class="text-xs-left">{{ props.item.username }}</td>
                        <td class="text-xs-left">{{ props.item.email }}</td>
                        <td class="text-xs-left">
                            <v-icon v-if="props.item.unique_id_search_flag" color="blue">radio_button_unchecked</v-icon>
                            <v-icon v-if="!props.item.unique_id_search_flag" color="red">close</v-icon>
                        </td>
                        <td class="text-xs-left">
                            <v-icon v-if="props.item.username_search_flag" color="blue">radio_button_unchecked</v-icon>
                            <v-icon v-if="!props.item.username_search_flag" color="red">close</v-icon>
                        </td>
                        <td class="text-xs-left">{{ (props.item.deleted_at)? props.item.deleted_at['date']: '' }}</td>
                        <td class="text-xs-left">
                            <v-btn fab small color="info"><nuxt-link style="text-decoration: none;" :to="{name: 'users-id', params: {id: props.item.id}}" class="white--text"><v-icon>details</v-icon></nuxt-link></v-btn>
                            <v-btn small fab color="error"><v-icon>delete</v-icon></v-btn>
                        </td>
                    </template>
                </v-data-table>
            </v-card>

        </v-flex>

        <v-flex
            xs12
            md12
            class="mt-5"
        >
            <v-card>
                <v-card-title>
                    <h2>グループ一覧</h2>
                    <v-spacer></v-spacer>
                    <v-text-field
                            v-model="groupSearch"
                            append-icon="search"
                            label="検索"
                            single-line
                            hide-details
                    ></v-text-field>
                </v-card-title>
                <v-data-table

                        :headers="headers.groups"
                        :items="groups"
                        :search="groupSearch"
                >
                    <template slot="items" slot-scope="props">
                        <td>{{ props.item.id }}</td>
                        <td class="text-xs-left">{{ props.item.manager.username }}</td>
                        <td class="text-xs-left">{{ props.item.name }}</td>
                        <td class="text-xs-left">{{ props.item.users.length }}</td>
                        <td class="text-xs-left">{{ props.item.created_at['date'] }}</td>
                        <td class="text-xs-left">{{ props.item.updated_at['date'] }}</td>
                        <td class="text-xs-left">{{ (props.item.deleted_at)? props.item.deleted_at['date']: ''}}</td>
                        <td class="text-xs-left">
                            <v-btn fab small color="info"><nuxt-link style="text-decoration: none;" :to="{name: 'groups-id', params: {id: props.item.id}}" class="white--text"><v-icon>details</v-icon></nuxt-link></v-btn>
                            <v-btn small fab color="error"><v-icon>delete</v-icon></v-btn>
                        </td>
                    </template>
                </v-data-table>
            </v-card>
        </v-flex>

        <v-flex
            xs12
            md12
            class="mt-5"
        >
            <v-card>
                <v-card-title>
                    <h2>セッション一覧</h2>
                    <v-spacer></v-spacer>
                    <v-text-field
                            v-model="sessionSearch"
                            append-icon="search"
                            label="検索"
                            single-line
                            hide-details
                    ></v-text-field>
                </v-card-title>
                <v-data-table
                        :headers="headers.sessions"
                        :items="sessions"
                        :search="sessionSearch"
                >
                    <template slot="items" slot-scope="props">
                        <td>{{ props.item.id }}</td>
                        <td class="text-xs-left">{{ props.item.manager.username }}</td>
                        <td class="text-xs-left">{{ props.item.name }}</td>
                        <td class="text-xs-left">{{ props.item.shop_id }}</td>
                        <td class="text-xs-left">{{ props.item.budget }}</td>
                        <td class="text-xs-left">{{ props.item.actual }}</td>
                        <td class="text-xs-left">{{ props.item.start_time }}</td>
                        <td class="text-xs-left">{{ props.item.end_time }}</td>
                        <td class="text-xs-left">{{ props.item.users.length }}</td>
                        <td class="text-xs-left">{{ props.item.created_at['date'] }}</td>
                        <td class="text-xs-left">{{ props.item.updated_at['date'] }}</td>
                        <td class="text-xs-left">{{ (props.item.deleted_at)? props.item.deleted_at['date']: ''}}</td>
                        <td class="text-xs-left">
                            <v-btn fab small color="info"><nuxt-link style="text-decoration: none;" :to="{name: 'sessions-id', params: {id: props.item.id}}" class="white--text"><v-icon>details</v-icon></nuxt-link></v-btn>
                            <v-btn small fab color="error"><v-icon>delete</v-icon></v-btn>
                        </td>
                    </template>
                </v-data-table>
            </v-card>
        </v-flex>

        <v-flex
            xs12
            md12
            class="mt-5"
        >
            <v-card>
                <v-card-title>
                    <h2>デフォルト設定一覧</h2>
                    <v-spacer></v-spacer>
                    <v-text-field
                            v-model="defaultSettingSearch"
                            append-icon="search"
                            label="検索"
                            single-line
                            hide-details
                    ></v-text-field>
                </v-card-title>
                <v-data-table
                        :headers="headers.defaultSettings"
                        :items="defaultSettings"
                        :search="defaultSettingSearch"
                >
                    <template slot="items" slot-scope="props">
                        <td>{{ props.item.id }}</td>
                        <td class="text-xs-left">{{ props.item.manager.username }}</td>
                        <td class="text-xs-left">{{ props.item.name }}</td>
                        <td class="text-xs-left">{{ props.item.timer }}</td>
                        <td class="text-xs-left">{{ props.item.group.id }}</td>
                        <td class="text-xs-left">{{ props.item.group.name }}</td>
                        <td class="text-xs-left">{{ props.item.created_at['date'] }}</td>
                        <td class="text-xs-left">{{ props.item.updated_at['date'] }}</td>
                        <td class="text-xs-left">{{ (props.item.deleted_at)? props.item.deleted_at['date']: ''}}</td>
                        <td class="text-xs-left">
                            <v-btn fab small color="info"><nuxt-link style="text-decoration: none;" :to="{name: 'default_settings-id', params: {id: props.item.id}}" class="white--text"><v-icon>details</v-icon></nuxt-link></v-btn>
                            <v-btn small fab color="error"><v-icon>delete</v-icon></v-btn>
                        </td>
                    </template>
                </v-data-table>
            </v-card>
        </v-flex>

        <v-flex
                xs12
                md12
                class="mt-5"
        >
            <v-card>
                <v-card-title>
                    <h2>属性一覧</h2>
                    <v-spacer></v-spacer>
                    <v-text-field
                            v-model="attributeSearch"
                            append-icon="search"
                            label="検索"
                            single-line
                            hide-details
                    ></v-text-field>
                </v-card-title>
                <v-data-table
                        :headers="headers.attributes"
                        :items="attributes"
                        :search="attributeSearch"
                >
                    <template slot="items" slot-scope="props">
                        <td>{{ props.item.id }}</td>
                        <td class="text-xs-left">{{ props.item.manager.username }}</td>
                        <td class="text-xs-left">{{ props.item.name }}</td>
                        <td class="text-xs-left">{{ props.item.plus_minus }}</td>
                        <td class="text-xs-left">{{ props.item.ratio }}</td>
                        <td class="text-xs-left">{{ props.item.created_at['date'] }}</td>
                        <td class="text-xs-left">{{ props.item.updated_at['date'] }}</td>
                        <td class="text-xs-left">{{ (props.item.deleted_at)? props.item.deleted_at['date']: ''}}</td>
                        <td class="text-xs-left">
                            <v-btn small fab color="error"><v-icon>delete</v-icon></v-btn>
                        </td>
                    </template>
                </v-data-table>
            </v-card>
        </v-flex>

        <v-flex
                xs12
                md12
                class="mt-5"
        >
            <v-card>
                <v-card-title>
                    <h2>ゲストとして参加しているセッション一覧</h2>
                    <v-spacer></v-spacer>
                    <v-text-field
                            v-model="participatedSessionSearch"
                            append-icon="search"
                            label="検索"
                            single-line
                            hide-details
                    ></v-text-field>
                </v-card-title>
                <v-data-table
                        :headers="headers.sessions"
                        :items="participatedSessions"
                        :search="participatedSessionSearch"
                >
                    <template slot="items" slot-scope="props">
                        <td>{{ props.item.id }}</td>
                        <td class="text-xs-left">{{ props.item.manager.username }}</td>
                        <td class="text-xs-left">{{ props.item.name }}</td>
                        <td class="text-xs-left">{{ props.item.shop_id }}</td>
                        <td class="text-xs-left">{{ props.item.budget }}</td>
                        <td class="text-xs-left">{{ props.item.actual }}</td>
                        <td class="text-xs-left">{{ props.item.start_time }}</td>
                        <td class="text-xs-left">{{ props.item.end_time }}</td>
                        <td class="text-xs-left">{{ props.item.users.length }}</td>
                        <td class="text-xs-left">{{ props.item.created_at['date'] }}</td>
                        <td class="text-xs-left">{{ props.item.updated_at['date'] }}</td>
                        <td class="text-xs-left">{{ (props.item.deleted_at)? props.item.deleted_at['date']: ''}}</td>
                        <td class="text-xs-left">
                            <v-btn fab small color="info"><nuxt-link style="text-decoration: none;" :to="{name: 'sessions-id', params: {id: props.item.id}}" class="white--text"><v-icon>details</v-icon></nuxt-link></v-btn>
                            <v-btn small fab color="error"><v-icon>delete</v-icon></v-btn>
                        </td>
                    </template>
                </v-data-table>
            </v-card>
        </v-flex>

        <v-flex
                xs12
                md12
                class="mt-5"
        >
            <v-card>
                <v-card-title>
                    <h2>ゲスト参加しているグループ</h2>
                    <v-spacer></v-spacer>
                    <v-text-field
                            v-model="participatedGroupSearch"
                            append-icon="search"
                            label="検索"
                            single-line
                            hide-details
                    ></v-text-field>
                </v-card-title>
                <v-data-table
                    :headers="headers.groups"
                    :items="participatedGroups"
                    :search="participatedGroupSearch"
                >
                    <template slot="items" slot-scope="props">
                        <td>{{ props.item.id }}</td>
                        <td class="text-xs-left">{{ props.item.manager.username }}</td>
                        <td class="text-xs-left">{{ props.item.name }}</td>
                        <td class="text-xs-left">{{ props.item.users.length }}</td>
                        <td class="text-xs-left">{{ props.item.created_at['date'] }}</td>
                        <td class="text-xs-left">{{ props.item.updated_at['date'] }}</td>
                        <td class="text-xs-left">{{ (props.item.deleted_at)? props.item.deleted_at['date']: ''}}</td>
                        <td class="text-xs-left">
                            <v-btn fab small color="info"><nuxt-link style="text-decoration: none;" :to="{name: 'groups-id', params: {id: props.item.id}}" class="white--text"><v-icon dark>list</v-icon></nuxt-link></v-btn>
                            <v-btn small fab color="error"><v-icon>delete</v-icon></v-btn>
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
                showUser: {},
                groups: [],
                sessions: [],
                friends: [],
                defaultSettings: [],
                attributes: [],
                participatedSessions: [],
                participatedGroups: [],
                headers: {
                    groups: [
                        { text: 'id', value: 'id' },
                        { text: '幹事ユーザー名', value: 'manager' },
                        { text: 'グループ名', value: 'name' },
                        { text: '人数', value: 'users' },
                        { text: '作成日時', value: 'created_at' },
                        { text: '更新日時', value: 'updated_at' },
                        { text: '削除日時', value: 'deleted_at' },
                        { text: '操作', value: '' },
                    ],
                    sessions: [
                        { text: 'id', value: 'id' },
                        { text: '幹事ユーザー名', value: 'manager' },
                        { text: 'セッション名', value: 'name' },
                        { text: '店ID', value: 'shop_id' },
                        { text: '予算', value: 'budget' },
                        { text: '実際の金額', value: 'actual' },
                        { text: '開始日時', value: 'start_time' },
                        { text: '終了日時', value: 'end_time' },
                        { text: '人数', value: 'users' },
                        { text: '作成日時', value: 'created_at' },
                        { text: '更新日時', value: 'updated_at' },
                        { text: '削除日時', value: 'deleted_at' },
                        { text: '操作', value: '' },
                    ],
                    friends: [
                        { text: 'id', value: 'id' },
                        { text: 'ユニークID', value: 'unique_id' },
                        { text: '名前', value: 'name' },
                        { text: 'ユーザー名', value: 'username' },
                        { text: 'メールアドレス', value: 'email' },
                        { text: 'unique_idでの検索', value: 'unique_id_search_flag' },
                        { text: 'usernameでの検索', value: 'username_search_flag' },
                        { text: '削除日時', value: 'deleted_at' },
                        { text: '操作', value: '' },
                    ],
                    defaultSettings: [
                        { text: 'id', value: 'id' },
                        { text: '幹事ユーザー名', value: 'manager' },
                        { text: '名前', value: 'name' },
                        { text: '何時間後か', value: 'timer' },
                        { text: 'グループID', value: 'group_id' },
                        { text: 'グループ名', value: 'group_name' },
                        { text: '作成日時', value: 'created_at' },
                        { text: '更新日時', value: 'updated_at' },
                        { text: '削除日時', value: 'deleted_at' },
                        { text: '操作', value: '' },
                    ],
                    attributes: [
                        { text: 'id', value: 'id' },
                        { text: '幹事ユーザー名', value: 'manager' },
                        { text: '属性名', value: 'name' },
                        { text: '加減算', value: 'plus_minus' },
                        { text: '割合', value: 'ratio' },
                        { text: '作成日時', value: 'created_at' },
                        { text: '更新日時', value: 'updated_at' },
                        { text: '削除日時', value: 'deleted_at' },
                        { text: '操作', value: '' },
                    ],
                },
                friendSearch: '',
                groupSearch: '',
                sessionSearch: '',
                defaultSettingSearch: '',
                attributeSearch: '',
                participatedSessionSearch: '',
                participatedGroupSearch: '',
            }
        },
        async asyncData({ $axios, route }) {
            let showUser = await $axios.$get(`/admin/users/${route.params.id}`);
            let friends = await $axios.$get(`/admin/users/${route.params.id}/friends`);
            let groups = await $axios.$get(`/admin/users/${route.params.id}/groups`);
            let sessions = await $axios.$get(`/admin/users/${route.params.id}/sessions`);
            let defaultSettings = await $axios.$get(`/admin/users/${route.params.id}/default_settings`);
            let attributes = await $axios.$get(`/admin/users/${route.params.id}/attributes`);
            let participatedSessions = await $axios.$get(`/admin/users/${route.params.id}/guests/sessions`);
            let participatedGroups = await $axios.$get(`/admin/users/${route.params.id}/guests/groups`);
            console.log(friends);
            return {
                showUser: showUser.data,
                friends: friends.data,
                groups: groups.data,
                sessions: sessions.data,
                defaultSettings: defaultSettings.data,
                attributes: attributes.data,
                participatedSessions: participatedSessions.data,
                participatedGroups: participatedGroups.data
            }
        },
        methods: {
            async updateUserInfo() {
                await this.$axios.$get(`/admin/users/${this.$route.params.id}`)
                    .then(res => {
                        console.log(res)
                        this.showUser = res.data;
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
            async updateFriendInfo() {
                await this.$axios.$get(`/admin/users/${this.$route.params.id}/friends`)
                    .then(res => {
                        console.log(res)
                        this.friends = res.data;
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
            async updateGroupInfo() {
                await this.$axios.$get(`/admin/users/${this.$route.params.id}/groups`)
                    .then(res => {
                        console.log(res)
                        this.groups = res.data;
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
            async updateParticipatedGroupInfo() {
                await this.$axios.$get(`/admin/users/${this.$route.params.id}/guests/groups`)
                    .then(res => {
                        console.log(res)
                        this.participatedGroups = res.data;
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
            async updateSessionInfo() {
                await this.$axios.$get(`/admin/users/${this.$route.params.id}/sessions`)
                    .then(res => {
                        console.log(res)
                        this.sessions = res.data;
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
            async updateParticipatedSessionInfo() {
                await this.$axios.$get(`/admin/users/${this.$route.params.id}/guests/sessions`)
                    .then(res => {
                        console.log(res)
                        this.participatedSessions = res.data;
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
            async updateDefaultSettingInfo() {
                await this.$axios.$get(`/admin/users/${this.$route.params.id}/default_settings`)
                    .then(res => {
                        console.log(res)
                        this.defaultSettings = res.data;
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
            async updateAttributeInfo() {
                await this.$axios.$get(`/admin/users/${this.$route.params.id}/attributes`)
                    .then(res => {
                        console.log(res)
                        this.attributes = res.data;
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        },
        created() {
            window.Pusher.subscribe('admin_channel');
            window.Pusher.bind('user_update', response => {
                if (response.message.user_id == this.$route.params.id) {
                    this.updateUserInfo();
                }
            })
            window.Pusher.bind('friend_create', response => {
                if (response.message.user_id == this.$route.params.id || response.message.friend_id == this.$route.params.id) {
                    this.updateFriendInfo();
                }
            })
            window.Pusher.bind('friend_update', response => {
                if (response.message.user_id == this.$route.params.id || response.message.friend_id == this.$route.params.id) {
                    this.updateFriendInfo();
                }
            })
            window.Pusher.bind('friend_delete', response => {
                if (response.message.user_id == this.$route.params.id || response.message.friend_id == this.$route.params.id) {
                    this.updateFriendInfo();
                }
            })

            window.Pusher.bind('group_create', response => {
                if (response.message.manager_id == this.$route.params.id) {
                    this.updateGroupInfo();
                }
            })
            window.Pusher.bind('group_update', response => {
                if (response.message.manager_id == this.$route.params.id) {
                    this.updateGroupInfo();
                }
                // ゲスト参加しているグループの中に、更新がある場合
                for (let key in this.participatedGroups) {
                    if (response.message.group_id == this.participatedGroups[key].id) {
                        this.updateParticipatedGroupInfo();
                        break;
                    }
                }
            })
            window.Pusher.bind('group_delete', response => {
                if (response.message.manager_id == this.$route.params.id) {
                    this.updateGroupInfo();
                }
                // ゲスト参加しているグループの中に、更新がある場合
                for (let key in this.participatedGroups) {
                    if (response.message.group_id == this.participatedGroups[key].id) {
                        this.updateParticipatedGroupInfo();
                        break;
                    }
                }
            })


            window.Pusher.bind('session_create', response => {
                if (response.message.manager_id == this.$route.params.id) {
                    this.updateSessionInfo();
                }
            })
            window.Pusher.bind('session_update', response => {
                if (response.message.manager_id == this.$route.params.id) {
                    this.updateSessionInfo();
                }
                // ゲスト参加しているセッションの中に、更新がある場合
                for (let key in this.participatedSessions) {
                    if (response.message.session_id == this.participatedSessions[key].id) {
                        this.updateParticipatedSessionInfo();
                        break;
                    }
                }
            })
            window.Pusher.bind('session_delete', response => {
                if (response.message.manager_id == this.$route.params.id) {
                    this.updateSessionInfo();
                }
                // ゲスト参加しているセッションの中に、更新がある場合
                for (let key in this.participatedSessions) {
                    if (response.message.session_id == this.participatedSessions[key].id) {
                        this.updateParticipatedSessionInfo();
                        break;
                    }
                }
            })


            window.Pusher.bind('attribute_create', response => {
                if (response.message.manager_id == this.$route.params.id) {
                    this.updateAttributeInfo();
                }
            })
            window.Pusher.bind('attribute_update', response => {
                if (response.message.manager_id == this.$route.params.id) {
                    this.updateAttributeInfo();
                }
            })
            window.Pusher.bind('attribute_delete', response => {
                if (response.message.manager_id == this.$route.params.id) {
                    this.updateAttributeInfo();
                }
            })


            window.Pusher.bind('default_setting_create', response => {
                if (response.message.manager_id == this.$route.params.id) {
                    this.updateDefaultSettingInfo();
                }
            })
            window.Pusher.bind('default_setting_update', response => {
                if (response.message.manager_id == this.$route.params.id) {
                    this.updateDefaultSettingInfo();
                }
            })
            window.Pusher.bind('default_setting_delete', response => {
                if (response.message.manager_id == this.$route.params.id) {
                    this.updateDefaultSettingInfo();
                }
            })
        }
    }
</script>