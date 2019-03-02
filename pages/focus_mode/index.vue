<template lang="pug">
  div
    v-layout(column)
      v-btn(fab dark color="indigo" @click.prevent="addFrame()")
        v-icon(dark) add
      v-card#focus_base
        vue-draggable-resizable(v-for="n in frameKeys" :key="n" :w="200" :h="300" @activated="target(n)" @dragging="onDrag" @resizing="onResize" :parent="true")
          div
            p フレームナンバー {{ n }} : user_id {{ frames[n].user_id }}
              v-btn(fab dark color="error" small): v-icon(@click.prevent="deleteTargetFrame = n, dialog = true") delete
          v-select(:items="users" item-text="username" item-value="id" box label="ユーザー" v-model="frames[n].user_id")
          div(v-for="o in frameKeys" :ref="'sendFrom' + n + 'To' + o")
            v-icon(large color="info") send
        div(ref="aaaaa" style="height: 80px; width: 70px; background-color: red")

    v-dialog(v-model="dialog" max-width="290")
      v-card
        v-card-title.headline フレームナンバー{{ deleteTargetFrame }}を削除してよろしいですか?
        v-card-actions
          v-spacer
          v-btn(color="green darken-1" flat="flat" @click="dialog = false, deleteTargetId = null") キャンセル
          v-btn(color="red darken-1" flat="flat" @click="deleteFrame(deleteTargetFrame)") 削除
    v-btn(@click.prevent="animationTest()")


</template>

<script>
  import VueDraggableResizable from 'vue-draggable-resizable';
  import 'vue-draggable-resizable/dist/VueDraggableResizable.css';

  import {TweenMax} from 'gsap';



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
    mounted() {
      for (let i = 0; i < 7; i++) {
        this.addFrame();
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
        console.log(this.frames[this.targetFrame]);
        this.frames[this.targetFrame].x = x;
        this.frames[this.targetFrame].y = y;
      },
      deleteFrame(deleteFrameKey) {
        this.frameKeys = this.frameKeys.filter(n => n !== deleteFrameKey);
        this.frames = this.frames.filter(n => n !== deleteFrameKey)
        this.dialog = false;
      },
      async animationTest() {
        // TweenMax.fromTo(this.$refs.aaaaa, 1, {x:100}, {x: 200});
        await this.animationTest2(1, 2);
        await this.animationTest2(1, 3);
        await this.animationTest2(1, 4);
        await this.animationTest2(1, 5);
        await this.animationTest2(1, 6);
        await this.animationTest2(2, 5);
        await this.animationTest2(2, 6);
      },
      animationTest2(frameFrom, frameTo) {
        console.log(this.frames[1]);
        TweenMax.fromTo(this.$refs[`sendFrom${frameFrom}To${frameTo}`], 2,
          {
            x: 0,
            y: 0,
          },
          {
            x: this.frames[frameTo].x + this.frames[frameTo].width / 2 - this.frames[frameFrom].x,
            y: this.frames[frameTo].y - this.frames[frameTo].height / 2 - this.frames[frameFrom].y,
          }
        );
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
