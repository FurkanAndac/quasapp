<template>
  <q-page padding>
    <!-- content -->
    <!--  PANEL -->

    
    <!-- EDIT PANEL -->
    <div class='myDIV'>
      <div style="text-transform: capitalize;">
        Hallo {{ this.displayname }}
      </div>
      <q-input :readonly='readOnly' class='q-pa-sm' filled v-model="bio" input-class="text-right" label-slot clearable>
        <template v-slot:label>
          <div class="row items-center all-pointer-events">
            Bio
          </div>
        </template>
      </q-input>
      <q-input :readonly='readOnly' class='q-pa-sm' filled v-model="place" input-class="text-right" label-slot clearable>
        <template v-slot:label>
          <div class="row items-center all-pointer-events">
            Plaats
          </div>
        </template>
      </q-input>
      <q-input :readonly='readOnly' class='q-pa-sm' filled v-model="gender" input-class="text-right" label-slot clearable>
        <template v-slot:label>
          <div class="row items-center all-pointer-events">
            Genderrol
          </div>
        </template>
      </q-input>

      <q-input :readonly='readOnly' class='q-pa-sm' filled v-model="email" input-class="text-right" label-slot clearable>
        <template v-slot:label>
          <div class="row items-center all-pointer-events">
            Email adres
          </div>
        </template>
      </q-input>
      <q-input :readonly='readOnly' class='q-pa-sm' filled v-model="phonenumber" input-class="text-right" label-slot clearable>
        <template v-slot:label>
          <div class="row items-center all-pointer-events">
            Telefoonnummer
          </div>
        </template>
      </q-input>
        <!--
          Due to browser security policy,
          we can only read the value, but not
          write to it, so we only have an @input listener
        -->

      <q-file :readonly='readOnly' v-model="file">
        <template v-slot:prepend>
          <q-icon name="attach_file" />
        </template>  
      </q-file>
    </div>
    <q-btn @click="editForm" :label="editLabel" type="edit" color="teal"/>
  </q-page>
</template>

<script>
import { api } from '../assets/apiRoutes.js'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { firebaseConfig } from '../sso/auth_google_signin'
import { collection, doc, setDoc, getDoc, updateDoc } from "firebase/firestore"; 


const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore()
const usersRef = collection(db, "users")

export default {
  // name: 'PageName',
  components: {
  },
  data () {
    return {
      // profile: this.getProfile(),
      user: {},
      displayname: "",
      name: this.getName(),
      bio: "",
      surname: this.getSurname(),
      place: "",
      gender: this.getGender(),
      email: "",
      phonenumber: "",
      cv: this.getCV(),

      file: null,
      readOnly: true,
      editLabel: 'Bewerk',


    }
  },
  created() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        console.log(user)
        this.email = user.email
        this.getPhonenumber()
        this.getDisplayname()
        this.getPlace()
        this.getBio()
      } else {
        this.user = {}
      }
    })
  },
  mounted() {
  },
  methods: {
    getDisplayname() {
      this.displayname = this.user.displayName
    },
    // getProfile() {
    //   fetch(api.user)
    //       .then(response => response.json())
    //       .then(data => (this.profile = data));
    // },
    getName() {
      fetch(api.name)
          .then(response => response.json())
          .then(data => (this.name = data.data));
    },
    getBio() {
      const docRef = doc(db, "users", this.user.uid)
      getDoc(docRef).then(docSnap => {
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          this.bio = docSnap.data().bio
        } else {
          console.log("No such document!");
        }
      })
    },
    getSurname() {
      fetch(api.surname)
                .then(response => response.json())
                .then(data => (this.surname = data.data));
    },
    getPlace() {
      const docRef = doc(db, "users", this.user.uid)
      getDoc(docRef).then(docSnap => {
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          this.place = docSnap.data().place
        } else {
          console.log("No such document!");
        }
      })
    },
    getGender() {
      fetch(api.gender)
          .then(response => response.json())
          .then(data => (this.gender = data.data));
    },    
    getEmail() {
      fetch(api.email)
                .then(response => response.json())
                .then(data => (this.email = data.data));
    },
    getPhonenumber() {
      console.log("test")
      // fetch(api.phone)
      //     .then(response => response.json())
      //     .then(data => (this.phonenumber = data.data));
      const docRef = doc(db, "users", this.user.uid)
      getDoc(docRef).then(docSnap => {
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          this.phonenumber = docSnap.data().phone
        } else {
          console.log("No such document!");
        }
      })

    },
    getCV() {
      fetch(api.CV)
          .then(response => response.json())
          .then(data => (this.file = data.data))
          .then(x => console.log(x))
    },
    updateName() {
      fetch(api.name, {
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'crossDomain':'true',
            'Content-Type': 'application/json',
            'Pragma': 'no-cache',
            'Access-Control-Allow-Origin': '*'
        },        
        body: JSON.stringify({name: this.name}),
      }).then(x => console.log(x))

    },
    updateBio() {
      updateDoc(doc(usersRef, this.user.uid), {
        bio: this.bio
      })
    },
    updateSurname() {
      fetch(api.surname, {
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'crossDomain':'true',
            'Content-Type': 'application/json',
            'Pragma': 'no-cache',
            'Access-Control-Allow-Origin': '*'
        },        
        body: JSON.stringify({surname: this.surname}),
      }).then(x => console.log(x))
    },
    updatePlace() {
      updateDoc(doc(usersRef, this.user.uid), {
        place: this.place
      })
    },
    updateGender() {
      fetch(api.gender, {
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'crossDomain':'true',
            'Content-Type': 'application/json',
            'Pragma': 'no-cache',
            'Access-Control-Allow-Origin': '*'
        },        
        body: JSON.stringify({gender: this.gender}),
      }).then(x => console.log(x))
    },    
    updateEmail() {
      fetch(api.email, {
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'crossDomain':'true',
            'Content-Type': 'application/json',
            'Pragma': 'no-cache',
            'Access-Control-Allow-Origin': '*'
        },        
        body: JSON.stringify({email: this.email}),
      }).then(x => console.log(x))
    },
    updatePhonenumber() {
      // fetch(api.phone, {
      //   method: 'POST',
      //   headers:{
      //       'Accept': 'application/json',
      //       'crossDomain':'true',
      //       'Content-Type': 'application/json',
      //       'Pragma': 'no-cache',
      //       'Access-Control-Allow-Origin': '*'
      //   },        
      //   body: JSON.stringify({phone: this.phonenumber}),
      // }).then(x => console.log(x))

      updateDoc(doc(usersRef, this.user.uid), {
        phone: this.phonenumber
      })
    },
    // updateCV() {
    //   const fd = new FormData();
    //   fd.append('cv', this.file);
    //   fetch(api.CV, {
    //     method: 'POST',
    //     headers:{
    //     },        
    //     body: fd,
    //   }).then(response => response.json()
    //   ).then(success => console.log(success)
    //   ).catch(error => console.log(error))
    // },
    editForm() {
      if(this.readOnly == true){
        this.readOnly = false;
        this.editLabel = 'Opslaan'
      } else {
        this.updateName();
        this.updateBio();
        this.updateSurname();
        this.updatePlace();
        this.updateGender();
        this.updateEmail();
        this.updatePhonenumber();
        // this.updateCV();
        this.readOnly = true
        this.editLabel = 'Bewerk'
      }

    },
    myFunction() {
      var x = document.getElementById("myDIV");
      if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
    },

  }
}
</script>
