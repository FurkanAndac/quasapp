<template>
  <q-page padding>
    <!-- content -->
    <!--  PANEL -->

    
    <!-- EDIT PANEL -->
    <div class='myDIV'>
      PROFILE
      <q-input :readonly='readOnly' class='q-pa-sm' filled v-model="name" input-class="text-right" label-slot clearable>
        <template v-slot:label>
          <div class="row items-center all-pointer-events">
            Voornaam
          </div>
        </template>
      </q-input>
      <q-input :readonly='readOnly' class='q-pa-sm' filled v-model="surname" input-class="text-right" label-slot clearable>
        <template v-slot:label>
          <div class="row items-center all-pointer-events">
            Achternaam
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

export default {
  // name: 'PageName',
  components: {
  },
  data () {
    return {
      // profile: this.getProfile(),
      name: this.getName(),
      surname: this.getSurname(),
      gender: this.getGender(),
      email: this.getEmail(),
      phonenumber: this.getPhonenumber(),
      cv: this.getCV(),

      file: null,
      readOnly: true,
      editLabel: 'Bewerk',


    }
  },
  mounted() {
  },
  methods: {
    getProfile() {
      fetch(api.user)
          .then(response => response.json())
          .then(data => (this.profile = data));
    },
    getName() {
      fetch(api.name)
          .then(response => response.json())
          .then(data => (this.name = data.data));
    },
    getSurname() {
      fetch(api.surname)
                .then(response => response.json())
                .then(data => (this.surname = data.data));
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
      fetch(api.phone)
          .then(response => response.json())
          .then(data => (this.phonenumber = data.data));
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
      fetch(api.phone, {
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'crossDomain':'true',
            'Content-Type': 'application/json',
            'Pragma': 'no-cache',
            'Access-Control-Allow-Origin': '*'
        },        
        body: JSON.stringify({phone: this.phonenumber}),
      }).then(x => console.log(x))
    },
    updateCV() {
      const fd = new FormData();
      fd.append('cv', this.file);
      fetch(api.CV, {
        method: 'POST',
        headers:{
        },        
        body: fd,
      }).then(response => response.json()
      ).then(success => console.log(success)
      ).catch(error => console.log(error))
    },
    editForm() {
      if(this.readOnly == true){
        this.readOnly = false;
        this.editLabel = 'Opslaan'
      } else {
        this.updateName();
        this.updateSurname();
        this.updateGender();
        this.updateEmail();
        this.updatePhonenumber();
        this.updateCV();
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
