<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-tile
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title" />
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-toolbar-side-icon @click="drawer = !drawer" />
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>{{ `chevron_${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>web</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>remove</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>menu</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn @click.prevent="logout">ログアウト</v-btn>

    </v-toolbar>
    <v-content>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-content>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-tile @click.native="right = !right">
          <v-list-tile-action>
            <v-icon light>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-footer
      :fixed="fixed"
      app
    >
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    middleware: ['auth'],
    data() {
      return {
        clipped: false,
        drawer: false,
        fixed: false,
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'ホイッスル管理画面',
        items: [
          {
            icon: 'apps',
            title: 'ダッシュボード',
            to: '/'
          },
          {
            icon: 'apps',
            title: 'ユーザー一覧',
            to: '/users'
          },
          {
            icon: 'apps',
            title: 'セッション一覧',
            to: '/sessions'
          },
          {
            icon: 'apps',
            title: 'グループ一覧',
            to: '/groups'
          },
          {
            icon: 'apps',
            title: '属性一覧',
            to: '/attributes'
          },
          {
            icon: 'apps',
            title: 'デフォルト設定一覧',
            to: '/default_settings'
          },
        ],
      }
    },
    methods: {
      async logout() {
        await this.$auth.logout(); // nuxt.config authに書いているから、一行で済む
        await this.$router.push('/login');
      },
    },
  }
</script>
