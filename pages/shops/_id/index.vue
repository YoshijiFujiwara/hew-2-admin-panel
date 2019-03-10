<template lang="pug">
  v-layout(row wrap)
    v-flex(xs12 md12)
      v-card(color="white" title="Edit Profile" text="Complete your profile")
        v-card-title
          h1 お店の詳細
        v-container(py-0)
          v-layout(wrap)
            v-flex(xs12 md6 class="pr-3")
              v-text-field(class="purple-input" label="店名" v-model="shop.name")
            v-flex(xs12 md6 class="pr-3")
              v-text-field(class="purple-input" label="ホットペッパーID" v-model="shop.shop_id")
            v-flex(xs12 md6 class="pr-3")
              v-text-field(label="緯度" class="purple-input" v-model="shop.lat")
            v-flex(xs12 md6 class="pr-3")
              v-text-field(label="経度" class="purple-input" v-model="shop.lng")
            v-flex(xs12 md6 class="pr-3")
              v-text-field(label="ジャンルID" class="purple-input" v-model="shop.genre_id")
            v-flex(xs12 md6 class="pr-3")
              v-text-field(label="ジャンル名" class="purple-input" v-model="shop.genre_name")

    v-flex.mt-3.px-3(xs12 md6)
      v-card(color="white" title="Edit Profile" text="Complete your profile")
        v-card-title
          h1 人数別イベント
        v-container(py-0)
          v-layout(wrap)
            shop-people-chart(:label-data="shopPeopleData.labels" :dataset-data="shopPeopleData.datasets")

    v-flex.mt-3.px-3(xs12 md6)
      v-card(color="white" title="Edit Profile" text="Complete your profile")
        v-card-title
          h1 一人あたりの平均予算　{{ averageBudget }}円
          h1 一人あたりの平均実費　{{ averageActual }}円

    v-flex.mt-3.px-3(xs12 md6)
      v-card(xs12 md12)
        v-card-title
          h3 属性別カウント
        attribute-count-chart(:label-data="attributeCountData.labels" :dataset-data="attributeCountData.datasets")
    v-flex.mt-3.px-3(xs12 md6)
      v-card(xs12)
        v-card-title
          h3 属性別プラマイ平均
        attribute-average-chart(:label-data="attributePlusMinusAverageData.labels" :dataset-data="attributePlusMinusAverageData.datasets")

</template>

<script>
  import ShopPeopleChart from '../../../components/ShopPeopleChart';
  import AttributeCountChart from "../../../components/AttributeChart";
  import AttributeAverageChart from "../../../components/AttributeAverageChart";

  export default {
    components: {ShopPeopleChart, AttributeCountChart, AttributeAverageChart},
    data: () => ({
      shop: {},
      sessions: [],

      shopPeopleData: {
        labels: [],
        datasets: []
      },

      averageBudget: 0,
      averageActual: 0,

      attributeCountData: {
        labels: [],
        datasets: []
      },
      attributePlusMinusAverageData: {
        labels: [],
        datasets: []
      }
    }),
    async asyncData({$axios, route}) {
      let shop = await $axios.$get(`/admin/shops/${route.params.id}`)
      let sessions = await $axios.$get(`/admin/shops/${route.params.id}/sessions`)
      console.log(shop)
      return {
        shop: shop.data,
        sessions: sessions.data
      }
    },
    created() {
      // この店を活用したイベントの人数ごとのイベント数を出す
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
      const people20 = personNumberData.filter(data => {
        return data > 10 && data <= 20
      }).length;
      const peopleOther = personNumberData.filter(data => data > 20).length;

      this.shopPeopleData.labels = [
        '3人以下', '4人', '5人', '6人', '7人', '8人', '9人', '10人', '11~20人', '21人以上'
      ];
      this.shopPeopleData.datasets = [
        {
          label: 'Data One',
          backgroundColor: ['#FF3535', '#FF35FC', '#7835FF', '#3560FF', '#35F3FF', '#35FF8E', '#69FF35', '#D7FF35', '#FFC235', '#FF3535'],
          data: [people3, people4, people5, people6, people7, people8, people9, people10, people20, peopleOther]
        }
      ];

      let total = 0;
      let parameter = 0; // 予算額が入っているイベントを取得する
      // 一人あたりの平均の予算額でも計算するか
      for (let i = 0; i < this.sessions.length; i++) {
        if (this.sessions[i].budget) {
          total += this.sessions[i].budget;
          parameter++;
        }
      }
      this.averageBudget = (parameter != 0) ? parseInt(total / parameter) : 0;
      this.averageBudget = (Number.isNaN(this.averageBudget))? 0: this.averageBudget;
      console.log(Number.isNaN(this.averageBudget));

      total = 0;
      parameter = 0;
      // 平均の実費
      for (let i = 0; i < this.sessions.length; i++) {
        // allowUserをカウントする
        const allowUsers = this.sessions[i].users.filter(user => user.join_status == 'allow');
        if (this.sessions[i].actual) {
          total += this.sessions[i].actual / allowUsers.length;
          parameter++;
        }
      }
      this.averageActual = (parameter != 0) ? parseInt(total / parameter) : 0;
      this.averageActual = (Number.isNaN(this.averageActual))? 0: this.averageActual;
      console.log(Number.isNaN(this.averageActual));

      // 属性データの集計
      let attributeNames = [];
      let attributeCounts = [];
      let attributeSums = [];
      this.sessions.forEach(session => {
        session.users.forEach(user => {
          let key = user.attribute_name;
          attributeCounts[key] = (attributeCounts[key]) ? attributeCounts[key] + 1 : 1;
          attributeSums[key] = (attributeSums[key] && user.plus_minus) ? attributeSums[key] + user.plus_minus : 1;
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
      this.attributeCountData.labels = attributeNames;
      this.attributeCountData.datasets = [
        {
          label: '属性',
          backgroundColor: '#FF3535',
          data: attributeCountData
        }
      ];

      this.attributePlusMinusAverageData.labels = attributeNames;
      this.attributePlusMinusAverageData.datasets = [
        {
          label: '属性',
          backgroundColor: '#FF3535',
          data: attributeAverageDatas
        }
      ];
    }


  }
</script>
