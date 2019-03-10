<template lang="pug">
  v-layout(row wrap)
    v-flex(xs6)
      v-btn-toggle
        v-btn(flat @click="staticMapZoom = (staticMapZoom < 15)? staticMapZoom + 1 : staticMapZoom")
          v-icon add
        v-btn(flat @click="staticMapZoom = (staticMapZoom > 0)? staticMapZoom - 1 : staticMapZoom")
          v-icon remove
      div#static_map
        img(:src="mapImgSrc" alt="")
        v-btn#static_map_up(fab small color="info" @click="lnt+=0.05*(15-staticMapZoom)"): v-icon keyboard_arrow_up
        v-btn#static_map_right(fab small color="info" @click="lng+=0.05*(15-staticMapZoom)"): v-icon keyboard_arrow_right
        v-btn#static_map_left(fab small color="info" @click="lng-=0.05*(15-staticMapZoom)"): v-icon keyboard_arrow_left
        v-btn#static_map_down(fab small color="info" @click="lnt-=0.05*(15-staticMapZoom)"): v-icon keyboard_arrow_down
    v-flex(xs12)
      v-card.pl-3
        v-card-title: h2 検索条件
        h3 ジャンル一覧
        v-layout(row wrap)
          v-flex(xs3 v-for="(name, index) in genres")
            v-checkbox(v-model="selectedGenres" :label="name" color="info" :value="name" hide-details)

        h3.mt-4 属性一覧
        v-layout(row wrap)
          v-flex(xs1 v-for="(name, index) in attributeLists")
            v-checkbox(v-model="selectedAttributes" :label="name" color="info" :value="name" hide-details)

        h3.mt-4 参加人数別
        v-layout(row wrap)
          v-flex(xs1 v-for="(value, index) in sessionPeoples")
            v-checkbox(v-model="selectedSessionPeoples" :label="value + '人'" color="info" :value="value" hide-details)

        h3.mt-4 一人あたり予算
        v-layout(row wrap)
          v-flex(xs2 v-for="(value, index) in budgetLists")
            v-checkbox(v-model="selectedBudgets" :label="value + '円~'" color="info" :value="value" hide-details)

        h3.mt-4 一人あたり実費
        v-layout(row wrap)
          v-flex(xs2 v-for="(value, index) in actualLists")
            v-checkbox(v-model="selectedActualLists" :label="value + '円~'" color="info" :value="value" hide-details)

        h3.mt-4 時間帯別
        v-layout(row wrap)
          v-flex(xs1 v-for="(value, index) in times")
            v-checkbox(v-model="selectedTimes" :label="value + '時'" color="info" :value="value" hide-details)

        v-btn(color="primary") 検索

    <!--<v-flex xs6>-->
    <!--<GmapMap v-bind:center="center" v-bind:map-type-id="mapTypeId" v-bind:zoom="5">-->
    <!--<GmapMarker-->
    <!--v-for="(item, index) in markers"-->
    <!--v-bind:key="index"-->
    <!--v-bind:position="item.position"-->
    <!--@click="center=item.position"-->
    <!--/>-->
    <!--</GmapMap>-->
    <!--</v-flex>-->
  </v-layout>
</template>

