<template lang="pug">
  v-app
    v-toolbar(:clipped-left="clipped" fixed app)
      v-toolbar-title(v-text="title")
      v-spacer
      template(v-if="authenticated"): p {{ user.email }}
    v-content
      v-container
        nuxt
    v-footer(:fixed="fixed" app)
      span &copy; 2019 HEW ホイッスル
     
</template>

<script>
  export default {
    middleware: ['guest'],
    data() {
      return {
        clipped: false,
        title: 'ホイッスル管理画面',
        fixed: false,
      }
    },
  }
</script>
