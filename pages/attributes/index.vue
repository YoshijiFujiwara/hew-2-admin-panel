<template>
    <div>
        <h2>属性一覧</h2>
        <v-data-table
            :headers="headers"
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
    </div>
</template>

<script>
    export default {
        data() {
            return {
                headers: [
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
                attributes: [],
            }
        },
        async asyncData({ $axios }) {
            let { data } = await $axios.$get('/admin/attributes');
            return {
                attributes: data,
            }
        },
    }
</script>

<style>

</style>
