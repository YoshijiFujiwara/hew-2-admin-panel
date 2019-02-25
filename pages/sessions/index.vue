<template>
    <div>
        <v-card>
            <v-card-title>
                <h2>セッション一覧</h2>
                <v-spacer></v-spacer>
                <v-text-field
                        v-model="search"
                        append-icon="search"
                        label="検索"
                        single-line
                        hide-details
                ></v-text-field>
            </v-card-title>
            <v-data-table
                    :headers="headers"
                    :items="sessions"
                    :search="search"
            >
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.id }}</td>
                    <td class="text-xs-left">{{ props.item.manager.username }}</td>
                    <td class="text-xs-left">{{ props.item.name }}</td>
                    <td class="text-xs-left">{{ props.item.shop_id }}</td>
                    <td class="text-xs-left">{{ props.item.budget }}</td>
                    <td class="text-xs-left">{{ props.item.actual }}</td>
                    <td class="text-xs-left">{{ props.item.start_time }}</td>
                    <td class="text-xs-left">{{ props.item.end_time }}</td>
                    <td class="text-xs-left">{{ props.item.users.length }}</td>
                    <td class="text-xs-left">{{ props.item.created_at['date'] }}</td>
                    <td class="text-xs-left">{{ props.item.updated_at['date'] }}</td>
                    <td class="text-xs-left">{{ (props.item.deleted_at)? props.item.deleted_at['date']: ''}}</td>
                    <td class="text-xs-left">
                        <v-btn fab small color="info"><nuxt-link style="text-decoration: none;" :to="{name: 'sessions-id', params: {id: props.item.id}}" class="white--text"><v-icon>details</v-icon></nuxt-link></v-btn>
                        <v-btn fab small color="error" @click="deleteTargetId = props.item.id, dialog = true"><v-icon>delete</v-icon></v-btn>
                    </td>
                </template>
            </v-data-table>
        </v-card>

        <v-card class="mt-5">
            <v-layout>
                <v-flex
                    sm4
                    xs12
                    class="text-sm-left text-xs-center"
                >
                    <v-btn @click="$refs.calendar.prev()">
                        <v-icon
                            dark
                            left
                        >
                            keyboard_arrow_left
                        </v-icon>
                        先月
                    </v-btn>
                </v-flex>
                <v-flex
                    sm4
                    xs12
                    class="text-xs-center"
                >

                </v-flex>
                <v-flex
                    sm4
                    xs12
                    class="text-sm-right text-xs-center"
                >
                    <v-btn @click="$refs.calendar.next()">
                        来月
                        <v-icon
                            right
                            dark
                        >
                            keyboard_arrow_right
                        </v-icon>
                    </v-btn>
                </v-flex>
            </v-layout>
            <v-flex>
                <v-sheet height="700">
                    <v-calendar
                        ref="calendar"
                        locale="jp-JP"
                        v-model="start"
                        :end="end"
                        color="primary"
                    >
                        <template
                                slot="day"
                                slot-scope="{ date }"
                        >
                            <template v-for="event in eventsMap[date]">
                                <v-menu
                                        :key="event.title"
                                        v-model="event.open"
                                        full-width
                                        offset-x
                                >
                                    <div
                                            v-if="!event.time"
                                            slot="activator"
                                            v-ripple
                                            class="my-event"
                                            v-html="event.title"
                                    ></div>
                                    <v-card
                                            color="grey lighten-4"
                                            min-width="350px"
                                            flat
                                    >
                                        <v-toolbar
                                                color="primary"
                                                dark
                                        >
                                            <v-toolbar-title v-html="event.title"></v-toolbar-title>
                                            <v-spacer></v-spacer>
                                        </v-toolbar>
                                        <v-card-title primary-title>
                                            <span v-html="event.details"></span>
                                        </v-card-title>
                                        <v-card-actions>
                                            <v-btn
                                                    flat
                                                    color="secondary"
                                            >
                                               <nuxt-link style="text-decoration: none;" :to="{name: 'sessions-id', params: {id: event.sessionId}}" class="blue--text">詳細</nuxt-link>
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-menu>
                            </template>
                        </template>
                    </v-calendar>
                </v-sheet>
            </v-flex>
        </v-card>

        <v-dialog
                v-model="dialog"
                max-width="290"
        >
            <v-card>
                <v-card-title class="headline">項目を削除してよろしいですか？</v-card-title>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                            color="green darken-1"
                            flat="flat"
                            @click="dialog = false, deleteTargetId = null"
                    >
                        キャンセル
                    </v-btn>

                    <v-btn
                            color="red darken-1"
                            flat="flat"
                            @click="deleteSession(deleteTargetId)"
                    >
                        削除
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                headers: [
                    { text: 'id', value: 'id' },
                    { text: '幹事ユーザー名', value: 'manager' },
                    { text: 'セッション名', value: 'name' },
                    { text: '店ID', value: 'shop_id' },
                    { text: '予算', value: 'budget' },
                    { text: '実際の金額', value: 'actual' },
                    { text: '開始日時', value: 'start_time' },
                    { text: '終了日時', value: 'end_time' },
                    { text: '人数', value: 'users' },
                    { text: '作成日時', value: 'created_at' },
                    { text: '更新日時', value: 'updated_at' },
                    { text: '削除日時', value: 'deleted_at' },
                    { text: '操作', value: '' },
                ],
                sessions: [],
                search: '',
                dialog: false,
                start: '2019-02-01',
                end: '2019-02-06',
            }
        },
        async asyncData({ $axios }) {
            let { data } = await $axios.$get('/admin/sessions');
            return {
                sessions: data,
            }
        },
        computed: {
            // convert the list of events into a map of lists keyed by date
            eventsMap () {
                const map = {}
                this.events.forEach(e => (map[e.date] = map[e.date] || []).push(e))
                return map
            },
            events() {
                let eventDatas = [];
                for (let key in this.sessions) {
                    let allowCount = 0;
                    let denyCount = 0;
                    let waitCount = 0;

                    for (let key2 in this.sessions[key].users) {
                        switch (this.sessions[key].users[key2].join_status) {
                            case 'allow':
                                allowCount++;
                                break;
                            case 'wait':
                                waitCount++;
                                break;
                            case 'deny':
                                denyCount++;
                                break;
                        }
                    }
                    eventDatas.push({
                        sessionId: this.sessions[key].id,
                        title: this.sessions[key].name,
                        date: (this.sessions[key].start_time != null)? this.sessions[key].start_time.slice(0,10): '',
                        details: `セッションID:&nbsp;${this.sessions[key].id}<br>幹事：${this.sessions[key].manager.username}<br>参加人数:${allowCount}人<br>招待中: ${waitCount}人<br>参加拒否: ${denyCount}人`,
                        open: false
                    })
                }
                return eventDatas;
            }
        },
        methods: {
            open (event) {
                alert(event.title)
            },
            async updateSessions() {
                await this.$axios.$get('/admin/sessions')
                    .then(res => {
                        console.log(res)
                        this.sessions = res.data;
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
            async deleteSession(id) {
                await this.$axios.$delete(`/admin/sessions/${id}`)
                    .then(res => {
                        for (let key in this.sessions) {
                            if (this.sessions[key].id == id) {
                                this.sessions.splice(key, 1);
                            }
                        }
                        this.dialog = false;
                    })
                    .catch(err => {
                        console.log(err);
                    });

            },

        },
        created() {
            window.Pusher.subscribe('admin_channel');
            window.Pusher.bind('session_create', response => {
                this.updateSessions();
            })
            window.Pusher.bind('session_update', response => {
                this.updateSessions();
            })
            window.Pusher.bind('session_delete', response => {
                this.updateSessions();
            })

            // userネームの更新があるかもしれません
            window.Pusher.bind('user_update', response => {
                this.updateSessions();
            })
        }
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
