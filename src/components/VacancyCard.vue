<template>
  <div>My component
  <q-dialog v-model="card">
      <q-card class="my-card">

        <q-card-section>
          

          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">
              
              {{vacancyInfo.title}}
            </div>
            <div>
              <q-badge class="badge" outline color="teal">{{badge}}</q-badge>
              <q-btn icon="close" flat round dense v-close-popup />
          </q-item-section>

            </div>
          </div>

        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-subtitle1">
            {{vacancyInfo.company}}
          </div>
          </br>
          <div class="text-caption text-grey">
            {{vacancyInfo.description}}
          </div>
          </br>
          <div class="text-subtitle3 text-black">
            email: {{vacancyInfo.contact.email}}
            </br>
            nummer: {{vacancyInfo.contact.phone}}
          </div>
        </q-card-section>

        <q-separator />


        <q-card-actions align="right">
          <q-btn align="left" v-close-popup flat color="teal" label="solliciteer nu" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    </div>

</template>

<script>
export default {
  name: 'VacancyCard',
  props: ['card', 'vacancyInfo', 'badge'],
  data () {
    return {
      // card1: card
      // vacancyInfo: {}
    }
  },
  methods: {

  },
  // created () {
  //   this.card = this.card1
  //   this.card1 = this.card
  //   console.log(this.card1)
  // }
}
</script>
