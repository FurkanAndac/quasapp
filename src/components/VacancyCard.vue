<template>
  <div>My component
  <q-dialog v-model="card">
      <q-card class="my-card">

        <q-card-section>
          <q-item-section avatar>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
        </q-item-section>

          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">
              
              {{entryInfo.name}} {{entryInfo.surname}}
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
            {{entryInfo.bio}}
          </div>
          </br>
          <div class="text-caption text-grey">
            {{entryInfo.bio}}
          </div>
          </br>
          <div class="text-subtitle3 text-black">
            email: {{entryInfo.email}}
            </br>
            nummer: {{entryInfo.phone}}
          </div>
        </q-card-section>

        <q-separator />


        <q-card-actions align="right">
          <q-btn align="left" v-close-popup flat color="teal" label="solliciteer nu" />
        </q-card-actions>
      </q-card>
    </q-dialog>
          </br>

    </div>

</template>

<script>
export default {
  name: 'VacancyCard',
  props: ['card', 'entryInfo', 'badge'],
  data () {
    return {
    }
  },
  methods: {

  },
}
</script>
