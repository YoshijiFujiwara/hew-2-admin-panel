<template lang="pug">
  div
    v-flex(xs12 md12)
      v-card
        v-card-title
          h3 イベントの参加人数状況
        session-user-number-chart(:label-data="sessionsUserNumberData.labels" :dataset-data="sessionsUserNumberData.datasets")
      v-card(xs12)
        v-card-title
          h3 イベント
        session-number-chart(:label-data="sessionNumberData.labels" :dataset-data="sessionNumberData.datasets")
</template>

<script>
import SessionUserNumberChart from "../components/SessionUserNumberChart";
import SessionNumberChart from "../components/SessionNumberChart";

export default {
  components: { SessionUserNumberChart, SessionNumberChart },
  data:() => ({
    sessions: [],
    sessionsUserNumberData: {
      labels: [],
      datasets: []
    },
    sessionNumberData: {
      labels: [],
      datasets: []
    }
  }),
  async asyncData({ $axios }) {
    const { data } = await $axios.$get("/admin/sessions")
    return {
      sessions: data
    }
  },
  created() {
    // イベントの参加人数データの計算
    const personNumberData = this.sessions.map((session) => {
      return session.users.length + 1; // 幹事をプラス
    })

    const people3 = personNumberData.filter(data => data <= 3).length;
    const people4 = personNumberData.filter(data => data == 4).length;
    const people5 = personNumberData.filter(data => data == 5).length;
    const people6 = personNumberData.filter(data => data == 6).length;
    const people7 = personNumberData.filter(data => data == 7).length;
    const people8 = personNumberData.filter(data => data == 8).length;
    const people9 = personNumberData.filter(data => data == 9).length;
    const people10 = personNumberData.filter(data => data == 10).length;
    const people20 = personNumberData.filter(data => { return  data > 10 && data <= 20}).length;
    const peopleOther = personNumberData.filter(data => data > 20).length;

    this.sessionsUserNumberData.labels = [
      '3人以下', '4人', '5人', '6人', '7人', '8人', '9人', '10人', '11~20人', '21人以上'
    ];
    this.sessionsUserNumberData.datasets = [
      {
        label: 'Data One',
        backgroundColor: ['#FF3535', '#FF35FC', '#7835FF', '#3560FF', '#35F3FF', '#35FF8E', '#69FF35', '#D7FF35', '#FFC235', '#FF3535'],
        data: [people3, people4, people5, people6, people7, people8, people9, people10, people20, peopleOther]
      }
    ];


    // イベントの日時別の割合を計算する
    const sessionStartDatas = this.sessions.map(session => {
      const result = new String(session.start_time).split(' ');
      return result[0]
    })
    console.log(sessionStartDatas)
    const july2018 = sessionStartDatas.filter(data => { return data.split("-")[0] == 2018 && data.split("-")[1] == "7" }).length;
    const aug2018 = sessionStartDatas.filter(data => { return data.split("-")[0] == 2018 && data.split("-")[1] == "8" }).length;
    const sept2018 = sessionStartDatas.filter(data => { return data.split("-")[0] == 2018 && data.split("-")[1] == "9" }).length;
    const oct2018 = sessionStartDatas.filter(data => { return data.split("-")[0] == 2018 && data.split("-")[1] == "10" }).length;
    const nov2018 = sessionStartDatas.filter(data => { return data.split("-")[0] == 2018 && data.split("-")[1] == "11" }).length;
    const dec2018 = sessionStartDatas.filter(data => { return data.split("-")[0] == 2018 && data.split("-")[1] == "12" }).length;
    const jan2019 = sessionStartDatas.filter(data => { return data.split("-")[0] == 2019 && data.split("-")[1] == "01" }).length;
    const feb2019 = sessionStartDatas.filter(data => { return data.split("-")[0] == 2019 && data.split("-")[1] == "02" }).length;
    const mar2019 = sessionStartDatas.filter(data => { return data.split("-")[0] == 2019 && data.split("-")[1] == "03" }).length;

    this.sessionNumberData.labels = [
      '2018年7月','2018年8月','2018年9月','2018年10月','2018年11月','2018年12月','2019年1月','2019年2月','2019年3月',
    ];
    this.sessionNumberData.datasets = [
      {
        label: 'イベント数',
        backgroundColor: '#FF3535',
        data: [july2018, aug2018, sept2018, oct2018, nov2018, dec2018, jan2019, feb2019, mar2019]
      }
    ];
  }
}
</script>

<style>
.v-sheet--offset {
  top: -24px;
  position: relative;
}
</style>
