<template lang="pug">
  div
    v-card
      v-card-title
        h2 グループ一覧
        v-spacer
        v-text-field(v-model="search" append-icon="search" label="検索" single-line hide-details)
      v-data-table(:headers="headers" :items="groups" :search="search")
        template(slot="items" slot-scope="props")
          td {{ props.item.id }}
          td.text-xs-left {{ props.item.manager.username }}
          td.text-xs-left {{ props.item.name }}
          td.text-xs-left {{ props.item.users.length }}
          td.text-xs-left {{ props.item.created_at['date'] }}
          td.text-xs-left {{ props.item.updated_at['date'] }}
            v-btn(fab small color="info")
              nuxt-link(style="text-decoration: none;" :to="{name: 'groups-id', params: {id: props.item.id}}" class="white--text")
                v-icon details
            v-btn(fab small color="error" @click="deleteTargetId = props.item.id, dialog = true")
              v-icon delete

    v-dialog(v-model="dialog" max-width="290")
      v-card
        v-card-title.headline 項目を削除してよろしいですか?
        v-card-actions
          v-spacer
          v-btn(color="green darken-1" flat="flat" @click="dialog = false, deleteTargetId = null") キャンセル
          v-btn(color="red darken-1" flat="flat" @click="deleteGroup(deleteTargetId)") 削除
    v-snackbar(v-model="snackbar"
              :bottom="y === 'bottom'"
              :left="x === 'left'"
              :multi-line="mode === 'multi-line'"
              :right="x === 'right'"
              :timeout="timeout"
              :top="y === 'top'"
              :vertical="mode === 'vertical'") {{ text }}
      v-btn(color="pink" flat @click="snackbar = false") Close
</template>

<script>
  export default {
    data() {
      return {
        headers: [
          {text: 'id', value: 'id'},
          {text: '幹事ユーザー名', value: 'manager'},
          {text: 'グループ名', value: 'name'},
          {text: '人数', value: 'users'},
          {text: '作成日時', value: 'created_at'},
          {text: '更新日時', value: 'updated_at'},
          {text: '操作', value: ''},
        ],
        groups: [],
        search: '',
        dialog: false,
        snackbar: false,
        y: 'top',
        x: null,
        mode: '',
        timeout: 6000,
        text: 'このグループを使用しているデフォルト設定があるため削除できません'
      }
    },
    async asyncData({$axios}) {
      let {data} = await $axios.$get('/admin/groups');
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
      },
      async deleteGroup(id) {
        await this.$axios.$delete(`/admin/groups/${id}`)
          .then(res => {
            for (let key in this.groups) {
              if (this.groups[key].id == id) {
                this.groups.splice(key, 1);
              }
            }
            this.dialog = false;
          })
          .catch(err => {
            if (err.response.status == 409) {
              this.text = 'このグループを使用しているデフォルト設定があるため削除できません';
            } else {
              this.text = '原因不明のエラーです';
            }
            this.snackbar = true;
            this.dialog = false;
            console.log(err);
          });

      },
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

      // userネームの更新があるかもしれません
      window.Pusher.bind('user_update', response => {
        this.updateGroups();
      })
    }
  }
</script>

<style>

</style>
