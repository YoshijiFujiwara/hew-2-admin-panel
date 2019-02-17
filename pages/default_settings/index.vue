<template>
    <div>
        <h2>デフォルト設定</h2>
        <v-data-table
                :headers="headers"
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
            }
        },
        async asyncData({ $axios }) {
            let { data } = await $axios.$get('/admin/default_settings');
            return {
                defaultSettings: data,
            }
        },
    }
</script>

<style>

</style>
