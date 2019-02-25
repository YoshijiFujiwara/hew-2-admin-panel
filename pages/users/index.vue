<template>
    <div>
        <v-card>
            <v-card-title>
                <h2>ユーザー一覧</h2>
                <v-spacer></v-spacer>
                <v-text-field
                    v-model="search"
                    append-icon="search"
                    label="検索"
                    single-line
                    hide-details
                ></v-text-field>
            </v-card-title>
            <v-data-table
                :headers="headers"
                :items="users"
                :search="search"
            >
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.id }}</td>
                    <td class="text-xs-left">{{ props.item.unique_id }}</td>
                    <td class="text-xs-left">{{ props.item.name }}</td>
                    <td class="text-xs-left">{{ props.item.username }}</td>
                    <td class="text-xs-left">{{ props.item.email }}</td>
                    <td class="text-xs-left">{{ (props.item.unique_id_search_flag)? 'あり' : 'なし' }}</td>
                    <td class="text-xs-left">{{ (props.item.username_search_flag)? 'あり' : 'なし' }}</td>
                    <td class="text-xs-left">{{ props.item.created_at['date'] }}</td>
                    <td class="text-xs-left">{{ props.item.updated_at['date'] }}</td>
                    <td class="text-xs-left">{{ (props.item.deleted_at)? props.item.deleted_at['date']: ''}}</td>
                    <td class="text-xs-left">
                        <v-btn small fab color="info"><nuxt-link style="text-decoration: none;" :to="{name: 'users-id', params: {id: props.item.id}}" class="white--text"><v-icon dark>list</v-icon></nuxt-link></v-btn>
                        <v-btn fab v-if="!(user.id == props.item.id)" small color="error" @click="deleteTargetId = props.item.id, dialog = true"><v-icon>delete</v-icon></v-btn>
                    </td>
                </template>
            </v-data-table>
        </v-card>

        <v-dialog
            v-model="dialog"
            max-width="290"
        >
            <v-card>
                <v-card-title class="headline">項目を削除してよろしいですか？</v-card-title>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                        color="green darken-1"
                        flat="flat"
                        @click="dialog = false, deleteTargetId = null"
                    >
                        キャンセル
                    </v-btn>

                    <v-btn
                        color="red darken-1"
                        flat="flat"
                        @click="deleteUser(deleteTargetId)"
                    >
                        削除
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                headers: [
                    { text: 'id', value: 'id' },
                    { text: 'ユニークID', value: 'unique_id' },
                    { text: '名前', value: 'name' },
                    { text: 'ユーザー名', value: 'username' },
                    { text: 'メールアドレス', value: 'email' },
                    { text: 'unique_idでの検索', value: 'unique_id_search_flag' },
                    { text: 'usernameでの検索', value: 'username_search_flag' },
                    { text: '作成日時', value: 'created_at' },
                    { text: '更新日時', value: 'updated_at' },
                    { text: '削除日時', value: 'deleted_at' },
                    { text: '操作', value: '' },
                ],
                users: [],
                dialog: false,
                deleteTargetId: null,
                search: '',
            }
        },
        async asyncData({ $axios }) {
            let { data } = await $axios.$get('/admin/users');
            console.log('data arrived')
            return {
                users: data,
            }
        },
        methods: {
            async deleteUser(id) {
                await await this.$axios.$delete(`/admin/users/${id}`);
                window.location.reload();
            },
            async updateUsers() {
                await this.$axios.$get('/admin/users')
                    .then(res => {
                        console.log(res)
                        this.users = res.data;
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
        },
        created() {
            window.Pusher.subscribe('admin_channel');
            window.Pusher.bind('user_create', response => {
                this.updateUsers();
            })
            window.Pusher.bind('user_update', response => {
                this.updateUsers();
            })
            window.Pusher.bind('user_delete', response => {
                this.updateUsers();
            })
        },
    }
</script>

<style>

</style>
