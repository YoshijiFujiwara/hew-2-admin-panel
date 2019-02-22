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
                    <h1>グループ詳細</h1>
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
                                    label="リーダー"
                                    v-model="group.manager.username"
                            />
                        </v-flex>
                        <v-flex
                                xs12
                                md6
                                class="pr-3"
                        >
                            <v-text-field
                                    class="purple-input"
                                    label="グループ名"
                                    v-model="group.name"
                            />
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
                    <h2>このグループの参加メンバー</h2>
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
                        <td class="text-xs-center">{{ props.item.unique_id }}</td>
                        <td class="text-xs-center">{{ props.item.name }}</td>
                        <td class="text-xs-center">{{ props.item.username }}</td>
                        <td class="text-xs-center">{{ props.item.email }}</td>
                        <td class="text-xs-center">
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
                group: [],
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
            let { data } = await $axios.$get(`/admin/groups/${route.params.id}`);
            console.log(data);
            return {
                group: data,
                groupUsers: data.users
            }
        },
    }
</script>