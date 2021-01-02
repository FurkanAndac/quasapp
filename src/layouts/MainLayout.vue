<template>
  <q-layout view="hHh lpR fFf">
    <div class="custom-height-tabs">
      <!-- <q-page-sticky expand position="top"> -->
        <q-tabs
          v-model="panel"
          horizontal
          class="text-teal " >
          <q-tab name="vacatures" icon="mail" label="Vacatures" />
          <q-tab name="interview" icon="alarm" label="Interview" />
          <q-tab name="progress" icon="movie" label="Progress" />
        </q-tabs>
      <!-- </q-page-sticky> -->
    </div>
    <div>
    <q-tab-panels
      v-model="panel"
      animated
      swipeable
      infinite
      class="bg-white text-teal shadow-2 rounded-borders custom-height"
    >
      <q-tab-panel name="vacatures">
        <div class="text-h6">Vacatures</div>
        <index>

        </index>
      </q-tab-panel>

      <q-tab-panel name="interview">
        <div class="text-h6">Interview</div>
        <interview>
          
        </interview>
      </q-tab-panel>

      <q-tab-panel name="progress">
        <div class="text-h6">Progress</div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </q-tab-panel>
    </q-tab-panels>
  </div>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import Index from 'src/pages/Index.vue'
import Interview from 'src/pages/Interview.vue'

export default defineComponent({
  components: { Index, Interview },
  name: 'MainLayout',
  data () {

    return { 
      panel: 'vacatures'
     }
  }
})
</script>

<style lang="sass" scoped>
  // .custom-height-tabs
  //   margin-top: 10vh

  .custom-height
    height: 190vh
    width: 100%


</style>