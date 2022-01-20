<template>
  <div>
    <q-btn flat stack icon="login" label="Login" @click="login = true"/>

    <q-dialog
      v-close-popup
      v-model="login"
    >
      <q-card 
      v-close-popup
      style="width: 100%">
        <q-card-section>
          <div class="text-h6">Login</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-btn class="social-button" @click="socialGoogleLogin">
            Google signin     
          </q-btn>
        </q-card-section>

        <!-- <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions> -->
      </q-card>
    </q-dialog></div>
</template>

<script>
import { getAuth, signInWithPopup, GoogleAuthProvider, browserSessionPersistence } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../sso/auth_google_signin'
import Vue from 'vue'

const app = initializeApp(firebaseConfig);

export default {
  
  // name: 'ComponentName',
  // props: ['signedInUserInfo', 'signedInAccessToken', 'signedIn'],
  data () {
    return {
      login: false,
    }
  },
  methods: {
    socialGoogleLogin() {
      console.log(app)
      // Sign in using a redirect.
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      // Start a sign in process for an unauthenticated user.
      provider.addScope('profile');
      provider.addScope('email');
      const auth = getAuth();
      auth.languageCode = 'nl';
      // auth.setPersistence(browserSessionPersistence)
      signInWithPopup(auth, provider)


      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result) ;
        const token = credential.accessToken
        const user = result.user
        this.$emit('signed-in', user, token)





        // // console.log(result.user.accessToken)
        // // This gives you a Google Access Token.
        // this.token = result.user.accessToken;
        // // The signed-in user info.
        // this.user = result.user;
        // // Signed in confirmation
        // // this.$emit('signed-in', this.user, this.token, true)
        // console.log(indexedDB)
      })

                      // console.log(this.signedin)))
      // Vue.prototype.$signedIn = true
      // console.log(Vue.prototype.$session)
      // console.log(Vue.prototype.$signedIn)
      // this.$forceUpdate();
    },
  }
}
</script>