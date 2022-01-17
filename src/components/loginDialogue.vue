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
          Click/Tap on the backdrop.
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog></div>
</template>

<script>
export default {
  // name: 'ComponentName',
  data () {
    return {
      login: false,
    }
  }
}
</script>