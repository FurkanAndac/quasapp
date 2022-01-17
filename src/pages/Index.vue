<template>
  <div class="q-pa-md row justify-center">
    <div>
      <div>
        <q-card v-for="(vac, index) in slicedVacancies" :key="vac._id" 
          @click="clickCard(vac), $forceUpdate()" clickable v-ripple class="my-box cursor-pointer q-hoverable q-ma-sm">
          <span class="q-focus-helper"></span>
          <q-item class="corpCard">

            <q-item-section>
              <q-item-label class="text-weight-bold" header>{{slicedVacancies[index].company}} - {{slicedVacancies[index].title}}</q-item-label>
              <!-- <q-item-label class="text-weight-bold" caption>{{vacancyList[0].vacancy.corporation}}</q-item-label> -->
              <q-item-label caption lines="7">{{slicedVacancies[index].description}}</q-item-label>
            </q-item-section>

            <q-item-section side top>
              <q-badge class="badge" outline color="teal">{{badge}}</q-badge>
            </q-item-section>

          </q-item>
        </q-card>
      </div>
      <div>
        <vacancy-card :card="card" :vacancyInfo="vacancyInfo" :badge="badge"></vacancy-card>
      </div>
    </div>
    <div class="info q-pa-xs">
      <vacancy-pagination @click-page="switchPage"
        :vacancyList="vacancyList"
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

export default {
  components: {
    'vacancy-card': VacancyCard,
    'vacancy-pagination': VacancyPagination
  },
  data () {
    return {
      card: false,
      badge: "ok",
      vacancyInfo: null,
      vacancyList: [],
      slicedVacancies: [],

      current: this.current || 1,
      total: 1,
      perPage: 3,
    }
  },
  created () {
  },
  mounted() {
    fetch(api.vacancies)
      .then(response => response.json())
      .then(data => (this.parser(data)));

  },
  watch: {
    current: (newCurrent, oldCurrent) => {
      console.log("Page change from " + oldCurrent + " to " + newCurrent)
    }
  },
  methods: {
    switchPage(currentPage) {
      this.current = currentPage
      this.paginate(this.vacancyList)
    },
    paginate(vacancies) {
      let from = (this.current * this.perPage) - this.perPage
      let to = this.current * this.perPage
      let slicedVacancies = vacancies.slice(from, to)
      console.log(slicedVacancies)

      this.slicedVacancies = slicedVacancies
    },
    clickCard (param) {
      this.card = true
      this.vacancyInfo = param
      console.log(this.vacancyInfo)
      console.log(this.card)
    },
    parser(data) {
      for (let i = 0; i < data.data.length; i += 1) {
        if (typeof (data) === 'object') {
          try {
            data = JSON.parse(JSON.stringify(data));
            this.vacancyList.push(data.data[i])
          } catch (e) {
            console.error(e);
          }
        }
      }
      this.paginate(this.vacancyList);
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
