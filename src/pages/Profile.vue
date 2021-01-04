<template>
  <q-page padding>
    <!-- content -->
    <!--  PANEL -->

    
    <!-- EDIT PANEL -->
    <div class='myDIV'>
      PROFILE
      <q-input :readonly='readOnly' class='q-pa-sm' filled v-model="email" input-class="text-right" label-slot clearable>
        <template v-slot:label>
          <div class="row items-center all-pointer-events">
            Email adres
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
    <q-btn @click="getProfile" label="Submit" type="submit" color="teal"/>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
  components: {
  },
  data () {
    return {
      file: null,
      profile: this.getProfile(),
      readOnly: true,
      editLabel: 'Bewerk',
      email: this.getEmail(),

    }
  },
  mounted() {
    this.editForm()
  },
  methods: {
    getProfile() {
      fetch("http://localhost:8080/api/users/5ff239dab218b73fb40bac84")
                .then(response => response.json())
                .then(data => (this.profile = data));
    },
    getEmail() {
      fetch("http://localhost:8080/api/users/5ff239dab218b73fb40bac84")
          .then(response => response.json())
          .then(data => (this.email = data.data.email));
    },
    editForm() {
      if(this.readOnly == true){
        this.email = this.profile.data.email
        this.readOnly = false;
        this.editLabel = 'Opslaan'
      } else {
        this.readOnly = true
        this.editLabel = 'Bewerk'
        console.log(this.profile)
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