<script>
  import {GChart} from 'vue-google-charts';

  export default {
    components: {
      GChart
    },
    data: () => ({
      // 検索条件たち
      genres: [],
      selectedGenres: [],

      times: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
      selectedTimes: [],

      sessionPeoples: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
      selectedSessionPeoples: [],

      budgetLists: [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000],
      selectedBudgets: [],

      actualLists: [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000],
      selectedActualLists: [],

      attributeLists: [],
      selectedAttributes: [],

      // yahoo static map系パラメータ
      staticMapZoom: 10,
      lnt: 34.702485,
      lng: 135.495951,

      // 行政区分コードデータ一覧（関西あたりのみ）
      prefectureCodes: {
        "京都府": 26,
        "大阪府": 27,
        "兵庫県": 28,
        "奈良県": 29,
        "和歌山県": 30,
      },

      divisionCodes: [
        // 京都府
        {
          "id": 26,
          "datas": [{"id": "26100", "name": "京都市"}, {"id": "26101", "name": "北区"}, {
            "id": "26102",
            "name": "上京区"
          }, {"id": "26103", "name": "左京区"}, {"id": "26104", "name": "中京区"}, {
            "id": "26105",
            "name": "東山区"
          }, {"id": "26106", "name": "下京区"}, {"id": "26107", "name": "南区"}, {
            "id": "26108",
            "name": "右京区"
          }, {"id": "26109", "name": "伏見区"}, {"id": "26110", "name": "山科区"}, {
            "id": "26111",
            "name": "西京区"
          }, {"id": "26201", "name": "福知山市"}, {"id": "26202", "name": "舞鶴市"}, {
            "id": "26203",
            "name": "綾部市"
          }, {"id": "26204", "name": "宇治市"}, {"id": "26205", "name": "宮津市"}, {
            "id": "26206",
            "name": "亀岡市"
          }, {"id": "26207", "name": "城陽市"}, {"id": "26208", "name": "向日市"}, {
            "id": "26209",
            "name": "長岡京市"
          }, {"id": "26210", "name": "八幡市"}, {"id": "26211", "name": "京田辺市"}, {
            "id": "26212",
            "name": "京丹後市"
          }, {"id": "26213", "name": "南丹市"}, {"id": "26214", "name": "木津川市"}, {
            "id": "26303",
            "name": "大山崎町"
          }, {"id": "26322", "name": "久御山町"}, {"id": "26343", "name": "井手町"}, {
            "id": "26344",
            "name": "宇治田原町"
          }, {"id": "26364", "name": "笠置町"}, {"id": "26365", "name": "和束町"}, {
            "id": "26366",
            "name": "精華町"
          }, {"id": "26367", "name": "南山城村"}, {"id": "26407", "name": "京丹波町"}, {
            "id": "26463",
            "name": "伊根町"
          }, {"id": "26465", "name": "与謝野町"}],
        },
        // 大阪府
        {
          "id": 27,
          "datas":
            [{"id": "27100", "name": "大阪市"}, {"id": "27102", "name": "都島区"}, {
              "id": "27103",
              "name": "福島区"
            }, {"id": "27104", "name": "此花区"}, {"id": "27106", "name": "西区"}, {
              "id": "27107",
              "name": "港区"
            }, {"id": "27108", "name": "大正区"}, {"id": "27109", "name": "天王寺区"}, {
              "id": "27111",
              "name": "浪速区"
            }, {"id": "27113", "name": "西淀川区"}, {"id": "27114", "name": "東淀川区"}, {
              "id": "27115",
              "name": "東成区"
            }, {"id": "27116", "name": "生野区"}, {"id": "27117", "name": "旭区"}, {
              "id": "27118",
              "name": "城東区"
            }, {"id": "27119", "name": "阿倍野区"}, {"id": "27120", "name": "住吉区"}, {
              "id": "27121",
              "name": "東住吉区"
            }, {"id": "27122", "name": "西成区"}, {"id": "27123", "name": "淀川区"}, {
              "id": "27124",
              "name": "鶴見区"
            }, {"id": "27125", "name": "住之江区"}, {"id": "27126", "name": "平野区"}, {
              "id": "27127",
              "name": "北区"
            }, {"id": "27128", "name": "中央区"}, {"id": "27140", "name": "堺市"}, {
              "id": "27141",
              "name": "堺区"
            }, {"id": "27142", "name": "中区"}, {"id": "27143", "name": "東区"}, {
              "id": "27144",
              "name": "西区"
            }, {"id": "27145", "name": "南区"}, {"id": "27146", "name": "北区"}, {
              "id": "27147",
              "name": "美原区"
            }, {"id": "27202", "name": "岸和田市"}, {"id": "27203", "name": "豊中市"}, {
              "id": "27204",
              "name": "池田市"
            }, {"id": "27205", "name": "吹田市"}, {"id": "27206", "name": "泉大津市"}, {
              "id": "27207",
              "name": "高槻市"
            }, {"id": "27208", "name": "貝塚市"}, {"id": "27209", "name": "守口市"}, {
              "id": "27210",
              "name": "枚方市"
            }, {"id": "27211", "name": "茨木市"}, {"id": "27212", "name": "八尾市"}, {
              "id": "27213",
              "name": "泉佐野市"
            }, {"id": "27214", "name": "富田林市"}, {"id": "27215", "name": "寝屋川市"}, {
              "id": "27216",
              "name": "河内長野市"
            }, {"id": "27217", "name": "松原市"}, {"id": "27218", "name": "大東市"}, {
              "id": "27219",
              "name": "和泉市"
            }, {"id": "27220", "name": "箕面市"}, {"id": "27221", "name": "柏原市"}, {
              "id": "27222",
              "name": "羽曳野市"
            }, {"id": "27223", "name": "門真市"}, {"id": "27224", "name": "摂津市"}, {
              "id": "27225",
              "name": "高石市"
            }, {"id": "27226", "name": "藤井寺市"}, {"id": "27227", "name": "東大阪市"}, {
              "id": "27228",
              "name": "泉南市"
            }, {"id": "27229", "name": "四條畷市"}, {"id": "27230", "name": "交野市"}, {
              "id": "27231",
              "name": "大阪狭山市"
            }, {"id": "27232", "name": "阪南市"}, {"id": "27301", "name": "島本町"}, {
              "id": "27321",
              "name": "豊能町"
            }, {"id": "27322", "name": "能勢町"}, {"id": "27341", "name": "忠岡町"}, {
              "id": "27361",
              "name": "熊取町"
            }, {"id": "27362", "name": "田尻町"}, {"id": "27366", "name": "岬町"}, {
              "id": "27381",
              "name": "太子町"
            }, {"id": "27382", "name": "河南町"}, {"id": "27383", "name": "千早赤阪村"}],
        },
        // 兵庫県
        {
          "id": 28,
          "datas":
            [{"id": "28100", "name": "神戸市"}, {"id": "28101", "name": "東灘区"}, {
              "id": "28102",
              "name": "灘区"
            }, {"id": "28105", "name": "兵庫区"}, {"id": "28106", "name": "長田区"}, {
              "id": "28107",
              "name": "須磨区"
            }, {"id": "28108", "name": "垂水区"}, {"id": "28109", "name": "北区"}, {
              "id": "28110",
              "name": "中央区"
            }, {"id": "28111", "name": "西区"}, {"id": "28201", "name": "姫路市"}, {
              "id": "28202",
              "name": "尼崎市"
            }, {"id": "28203", "name": "明石市"}, {"id": "28204", "name": "西宮市"}, {
              "id": "28205",
              "name": "洲本市"
            }, {"id": "28206", "name": "芦屋市"}, {"id": "28207", "name": "伊丹市"}, {
              "id": "28208",
              "name": "相生市"
            }, {"id": "28209", "name": "豊岡市"}, {"id": "28210", "name": "加古川市"}, {
              "id": "28212",
              "name": "赤穂市"
            }, {"id": "28213", "name": "西脇市"}, {"id": "28214", "name": "宝塚市"}, {
              "id": "28215",
              "name": "三木市"
            }, {"id": "28216", "name": "高砂市"}, {"id": "28217", "name": "川西市"}, {
              "id": "28218",
              "name": "小野市"
            }, {"id": "28219", "name": "三田市"}, {"id": "28220", "name": "加西市"}, {
              "id": "28221",
              "name": "篠山市"
            }, {"id": "28222", "name": "養父市"}, {"id": "28223", "name": "丹波市"}, {
              "id": "28224",
              "name": "南あわじ市"
            }, {"id": "28225", "name": "朝来市"}, {"id": "28226", "name": "淡路市"}, {
              "id": "28227",
              "name": "宍粟市"
            }, {"id": "28228", "name": "加東市"}, {"id": "28229", "name": "たつの市"}, {
              "id": "28301",
              "name": "猪名川町"
            }, {"id": "28365", "name": "多可町"}, {"id": "28381", "name": "稲美町"}, {
              "id": "28382",
              "name": "播磨町"
            }, {"id": "28442", "name": "市川町"}, {"id": "28443", "name": "福崎町"}, {
              "id": "28446",
              "name": "神河町"
            }, {"id": "28464", "name": "太子町"}, {"id": "28481", "name": "上郡町"}, {
              "id": "28501",
              "name": "佐用町"
            }, {"id": "28585", "name": "香美町"}, {"id": "28586", "name": "新温泉町"}],
        },
        // 奈良県
        {
          "id": 29,
          "datas":
            [{"id": "29201", "name": "奈良市"}, {"id": "29202", "name": "大和高田市"}, {
              "id": "29203",
              "name": "大和郡山市"
            }, {"id": "29204", "name": "天理市"}, {"id": "29205", "name": "橿原市"}, {
              "id": "29206",
              "name": "桜井市"
            }, {"id": "29207", "name": "五條市"}, {"id": "29208", "name": "御所市"}, {
              "id": "29209",
              "name": "生駒市"
            }, {"id": "29210", "name": "香芝市"}, {"id": "29211", "name": "葛城市"}, {
              "id": "29212",
              "name": "宇陀市"
            }, {"id": "29322", "name": "山添村"}, {"id": "29342", "name": "平群町"}, {
              "id": "29343",
              "name": "三郷町"
            }, {"id": "29344", "name": "斑鳩町"}, {"id": "29345", "name": "安堵町"}, {
              "id": "29361",
              "name": "川西町"
            }, {"id": "29362", "name": "三宅町"}, {"id": "29363", "name": "田原本町"}, {
              "id": "29385",
              "name": "曽爾村"
            }, {"id": "29386", "name": "御杖村"}, {"id": "29401", "name": "高取町"}, {
              "id": "29402",
              "name": "明日香村"
            }, {"id": "29424", "name": "上牧町"}, {"id": "29425", "name": "王寺町"}, {
              "id": "29426",
              "name": "広陵町"
            }, {"id": "29427", "name": "河合町"}, {"id": "29441", "name": "吉野町"}, {
              "id": "29442",
              "name": "大淀町"
            }, {"id": "29443", "name": "下市町"}, {"id": "29444", "name": "黒滝村"}, {
              "id": "29446",
              "name": "天川村"
            }, {"id": "29447", "name": "野迫川村"}, {"id": "29449", "name": "十津川村"}, {
              "id": "29450",
              "name": "下北山村"
            }, {"id": "29451", "name": "上北山村"}, {"id": "29452", "name": "川上村"}, {"id": "29453", "name": "東吉野村"}],
        },
        // 和歌山県
        {
          "id": 30,
          "datas":
            [{"id": "30201", "name": "和歌山市"}, {"id": "30202", "name": "海南市"}, {
              "id": "30203",
              "name": "橋本市"
            }, {"id": "30204", "name": "有田市"}, {"id": "30205", "name": "御坊市"}, {
              "id": "30206",
              "name": "田辺市"
            }, {"id": "30207", "name": "新宮市"}, {"id": "30208", "name": "紀の川市"}, {
              "id": "30209",
              "name": "岩出市"
            }, {"id": "30304", "name": "紀美野町"}, {"id": "30341", "name": "かつらぎ町"}, {
              "id": "30343",
              "name": "九度山町"
            }, {"id": "30344", "name": "高野町"}, {"id": "30361", "name": "湯浅町"}, {
              "id": "30362",
              "name": "広川町"
            }, {"id": "30366", "name": "有田川町"}, {"id": "30381", "name": "美浜町"}, {
              "id": "30382",
              "name": "日高町"
            }, {"id": "30383", "name": "由良町"}, {"id": "30390", "name": "印南町"}, {
              "id": "30391",
              "name": "みなべ町"
            }, {"id": "30392", "name": "日高川町"}, {"id": "30401", "name": "白浜町"}, {
              "id": "30404",
              "name": "上富田町"
            }, {"id": "30406", "name": "すさみ町"}, {"id": "30421", "name": "那智勝浦町"}, {
              "id": "30422",
              "name": "太地町"
            }, {"id": "30424", "name": "古座川町"}, {"id": "30427", "name": "北山村"}, {"id": "30428", "name": "串本町"}],
        },
      ],

      addCodeDatas: [],

      center: {lat: 34.702485, lng: 135.495951},
      mapTypeId: "roadmap",
      markers: [],
      sessions: [],
      shops: [],
      chartSettings: {
        packages: ['geochart'],
        'mapsApiKey': 'ここにGoogleMapAPI-key'
      },
      chartData: [
        ['Pref', 'Population'],
        ['北海道', 5352],
        ['青森', 1293],
        ['岩手', 1268],
        ['宮城', 2330],
        ['秋田', 1010],
        ['山形', 1113],
        ['福島', 1901],
        // 以下略
      ],
      chartOptions: {
        region: 'JP',
        resolution: 'provinces',
        displayMode: 'markers',
      }
    }),
    computed: {
      mapImgSrc() {
        let src = "http://map.olp.yahooapis.jp/OpenLocalPlatform/V1/static?width=800&height=800";
        src += "&lat=" + this.lnt;
        src += "&lon=" + this.lng;
        src += "&z=" + this.staticMapZoom;
        src += "&appid=dj00aiZpPWdwSzZpZ0dwZ0thbiZzPWNvbnN1bWVyc2VjcmV0Jng9NTc-&mode=blankmap&style=bm.p.14401:B0C4DE|";

        // カウント数の最大値を計算する
        let max = 0;
        this.addCodeDatas.forEach(data => {
          max = (data > max)? data : max;
        })

        for (let key in this.addCodeDatas) {
          const gb = Math.ceil(((max - this.addCodeDatas[key])/max)*255);
          const colorCode = this.rgb2hex([255, gb, gb]);
          // console.log(colorCode);
          src += `bm.p.${key}:${colorCode}|`;
        }

        return src;
      }
    },
    async asyncData({$axios}) {
      const sessions = await $axios.$get("/admin/sessions")
      let shops = await $axios.$get("/admin/shops")
      return {
        sessions: sessions.data,
        shops: shops.data
      }
    },
    methods: {
      rgb2hex ( rgb ) {
        return rgb.map( function ( value ) {
          return ( "0" + value.toString( 16 ) ).slice( -2 ) ;
        } ).join( "" ) ;
      },
      // this.sessionsとthis.shopsから、地図に必要なデータを配列で格納する
      drawingMap() {
        let divisionCodeArray = [];

        // 店情報の住所から、行政コードを取得する
        this.sessions.forEach(session => {
          let prefectureCode = 0;
          let preName = '';
          Object.keys(this.prefectureCodes).forEach(prefectureName => {
            if (session.shop.address.indexOf(prefectureName) === 0) {
              prefectureCode = this.prefectureCodes[prefectureName]
              preName = prefectureName;
              console.log(prefectureCode);
            }
          });

          // console.log('ssssssssssss')
          // console.log(this.divisionCodes[prefectureCode]);

          if (!(prefectureCode === 0 && preName !== '')) {
            let theCode = 0;
            this.divisionCodes.forEach(data => {
              if (data.id == prefectureCode) {
                data.datas.forEach(detail => {
                  if (session.shop.address.indexOf(preName + detail.name) === 0) {
                    preName += detail.name;
                    theCode = detail.id;
                  }
                })
              }
            });
            if (theCode !== 0) {
              divisionCodeArray.push(theCode);

            }
          }
        })

        let divisionCodeCounts = [];
        divisionCodeArray.forEach(divisionCode => {
          divisionCodeCounts[divisionCode] = (divisionCodeCounts[divisionCode])? divisionCodeCounts[divisionCode] + 1 : 1 ;
        })

        this.addCodeDatas = divisionCodeCounts;
        // console.log(divisionCodeCounts)
      }
    },
    created() {
      // this.shops.forEach(shop => {
      //   this.markers.push({ position: { lat: shop.lat, lng: shop.lng } })
      // })
      
      
      // 検索に使用するジャンル一覧を取得する
      this.shops.forEach(shop => {
        if (! this.genres.includes(shop.genre_name)) {
          this.genres.push(shop.genre_name);
        }
      })

      // 属性データの集計
      this.sessions.forEach(session => {
        session.users.forEach(user => {
          if (! this.attributeLists.includes(user.attribute_name)) {
            this.attributeLists.push(user.attribute_name);
          }
        })
      })

      // 地図情報の書き出し
      this.drawingMap();
    },
  };
</script>

<style lang="stylus" scoped>
  .vue-map-container
    height 800px
    width 100%

  #static_map
    position relative

  #static_map_up
    position: absolute
    top 0
    right 50%

  #static_map_down
    position: absolute
    bottom 0
    right 50%

  #static_map_right
    position: absolute
    top 50%
    right 0px

  #static_map_left
    position: absolute
    top 50%
    left 0px

</style>
