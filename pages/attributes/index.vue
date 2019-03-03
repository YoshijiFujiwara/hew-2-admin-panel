<template lang="pug">
  div
    v-card
      v-card-title
        h2 属性一覧
        v-spacer
        v-text-field(v-model="search" append-icon="search" label="検索" single-line hide-details)
      v-data-table(:headers="headers" :items="attributes" :search="search")
        template(slot="items" slot-scope="props")
          td {{ props.item.id }}
          td.text-xs-left {{ props.item.manager.username }}
          td.text-xs-left {{ props.item.name }}
          td.text-xs-left {{ props.item.plus_minus }}
          td.text-xs-left {{ props.item.created_at['date'] }}
          td.text-xs-left {{ props.item.updated_at['date'] }}
          td.text-xs-left
            v-btn(fab small color="error" @click="deleteTargetId = props.item.id, dialog = true")
              v-icon delete
    v-dialog(v-model="dialog" max-width="290")
      v-card
        v-card-title.headline 項目を削除してよろしいですか？
        v-card-actions
          v-spacer
          v-btn(color="green darken-1" flat="flat" @click="dialog = false, deleteTargetId = null") キャンセル
          v-btn(color="red darken-1" flat="flat" @click="deleteAttribute(deleteTargetId)") 削除
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: "id", value: "id" },
        { text: "幹事ユーザー名", value: "manager" },
        { text: "属性名", value: "name" },
        { text: "加減算", value: "plus_minus" },
        { text: "作成日時", value: "created_at" },
        { text: "更新日時", value: "updated_at" },
        { text: "操作", value: "" }
      ],
      attributes: [],
      search: "",
      dialog: false
    }
  },
  async asyncData({ $axios }) {
    let { data } = await $axios.$get("/admin/attributes")
    return {
      attributes: data
    }
  },
  created() {
    window.Pusher.subscribe("admin_channel")
    window.Pusher.bind("attribute_create", response => {
      this.updateAttributes()
    })
    window.Pusher.bind("attribute_update", response => {
      this.updateAttributes()
    })
    window.Pusher.bind("attribute_delete", response => {
      this.updateAttributes()
    })
  },
  methods: {
    async updateAttributes() {
      await this.$axios
        .$get("/admin/attributes")
        .then(res => {
          console.log(res)
          this.attributes = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    async deleteAttribute(id) {
      await this.$axios
        .$delete(`/admin/attributes/${id}`)
        .then(res => {
          for (let key in this.attributes) {
            if (this.attributes[key].id == id) {
              this.attributes.splice(key, 1)
            }
          }
          this.dialog = false
        })
        .catch(err => {
          this.dialog = false
          console.log(err)
        })
    }
  }
}
</script>

<style></style>
