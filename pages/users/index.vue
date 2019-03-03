<template lang="pug">
  div
    v-card
      v-card-title
        h2 ユーザー一覧
        v-spacer
        v-text-field(v-model="search" append-icon="search" label="検索" single-line hide-details)
      v-data-table(:headers="headers" :items="users" :search="search")
        template(slot="items" slot-scope="props")
          td {{ props.item.id }}
          td.text-xs-left {{ props.item.unique_id }}
          td.text-xs-left {{ props.item.name }}
          td.text-xs-left {{ props.item.username }}
          td.text-xs-left {{ props.item.email }}
          td.text-xs-left
            v-icon(v-if="props.item.unique_id_search_flag" color="blue") radio_button_unchecked
            v-icon(v-if="!props.item.unique_id_search_flag" color="red") close
          td.text-xs-left
            v-icon(v-if="props.item.username_search_flag" color="blue") radio_button_unchecked
            v-icon(v-if="!props.item.username_search_flag" color="red") close
          td.text-xs-left {{ props.item.created_at['date'] }}
          td.text-xs-left {{ props.item.updated_at['date'] }}
          td.text-xs-left
            v-btn(small fab color="info")
              nuxt-link.white--text(style="text-decoration: none;" :to="{name: 'users-id', params: {id: props.item.id}}")
                v-icon list
            v-btn(fab v-if="!(user.id == props.item.id)" small color="error" @click="deleteTargetId = props.item.id, dialog = true")
              v-icon delete

    v-dialog(v-model="dialog" max-width="290")
      v-card
        v-card-title.headline 項目を削除してよろしいですか?
        v-card-actions
          v-spacer
          v-btn(color="green darken-1" flat="flat" @click="dialog = false, deleteTargetId = null") キャンセル
          v-btn(color="red darken-1" flat="flat" @click="deleteUser(deleteTargetId)") 削除
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: "id", value: "id" },
        { text: "ユニークID", value: "unique_id" },
        { text: "名前", value: "name" },
        { text: "ユーザー名", value: "username" },
        { text: "メールアドレス", value: "email" },
        { text: "unique_idでの検索", value: "unique_id_search_flag" },
        { text: "usernameでの検索", value: "username_search_flag" },
        { text: "作成日時", value: "created_at" },
        { text: "更新日時", value: "updated_at" },
        { text: "操作", value: "" }
      ],
      users: [],
      dialog: false,
      deleteTargetId: null,
      search: ""
    }
  },
  async asyncData({ $axios }) {
    let { data } = await $axios.$get("/admin/users")
    console.log("data arrived")
    return {
      users: data
    }
  },
  created() {
    window.Pusher.subscribe("admin_channel")
    window.Pusher.bind("user_create", response => {
      this.updateUsers()
    })
    window.Pusher.bind("user_update", response => {
      this.updateUsers()
    })
    window.Pusher.bind("user_delete", response => {
      this.updateUsers()
    })
  },
  methods: {
    async deleteUser(id) {
      await this.$axios
        .$delete(`/admin/users/${id}`)
        .then(res => {
          for (let key in this.users) {
            if (this.users[key].id == id) {
              this.users.splice(key, 1)
              this.users.splice(key, 1)
            }
          }
          this.dialog = false
        })
        .catch(err => {
          console.log(err)
        })
    },
    async updateUsers() {
      await this.$axios
        .$get("/admin/users")
        .then(res => {
          console.log(res)
          this.users = res.data
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style></style>
