<template>
    <div>
        <h1>ユーザー詳細</h1>
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
            <h3>フレンド一覧</h3>
            <v-data-table
                    :headers="headers.friends"
                    :items="friends"
                    class="elevation-1"
            >
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.id }}</td>
                    <td class="text-xs-center">{{ props.item.unique_id }}</td>
                    <td class="text-xs-center">{{ props.item.name }}</td>
                    <td class="text-xs-center">{{ props.item.username }}</td>
                    <td class="text-xs-center">{{ props.item.email }}</td>
                    <td class="text-xs-center">{{ (props.item.unique_id_search_flag)? 'あり' : 'なし' }}</td>
                    <td class="text-xs-center">{{ (props.item.username_search_flag)? 'あり' : 'なし' }}</td>
                    <td class="text-xs-center">{{ (props.item.deleted_at)? props.item.deleted_at['date']: ''}}</td>
                    <td class="text-xs-center">
                        <v-btn small color="info"><nuxt-link :to="{name: 'users-id', params: {id: props.item.id}}" class="white--text">詳細</nuxt-link></v-btn>
                        <v-btn small color="error">削除</v-btn>
                    </td>
                </template>
            </v-data-table>

        </v-flex>

        <v-flex
            xs12
            md12
            class="mt-5"
        >
            <h3>グループ一覧</h3>
            <v-data-table

                    :headers="headers.groups"
                    :items="groups"
                    class="elevation-1"
            >
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.id }}</td>
                    <td class="text-xs-center">{{ props.item.manager.username }}</td>
                    <td class="text-xs-center">{{ props.item.name }}</td>
                    <td class="text-xs-center">{{ props.item.users.length }}</td>
                    <td class="text-xs-center">{{ props.item.created_at['date'] }}</td>
                    <td class="text-xs-center">{{ props.item.updated_at['date'] }}</td>
                    <td class="text-xs-center">{{ (props.item.deleted_at)? props.item.deleted_at['date']: ''}}</td>
                    <td class="text-xs-center">
                        <v-btn small color="info"><nuxt-link :to="{name: 'groups-id', params: {id: props.item.id}}" class="white--text">詳細</nuxt-link></v-btn>
                        <v-btn small color="error">削除</v-btn>
                    </td>
                </template>
            </v-data-table>

        </v-flex>

        <v-flex
            xs12
            md12
            class="mt-5"
        >
            <h3>セッション一覧</h3>
            <v-data-table
                    :headers="headers.sessions"
                    :items="sessions"
                    class="elevation-1"
            >
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.id }}</td>
                    <td class="text-xs-center">{{ props.item.manager.username }}</td>
                    <td class="text-xs-center">{{ props.item.name }}</td>
                    <td class="text-xs-center">{{ props.item.shop_id }}</td>
                    <td class="text-xs-center">{{ props.item.budget }}</td>
                    <td class="text-xs-center">{{ props.item.actual }}</td>
                    <td class="text-xs-center">{{ props.item.start_time }}</td>
                    <td class="text-xs-center">{{ props.item.end_time }}</td>
                    <td class="text-xs-center">{{ props.item.users.length }}</td>
                    <td class="text-xs-center">{{ props.item.created_at['date'] }}</td>
                    <td class="text-xs-center">{{ props.item.updated_at['date'] }}</td>
                    <td class="text-xs-center">{{ (props.item.deleted_at)? props.item.deleted_at['date']: ''}}</td>
                    <td class="text-xs-center">
                        <v-btn small color="info"><nuxt-link :to="{name: 'sessions-id', params: {id: props.item.id}}" class="white--text">詳細</nuxt-link></v-btn>
                        <v-btn small color="error">削除</v-btn>
                    </td>
                </template>
            </v-data-table>

        </v-flex>

        <v-flex
            xs12
            md12
            class="mt-5"
        >
            <h3>デフォルト設定一覧</h3>
            <v-data-table
                :headers="headers.defaultSettings"
                :items="defaultSettings"
                class="elevation-1"
            >
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.id }}</td>
                    <td class="text-xs-center">{{ props.item.manager.username }}</td>
                    <td class="text-xs-center">{{ props.item.name }}</td>
                    <td class="text-xs-center">{{ props.item.timer }}</td>
                    <td class="text-xs-center">{{ props.item.group.id }}</td>
                    <td class="text-xs-center">{{ props.item.group.name }}</td>
                    <td class="text-xs-center">{{ props.item.created_at['date'] }}</td>
                    <td class="text-xs-center">{{ props.item.updated_at['date'] }}</td>
                    <td class="text-xs-center">{{ (props.item.deleted_at)? props.item.deleted_at['date']: ''}}</td>
                    <td class="text-xs-center">
                        <v-btn small color="info"><nuxt-link :to="{name: 'default_settings-id', params: {id: props.item.id}}" class="white--text">詳細</nuxt-link></v-btn>
                        <v-btn small color="error">削除</v-btn>
                    </td>
                </template>
            </v-data-table>

        </v-flex>

        <v-flex
                xs12
                md12
                class="mt-5"
        >
            <h3>属性一覧</h3>
            <v-data-table
                    :headers="headers.attributes"
                    :items="attributes"
                    class="elevation-1"
            >
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.id }}</td>
                    <td class="text-xs-center">{{ props.item.manager.username }}</td>
                    <td class="text-xs-center">{{ props.item.name }}</td>
                    <td class="text-xs-center">{{ props.item.plus_minus }}</td>
                    <td class="text-xs-center">{{ props.item.ratio }}</td>
                    <td class="text-xs-center">{{ props.item.created_at['date'] }}</td>
                    <td class="text-xs-center">{{ props.item.updated_at['date'] }}</td>
                    <td class="text-xs-center">{{ (props.item.deleted_at)? props.item.deleted_at['date']: ''}}</td>
                    <td class="text-xs-center">
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
                showUser: {},
                groups: [],
                sessions: [],
                friends: [],
                defaultSettings: [],
                attributes: [],
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
            }
        },
        async asyncData({ $axios, route }) {
            let showUser = await $axios.$get(`/admin/users/${route.params.id}`);
            let groups = await $axios.$get(`/admin/users/${route.params.id}/groups`);
            let sessions = await $axios.$get(`/admin/users/${route.params.id}/sessions`);
            let defaultSettings = await $axios.$get(`/admin/users/${route.params.id}/default_settings`);
            let attributes = await $axios.$get(`/admin/users/${route.params.id}/attributes`);

            return {
                showUser: showUser.data,
                groups: groups.data,
                sessions: sessions.data,
                defaultSettings: defaultSettings.data,
                attributes: attributes.data,
            }
        },
    }
</script>