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
        <vacancy-card :signedInUserInfo="signedInUserInfo" :card="card" :entryInfo="entryInfo" :badge="badge" :gradUID="gradUID"></vacancy-card>
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
import { ref } from '@vue/composition-api'

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
      gradUID: "",
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

      model: "Informatica",
      options: [
        'Informatica', 'Technische informatica'
      ]
    }
  },
  created () {
    this.getGrads(this.model)
    // console.log(this.signedInUserInfo)
    // this.filterEntrylist(this.model)

  },
  mounted() {
    // fetch(api.users)
    //   .then(response => response.json())
    //   .then(data => (this.parser(data)));
  },
  watch: {
    current: (newCurrent, oldCurrent) => {
      console.log("Page change from " + oldCurrent + " to " + newCurrent)
    },
    entryList: (newList, oldList) => {
      console.log(oldList)
      console.log(newList)
    },
    model: function (newVal, oldVal) {
      console.log(oldVal + " ==> " + newVal)
      console.log(this.entryList)
      this.getGrads(newVal)
    }
  },
  computed: {
    model: function () {
      console.log(this.model)
      return this.model + "test"
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
        this.entryList.push(this.mappedEntries)
        console.log(this.entryList)
        // this.demapper(this.mappedEntries)
        this.paginate(this.mappedEntries)
      })
    },
    // filterEntrylist(educationFilter) {
    //   console.log(educationFilter)
    //   console.log(this.entryList[0])
    //   const filteredMappedEntries = new Map() 
    //   this.entryList[0].forEach((element, key) => {
    //     console.log(key)
    //     if(element.education != null | undefined && element.education === educationFilter) {
    //       filteredMappedEntries.set(key, element)
    //       console.log(key, " => ", element)
    //       console.log(filteredMappedEntries)
    //       this.paginate(filteredMappedEntries)
    //     } else {
    //       // if (index > -1) {
    //       //   this.entryList[0].splice(index, 1)
    //       //   console.log(this.entryList)

    //       // }
    //     }
    //     // this.paginate(this.entryList[0])
        
    //   });
    // },
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
      console.log(this.mappedEntries)
      this.paginate(this.mappedEntries)
    },
    paginate(entries) {
      let from = (this.current * this.perPage) - this.perPage
      let to = this.current * this.perPage
      let tempEntries = Array.from(entries).slice(from, to)
      let newEntries = new Map(tempEntries)
      // let slicedEntries = entries.slice(from, to)
      this.entriesKey = newEntries.keys()
      console.log(tempEntries[0])
      console.log([...newEntries.values()][0])

      this.slicedEntries = tempEntries
    },
    clickCard (uid, param) {
      this.card = true
      this.entryInfo = param
      this.gradUID = uid
      console.log(this.entryInfo)
      console.log(this.gradUID)
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
