<template>
    <div>
        <v-card>
            <v-card-title>
                <h2>セッション一覧</h2>
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
                    :items="sessions"
                    :search="search"
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
                        <v-btn fab small color="info"><nuxt-link style="text-decoration: none;" :to="{name: 'sessions-id', params: {id: props.item.id}}" class="white--text"><v-icon>list</v-icon></nuxt-link></v-btn>
                        <v-btn fab small color="error" @click="deleteTargetId = props.item.id, dialog = true"><v-icon>delete</v-icon></v-btn>
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
                            @click="deleteSession(deleteTargetId)"
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
                sessions: [],
                search: '',
                dialog: false,
            }
        },
        async asyncData({ $axios }) {
            let { data } = await $axios.$get('/admin/sessions');
            return {
                sessions: data,
            }
        },
        methods: {
            async updateSessions() {
                await this.$axios.$get('/admin/sessions')
                    .then(res => {
                        console.log(res)
                        this.sessions = res.data;
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
            async deleteSession(id) {
                await this.$axios.$delete(`/admin/sessions/${id}`)
                    .then(res => {
                        for (let key in this.sessions) {
                            if (this.sessions[key].id == id) {
                                this.sessions.splice(key, 1);
                            }
                        }
                        this.dialog = false;
                    })
                    .catch(err => {
                        console.log(err);
                    });

            },
        },
        created() {
            window.Pusher.subscribe('admin_channel');
            window.Pusher.bind('session_create', response => {
                this.updateSessions();
            })
            window.Pusher.bind('session_update', response => {
                this.updateSessions();
            })
            window.Pusher.bind('session_delete', response => {
                this.updateSessions();
            })

            // userネームの更新があるかもしれません
            window.Pusher.bind('user_update', response => {
                this.updateSessions();
            })
        }
    }
</script>

<style>

</style>
