<template lang="pug">
  div
    v-flex(xs12 md12)
      v-card(color="white" title="Edit Profile" text="Complete your profile")
        v-card-title: h1 ユーザー詳細
        v-container(py-0)
          v-layout(wrap)
            v-flex.pr-3(xs12 md6)
              v-text-field.purple-input(label="User Name" v-model="showUser.username")
            v-flex.pr-3(xs12 md6)
              v-text-field.purple-input(label="Email Address" v-model="showUser.email")
            v-flex.pr-3(xs12 md6)
              v-text-field.purple-input(label="name" :value="showUser.name")
            v-flex(xs3)
              v-switch(color="info" value input-value="true" label="usernameでの検索" v-model="showUser.unique_id_search_flag")
            v-flex(xs3)
              v-switch(color="info" value input-value="true" label="unique_idでの検索" v-model="showUser.username_search_flag == 1")

    // カレンダー
    v-card.mt-5
      v-layout
        v-flex.text-sm-left.text-xs-center(sm4 xs12)
          v-btn(@click="$refs.calendar.prev()")
            v-icon(dark left) keyboard_arrow_left
        v-flex.text-xs-center(sm4 xs12)
        v-flex.text-sm-right.text-xs-center(sm4 xs12)
          v-btn(@click="$refs.calendar.next()")
            v-icon(right dark) keyboard_arrow_right

      v-flex
        v-sheet(height="800")
          v-calendar(ref="calendar" locale="ja" v-model="start" :end="end" color="primary")
            template(slot="day" slot-scope="{ date }")
              template(v-for="(event, key) in eventsMap[date]")
                v-menu(:key="`${event.title}-${key}`" v-model="event.open" full-width offset-x)
                  div(v-if="!event.time"
                      slot="activator"
                      v-ripple
                      :class="(event.managedFlag)? 'my-event' : 'my-participate-event'"
                      v-html="event.title")
                  v-card(color="grey lighten-4" min-width="350px" flat)
                    v-toolbar(:color="(event.managedFlag)? 'primary' : 'orange'" dark)
                      v-toolbar-title(v-html="event.title")
                      v-spacer
                    v-card-title(primary-title)
                      span(v-html="event.details")
                    v-card-actions
                      v-btn(flat color="secondary")
                        nuxt-link(style="text-decoration: none;" :to="{name: 'sessions-id', params: {id: event.sessionId}}" class="blue--text") 詳細

    v-flex.mt-5(xs12 md12)
      v-card
        v-card-title
          h2.blue--text フレンド一覧
          v-spacer
          v-text-field(v-model="friendSearch"
                        append-icon="search"
                        label="検索"
                        single-line
                        hide-details)
        v-data-table(:headers="headers.friends" :items="friends" :search="friendSearch")
          template(slot="items" slot-scope="props")
            td {{ props.item.id }}
            td.text-xs-left {{ props.item.unique_id }}
            td.text-xs-left {{ props.item.name }}
            td.text-xs-left {{ props.item.username }}
            td.text-xs-left {{ props.item.email }}
            td.text-xs-left
              v-icon(v-if="props.item.unique_id_search_flag" color="blue") radio_button_unchecked
              v-icon(v-if="!props.item.unique_id_search_flag" color="blue") close
            td.text-xs-left
              v-icon(v-if="props.item.username_search_flag" color="blue") radio_button_unchecked
              v-icon(v-if="!props.item.username_search_flag" color="blue") close
            td.text-xs-left
              v-btn(fab small color="info")
                nuxt-link(style="text-decoration: none;" :to="{name: 'users-id', params: {id: props.item.id}}" class="white--text")
                  v-icon details
              v-btn(fab v-if="!(user.id == props.item.id)" small color="error"
                    @click="deleteTargetId = props.item.id, dialog = true, deleteTargetType = 'friend'")
                v-icon delete

    v-flex.mt-5(xs12 md12)
      v-card
        v-card-title
          h2.blue--text グループ一覧
          v-spacer
          v-text-field(v-model="groupSearch" append-icon="search" label="検索" single-line hide-details)
        v-data-table(:headers="headers.groups" :items="groups" :search="groupSearch")
          template(slot="items" slot-scope="props")
            td {{ props.item.id }}
            td.text-xs-left {{ props.item.manager.username }}
            td.text-xs-left {{ props.item.name }}
            td.text-xs-left {{ props.item.users.length }}
            td.text-xs-left {{ props.item.created_at['date'] }}
            td.text-xs-left {{ props.item.updated_at['date'] }}
            td.text-xs-left
              v-btn(fab small color="info")
                nuxt-link.white--text(style="text-decoration: none;" :to="{name: 'groups-id', params: {id: props.item.id}}")
                  v-icon details
              v-btn(fab v-if="!(user.id == props.item.id)" small color="error" @click="deleteTargetId = props.item.id, dialog = true, deleteTargetType = 'group'")
                v-icon delete

    v-flex.mt-5(xs12 md12)
      v-card
        v-card-title
          h2.blue--text イベント一覧
          v-spacer
          v-text-field(v-model="sessionSearch" append-icon="search" label="検索" single-line hide-details)
        v-data-table(:headers="headers.sessions" :items="sessions" :search="sessionSearch")
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
              v-btn(fab v-if="!(user.id == props.item.id)" small color="error"
                    @click="deleteTargetId = props.item.id, dialog = true, deleteTargetType = 'session'")
                  v-icon delete
    v-flex.mt-5(xs12 md12)
      v-card
        v-card-title
          h2.blue--text デフォルト設定一覧
          v-spacer
          v-text-field(v-model="defaultSettingSearch" append-icon="search" label="検索" single-line hide-details)
        v-data-table(:headers="headers.defaultSettings" :items="defaultSettings" :search="defaultSettingSearch")
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
                nuxt-link(style="text-decoration: none;"
                          :to="{name: 'default_settings-id', params: {id: props.item.id}}" class="white--text")
                  v-icon details
              v-btn(fab v-if="!(user.id == props.item.id)" small color="error"
                    @click="deleteTargetId = props.item.id, dialog = true, deleteTargetType = 'default_setting'")
                v-icon delete
    v-flex.mt-5(xs12 md12)
      v-card
        v-card-title
          h2.blue--text 属性一覧
          v-spacer
          v-text-field(v-model="attributeSearch" append-icon="search" label="検索" single-line hide-details)
        v-data-table(:headers="headers.attributes" :items="attributes" :search="attributeSearch")
          template(slot="items" slot-scope="props")
            td {{ props.item.id }}
            td.text-xs-left {{ props.item.manager.username }}
            td.text-xs-left {{ props.item.name }}
            td.text-xs-left {{ props.item.plus_minus }}
            td.text-xs-left {{ props.item.created_at['date'] }}
            td.text-xs-left {{ props.item.updated_at['date'] }}
            td.text-xs-left
              v-btn(fab v-if="!(user.id == props.item.id)" small color="error"
                    @click="deleteTargetId = props.item.id, dialog = true, deleteTargetType = 'attribute'")
                v-icon delete
    v-flex.mt-5(xs12 md12)
      v-card
        v-card-title
          h2.orange--text ゲストとして参加しているイベント一覧
          v-spacer
          v-text-field(v-model="participatedSessionSearch" append-icon="search" label="検索" single-line hide-details)
        v-data-table(:headers="headers.sessions" :items="participatedSessions" :search="participatedSessionSearch")
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
              v-btn(fab v-if="!(user.id == props.item.id)" small color="error"
                    @click="deleteTargetId = props.item.id, dialog = true, deleteTargetType = 'participatedSession'")
                  v-icon delete

    v-flex.mt-5(xs12 md12)
      v-card
        v-card-title
          h2.orange--text ゲスト参加しているグループ
          v-spacer
          v-text-field(v-model="participatedGroupSearch" append-icon="search" label="検索" single-line hide-details)
        v-data-table(:headers="headers.groups" :items="participatedGroups" :search="participatedGroupSearch")
          template(slot="items" slot-scope="props")
            td {{ props.item.id }}
            td.text-xs-left {{ props.item.manager.username }}
            td.text-xs-left {{ props.item.name }}
            td.text-xs-left {{ props.item.users.length }}
            td.text-xs-left {{ props.item.created_at['date'] }}
            td.text-xs-left {{ props.item.updated_at['date'] }}
            td.text-xs-left
              v-btn(fab small color="info")
                nuxt-link.white--text(style="text-decoration: none;" :to="{name: 'groups-id', params: {id: props.item.id}}")
                  v-icon(dark) details
              v-btn(fab v-if="!(user.id == props.item.id)" small color="error"
                    @click="deleteTargetId = props.item.id, dialog = true, deleteTargetType = 'participatedGroup'")
                v-icon delete

    v-dialog(v-model="dialog" max-width="290")
      v-card
        v-card-title.headline 項目を削除してよろしいですか?
        v-card-actions
          v-spacer
          v-btn(color="green darken-1" flat="flat" @click="dialog = false, deleteTargetId = null") キャンセル
          v-btn(color="red darken-1" flat="flat" @click="deleteTarget(deleteTargetId)") 削除
