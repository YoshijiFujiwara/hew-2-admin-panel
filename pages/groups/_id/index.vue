<template lang="pug">
  div
    v-flex(xs12 md12)
      v-card(color="white" title="Edit Profile" text="Complete your profile")
        v-card-title
          h1 グループ詳細
        v-container(py-0)
          v-layout(wrap)
            v-flex.pr-3(xs12 md6)
              v-text-field.purple-input(disabled label="リーダー" v-model="group.manager.username")
            v-flex(xs12 md6 class="pr-3")
              v-text-field(class="purple-input" label="グループ名" v-model="group.name")
    v-flex.mt-5(xs12 md12)
      v-card
        v-card-title
          h2 このグループの参加メンバー
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
              v-btn(fab small color="error" @click="deleteTargetId = props.item.id, dialog = true")
                v-icon delete

    v-dialog(v-model="dialog" max-width="290")
      v-card
        v-card-title.headline 項目を削除してよろしいですか？
        v-card-actions
          v-spacer
          v-btn(color="green darken-1" flat="flat" @click="dialog = false, deleteTargetId = null") キャンセル
          v-btn(color="red darken-1" flat="flat" @click="deleteGroupUser(deleteTargetId)") 削除
</template>

<script>
  export default {
    data() {
      return {
        group: [],
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

        deleteTargetId: null,
        dialog: false,
      }
    },
    async asyncData({$axios, route}) {
      let {data} = await $axios.$get(`/admin/groups/${route.params.id}`);
      console.log(data);
      return {
        group: data,
        groupUsers: data.users
      }
    },
    methods: {
      async updateGroupInfo() {
        await this.$axios.$get(`/admin/groups/${this.$route.params.id}`)
          .then(res => {
            console.log(res)
            this.group = res.data;
            this.groupUsers = res.data.users;
          })
          .catch(err => {
            console.log(err);
          })
      },
      async deleteGroupUser(id) {
        await this.$axios.$delete(`/admin/groups/${this.$route.params.id}/users/${id}`)
          .then(res => {
            for (let key in this.groupUsers) {
              if (this.groupUsers[key].id == id) {
                this.groupUsers.splice(key, 1);
              }
            }
            this.dialog = false;
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    created() {
      window.Pusher.subscribe('admin_channel');
      window.Pusher.bind('group_update', response => {
        if (response.message.manager_id == this.$route.params.id) {
          this.updateGroupInfo();
        }
      })
      window.Pusher.bind('group_delete', response => {
        if (response.message.manager_id == this.$route.params.id) {
          this.$router.push('/groups');
        }
      })

      // userネームの更新があるかもしれません
      window.Pusher.bind('user_update', response => {
        if (response.message.user_id == this.group.manager.id) {
          this.updateGroupInfo();
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
