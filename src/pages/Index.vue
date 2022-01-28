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
                <img src="https://media-exp1.licdn.com/dms/image/C5603AQG6iZ6-_GCHZA/profile-displayphoto-shrink_200_200/0/1580983566762?e=1648080000&v=beta&t=cQ5T_sWWA8ApzmFVUuPhfAszwKeirS0la3rzu1zCnqo">
              </q-avatar>
            </q-item-section>

            <!-- Name, surname and description per graduate entry -->
            <q-item-section>
              <q-item-label class="text-weight-bold">{{slicedEntries[index].name}} {{slicedEntries[index].surname}}</q-item-label>
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

      current: this.current || 1,
      total: 1,
      perPage: 3,
    }
  },
  created () {
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
    switchPage(currentPage) {
      this.current = currentPage
      this.paginate(this.entryList)
    },
    paginate(entries) {
      let from = (this.current * this.perPage) - this.perPage
      let to = this.current * this.perPage
      let slicedEntries = entries.slice(from, to)
      console.log(slicedEntries)

      this.slicedEntries = slicedEntries
    },
    clickCard (param) {
      this.card = true
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
      this.paginate(this.entryList);
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