</template>

<script>
export default {
  data() {
    return {
      showUser: {},
      groups: [],
      sessions: [],
      friends: [],
      defaultSettings: [],
      attributes: [],
      participatedSessions: [],
      participatedGroups: [],
      headers: {
        groups: [
          { text: "id", value: "id" },
          { text: "幹事ユーザー名", value: "manager" },
          { text: "グループ名", value: "name" },
          { text: "人数", value: "users" },
          { text: "作成日時", value: "created_at" },
          { text: "更新日時", value: "updated_at" },
          { text: "操作", value: "" }
        ],
        sessions: [
          { text: "id", value: "id" },
          { text: "幹事ユーザー名", value: "manager" },
          { text: "イベント名", value: "name" },
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
        friends: [
          { text: "id", value: "id" },
          { text: "ユニークID", value: "unique_id" },
          { text: "名前", value: "name" },
          { text: "ユーザー名", value: "username" },
          { text: "メールアドレス", value: "email" },
          { text: "unique_idでの検索", value: "unique_id_search_flag" },
          { text: "usernameでの検索", value: "username_search_flag" },
          { text: "操作", value: "" }
        ],
        defaultSettings: [
          { text: "id", value: "id" },
          { text: "幹事ユーザー名", value: "manager" },
          { text: "名前", value: "name" },
          { text: "何時間後か", value: "timer" },
          { text: "グループID", value: "group_id" },
          { text: "グループ名", value: "group_name" },
          { text: "作成日時", value: "created_at" },
          { text: "更新日時", value: "updated_at" },
          { text: "操作", value: "" }
        ],
        attributes: [
          { text: "id", value: "id" },
          { text: "幹事ユーザー名", value: "manager" },
          { text: "属性名", value: "name" },
          { text: "加減算", value: "plus_minus" },
          { text: "作成日時", value: "created_at" },
          { text: "更新日時", value: "updated_at" },
          { text: "操作", value: "" }
        ]
      },
      friendSearch: "",
      groupSearch: "",
      sessionSearch: "",
      defaultSettingSearch: "",
      attributeSearch: "",
      participatedSessionSearch: "",
      participatedGroupSearch: "",
      start: "2019-02-01",
      end: "2019-02-06",
      today: "2019-01-08",

      deleteTargetType: null,
      deleteTargetId: null,
      dialog: false
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
      // 管理しているイベント情報
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
          managedFlag: true,
          sessionId: this.sessions[key].id,
          title: this.sessions[key].name,
          date:
            this.sessions[key].start_time != null
              ? this.sessions[key].start_time.slice(0, 10)
              : null,
          // time: (this.sessions[key].start_time != null)? this.sessions[key].start_time.slice(11,16): null,
          details: `イベントID:&nbsp;${this.sessions[key].id}<br>幹事：${
            this.sessions[key].manager.username
          }<br>参加人数:${allowCount}人<br>招待中: ${waitCount}人<br>参加拒否: ${denyCount}人`,
          open: false
        })
      }

      // 参加しているイベント情報
      for (let key in this.participatedSessions) {
        let allowCount = 0
        let denyCount = 0
        let waitCount = 0

        for (let key2 in this.participatedSessions[key].users) {
          switch (this.participatedSessions[key].users[key2].join_status) {
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
          managedFlag: false,
          sessionId: this.participatedSessions[key].id,
          title: this.participatedSessions[key].name,
          date:
            this.participatedSessions[key].start_time != null
              ? this.participatedSessions[key].start_time.slice(0, 10)
              : null,
          // time: (this.sessions[key].start_time != null)? this.sessions[key].start_time.slice(11,16): null,
          details: `イベントID:&nbsp;${
            this.participatedSessions[key].id
          }<br>幹事：${
            this.participatedSessions[key].manager.username
          }<br>参加人数:${allowCount}人<br>招待中: ${waitCount}人<br>参加拒否: ${denyCount}人`,
          open: false
        })
      }

      // console.log(eventDatas);
      return eventDatas
    }
  },
  async asyncData({ $axios, route }) {
    let showUser = await $axios.$get(`/admin/users/${route.params.id}`)
    let friends = await $axios.$get(`/admin/users/${route.params.id}/friends`)
    let groups = await $axios.$get(`/admin/users/${route.params.id}/groups`)
    let sessions = await $axios.$get(`/admin/users/${route.params.id}/sessions`)
    let defaultSettings = await $axios.$get(
      `/admin/users/${route.params.id}/default_settings`
    )
    let attributes = await $axios.$get(
      `/admin/users/${route.params.id}/attributes`
    )
    let participatedSessions = await $axios.$get(
      `/admin/users/${route.params.id}/guests/sessions`
    )
    let participatedGroups = await $axios.$get(
      `/admin/users/${route.params.id}/guests/groups`
    )
    console.log(friends)
    return {
      showUser: showUser.data,
      friends: friends.data,
      groups: groups.data,
      sessions: sessions.data,
      defaultSettings: defaultSettings.data,
      attributes: attributes.data,
      participatedSessions: participatedSessions.data,
      participatedGroups: participatedGroups.data
    }
  },
  created() {
    window.Pusher.subscribe("admin_channel")
    window.Pusher.bind("user_update", response => {
      if (response.message.user_id == this.$route.params.id) {
        this.updateUserInfo()
      }
    })
    window.Pusher.bind("friend_create", response => {
      if (
        response.message.user_id == this.$route.params.id ||
        response.message.friend_id == this.$route.params.id
      ) {
        this.updateFriendInfo()
      }
    })
    window.Pusher.bind("friend_update", response => {
      if (
        response.message.user_id == this.$route.params.id ||
        response.message.friend_id == this.$route.params.id
      ) {
        this.updateFriendInfo()
      }
    })
    window.Pusher.bind("friend_delete", response => {
      if (
        response.message.user_id == this.$route.params.id ||
        response.message.friend_id == this.$route.params.id
      ) {
        this.updateFriendInfo()
      }
    })

    window.Pusher.bind("group_create", response => {
      if (response.message.manager_id == this.$route.params.id) {
        this.updateGroupInfo()
      }
    })
    window.Pusher.bind("group_update", response => {
      if (response.message.manager_id == this.$route.params.id) {
        this.updateGroupInfo()
      }
      // ゲスト参加しているグループの中に、更新がある場合
      for (let key in this.participatedGroups) {
        if (response.message.group_id == this.participatedGroups[key].id) {
          this.updateParticipatedGroupInfo()
          break
        }
      }
    })
    window.Pusher.bind("group_delete", response => {
      if (response.message.manager_id == this.$route.params.id) {
        this.updateGroupInfo()
      }
      // ゲスト参加しているグループの中に、更新がある場合
      for (let key in this.participatedGroups) {
        if (response.message.group_id == this.participatedGroups[key].id) {
          this.updateParticipatedGroupInfo()
          break
        }
      }
    })

    window.Pusher.bind("session_create", response => {
      if (response.message.manager_id == this.$route.params.id) {
        this.updateSessionInfo()
      }
    })
    window.Pusher.bind("session_update", response => {
      if (response.message.manager_id == this.$route.params.id) {
        this.updateSessionInfo()
      }
      // ゲスト参加しているイベントの中に、更新がある場合
      for (let key in this.participatedSessions) {
        if (response.message.session_id == this.participatedSessions[key].id) {
          this.updateParticipatedSessionInfo()
          break
        }
      }
    })
    window.Pusher.bind("session_delete", response => {
      if (response.message.manager_id == this.$route.params.id) {
        this.updateSessionInfo()
      }
      // ゲスト参加しているイベントの中に、更新がある場合
      for (let key in this.participatedSessions) {
        if (response.message.session_id == this.participatedSessions[key].id) {
          this.updateParticipatedSessionInfo()
          break
        }
      }
    })

    window.Pusher.bind("attribute_create", response => {
      if (response.message.manager_id == this.$route.params.id) {
        this.updateAttributeInfo()
      }
    })
    window.Pusher.bind("attribute_update", response => {
      if (response.message.manager_id == this.$route.params.id) {
        this.updateAttributeInfo()
      }
    })
    window.Pusher.bind("attribute_delete", response => {
      if (response.message.manager_id == this.$route.params.id) {
        this.updateAttributeInfo()
      }
    })

    window.Pusher.bind("default_setting_create", response => {
      if (response.message.manager_id == this.$route.params.id) {
        this.updateDefaultSettingInfo()
      }
    })
    window.Pusher.bind("default_setting_update", response => {
      if (response.message.manager_id == this.$route.params.id) {
        this.updateDefaultSettingInfo()
      }
    })
    window.Pusher.bind("default_setting_delete", response => {
      if (response.message.manager_id == this.$route.params.id) {
        this.updateDefaultSettingInfo()
      }
    })
  },
  methods: {
    open(event) {
      alert(event.title)
    },
    async updateUserInfo() {
      await this.$axios
        .$get(`/admin/users/${this.$route.params.id}`)
        .then(res => {
          console.log(res)
          this.showUser = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    async updateFriendInfo() {
      await this.$axios
        .$get(`/admin/users/${this.$route.params.id}/friends`)
        .then(res => {
          console.log(res)
          this.friends = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    async updateGroupInfo() {
      await this.$axios
        .$get(`/admin/users/${this.$route.params.id}/groups`)
        .then(res => {
          console.log(res)
          this.groups = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    async updateParticipatedGroupInfo() {
      await this.$axios
        .$get(`/admin/users/${this.$route.params.id}/guests/groups`)
        .then(res => {
          console.log(res)
          this.participatedGroups = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    async updateSessionInfo() {
      await this.$axios
        .$get(`/admin/users/${this.$route.params.id}/sessions`)
        .then(res => {
          console.log(res)
          this.sessions = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    async updateParticipatedSessionInfo() {
      await this.$axios
        .$get(`/admin/users/${this.$route.params.id}/guests/sessions`)
        .then(res => {
          console.log(res)
          this.participatedSessions = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    async updateDefaultSettingInfo() {
      await this.$axios
        .$get(`/admin/users/${this.$route.params.id}/default_settings`)
        .then(res => {
          console.log(res)
          this.defaultSettings = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    async updateAttributeInfo() {
      await this.$axios
        .$get(`/admin/users/${this.$route.params.id}/attributes`)
        .then(res => {
          console.log(res)
          this.attributes = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },

    async deleteTarget(id) {
      switch (this.deleteTargetType) {
        case "friend":
          await this.$axios
            .$delete(`/admin/users/${this.$route.params.id}/friends/${id}`)
            .then(res => {
              for (let key in this.friends) {
                if (this.friends[key].id == id) {
                  this.friends.splice(key, 1)
                }
              }
              this.dialog = false
              this.deleteTargetType = null
            })
            .catch(err => {
              console.log(err)
            })
          break
        case "group":
          await this.$axios
            .$delete(`/admin/users/${this.$route.params.id}/groups/${id}`)
            .then(res => {
              for (let key in this.groups) {
                if (this.groups[key].id == id) {
                  this.groups.splice(key, 1)
                }
              }
              this.dialog = false
              this.deleteTargetType = null
            })
            .catch(err => {
              console.log(err)
            })
          break
        case "session":
          await this.$axios
            .$delete(`/admin/users/${this.$route.params.id}/sessions/${id}`)
            .then(res => {
              for (let key in this.sessions) {
                if (this.sessions[key].id == id) {
                  this.sessions.splice(key, 1)
                }
              }
              this.dialog = false
              this.deleteTargetType = null
            })
            .catch(err => {
              console.log(err)
            })
          break
        case "default_setting":
          await this.$axios
            .$delete(
              `/admin/users/${this.$route.params.id}/default_settings/${id}`
            )
            .then(res => {
              for (let key in this.defaultSettings) {
                if (this.defaultSettings[key].id == id) {
                  this.defaultSettings.splice(key, 1)
                }
              }
              this.dialog = false
              this.deleteTargetType = null
            })
            .catch(err => {
              console.log(err)
            })
          break
        case "attribute":
          await this.$axios
            .$delete(`/admin/users/${this.$route.params.id}/attributes/${id}`)
            .then(res => {
              for (let key in this.attributes) {
                if (this.attributes[key].id == id) {
                  this.attributes.splice(key, 1)
                }
              }
              this.dialog = false
              this.deleteTargetType = null
            })
            .catch(err => {
              console.log(err)
            })
          break
        case "participatedGroup":
          await this.$axios
            .$delete(
              `/admin/users/${this.$route.params.id}/guests/groups/${id}`
            )
            .then(res => {
              for (let key in this.participatedGroups) {
                if (this.participatedGroups[key].id == id) {
                  this.participatedGroups.splice(key, 1)
                }
              }
              this.dialog = false
              this.deleteTargetType = null
            })
            .catch(err => {
              console.log(err)
            })
          break
        case "participatedSession":
          await this.$axios
            .$delete(
              `/admin/users/${this.$route.params.id}/guests/sessions/${id}`
            )
            .then(res => {
              for (let key in this.participatedSessions) {
                if (this.participatedSessions[key].id == id) {
                  this.participatedSessions.splice(key, 1)
                }
              }
              this.dialog = false
              this.deleteTargetType = null
            })
            .catch(err => {
              console.log(err)
            })
          break
        default:
          break
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.my-event
  overflow hidden
  text-overflow ellipsis
  white-space nowrap
  border-radius 2px
  background-color #1867c0
  color #ffffff
  border 1px solid #1867c0
  width 100%
  font-size 12px
  padding 3px
  cursor pointer
  margin-bottom 1px


.my-participate-event
  overflow hidden
  text-overflow ellipsis
  white-space nowrap
  border-radius 2px
  background-color #ff9900
  color #ffffff
  border 1px solid #ff9900
  width 100%
  font-size 12px
  padding 3px
  cursor pointer
  margin-bottom 1px
</style>
