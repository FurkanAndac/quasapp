<template>
  <q-page padding>
    <!-- content -->
    <!--  PANEL -->

    
    <!-- EDIT PANEL -->
    <div class='myDIV'>
      PROFILE
      <q-input :readonly='readOnly' class='q-pa-sm' filled v-model="username" input-class="text-right" label-slot clearable>
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

      <q-input 
        class="q-pa-sm"
        @input="val => { file = val[0] }"
        filled
        type="file"
        hint="Curriculum Vitae"
        />
    </div>
    <q-btn @click="editForm" :label="editLabel" type="edit" color="teal"/>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
  components: {
  },
  data () {
    return {
      // profile: this.getProfile(),
      username: this.getUsername(),
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
      fetch("https://api-quasapp.herokuapp.com/api/users/5ff39b22986ad52a2476e81a")
                .then(response => response.json())
                .then(data => (this.profile = data));
    },
    getUsername() {
      fetch("https://api-quasapp.herokuapp.com/api/users/5ff39b22986ad52a2476e81a/username")
          .then(response => response.json())
          .then(data => (this.username = data.data));
          // console.log(this.username)
    },
    getSurname() {
      fetch("https://api-quasapp.herokuapp.com/api/users/5ff39b22986ad52a2476e81a/surname")
                .then(response => response.json())
                .then(data => (this.surname = data.data));
    },
    getGender() {
      fetch("https://api-quasapp.herokuapp.com/api/users/5ff39b22986ad52a2476e81a/gender")
          .then(response => response.json())
          .then(data => (this.gender = data.data));
    },    
    getEmail() {
      fetch("https://api-quasapp.herokuapp.com/api/users/5ff39b22986ad52a2476e81a/email")
                .then(response => response.json())
                .then(data => (this.email = data.data));
    },
    getPhonenumber() {
      fetch("https://api-quasapp.herokuapp.com/api/users/5ff39b22986ad52a2476e81a/phone")
          .then(response => response.json())
          .then(data => (this.phonenumber = data.data));
    },
    getCV() {
      fetch("https://api-quasapp.herokuapp.com/api/users/5ff39b22986ad52a2476e81a/cv")
          .then(response => response.json())
          .then(data => (this.cv = data.data));
    },
    updateUsername() {
      fetch("https://api-quasapp.herokuapp.com/api/users/5ff39b22986ad52a2476e81a/username", {
        method: 'PUT',
      })
      .then(response => response.json())
      .then(data => (this.surname = data.data));
      console.log(this.username)
          
    },
    updateSurname() {
      fetch("https://api-quasapp.herokuapp.com/api/users/5ff39b22986ad52a2476e81a/surname")
                .then(response => response.json())
                .then(data => (this.surname = data.data));
    },
    updateGender() {
      fetch("https://api-quasapp.herokuapp.com/api/users/5ff39b22986ad52a2476e81a/gender")
          .then(response => response.json())
          .then(data => (this.gender = data.data));
    },    
    updateEmail() {
      fetch("https://api-quasapp.herokuapp.com/api/users/5ff39b22986ad52a2476e81a/email")
                .then(response => response.json())
                .then(data => (this.email = data.data));
    },
    updatePhonenumber() {
      fetch("https://api-quasapp.herokuapp.com/api/users/5ff39b22986ad52a2476e81a/phone")
          .then(response => response.json())
          .then(data => (this.phonenumber = data.data));
    },
    updateCV() {
      fetch("https://api-quasapp.herokuapp.com/api/users/5ff39b22986ad52a2476e81a/cv")
          .then(response => response.json())
          .then(data => (this.cv = data.data));
    },
    editForm() {
      if(this.readOnly == true){
        this.readOnly = false;
        this.editLabel = 'Opslaan'
        this.updateUsername();
        console.log(this.username)

      } else {
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
