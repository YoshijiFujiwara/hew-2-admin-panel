<template lang="pug">
  v-layout(row wrap)
    v-flex.px-3(xs12 md6)
      v-card
        v-card-title
          h2 イベントの参加人数状況
        session-user-number-chart(:label-data="sessionsUserNumberData.labels" :dataset-data="sessionsUserNumberData.datasets")
    v-flex.px-3(xs12 md6)
      v-card(xs12)
        v-card-title
          h2 イベント数の推移
        session-number-chart(:label-data="sessionNumberData.labels" :dataset-data="sessionNumberData.datasets")
    v-flex.px-3.mt-3(xs12 md6)
      v-card(xs12)
        v-card-title
          h2 ジャンル別店舗数
        genre-shop-chart(:label-data="genreShopData.labels" :dataset-data="genreShopData.datasets")
    v-flex.px-3.mt-3(xs12 md6)
      v-card(xs12)
        v-card-title
          h2 店のジャンル別イベント数
        genre-shop-chart(:label-data="genreSessionData.labels" :dataset-data="genreSessionData.datasets")
    v-flex.px-3.mt-3(xs12 md6)
      v-card(xs12)
        v-card-title
          h2 時間帯別
        session-time-chart(:label-data="sessionTimeData.labels" :dataset-data="sessionTimeData.datasets")
    v-flex.px-3.mt-3(xs12 md6)
      v-card(xs12)
        v-card-title
          h2 属性別カウント
        attribute-count-chart(:label-data="attributeCountData.labels" :dataset-data="attributeCountData.datasets")
    v-flex.px-3.mt-3(xs12 md6)
      v-card(xs12)
        v-card-title
          h2 属性別プラマイ平均
        attribute-average-chart(:label-data="attributePlusMinusAverageData.labels" :dataset-data="attributePlusMinusAverageData.datasets")
</template>

<script>
import SessionUserNumberChart from "../components/SessionUserNumberChart";
import SessionNumberChart from "../components/SessionNumberChart";
import SessionTimeChart from "../components/SessionTimeChart";
import AttributeCountChart from "../components/AttributeChart";
import AttributeAverageChart from "../components/AttributeAverageChart";
import GenreShopChart from "../components/GenreShopChart";

