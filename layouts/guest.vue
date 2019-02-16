<template>
    <v-app>
        <v-toolbar
            :clipped-left="clipped"
            fixed
            app
        >
            <v-toolbar-title v-text="title"/>
            <v-spacer></v-spacer>
            <template v-if="authenticated">
                <p>{{user.email}}</p>
            </template>
        </v-toolbar>
        <v-content>
            <v-container>
                <nuxt />
            </v-container>
        </v-content>

        <v-footer
            :fixed="fixed"
            app
        >
            <span>&copy; 2017</span>
        </v-footer>
    </v-app>
</template>

<script>
  export default {

    data() {
      return {
        clipped: false,
        title: 'ホイッスル管理画面',
        fixed: false,
      }
    },
    methods: {
      logout() {
        this.$auth.logout(); // nuxt.config authに書いているから、一行で済む
      }
    }
  }
</script>