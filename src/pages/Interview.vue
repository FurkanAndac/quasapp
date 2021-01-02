<template>
  <div>
    TEST INTERVIEW PAGE!

    <div class="q-pa-md">
      <q-form @submit="onSubmit" class="q-gutter-md">
        <q-btn-toggle
          name="dayType"
          v-model="dayType"
          push
          glossy
          toggle-color="teal"
          :options="[
            {label: this.getFirstWeekday(1), value: this.getFirstWeekday(1)},
            {label: this.getFirstWeekday(2), value: this.getFirstWeekday(2)}
          ]"
        />
        <q-btn-toggle
          name="genre"
          v-model="genre"
          push
          glossy
          toggle-color="teal"
          :options="[
            {label: '10:00', value: 'timeslot1'},
            {label: '12:00', value: 'timeslot2'},
            {label: '14:30', value: 'timeslot3'},
            {label: '16:30', value: 'timeslot4'}
          ]"
        />

        <div>
          <q-btn label="Submit" type="submit" color="teal"/>
        </div>
      </q-form>
    </div>
  </div>
</template>

<script lang="js">
const date = new Date();

export default {
  components: {
  },
  data () {
    return {
      date: date.getDay(),
      genre: null,
      dayType: null,
      weekday: [
        "Zondag",
        "Maandag",
        "Dinsdag",
        "Woensdag",
        "Donderdag",
        "Vrijdag",
        "Zaterdag"
      ]

    }
  },
  mounted() {
    console.log(this.date)
    // this.getFirstWeekday()
  },
  methods: {
    getFirstWeekday(day) {
      if(day == 1) {
        if(this.date == 5 | 6 | 0) {
          return this.weekday[1];
        } else {
          return this.weekday[this.date]
        }
      }
      if(day == 2) {
        if(this.date == 5 | 6 | 0) {
          return this.weekday[2];
        } else {
          return this.weekday[this.date + 1]
        }
      }
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
