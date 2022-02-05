<template>
  <q-page padding>
    <!-- content -->
    <!--  PANEL -->

    
    <!-- EDIT PANEL -->
    <div class='myDIV'>
      <div style="text-transform: capitalize;">
        Hallo {{ this.displayname }}
      </div>
      <div>
        <q-avatar size="100px">
          <img id="avatar" >
        </q-avatar>
      </div>
      <q-select :readonly='readOnly' color="teal" filled v-model="model" :options="options" label="Opleiding">
        <template v-slot:prepend>
          <q-icon name="event" />
        </template>
      </q-select>
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
            Geslacht
          </div>
        </template>
      </q-input>

      <q-input :readonly='true' class='q-pa-sm' filled v-model="email" input-class="text-right" label-slot clearable>
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

      <q-file :readonly='readOnly' v-model="file" label="Curriculum Vitae">
        <template v-slot:prepend>
          <q-icon name="attach_file" />
        </template>  

        <template v-slot:after>
          <q-btn round dense flat icon="send" @click="uploadTask" />
        </template>

      </q-file>
      <div @click="gotoResumeURL">
        {{resumeName}}
      </div>

      <div style="text-align:center">
        <q-btn @click="editForm" :label="editLabel" type="edit" color="teal"/>
      </div>

    </div>
  </q-page>
</template>

<script>
import { api } from '../assets/apiRoutes.js'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { firebaseConfig } from '../sso/auth_google_signin'
import { collection, doc, setDoc, getDoc, updateDoc } from "firebase/firestore"; 
import { getStorage, ref, uploadBytes, listAll, deleteObject, getDownloadURL } from "firebase/storage";


const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore()
const usersRef = collection(db, "users")
const storage = getStorage();



