<template>
  <div class="q-pa-md row justify-center">
    <div>
      <div>
        <q-card v-for="(vac, index) in slicedEntries" :key="vac._id" 
          @click="clickCard(vac), $forceUpdate()" clickable v-ripple class="my-box cursor-pointer q-hoverable q-ma-sm">
          <span class="q-focus-helper"></span>
          <q-item class="corpCard">

            <!-- avatar per graduate entry -->
            <q-item-section avatar>
              <q-avatar style="height:75px;width:75px">
                <img :src="slicedEntries[index].providerData[0].photoURL" >
              </q-avatar>
            </q-item-section>

            <!-- Name, surname and description per graduate entry -->
            <q-item-section>
              <q-item-label class="text-weight-bold">{{slicedEntries[index].displayname}}</q-item-label>
              <q-item-label caption lines="5">{{slicedEntries[index].bio}}</q-item-label>
            </q-item-section>

            <!-- <q-item-section side top>
              <q-badge class="badge" outline color="teal">{{badge}}</q-badge>
                            <q-badge class="badge" outline color="teal">{{badge}}</q-badge>

            </q-item-section> -->

          </q-item>
        </q-card>
      </div>
      <div>
        <vacancy-card :card="card" :entryInfo="entryInfo" :badge="badge"></vacancy-card>
      </div>
    </div>
    <div class="info q-pa-xs">
      <vacancy-pagination @click-page="switchPage"
        :entryList="entryList"
        :current="current"
        :total="total"
        :perPage="perPage"></vacancy-pagination>
    </div>
  </div>
</template>

<script lang="js">
import VacancyCard from "src/components/VacancyCard.vue"
import VacancyPagination from "src/components/VacancyPagination.vue"
import { api } from '../assets/apiRoutes.js'
import { initializeApp } from "firebase/app"
import { firebaseConfig } from '../sso/auth_google_signin'
import { getFirestore, collection, doc, getDocs, query, where, limit, startAfter } from "firebase/firestore"; 


const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore()
// const usersRef = collection(db, "users")

export default {
  components: {
    'vacancy-card': VacancyCard,
    'vacancy-pagination': VacancyPagination
  },
  data () {
    return {
      card: false,
      badge: "ok",
      entryInfo: null,
      entryList: [],
      slicedEntries: [],
      avatar: "",

      current: this.current || 1,
      total: 1,
      perPage: 2,
      currentpage: 1,

      mappedEntries: new Map(),
      entriesKey: [],
      entriesValue: [],
      entries: [],

    }
  },
  created () {
    this.getGrads()
  },
  mounted() {
    fetch(api.users)
      .then(response => response.json())
      .then(data => (this.parser(data)));

  },
  watch: {
    current: (newCurrent, oldCurrent) => {
      console.log("Page change from " + oldCurrent + " to " + newCurrent)
    }
  },
  methods: {
    getGrads() {
      const first = query(collection(db, "users"), where("email", "!=", ""));

      const documentSnapshots = getDocs(first);
      console.log(documentSnapshots)
      
      documentSnapshots.then((x) => {
        x.forEach(doc => {
          this.mappedEntries.set(doc.id, doc.data())
          // if (doc.data().providerData[0].providerId === "facebook.com") {
          //   // console.log("Document data:", docSnap.data());
          //   this.avatar = doc.data().providerData[0].photoURL + "?width=9999"
          //   var avatar = document.getElementById("avatar")
          //   avatar.src = this.avatar
          // } else {
          //   this.avatar = doc.data().providerData[0].photoURL
          //   var avatar = document.getElementById("avatar")
          //   avatar.src = this.avatar
          //   // console.log("No such document!");
          // }
          console.log(doc.id, " => ", doc.data());
        });
        console.log(this.mappedEntries)
        this.demapper(this.mappedEntries)
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
      // let from = (this.current * this.perPage) - this.perPage
      // let to = this.current * this.perPage
      // let slicedDemappedEntries = this.entriesValue.slice(from, to)
      // this.entriesValue = slicedDemappedEntries
      // this.paginate(this.entriesValue)
      this.paginate(this.entriesValue)
      // console.log(slicedDemappedEntries)
      console.log(this.entriesValue)
    },
    switchPage(currentPage) {
      this.card = false
      this.current = currentPage
      this.paginate(this.entriesValue)
    },
    paginate(entries) {
      let from = (this.current * this.perPage) - this.perPage
      let to = this.current * this.perPage
      let slicedEntries = entries.slice(from, to)
      console.log(slicedEntries)

      this.slicedEntries = slicedEntries
    },
    clickCard (param) {
      // this.card = true
      this.entryInfo = param
      console.log(this.entryInfo)
      console.log(this.card)
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
