<template lang="pug">
  div
    v-card
      v-card-title
        h2 デフォルト設定
        v-spacer
        v-text-field(v-model="search" append-icon="search" label="検索" single-line hide-details)
      v-data-table(:headers="headers" :items="defaultSettings" :search="search")
        template(slot="items" slot-scope="props")
          td {{ props.item.id }}
          td.text-xs-left {{ props.item.manager.username }}
          td.text-xs-left {{ props.item.name }}
          td.text-xs-left {{ props.item.timer }}
          td.text-xs-left {{ props.item.group.id }}
          td.text-xs-left {{ props.item.group.name }}
          td.text-xs-left {{ props.item.created_at['date'] }}
          td.text-xs-left {{ props.item.updated_at['date'] }}
          td.text-xs-left
            v-btn(fab small color="info")
              nuxt-link(style="text-decoration: none;" :to="{name: 'default_settings-id', params: {id: props.item.id}}" class="white--text")
                v-icon details
            v-btn(fab small color="error" @click="deleteTargetId = props.item.id, dialog = true")
              v-icon delete
    v-dialog(v-model="dialog" max-width="290")
      v-card
        v-card-title.headline 項目を削除してよろしいですか？
        v-card-actions
          v-spacer
          v-btn(color="green darken-1" flat="flat" @click="dialog = false, deleteTargetId = null") キャンセル
          v-btn(color="red darken-1" flat="flat" @click="deleteDefaultSetting(deleteTargetId)") 削除
</template>

<script>
  export default {
    data() {
      return {
        headers: [
          {text: 'id', value: 'id'},
          {text: '幹事ユーザー名', value: 'manager'},
          {text: '名前', value: 'name'},
          {text: '何時間後か', value: 'timer'},
          {text: 'グループID', value: 'group_id'},
          {text: 'グループ名', value: 'group_name'},
          {text: '作成日時', value: 'created_at'},
          {text: '更新日時', value: 'updated_at'},
          {text: '操作', value: ''},
        ],
        defaultSettings: [],
        search: '',
        dialog: false,
      }
    },
    async asyncData({$axios}) {
      let {data} = await $axios.$get('/admin/default_settings');
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
      },
      async deleteDefaultSetting(id) {
        await this.$axios.$delete(`/admin/default_settings/${id}`)
          .then(res => {
            for (let key in this.defaultSettings) {
              if (this.defaultSettings[key].id == id) {
                this.defaultSettings.splice(key, 1);
              }
            }
            this.dialog = false;
          })
          .catch(err => {
            this.dialog = false;
            console.log(err);
          });

      },
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