export default {
  // name: 'PageName',
  components: {
  },
  data () {
    return {
      user: {},
      displayname: "",
      bio: "",
      place: "",
      gender: "",
      email: "",
      phonenumber: "",
      resumeURL: "",
      resumeName: "",
      education: "",

      avatar: "",
      file: null,
      prevFile: this.file,
      totalFiles: [],
      readOnly: true,
      editLabel: 'Bewerk',

      model: "Informatica",
      options: [
        "Informatica", "Technische informatica"
      ]
    }
  },
  created() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        console.log(this.user) 
        this.email = user.email
        this.getProfile()
        this.loadPhotoURL()
        this.getDisplayname()
        // lists all resumes
        this.getResume()
        // this.getEducation()
        // gets current resumeURL for resume
        // this.getResumeInfo()
      } else {
        this.user = {}
      }
    })
  },
  // watch: {
  //   resumeObject: (oldName, newName) => {
  //     console.log("Resume changed from: " + oldName + " to " + newName)
  //   }
  // },
  // mounted() {
  // },
  // computed: {
  //   getResumeInfo() {
  //     this.resumeObject = this.user.resumeObject
  //   },
  // },
  methods: {
    getDisplayname() {
      this.displayname = this.user.displayName
    },
    // getEducation() {
    //   this.model = this.user.education
    // },
    gotoResumeURL() {
      // this.resumeName = this.user.resumeObject.name
      window.open(this.resumeURL)
    },
    getProfile() {
      const docRef = doc(db, "users", this.user.uid)
      getDoc(docRef).then(docSnap => {
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          this.model = docSnap.data().education
          this.bio = docSnap.data().bio
          this.avatar = docSnap.data().providerData[0].photoURL
          // console.log(docSnap.data().providerData[0].photoURL)
          this.place = docSnap.data().place
          this.gender = docSnap.data().gender
          this.email = docSnap.data().email
          this.phonenumber = docSnap.data().phone
          this.resumeName = docSnap.data().resumeObject.name
          this.resumeURL = docSnap.data().resumeObject.resumeURL
        } else {
          console.log("No such document!");
        }
      })
    },
    loadPhotoURL() {
      const docRef = doc(db, "users", this.user.uid)
      getDoc(docRef).then(docSnap => {
        if (docSnap.exists() && 
            docSnap.data().providerData[0].providerId === "facebook.com") {
            // console.log("Document data:", docSnap.data());
            this.avatar = docSnap.data().providerData[0].photoURL + "?width=9999"
            var avatar = document.getElementById("avatar")
            avatar.src = this.avatar
        } 
        if (docSnap.exists() &&
            docSnap.data().providerData[0].providerId === "google.com") {
            this.avatar = docSnap.data().providerData[0].photoURL
            var avatar = document.getElementById("avatar")
            avatar.src = this.avatar
        } else {
          console.log("No such document!");
        }
      })    
    },
    getFileDownloadURL (filename) {
      getDownloadURL(ref(storage, 'resumes/' + this.user.uid + "/" + filename))
        .then((url) => {
          this.resumeName = filename
          this.resumeURL = url
          console.log(url)
          this.updateResumePath();
        })
    },
    getResume() {
      const listRef = ref(storage, 'resumes/' + this.user.uid);
      listAll(listRef)
        .then((res) => {
          // res.items.forEach((itemRef) => {
          //   // All the items under listRef.
          //   this.file = itemRef
          //   this.prevFile = itemRef
          //   this.totalFiles = res.items
          // });
          console.log(res)
          this.totalFiles = res
        }).catch((error) => {
          // Uh-oh, an error occurred!
        });
    },
    uploadTask() {
      this.getResume()
      if (this.totalFiles.items.length > 0) {
        this.deleteFile(this.totalFiles)
      }
      console.log(this.file.name)
      this.uploadFile(this.file.name)
      
      // this.getFileDownloadURL(this.file.name)
    },
    uploadFile(file) {
      console.log(this.file)
      const resumesRef = ref(storage, 'resumes/' + this.user.uid + "/" + file);
      uploadBytes(resumesRef, this.file).then((snapshot) => {
        console.log('uploaded: ' + snapshot )
      }).then((x) => this.getFileDownloadURL(this.file.name))
        // .then((y) => this.updateResumePath())
    },
    deleteFile(file) {
      file.items.forEach((itemRef) => {
        const resumesRef = ref(storage, 'resumes/' + this.user.uid + "/" + itemRef.name);
          // Delete the file
        console.log(resumesRef)
        deleteObject(resumesRef).then(() => {
          // File deleted successfully
          console.log("file deleted:" + itemRef.name)
        }).catch((error) => {
          // Uh-oh, an error occurred!
        });
      })
      console.log(this.prevFile)
      // if (this.prevfile != null || undefined) {
        const resumesRef = ref(storage, 'resumes/' + this.user.uid + "/" + file);
          // Delete the file
        console.log(resumesRef)
        deleteObject(resumesRef).then(() => {
          // File deleted successfully
          console.log("file deleted")
        }).catch((error) => {
          // Uh-oh, an error occurred!
        });
      // }
    },
    updateEducation() {
      updateDoc(doc(usersRef, this.user.uid), {
        education: this.model
      }, {merge:true})
    },
    updateGender() {
      updateDoc(doc(usersRef, this.user.uid), {
        gender: this.gender
      }, {merge:true})
    },
    updateAvatar() {
      updateDoc(doc(usersRef, this.user.uid), {
        avatar: this.user.photoURL
      }, {merge:true})
    },
    updateBio() {
      updateDoc(doc(usersRef, this.user.uid), {
        bio: this.bio
      }, {merge:true})
    },
    updatePlace() {
      updateDoc(doc(usersRef, this.user.uid), {
        place: this.place
      }, {merge:true})
    },
    updateResumePath() {
      // const resumesRef = 'resumes/' + this.user.uid + "/" + this.file.name;
      updateDoc(doc(usersRef, this.user.uid), {
        resumeObject: {name: this.resumeName, resumeURL: this.resumeURL}
      }, {merge:true})
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
      updateDoc(doc(usersRef, this.user.uid), {
        phone: this.phonenumber
      }, {merge:true})
    },

    editForm() {
      if(this.readOnly == true){
        this.readOnly = false;
        this.editLabel = 'Opslaan'
      } else {
        this.updateEducation();
        this.updateBio();
        this.updatePlace();
        this.updateGender();
        this.updateEmail();
        this.updatePhonenumber();
        // this.getResume();
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
