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
        <q-card-section class="q-pt-none">
          <q-btn class="social-button" @click="socialFacebookLogin">
            Facebook signin     
          </q-btn>

        </q-card-section>

        <!-- <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions> -->
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { getAuth, signInWithPopup, GoogleAuthProvider, 
         browserSessionPersistence, FacebookAuthProvider } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../sso/auth_google_signin'
import Vue from 'vue'
import { collection, doc, getFirestore, setDoc, updateDoc } from 'firebase/firestore';

const app = initializeApp(firebaseConfig);

const db = getFirestore()
const usersRef = collection(db, "users")

export default {
  
  // name: 'ComponentName',
  // props: ['signedInUserInfo', 'signedInAccessToken', 'signedIn'],
  data () {
    return {
      login: false,
      phoneDialogue: false,
      user: {},
      token: "",
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
        this.user = user
        this.token = token
        console.log(this.user)
        this.$emit('signed-in', user, token)
        this.createProfile(user.uid)
      })

    },
    socialFacebookLogin() {
      // Sign in using a popup.
      const provider = new FacebookAuthProvider();
      provider.addScope('email');
      provider.addScope('public_profile');

      const auth = getAuth();
      auth.languageCode = 'nl';
      signInWithPopup(auth, provider)
      
      .then((result) => {
        const credential = FacebookAuthProvider.credentialFromResult(result)
        // This gives you a Facebook Access Token.
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // user.photoURL = user.photoURL + "?width=9999"
        this.user = user
        this.token = token
        console.log(this.user)
        this.$emit('signed-in', user, token)
        this.createProfile(user.uid)
      });

    },
    createProfile(uid) {
        updateDoc(doc(getFirestore(), "users", uid ), {
          displayname: this.user.displayName,
          email: this.user.email,
          // phone: this.user.phoneNumber,
          // avatar: this.user.photoURL,
          creationtime: this.user.metadata.creationTime,
          providerData: this.user.providerData
        }, {merge:true})
    }
  }
}
</script>