<template>
  <q-layout view="hHh lpR fFf">

    <div class="custom-height-tabs">
      <q-header class="bg-teal-3" elevated reveal>

      <!-- <q-page-sticky expand position="top"> -->
        <q-tabs
          v-model="panel"
          horizontal
          class="text-blue-grey-14" >
          <q-tab name="vacatures" icon="work" label="Vacatures" />
          <q-tab name="interview" icon="duo" label="Interview" />
          <q-tab name="profile" icon="account_circle" label="Profile" />
          <login></login>
        </q-tabs>
      <!-- </q-page-sticky> -->
      </q-header>
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

      <q-tab-panel name="profile">
        <div class="text-h6">Profile</div>
        <profile>

        </profile>
      </q-tab-panel>
    </q-tab-panels>
  </div>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import Index from 'src/pages/Index.vue'
import Interview from 'src/pages/Interview.vue'
import Profile from 'src/pages/Profile.vue'
import Login from 'src/components/loginDialogue.vue'

export default defineComponent({
  components: { Index, Interview, Profile, Login },
  name: 'MainLayout',
  data () {

    return { 
      panel: 'vacatures'
     }
  }
})
</script>

<style lang="sass" scoped>
  .custom-height-tabs
    margin-top: 15vh

  .custom-height
    height: 190vh
    width: 100%


</style>