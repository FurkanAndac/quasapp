<template>
  <div class="q-pa-md row justify-center">
    <div>
    <q-card v-for="(vac, index) in vacancyList" :key="vac._id" 
    @click="clickCard(vac), $forceUpdate()" clickable v-ripple class="my-box cursor-pointer q-hoverable">
      <span class="q-focus-helper"></span>
        <q-item class="corpCard">

          <q-item-section>
            <q-item-label class="text-weight-bold" header>{{vacancyList[index].company}} - {{vacancyList[index].title}}</q-item-label>
            <!-- <q-item-label class="text-weight-bold" caption>{{vacancyList[0].vacancy.corporation}}</q-item-label> -->
            <q-item-label caption lines="7">{{vacancyList[index].description}}</q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-badge class="badge" outline color="teal">{{badge}}</q-badge>
          </q-item-section>

        </q-item>
      </q-card>
    </div>
    <div>
  <vacancy-card :card="card" :vacancyInfo="vacancyInfo"  :badge="badge"></vacancy-card>
  </div>
  </div>
</template>

<script lang="js">
import { vacancy } from "src/assets/vacancy.json"
import VacancyCard from "src/components/VacancyCard.vue"
export default {
  components: {
    'vacancy-card': VacancyCard
  },
  data () {
    return {
      card: false,
      badge: "ok",
      vacancyInfo: null,
      vacancyList: []
    }
  },
  created () {
    // this.$root.log = function log(data) {
    //   for (let i = 0; i < data.data.length; i += 1) {
    //     if (typeof (data) === 'object') {
    //       try {
    //         data = JSON.parse(JSON.stringify(data));
    //         console.log(data.data[i])
    //         // return this.vacancyList.push(data.data[i])
    //       } catch (e) {
    //         console.error(e);
    //       }
    //     }


    //   }
    //   // this.vacancyList = data;
    //   console.log(this.vacancyList);
    // }
  },
  mounted() {
    // fetch("https://api-quasapp.herokuapp.com/api/vacancies")
    //   .then(response => response.json())
    //   .then(data => (this.$root.log(data), this.vacancyList.push(data), this.$root.log(this.vacancyList[0])))
      fetch("https://api-quasapp.herokuapp.com/api/vacancies")
        .then(response => response.json())
        .then(data => (this.parser(data)))


  },
  methods: {
    clickCard (param) {
      this.card = true
      this.vacancyInfo = param
      console.log(this.vacancyInfo)
      // console.log(param)
      console.log(this.card)
    },
    parser(data) {
      for (let i = 0; i < data.data.length; i += 1) {
        if (typeof (data) === 'object') {
          try {
            data = JSON.parse(JSON.stringify(data));
            console.log(data.data[i])
            this.vacancyList.push(data.data[i])
          } catch (e) {
            console.error(e);
          }
        }
      }
      console.log(this.vacancyList);
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

.custom-info pre
  // width: 180px
  font-size: 12px

.corpCard
  max-height: 25vh
</style>
