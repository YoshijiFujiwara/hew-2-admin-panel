<template lang="pug">
  div
    v-flex(xs12 md12)
      v-card(color="white" title="Edit Profile" text="Complete your profile")
        v-card-title
          h1 デフォルト設定詳細
        v-container(py-0)
          v-layout(wrap)
            v-flex(xs12 md6 class="pr-3")
              v-text-field(class="purple-input" disabled label="この設定の所持者" v-model="defaultSetting.manager.username")
            v-flex(xs12 md6 class="pr-3")
              v-text-field(class="purple-input" label="設定名称" v-model="defaultSetting.name")
            v-flex(xs12 md6 class="pr-3")
              v-text-field(label="何時間後か" class="purple-input" v-model="defaultSetting.timer")
            v-flex(xs12 md6 class="pr-3")
              v-text-field(label="グループID" class="purple-input" v-model="defaultSetting.group.id")
            v-flex(xs12 md6 class="pr-3")
              v-text-field(label="グループ名" class="purple-input" v-model="defaultSetting.group.name")
            v-flex(xs3)
              v-switch(color="info" value input-value="true" label="現在地フラグ" v-model="defaultSetting.current_location_flag")
            v-flex(xs12 md6 class="pr-3")
              v-text-field(label="緯度" class="purple-input" v-model="defaultSetting.latitude")
            v-flex(xs12 md6 class="pr-3")
              v-text-field(label="経度" class="purple-input" v-model="defaultSetting.longitude")

    v-flex.mt-5(xs12 md12)
      v-card
        v-card-title
          h2 この設定のグループのユーザー一覧
          v-spacer
          v-text-field(v-model="groupUserSearch" append-icon="search" label="検索" single-line hide-details)
        v-data-table(:headers="headers" :items="groupUsers" :search="groupUserSearch")
          template(slot="items" slot-scope="props")
            td {{ props.item.id }}
            td.text-xs-left {{ props.item.unique_id }}
            td.text-xs-left {{ props.item.name }}
            td.text-xs-left {{ props.item.username }}
            td.text-xs-left {{ props.item.email }}
            td.text-xs-left
              v-btn(fab small color="info")
                nuxt-link(style="text-decoration: none;" :to="{name: 'users-id', params: {id: props.item.id}}" class="white--text")
                  v-icon details
</template>

<script>
  export default {
    data() {
      return {
        defaultSetting: [],
        groupUsers: [],
        groupUserSearch: '',
        headers: [
          {text: 'id', value: 'id'},
          {text: 'ユニークID', value: 'unique_id'},
          {text: '名前', value: 'name'},
          {text: 'ユーザー名', value: 'username'},
          {text: 'メールアドレス', value: 'email'},
          {text: '操作', value: ''},
        ],
      }
    },
    async asyncData({$axios, route}) {
      let {data} = await $axios.$get(`/admin/default_settings/${route.params.id}`);
      console.log(data);
      return {
        defaultSetting: data,
        groupUsers: data.group.users
      }
    },
    methods: {
      async updateDefaultSettingInfo() {
        await this.$axios.$get(`/admin/default_settings/${this.$route.params.id}`)
          .then(res => {
            console.log(res)
            this.defaultSetting = res.data;
            this.groupUsers = res.data.group.users;
          })
          .catch(err => {
            console.log(err);
          })
      }
    },
    created() {
      window.Pusher.subscribe('admin_channel');
      window.Pusher.bind('default_setting_update', response => {
        if (response.message.manager_id == this.$route.params.id) {
          this.updateDefaultSettingInfo();
        }
      })
      window.Pusher.bind('default_setting_delete', response => {
        if (response.message.manager_id == this.$route.params.id) {
          this.$router.push('/default_settings');
        }
      })

      // userネームの更新があるかもしれません
      window.Pusher.bind('user_update', response => {
        if (response.message.user_id == this.defaultSetting.manager.id) {
          this.updateDefaultSettingInfo();
        }

        // sessionUsersの中に変更のあるuserがいた場合も
        for (let key in this.groupUsers) {
          if (response.message.user_id == this.groupUsers[key].id) {
            this.updateGroupInfo();
            break;
          }
        }
      })
    }
  }
</script>
