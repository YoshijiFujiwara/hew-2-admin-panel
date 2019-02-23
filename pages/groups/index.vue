<template>
     <div>
          <v-card>
               <v-card-title>
                    <h2>グループ一覧</h2>
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
                  :items="groups"
                  :search="search"
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
                         { text: 'グループ名', value: 'name' },
                         { text: '人数', value: 'users' },
                         { text: '作成日時', value: 'created_at' },
                         { text: '更新日時', value: 'updated_at' },
                         { text: '削除日時', value: 'deleted_at' },
                         { text: '操作', value: '' },
                    ],
                    groups: [],
                    search: ''
               }
          },
          async asyncData({ $axios }) {
               let { data } = await $axios.$get('/admin/groups');
               return {
                    groups: data,
               }
          },
          methods: {
               async updateGroups() {
                    await this.$axios.$get('/admin/groups')
                            .then(res => {
                                 console.log(res)
                                 this.groups = res.data;
                            })
                            .catch(err => {
                                 console.log(err);
                            })
               }
          },
          created() {
               window.Pusher.subscribe('admin_channel');
               window.Pusher.bind('group_create', response => {
                    this.updateGroups();
               })
               window.Pusher.bind('group_update', response => {
                    this.updateGroups();
               })
               window.Pusher.bind('group_delete', response => {
                    this.updateGroups();
               })
          }
     }
</script>

<style>

</style>
