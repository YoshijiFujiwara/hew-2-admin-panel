<template>
    <div>
        <v-card>
            <v-card-title>
                <h2>デフォルト設定</h2>
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
                    :items="defaultSettings"
                    :search="search"
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
                    <td class="text-xs-center">
                        <v-btn fab small color="info"><nuxt-link style="text-decoration: none;" :to="{name: 'default_settings-id', params: {id: props.item.id}}" class="white--text"><v-icon>list</v-icon></nuxt-link></v-btn>
                        <v-btn small fab color="error"><v-icon>delete</v-icon></v-btn>
                    </td>
                </template>
            </v-data-table>
        </v-card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                headers: [
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
                defaultSettings: [],
                search: ''
            }
        },
        async asyncData({ $axios }) {
            let { data } = await $axios.$get('/admin/default_settings');
            return {
                defaultSettings: data,
            }
        },
        methods: {
            async updateDefaultSettings() {
                await this.$axios.$get('/admin/default_settings')
                    .then(res => {
                        console.log(res)
                        this.defaultSettings = res.data;
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        },
        created() {
            window.Pusher.subscribe('admin_channel');
            window.Pusher.bind('default_setting_create', response => {
                this.updateDefaultSettings();
            })
            window.Pusher.bind('default_setting_update', response => {
                this.updateDefaultSettings();
            })
            window.Pusher.bind('default_setting_delete', response => {
                this.updateDefaultSettings();
            })

            // userネームの更新があるかもしれません
            window.Pusher.bind('user_update', response => {
                this.updateDefaultSettings();
            })
        }

    }
</script>

<style>

</style>
