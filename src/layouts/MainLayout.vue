<template>
  <q-layout view="hHh lpR fFf">
    

    <div class="custom-height-tabs">
      <q-header class="bg-teal-3" elevated reveal>

      <!-- <q-page-sticky expand position="top"> -->
        <q-tabs
          
          v-model="panel"
          horizontal
          class="text-blue-grey-14" >
          <img style="margin: 10px" src="../assets/logo.png" >
          <q-tab name="vacatures" icon="work" label="Graduates" />
          <q-tab v-show="false" name="interview" icon="duo" label="Interview" />
          <q-tab v-show="signedIn" name="profile" icon="account_circle" label="Profile"/>
          <login v-show="!signedIn" @signed-in="checkAuth"></login>
          <q-btn v-show="signedIn" flat stack icon="logout" label="Logout" @click="logout(), $forceUpdate()"/>
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
        <div class="text-h6"></div>
        <index v-bind:signedInUserInfo="signedInUserInfo">

        </index>
      </q-tab-panel>

      <q-tab-panel v-show="false" name="interview">
        <div class="text-h6">Interview</div>
        <interview>
          
        </interview>
      </q-tab-panel>

      <q-tab-panel v-show="signedIn" name="profile">
        <div class="text-h6"></div>
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
import Vue from 'vue'
import { getAuth, onAuthStateChanged } from "firebase/auth";


// const sessionState = Vue.prototype.$session
// const signedIn = Vue.prototype.$signedIn = false



export default defineComponent({
  components: { Index, Interview, Profile, 'login': Login },
  name: 'MainLayout',
  data () {

    return { 
      panel: 'vacatures',
      signedIn: false,
      signedInUserInfo: {},
      signedInAccessToken: ""
     }
  },
  methods: {
    checkAuth(userInfo: {}, accessToken: string) {
      this.signedInUserInfo = userInfo
      this.signedInAccessToken = accessToken
      if(this.signedInAccessToken != "") {
        this.signedIn = true
      }
      console.log(this.signedInUserInfo)
    },
    logout() {
      const auth = getAuth();
      auth.signOut().then(function() {
        // Sign-out successful.
        localStorage.clear()
        console.log("succesfully signed out")
      }, function(error) {
        // An error happened.
      });
    },
  },
  created() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.signedIn = true
        user.getIdToken().then(function(idToken) {
          console.log(idToken);
        }) 
      } else {
        this.signedIn = false
      }
    })
  },
})
</script>

<style lang="sass" scoped>
  .custom-height-tabs
    margin-top: 15vh

  .custom-height
    height: 190vh
    width: 100%


</style>