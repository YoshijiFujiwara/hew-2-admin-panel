<template>
    <div>
        <h2>ユーザー一覧</h2>
        <v-data-table
                :headers="headers"
                :items="users"
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
                <td class="text-xs-center">{{ props.item.created_at['date'] }}</td>
                <td class="text-xs-center">{{ props.item.updated_at['date'] }}</td>
                <td class="text-xs-center">{{ (props.item.deleted_at)? props.item.deleted_at['date']: ''}}</td>
                <td class="text-xs-center">
                    <v-btn small color="info">詳細</v-btn>
                    <v-btn small color="error">削除</v-btn>
                </td>
            </template>
        </v-data-table>
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
            }
        },
        async asyncData({ $axios }) {
            let { data } = await $axios.$get('/admin/users');
            return {
                users: data,
            }
        },
    }
</script>

<style>

</style>
