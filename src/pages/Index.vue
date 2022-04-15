<template>
  <div class="q-pa-md row justify-center">
    <div>
      <q-select color="teal" filled v-model="model" :options="options" label="Filter">
        <template v-slot:prepend>
          <q-icon name="event" />
        </template>
      </q-select>
      <div>
        <q-card v-for="(vac, index) in slicedEntries" :key="index" 
          @click="clickCard(vac[0], vac[1])" clickable v-ripple class="my-box cursor-pointer q-hoverable q-ma-sm">
          <span class="q-focus-helper"></span>
          <q-item class="corpCard">

            <!-- avatar per graduate entry -->
            <q-item-section avatar>
              <q-avatar style="height:75px;width:75px">
                <img :src="slicedEntries[index][1].providerData[0].photoURL" >
              </q-avatar>
            </q-item-section>

            <!-- Name, surname and description per graduate entry -->
            <q-item-section>
              <q-item-label class="text-weight-bold">{{slicedEntries[index][1].displayname}}</q-item-label>
              <q-item-label caption lines="5">{{slicedEntries[index][1].bio}}</q-item-label>
            </q-item-section>

            <!-- <q-item-section side top>
              <q-badge class="badge" outline color="teal">{{badge}}</q-badge>
                            <q-badge class="badge" outline color="teal">{{badge}}</q-badge>

            </q-item-section> -->

          </q-item>
        </q-card>
      </div>
      <div>
        <vacancy-card :roleSME="roleSME" :card="card" :entryInfo="entryInfo" :badge="badge" :gradUID="gradUID"></vacancy-card>
      </div>
    </div>
    <div class="ad-container" 
         style="min-width:200px;min-heigh:20px;"
         >
      <Adsense class="adsbygoogle"
        style="display:block"
        data-ad-client="ca-pub-9476431452677803"
        data-ad-slot="6452619287"
        data-ad-format="auto"
        data-adtest="on"
        data-full-width-responsive="true">
      </Adsense>
      
    </div>
    <div class="info q-pa-xs">
      <div class="flex flex-center">
        <vacancy-pagination @click-page="switchPage"
          :entryList="entryList"
          :current="current"
          :total="total"
          :perPage="perPage"></vacancy-pagination>

        <q-select style="margin-left:25px" v-model="perPage" :options="pageOptions" />
      </div>
    </div>
  </div>
</template>

<script lang="js">
import VacancyCard from "src/components/VacancyCard.vue"
import VacancyPagination from "src/components/VacancyPagination.vue"
import { api } from '../assets/apiRoutes.js'
import { initializeApp } from "firebase/app"
import { firebaseConfig } from '../sso/auth_google_signin'
import { getFirestore, collection, doc, getDoc, getDocs, query, where, 
         limit, startAfter } from "firebase/firestore"; 
import { ref } from '@vue/composition-api'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Vue from "vue";
import InFeedAdsense from 'vue-google-adsense/dist/InFeedAdsense.min.js'
import Ads from 'vue-google-adsense'

Vue.use(InFeedAdsense)

Vue.use(require('vue-script2'))
Vue.use(Ads.Adsense)

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore()
// const usersRef = collection(db, "users")

export default {
  components: {
    'vacancy-card': VacancyCard,
    'vacancy-pagination': VacancyPagination,
    // 'InFeedAdsense': InFeedAdsense
  },
  data () {
    return {
      card: false,
      badge: "ok",
      entryInfo: null,
      entryList: [],
      gradUID: "",
      slicedEntries: [],
      avatar: "",

      user: {},
      role: "",
      roleSME: false,

      current: this.current || 1,
      total: 1,
      perPage: 5,
      currentpage: 1,

      mappedEntries: new Map(),
      entriesKey: [],
      entriesValue: [],
      entries: [],

      model: "Informatica",
      options: [
        'Informatica', 'Technische informatica'
      ],
      pageOptions: [
        5, 10, 25, 50
      ]
    }
  },
  created () {
    this.getGrads(this.model)

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        console.log(this.user) 
        this.getRole()
      } else {
        this.roleSME = false
        this.user = {}
      }
    })

  },
  mounted() {
  },
  watch: {
    current: (newCurrent, oldCurrent) => {
      console.log("Page change from " + oldCurrent + " to " + newCurrent)
    },
    entryList: (newList, oldList) => {
      // console.log(oldList)
      // console.log(newList)
    },
    model: function (newVal, oldVal) {
      console.log(oldVal + " ==> " + newVal)
      this.getGrads(newVal)
    },
    perPage: function (newVal, oldVal) {
      this.perPage = newVal
      this.paginate(this.mappedEntries)
    }
  },
  computed: {
    model: function () {
      console.log(this.model)
      return this.model
    }
  },
  methods: {
    getGrads(filter) {
      const first = query(collection(db, "users"), where("education", "==", filter));

      const documentSnapshots = getDocs(first);
      console.log(documentSnapshots)
      this.mappedEntries = new Map()
      this.entryList = []
      documentSnapshots.then((x) => {
        x.forEach(doc => {
          this.mappedEntries.set(doc.id, doc.data())
          console.log(doc.id, " => ", doc.data());
        });
        // console.log(this.mappedEntries)
        this.entryList.push(this.mappedEntries)
        // console.log(this.entryList)
        // this.demapper(this.mappedEntries)
        this.paginate(this.mappedEntries)
      })
    },
    getRole() {
      const docRef = doc(db, "users", this.user.uid)
      getDoc(docRef).then(docSnap => {
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          this.role = docSnap.data().role
          if (this.role === "SME") {
            this.roleSME = true
          }
        } else {
          console.log("No such document!");
        }
      })

    },
    // need to demap getGrads() results for v-for loop in HTML
    demapper(map) {
      const demappedEntries = []
      // const slicedDemappedEntries = []
      map.forEach(entry => {
        demappedEntries.push(entry)
      });
      this.entriesValue = demappedEntries
      this.paginate(this.entriesValue)
    },
    switchPage(currentPage) {
      this.card = false
      this.current = currentPage
      // console.log(this.mappedEntries)
      this.paginate(this.mappedEntries)
    },
    paginate(entries) {
      let from = (this.current * this.perPage) - this.perPage
      let to = this.current * this.perPage
      let tempEntries = Array.from(entries).slice(from, to)
      let newEntries = new Map(tempEntries)
      // let slicedEntries = entries.slice(from, to)
      this.entriesKey = newEntries.keys()
      // console.log(tempEntries[0])
      // console.log([...newEntries.values()][0])

      this.slicedEntries = tempEntries
    },
    clickCard (uid, param) {
      this.card = true
      this.entryInfo = param
      this.gradUID = uid
      // console.log(this.entryInfo)
      // console.log(this.gradUID)
    },
    parser(data) {
      for (let i = 0; i < data.data.length; i += 1) {
        if (typeof (data) === 'object') {
          try {
            data = JSON.parse(JSON.stringify(data));
            this.entryList.push(data.data[i])
          } catch (e) {
            console.error(e);
          }
        }
      }
      // this.paginate(this.entryList);
    }
  }
}
</script>

<style lang="sass" scoped>
.custom-area
  width: 90vh
  height: 80vh
  border-radius: 3px
  padding: 8px
  
.info 
  height: 45px 
  position: fixed
  bottom:0%
  width:100%
  background-color: #FFFFFF
  opacity: 1


.custom-info pre
  // width: 180px
  font-size: 12px

.corpCard
  max-height: 25vh
</style>
