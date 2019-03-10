<template lang="pug">
  div
    v-card
      v-card-title
        h2 店一覧
        v-spacer
        v-text-field(v-model="search" append-icon="search" label="検索" single-line hide-details)
      v-data-table(:headers="headers" :items="shops" :search="search")
        template(slot="items" slot-scope="props")
          td {{ props.item.id }}
          td.text-xs-left {{ props.item.shop_id }}
          td.text-xs-left {{ props.item.name }}
          td.text-xs-left {{ props.item.lat }}
          td.text-xs-left {{ props.item.lng }}
          td.text-xs-left {{ props.item.genre_id }}
          td.text-xs-left {{ props.item.genre_name }}
          td.text-xs-left {{ props.item.created_at['date'] }}
          td.text-xs-left {{ props.item.updated_at['date'] }}
          td.text-xs-left
            v-btn(small fab color="info")
              nuxt-link.white--text(style="text-decoration: none;" :to="{name: 'shops-id', params: {id: props.item.id}}")
                v-icon list

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
          { text: "ホットペッパーID", value: "shop_id" },
          { text: "店名", value: "name" },
          { text: "緯度", value: "lat" },
          { text: "経度", value: "lng" },
          { text: "ジャンルID", value: "genre_id" },
          { text: "ジャンル名", value: "genre_name" },
          { text: "作成日時", value: "created_at" },
          { text: "更新日時", value: "updated_at" },
          { text: "操作", value: "" }
        ],
        shops: [],
        dialog: false,
        deleteTargetId: null,
        search: ""
      }
    },
    async asyncData({ $axios }) {
      let { data } = await $axios.$get("/admin/shops")
      console.log("data arrived")
      return {
        shops: data
      }
    },
  }
</script>

<style></style>
