<template lang="pug">
  div
    v-flex(xs12 md12)
      v-card(color="white" title="Edit Profile" text="Complete your profile")
        v-card-title: h1 セッション詳細
        v-container(py-0)
          v-layout(wrap)
            v-flex.pr-3(xs12 md6)
              v-text-field.purple-input(disabled label="リーダー" v-model="session.manager.username")
            v-flex.pr-3(xs12 md6)
              v-text-field.purple-input(label="セッション名" v-model="session.name")
            v-flex.pr-3(xs12 md6)
              v-text-field(label="店ID" class="purple-input" v-model="session.shop_id")
            v-flex.pr-3(xs12 md6)
              v-text-field(label="予算" class="purple-input" v-model="session.budget")
            v-flex.pr-3(xs12 md6)
              v-text-field(label="実額" class="purple-input" v-model="session.actual")
            v-flex.pr-3(xs12 md6)
              v-text-field(label="開始日時" class="purple-input" v-model="session.start_time")
            v-flex.pr-3(xs12 md6)
              v-text-field(label="終了日時" class="purple-input" v-model="session.endtime_time")
    v-flex.mt-5(xs12 md12)
      v-card
        v-card-title
          h2 このセッションの参加メンバー
          v-spacer
          v-text-field(v-model="sessionUserSearch" append-icon="search" label="検索" single-line hide-details)
        v-data-table(:headers="headers" :items="sessionUsers" :search="sessionUserSearch")
          template(slot="items" slot-scope="props")
            td {{ props.item.id }}
            td.text-xs-left {{ props.item.unique_id }}
            td.text-xs-left {{ props.item.username }}
            td.text-xs-left {{ props.item.email }}
            td.text-xs-left
              v-icon(v-if="props.item.join_status == 'allow'" color="blue") radio_button_unchecked
              v-icon(v-if="props.item.join_status == 'deny'" color="red") close
              v-icon(v-if="props.item.join_status == 'wait'") send
            td.text-xs-left {{ props.item.attribute_name }}
            td.text-xs-left {{ props.item.plus_minus }}
            td.text-xs-left
              v-icon(v-if="props.item.paid" color="green") check
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
          v-btn(color="red darken-1" flat="flat" @click="deleteSessionUser(deleteTargetId)") 削除
</template>

<script>
  export default {
    data() {
      return {
        session: [],
        sessionUsers: [],
        sessionUserSearch: '',

        deleteTargetId: null,
        dialog: false,

        headers: [
          {text: 'id', value: 'id'},
          {text: 'ユニークID', value: 'unique_id'},
          {text: 'ユーザー名', value: 'username'},
          {text: 'メールアドレス', value: 'email'},
          {text: '参加ステータス', value: 'join_status'},
          {text: '支払い済みか', value: 'paid'},
          {text: '属性名', value: 'attribute_name'},
          {text: '加減算', value: 'plus_minus'},
          {text: '操作', value: ''},
        ],
      }
    },
    async asyncData({$axios, route}) {
      let {data} = await $axios.$get(`/admin/sessions/${route.params.id}`);
      console.log(data);
      return {
        session: data,
        sessionUsers: data.users
      }
    },
    methods: {
      async updateSessionInfo() {
        await this.$axios.$get(`/admin/sessions/${this.$route.params.id}`)
          .then(res => {
            console.log(res)
            this.session = res.data;
            this.sessionUsers = res.data.users;
          })
          .catch(err => {
            console.log(err);
          })
      },
      async deleteSessionUser(id) {
        await this.$axios.$delete(`/admin/sessions/${this.$route.params.id}/users/${id}`)
          .then(res => {
            for (let key in this.sessionUsers) {
              if (this.sessionUsers[key].id == id) {
                this.sessionUsers.splice(key, 1);
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
      console.log(this.sessionUsers);
      window.Pusher.subscribe('admin_channel');
      window.Pusher.bind('session_update', response => {
        if (response.message.manager_id == this.$route.params.id) {
          this.updateSessionInfo();
        }
      })
      window.Pusher.bind('session_delete', response => {
        if (response.message.manager_id == this.$route.params.id) {
          this.$router.push('/sessions');
        }
      })

      // userネームの更新があるかもしれません
      window.Pusher.bind('user_update', response => {
        if (response.message.user_id == this.session.manager.id) {
          this.updateSessionInfo();
        }

        // sessionUsersの中に変更のあるuserがいた場合も
        for (let key in this.sessionUsers) {
          if (response.message.user_id == this.sessionUsers[key].id) {
            this.updateSessionInfo();
            break;
          }
        }
      })
    }
  }
</script>
