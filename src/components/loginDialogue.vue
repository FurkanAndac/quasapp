<template>
  <div>
    <q-btn flat stack icon="login" label="Login" @click="login = true"/>

    <q-dialog
      v-model="login"
    >
      <q-card style="width: 100%">
        <q-card-section>
          <div class="text-h6">Login</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-btn class="social-button" @click="socialLogin">
            Google signin     
          </q-btn>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog></div>
</template>

<script>
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../sso/auth_google_signin'

const app = initializeApp(firebaseConfig);
// Sign in using a redirect.
const provider = new GoogleAuthProvider();
// Start a sign in process for an unauthenticated user.
provider.addScope('profile');
provider.addScope('email');
// await signInWithRedirect(auth, provider);

export default {
  
  // name: 'ComponentName',
  data () {
    return {
      login: false,
    }
  },
  methods: {
    socialLogin() {
      const auth = getAuth();
      console.log(auth)
      auth.languageCode = 'nl';
      signInWithPopup(auth, provider);
      console.log(auth)
    }
  }
}
</script>