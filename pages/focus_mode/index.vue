<template lang="pug">
  div
    v-layout(column)
      v-btn(fab dark color="indigo" @click.prevent="addFrame()")
        v-icon(dark) add
      v-card#focus_base
        vue-draggable-resizable(v-for="n in frameKeys" :key="n" :w="200" :h="300" @activated="target(n)" @dragging="onDrag" @resizing="onResize" :parent="true")
          div
            p フレームナンバー {{ n }} {{ frames[n].user_id }}
              v-btn(fab dark color="error" small): v-icon(@click.prevent="deleteTargetFrame = n, dialog = true") delete
          v-select(:items="users" item-text="username" item-value="id" box label="ユーザー" v-model="frames[n].user_id")
    v-dialog(v-model="dialog" max-width="290")
      v-card
        v-card-title.headline フレームナンバー{{ deleteTargetFrame }}を削除してよろしいですか?
        v-card-actions
          v-spacer
          v-btn(color="green darken-1" flat="flat" @click="dialog = false, deleteTargetId = null") キャンセル
          v-btn(color="red darken-1" flat="flat" @click="deleteFrame(deleteTargetFrame)") 削除

</template>

<script>
  import VueDraggableResizable from 'vue-draggable-resizable';
  import 'vue-draggable-resizable/dist/VueDraggableResizable.css'

  export default {
    components: {VueDraggableResizable},
    data() {
      return {
        dialog: false,
        deleteTargetFrame: 0,
        users: [],

        targetFrame:0,
        frames: [],
        frameKeys: [],
        lastFrameKey: 0,
      }
    },
    async asyncData({ $axios }) {
      let { data } = await $axios.$get('/admin/users');
      console.log('data arrived')
      return {
        users: data,
      }
    },
    methods: {
      addFrame() {
        this.lastFrameKey++;
        this.frameKeys.push(this.lastFrameKey);
        this.frames[this.lastFrameKey] = {
          user_id: null,
          width: 200,
          height: 300,
          x: 0,
          y: 0
        }
      },
      target(n) {
        this.targetFrame = n;
      },
      test(id) {
        alert(id);
      },
      onResize: function (x, y, width, height) {
        this.frames[this.targetFrame].x = x;
        this.frames[this.targetFrame].y = y;
        this.frames[this.targetFrame].width = width;
        this.frames[this.targetFrame].height = height;
      },
      onDrag: function (x, y) {
        this.frames[this.targetFrame].x = x;
        this.frames[this.targetFrame].y = y;
      },
      deleteFrame(deleteFrameKey) {
        this.frameKeys = this.frameKeys.filter(n => n !== deleteFrameKey);
        this.frames = this.frames.filter(n => n !== deleteFrameKey)
        this.dialog = false;
      }
    },
  }
</script>

<style lang="stylus" scoped>
  #focus_base
    height 1000px
    width 100%

  .android_mirror_frame
    background-color rgba(156, 162, 255, 0.1)
</style>
