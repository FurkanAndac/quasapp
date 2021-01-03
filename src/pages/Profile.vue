<template>
  <q-page padding>
    <!-- content -->
    <div >
      PROFILE
      <q-input class='q-pa-sm' filled v-model="email" input-class="text-right" label-slot clearable>
        <template v-slot:label>
          <div class="row items-center all-pointer-events">
            <q-icon class="q-mr-xs" color="teal" size="24px" name="mail" />
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
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
  data () {
    return {
      file: null,
    }
  }
}
</script>
