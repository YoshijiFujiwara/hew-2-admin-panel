<template lang="pug">
  v-app
    v-navigation-drawer(v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app)
      v-list
        v-list-tile(v-for="(item, i) in items" :key="i" :to="item.to" router exact)
          v-list-tile-action
            v-icon {{ item.icon }}
          v-list-tile-content
            v-list-tile-title(v-text="item.title")
    v-toolbar(:clipped-left="clipped" fixed app dark color="red lighten-1")
      v-toolbar-side-icon(@click="drawer = !drawer")
      v-btn(icon @click.stop="miniVariant = !miniVariant")
        v-icon {{ `chevron_${miniVariant ? 'right' : 'left'}` }}
      v-btn(icon @click.stop="clipped = !clipped")
        v-icon web
      <!--v-btn(icon @click.stop="fixed = !fixed")-->
        <!--v-icon remove-->
      v-toolbar-title(v-text="title")
      <!--v-btn(icon @click.stop="rightDrawer = !rightDrawer")-->
        <!--v-icon menu-->
      v-spacer
      v-btn.brown.darken-1.elevation-2(@click.prevent="logout") ログアウト

    v-content#admin_content_wrapper
      v-container(fluid)
        nuxt
      v-btn#scroll_top_btn(v-if="scrollY > 450" color="primary" fab dark @click="scrollTop()")
        v-icon keyboard_arrow_up

    v-navigation-drawer(v-model="rightDrawer" :right="right" temporary fixed)
      v-list
        v-list-tile(@click.native="right = !right")
          v-list-tile-action
            v-icon(light) compare_arrows
          v-list-tile-title Switch drawer (click me)

    v-footer(:fixed="fixed" app): span &copy; 2019 HEW ホイッスル
</template>

<script>
import goTo from "vuetify/lib/components/Vuetify/goTo"

export default {
  middleware: ["auth"],
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "ホイッスル管理画面",
      items: [
        {
          icon: "dashboard",
          title: "ダッシュボード",
          to: "/"
        },
        {
          icon: "people",
          title: "ユーザー一覧",
          to: "/users"
        },
        {
          icon: "local_drink",
          title: "セッション一覧",
          to: "/sessions"
        },
        {
          icon: "group_work",
          title: "グループ一覧",
          to: "/groups"
        },
        {
          icon: "edit_attributes",
          title: "属性一覧",
          to: "/attributes"
        },
        {
          icon: "settings_applications",
          title: "デフォルト設定一覧",
          to: "/default_settings"
        },
        {
          icon: "notifications_active",
          title: "プッシュ通知ためす",
          to: "/notifications"
        },
        {
          icon: "center_focus_strong",
          title: "フォーカスモード",
          to: "/focus_mode"
        }
      ],

      scrollY: 0
    }
  },
  watch: {
    $route() {
      console.log("route changed", this.$route.name)
    }
  },
  created() {
    window.addEventListener("scroll", this.handleScroll)
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll)
  },
  methods: {
    async logout() {
      await this.$auth.logout() // nuxt.config authに書いているから、一行で済む
      await this.$router.push("/login")
    },
    scrollTop() {
      goTo(0)
    },
    handleScroll() {
      this.scrollY = window.scrollY
    }
  }
}
</script>

<style scoped lang="stylus">
#scroll_top_btn
  position fixed
  bottom 40px
  right 10px

#admin_content_wrapper
  background-color #FFEFFE
</style>
