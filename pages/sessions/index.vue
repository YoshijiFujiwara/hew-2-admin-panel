<template>
    <div>
        <h2>セッション一覧</h2>
        <v-data-table
                :headers="headers"
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
                    <v-btn small color="info">詳細</v-btn>
                    <v-btn small color="error">削除</v-btn>
                </td>
            </template>
        </v-data-table>
    </div>
</template>

<script>
    export default {
        middleware: ['auth'],
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
            }
        },
        async asyncData({ $axios }) {
            let { data } = await $axios.$get('/admin/sessions');
            return {
                sessions: data,
            }
        },
    }
</script>

<style>

</style>
