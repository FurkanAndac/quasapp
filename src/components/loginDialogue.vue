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
          <div style="text-align:center; color:teal" class="text-h6">Login</div>
        </q-card-section>

        <q-card-section style="text-align:center" class="q-pt-none">
          <!-- <div> -->
          <!-- <q-btn class="social-button" @click="socialGoogleLogin"> -->
            <img :src="pictureHoverGoogle" @mouseover="googleHover = true"
              @mouseleave="googleHover = false" @click="socialGoogleLogin" />   
          <!-- </q-btn> -->
        </q-card-section>
        <q-card-section style="text-align:center" class="q-pt-none">
          <!-- <q-btn class="social-button" @click="socialFacebookLogin"> -->
            <img src="../assets/facebook-sign-in-button.png" style="width:191px"
              @click="socialFacebookLogin" />
          <!-- </q-btn> -->

        </q-card-section>
        </br>
        <div @click="gotoPrivacypolicy" style="text-align:center; color:teal">
          Privacybeleid
        </div>
        </br>
        <div @click="gotoFormSME" style="text-align:center; color:teal">
          MKB'er? Klik hier!
        </div>
        </br>

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
import { collection, doc, getFirestore, getDoc, setDoc, updateDoc } from 'firebase/firestore';

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

      googleStatic: require("../assets/btn_google_signin_dark_normal_web.png"),
      googleHovered: require("../assets/btn_google_signin_dark_focus_web.png"),
      googleHover: false,
    }
  },
  computed: {
    pictureHoverGoogle () {
      if (this.googleHover == true) {
        return this.googleHovered
      } else {
        return this.googleStatic
      }
    },
  },
  methods: {
    socialGoogleLogin() {
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
        this.$emit('signed-in', user, token)
        // this.$emit('user-role', this.user.role)
        const ref = doc(db, "users", user.uid)
        getDoc(ref).then(docSnap => {
          if (docSnap.exists()) {
            console.log(docSnap.data())
          } else {
            this.createProfile(user.uid)
          }
        })
      });

    },
    createProfile(uid) {
        setDoc(doc(getFirestore(), "users", uid ), {
          // displayname: this.user.displayName,
          email: this.user.email,
          // phone: this.user.phoneNumber,
          // avatar: this.user.photoURL,
          creationtime: this.user.metadata.creationTime,
          providerData: this.user.providerData,
          resumeObject: {name: "", resumeURL: ""},
          role: "graduate"
          
        }, {merge:true})
      // updateDoc(doc(getFirestore(), "appconfigs", uid), {
      //   perpage: 2
      // }, {merge:true})
    }, 
    gotoPrivacypolicy() {
      window.open("https://www.privacypolicies.com/live/e596c1ae-ac27-4b1c-b660-251104515b53")
    },
    gotoFormSME() {
      window.open("https://docs.google.com/forms/d/e/1FAIpQLSfeg6ZzLQESUAzyDFM0OAxVOCumbxv72azecp-iMxfU-WlL0A/viewform")
    }
  }
}
</script>