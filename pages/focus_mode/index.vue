<template lang="pug">
  div
    v-layout(column)
      v-btn(fab dark color="indigo" @click.prevent="addFrame()")
        v-icon(dark) add
      v-card#focus_base
        vue-draggable-resizable(v-for="n in frameKeys" :key="n" :w="200" :h="300" @activated="target(n)" @dragging="onDrag" @resizing="onResize" :parent="true")
          div
            p フレームナンバー {{ n }} :<br> user_id: {{ frames[n].user_id }}
              v-btn(fab dark color="error" small): v-icon(@click.prevent="deleteTargetFrame = n, dialog = true") delete
          v-select(:items="users" item-text="username" item-value="id" box label="ユーザー" v-model="frames[n].user_id")
          div.send_icon(v-for="o in frameKeys" :ref="'sendFrom' + n + 'To' + o")
            v-icon(large color="primary") send
          div.okey_icon(v-for="o in frameKeys" :ref="'okeyFrom' + n + 'To' + o")
            v-icon(large color="success") radio_button_unchecked
          div.no_icon(v-for="o in frameKeys" :ref="'noFrom' + n + 'To' + o")
            v-icon(large color="error") close
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
      },
      async animationTest() {
        // TweenMax.fromTo(this.$refs.aaaaa, 1, {x:100}, {x: 200});
        await this.animationTest2(1, 2);
        await this.animationTest2(1, 3);
        await this.animationTest2(1, 4);
        await this.animationTest2(1, 5);
        await this.animationTest2(1, 6);
      },
      async animationTest2(frameFrom, frameTo) {
        await TweenMax.fromTo(this.$refs[`sendFrom${frameFrom}To${frameTo}`], 2,
          {
            x: 0,
            y: 0,
            opacity: 1,
          },
          {
            x: this.frames[frameTo].x - this.frames[frameFrom].x,
            y: this.frames[frameTo].y - this.frames[frameFrom].y,
          }
        )
        await TweenMax.to(this.$refs[`sendFrom${frameFrom}To${frameTo}`], 4, {opacity: 0})
      },
      async animation(frameFrom, frameTo, refName) {
        await TweenMax.fromTo(this.$refs[`${refName}From${frameFrom}To${frameTo}`], 2,
          {
            x: 0,
            y: 0,
            opacity: 1,
          },
          {
            x: this.frames[frameTo].x - this.frames[frameFrom].x,
            y: this.frames[frameTo].y - this.frames[frameFrom].y,
          }
        )
        await TweenMax.to(this.$refs[`${refName}From${frameFrom}To${frameTo}`], 4, {opacity: 0})
      },
      invitationAnimation(managerId, userId) {
        console.log(managerId + 'and' + userId);
        // managerとuserのフレームIDを特定する
        let managerFrameNumber = 0;
        let userFrameNumber = 0;

        // todo 複数のフレームで、同一のuser_idがある場合には対応してないが、問題ないね
        for (let key in this.frames) {
          console.log(key);
          console.log(this.frames[key]);
          if (this.frames[key].user_id == managerId) {
            managerFrameNumber = key;
          }
          if (this.frames[key].user_id == userId) {
            userFrameNumber = key;
          }
        }

        console.log('manager, user');
        console.log(managerFrameNumber, userFrameNumber);

        // 両方のフレームが特定できた場合のみアニメーションを実行する
        if (managerFrameNumber !== 0 && userFrameNumber !== 0) {
          this.animation(managerFrameNumber, userFrameNumber, 'send');
        }
      }
    },
    created() {
      window.Pusher.subscribe('focus_mode_channel');
      // セッションへの招待
      window.Pusher.bind('focus_session_invitation', response => {
        console.log(response);
        const managerId = response.message.manager_id;
        const sessionId = response.message.session_id;
        const sessionName = response.message.session_name;
        const userIds = response.message.user_ids;
        for (let i = 0; i < userIds.length; i++) {
          this.invitationAnimation(managerId, userIds[i]);
        }
      })
      // セッション情報のアップデート
      window.Pusher.bind('focus_session_update', response => {
        console.log(response);

      })
      // セッションの招待に対する返事
      window.Pusher.bind('focus_session_reply', response => {
        console.log(response);

      })
    },
  }
</script>

<style lang="stylus" scoped>
  #focus_base
    height 1000px
    width 100%
  .send_icon
    position absolute
    right 30px
    bottom 10px
  .okey_icon
    position absolute
    right 90px
    bottom 10px
  .no_icon
    position absolute
    right 150px
    bottom 10px
  .android_mirror_frame
    background-color rgba(156, 162, 255, 0.1)
</style>
