<template>
<!-- <main-layout> -->
  <div class="q-pa-md" style="max-width: 99%">
    <q-tab-panels
      v-model="panel"
      animated
      swipeable
      infinite
      class="bg-purple text-white shadow-2 rounded-borders"
    >
      <q-tab-panel name="mails">
        <div class="text-h6">Mails</div>
      </q-tab-panel>

      <q-tab-panel name="alarms">
        <div class="text-h6">Alarms</div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </q-tab-panel>

      <q-tab-panel name="progress">
        <div class="text-h6">Progress</div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </q-tab-panel>
    </q-tab-panels>
  </div>
  <!-- </main-layout> -->
</template>

<script>
import MainLayoutVue from "src/layouts/MainLayout.vue"
import Index from 'src/pages/Index.vue'

export default {
  components: { Index, MainLayoutVue },
  name: 'Corporations',
  data () {
    return {
      panel: 'mails'
    }
  }
}
</script>