export default {
  components: {SessionTimeChart, SessionUserNumberChart, SessionNumberChart, AttributeCountChart, AttributeAverageChart, GenreShopChart },
  data:() => ({
    sessions: [],
    shops: [],
    sessionsUserNumberData: {
      labels: [],
      datasets: []
    },
    sessionNumberData: {
      labels: [],
      datasets: []
    },
    sessionTimeData: {
      labels: [],
      datasets: []
    },
    attributeCountData: {
      labels: [],
      datasets: []
    },
    attributePlusMinusAverageData: {
      labels: [],
      datasets: []
    },

    genreShopData: {
      labels: [],
      datasets: []
    },
    genreSessionData: {
      labels: [],
      datasets: []
    }
  }),
  async asyncData({ $axios }) {
    const sessions = await $axios.$get("/admin/sessions")
    let shops = await $axios.$get("/admin/shops")
    return {
      sessions: sessions.data,
      shops: shops.data
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
    // console.log(sessionStartDatas)
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
        backgroundColor: '#5C6BC0',
        data: [july2018, aug2018, sept2018, oct2018, nov2018, dec2018, jan2019, feb2019, mar2019]
      }
    ];

    // イベントの時間帯別の集計
    const sessionStartTimeDatas = this.sessions.map(session => {
      const timeResult = new String(session.start_time).split(' ');
      if (timeResult != "null") {
        const hourResult = timeResult[1].split(':');
        return hourResult[0];
      }
    })
    const time10 = sessionStartTimeDatas.filter(data => data == 10).length;
    const time11 = sessionStartTimeDatas.filter(data => data == 11).length;
    const time12 = sessionStartTimeDatas.filter(data => data == 12).length;
    const time13 = sessionStartTimeDatas.filter(data => data == 13).length;
    const time14 = sessionStartTimeDatas.filter(data => data == 14).length;
    const time15 = sessionStartTimeDatas.filter(data => data == 15).length;
    const time16 = sessionStartTimeDatas.filter(data => data == 16).length;
    const time17 = sessionStartTimeDatas.filter(data => data == 17).length;
    const time18 = sessionStartTimeDatas.filter(data => data == 18).length;
    const time19 = sessionStartTimeDatas.filter(data => data == 19).length;
    const time20 = sessionStartTimeDatas.filter(data => data == 20).length;
    const time21 = sessionStartTimeDatas.filter(data => data == 21).length;
    const time22 = sessionStartTimeDatas.filter(data => data == 22).length;
    const time23 = sessionStartTimeDatas.filter(data => data == 23).length;
    const time0 = sessionStartTimeDatas.filter(data => data == 0).length;
    const time1 = sessionStartTimeDatas.filter(data => data == 1).length;
    const time2 = sessionStartTimeDatas.filter(data => data == 2).length;

    this.sessionTimeData.labels = [
      '10時','11時','12時','13時','14時','15時','16時','17時','18時','19時','20時','21時','22時','23時','24時','1時','2時',
    ];
    this.sessionTimeData.datasets = [
      {
        label: 'イベント数',
        backgroundColor: '#F4511E',
        data: [time10, time11, time12, time13, time14, time15, time16, time17, time18, time19, time20, time21, time22, time23, time0, time1, time2]
      }
    ];

    // 属性データの集計
    let attributeNames = [];
    let attributeCounts = [];
    let attributeSums = [];
    this.sessions.forEach(session => {
      session.users.forEach(user => {
        let key = user.attribute_name;
        attributeCounts[key] = (attributeCounts[key])? attributeCounts[key] + 1 : 1 ;
        attributeSums[key]   = (attributeSums[key] && user.plus_minus)? attributeSums[key] + user.plus_minus : 1 ;
      })
    })
    console.log(attributeCounts);
    console.log(attributeSums);
    // 属性別平均支払い額
    let attributeAverages = [];
    let attributeCountData = [];
    for (let attributeName in attributeCounts) {
      attributeNames.push(attributeName);
      attributeCountData.push(attributeCounts[attributeName]);
      if (attributeSums[attributeName] && attributeCounts[attributeName] > 0) {
        attributeAverages[attributeName] = attributeSums[attributeName] / attributeCounts[attributeName];
      } else {
        attributeAverages[attributeName] = "";
      }
    }
    let attributeAverageDatas = [];
    for (let attributeName in attributeAverages) {
      attributeAverageDatas.push(attributeAverages[attributeName]);
    }

    console.log(attributeAverages);
    console.log(attributeCounts);
    // 多い順に並び替える


    this.attributeCountData.labels = attributeNames;
    this.attributeCountData.datasets = [
      {
        label: '属性',
        backgroundColor: '#9CCC65',
        data: attributeCountData
      }
    ];

    this.attributePlusMinusAverageData.labels = attributeNames;
    this.attributePlusMinusAverageData.datasets = [
      {
        label: '属性',
        backgroundColor: '#4DB6AC',
        data: attributeAverageDatas
      }
    ];

    // ジャンル別店の分布
    const genreShopData = this.shops.map(shop => {
      if (shop.genre_name) {
        return shop.genre_name;
      }
    })
    let shopGenreCounts = [];
    genreShopData.forEach(genreName => {
      shopGenreCounts[genreName] = (shopGenreCounts[genreName])? shopGenreCounts[genreName] + 1 : 1 ;
    })
    let shopGenreLabels = [];
    let shopGenreDatas = [];
    for (let genreName in shopGenreCounts) {
      shopGenreLabels.push(genreName);
      shopGenreDatas.push(shopGenreCounts[genreName]);
    }

    this.genreShopData.labels = shopGenreLabels;
    this.genreShopData.datasets = [
      {
        label: 'Data One',
        backgroundColor: ['#FF3535', '#FF35FC', '#7835FF', '#3560FF', '#35F3FF', '#35FF8E', '#69FF35', '#D7FF35', '#FFC235', '#FF3535'],
        data: shopGenreDatas
      }
    ];

    // イベントで使用された回数をジャンル別で表示する
    const genreSessionData = this.sessions.map(session => {
      if (session.shop.genre_name) {
        return session.shop.genre_name;
      }
    })
    let sessionGenreCounts = [];
    genreSessionData.forEach(genreName => {
      sessionGenreCounts[genreName] = (sessionGenreCounts[genreName])? sessionGenreCounts[genreName] + 1 : 1 ;
    })
    let sessionGenreLabels = [];
    let sessionGenreDatas = [];
    for (let genreName in sessionGenreCounts) {
      sessionGenreLabels.push(genreName);
      sessionGenreDatas.push(sessionGenreCounts[genreName]);
    }

    this.genreSessionData.labels = sessionGenreLabels;
    this.genreSessionData.datasets = [
      {
        label: 'Data One',
        backgroundColor: ['#FF3535', '#FF35FC', '#7835FF', '#3560FF', '#35F3FF', '#35FF8E', '#69FF35', '#D7FF35', '#FFC235', '#FF3535'],
        data: sessionGenreDatas
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
