<template lang="pug">
  div
    v-card
      v-card-title
        h2 セッション一覧
        v-spacer
        v-text-field(v-model="search" append-icon="search" label="検索" single-line hide-details)
      v-data-table(:headers="headers" :items="sessions" :search="search")
        template(slot="items" slot-scope="props")
          td {{ props.item.id }}
          td.text-xs-left {{ props.item.manager.username }}
          td.text-xs-left {{ props.item.name }}
          td.text-xs-left {{ props.item.shop_id }}
          td.text-xs-left {{ props.item.budget }}
          td.text-xs-left {{ props.item.actual }}
          td.text-xs-left {{ props.item.start_time }}
          td.text-xs-left {{ props.item.end_time }}
          td.text-xs-left {{ props.item.users.length }}
          td.text-xs-left {{ props.item.created_at['date'] }}
          td.text-xs-left {{ props.item.updated_at['date'] }}
          td.text-xs-left
            v-btn(fab small color="info")
              nuxt-link.white--text(style="text-decoration: none;" :to="{name: 'sessions-id', params: {id: props.item.id}}")
                v-icon details
            v-btn(fab small color="error" @click="deleteTargetId = props.item.id, dialog = true")
              v-icon delete
    v-dialog(v-model="dialog" max-width="290")
      v-card
        v-card-title.headline 項目を削除してよろしいですか？
        v-card-actions
          v-spacer
          v-btn(color="green darken-1" flat="flat" @click="dialog = false, deleteTargetId = null") キャンセル
          v-btn(color="red darken-1" flat="flat" @click="deleteSession(deleteTargetId)") 削除
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: "id", value: "id" },
        { text: "幹事ユーザー名", value: "manager" },
        { text: "セッション名", value: "name" },
        { text: "店ID", value: "shop_id" },
        { text: "予算", value: "budget" },
        { text: "実際の金額", value: "actual" },
        { text: "開始日時", value: "start_time" },
        { text: "終了日時", value: "end_time" },
        { text: "人数", value: "users" },
        { text: "作成日時", value: "created_at" },
        { text: "更新日時", value: "updated_at" },
        { text: "操作", value: "" }
      ],
      sessions: [],
      search: "",
      dialog: false,
      start: "2019-02-01",
      end: "2019-02-06",
      today: "2019-01-08"
    }
  },
  computed: {
    // convert the list of events into a map of lists keyed by date
    eventsMap() {
      const map = {}
      this.events.forEach(e => (map[e.date] = map[e.date] || []).push(e))
      return map
    },
    events() {
      let eventDatas = []
      for (let key in this.sessions) {
        let allowCount = 0
        let denyCount = 0
        let waitCount = 0

        for (let key2 in this.sessions[key].users) {
          switch (this.sessions[key].users[key2].join_status) {
            case "allow":
              allowCount++
              break
            case "wait":
              waitCount++
              break
            case "deny":
              denyCount++
              break
          }
        }
        eventDatas.push({
          sessionId: this.sessions[key].id,
          title: this.sessions[key].name,
          date:
            this.sessions[key].start_time != null
              ? this.sessions[key].start_time.slice(0, 10)
              : null,
          // time: (this.sessions[key].start_time != null)? this.sessions[key].start_time.slice(11,16): null,
          details: `セッションID:&nbsp;${this.sessions[key].id}<br>幹事：${
            this.sessions[key].manager.username
          }<br>参加人数:${allowCount}人<br>招待中: ${waitCount}人<br>参加拒否: ${denyCount}人`,
          open: false
        })
      }
      // console.log(eventDatas);
      return eventDatas
    }
  },
  async asyncData({ $axios }) {
    let { data } = await $axios.$get("/admin/sessions")
    return {
      sessions: data
    }
  },
  created() {
    window.Pusher.subscribe("admin_channel")
    window.Pusher.bind("session_create", response => {
      this.updateSessions()
    })
    window.Pusher.bind("session_update", response => {
      this.updateSessions()
    })
    window.Pusher.bind("session_delete", response => {
      this.updateSessions()
    })

    // userネームの更新があるかもしれません
    window.Pusher.bind("user_update", response => {
      this.updateSessions()
    })
  },
  methods: {
    open(event) {
      alert(event.title)
    },
    async updateSessions() {
      await this.$axios
        .$get("/admin/sessions")
        .then(res => {
          console.log(res)
          this.sessions = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    async deleteSession(id) {
      await this.$axios
        .$delete(`/admin/sessions/${id}`)
        .then(res => {
          for (let key in this.sessions) {
            if (this.sessions[key].id == id) {
              this.sessions.splice(key, 1)
            }
          }
          this.dialog = false
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
  // mounted () {
  //     this.$refs.calendar.scrollToTime('08:00')
  // },
}
</script>

<style lang="stylus" scoped>
.my-event {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #1867c0;
  color: #ffffff;
  border: 1px solid #1867c0;
  width: 100%;
  font-size: 12px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;
}
</style>
