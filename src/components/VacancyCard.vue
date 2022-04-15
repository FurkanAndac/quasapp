<template>
  <div>
  <q-dialog v-model="card">
      <q-card class="my-card" >

        <q-card-section>
          <q-item-section avatar>
            <q-avatar>
              <img :src=entryInfo.providerData[0].photoURL>
            </q-avatar>
        </q-item-section>

          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">
              
              {{entryInfo.displayname}}
            </div>
            <div>
              <q-btn icon="close" flat round dense v-close-popup />
          </q-item-section>

            </div>
          </div>

        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-caption text-grey">
            {{entryInfo.bio}}
          </div>
          </br>
          <div v-show="roleSME" class="text-subtitle3 text-black">
            email: {{entryInfo.email}}
            <q-icon right color="teal" size="30px" name="mail" @click="sendEmail" />
            </br>
            nummer: {{entryInfo.phone}}
            <q-icon right color="teal" size="30px" name="phone" @click="startCall" />
            </br>
            C.V.: {{entryInfo.resumeObject.name}}
            <q-icon right color="teal" size="30px" name="picture_as_pdf" @click="getResume" />
            </br>
          </div>
        </q-card-section>

        <q-separator />


        <!-- <q-card-actions align="right">
          <q-btn align="left" v-close-popup flat color="teal" label="solliciteer nu" />
        </q-card-actions> -->
      </q-card>
    </q-dialog>
          </br>

    </div>

</template>

<script>
export default {
  name: 'VacancyCard',
  props: ['roleSME', 'card', 'entryInfo', 'badge', 'gradUID'],
  data () {
    return {
      roleSME: false,
      // role: this.role
    }
  },
  methods: {
    sendEmail() {
      window.location = "mailto:" + this.entryInfo.email
    },
    startCall() {
      window.location = "tel:" + this.entryInfo.phone
    },
    getResume() {
      window.open(this.entryInfo.resumeObject.resumeURL)
    },
  },
}
</script>
