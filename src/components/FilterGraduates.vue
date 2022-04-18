<template>
  <div>
    <q-btn style="width:100%" outline dense label="Filter" @click="filterClicked = true" ></q-btn>
    <q-dialog
      v-close-popup
      v-model="filterClicked"
      >
      <q-card
        style="width:100%"
        
      >
        <q-card-section class="row items-center q-pb-none">
          <div style="color:teal" class="text-h6">Filter</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section> 
        <div style="margin:5%">     
        <q-select
          filled
          v-model="modelStudies"
          use-input
          input-debounce="0"
          label="Opleidingen"
          :options="options"
          @filter="filterFn"
          style="width: 100%; text-align: center"
          behavior="menu"
          position="center middle"
        >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              No results
            </q-item-section>
          </q-item>
        </template>
      </q-select>
      </div>
      <q-btn style="width: 90%; margin-left:5%; margin-right:5%; margin-bottom:5%; text-align:center; color:teal" @click="onFilter">Filter</q-btn>
      </q-card>
    
      
    </q-dialog>

  </div>
</template>

<script>
import { ref } from '@vue/composition-api'

const stringOptions = [
  'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
]
export default {
  props: ['model', 'options'],

  setup () {
    // name: 'ComponentName',
    const options = ref(stringOptions)
    return {
      filterClicked: false,
      modelStudies: ref(null),
      stringOptions,
      options,
    
  
      filterFn (val, update) {
        if (val === '') {
          update(() => {
            options.value = this.options
            console.log("testtest")          
            // this.$emit('filtered-graduate', val)

          })
          return
          
        }
        update(() => {
          const needle = val.toLowerCase()
          options.value = stringOptions.filter(v => v.toLowerCase().indexOf(needle) > -1)
        })

      },
      // filterGraduates(optionsVal) {
      //     console.log("testtesttest")
      //     this.$emit('filtered-graduate', optionsVal)
      // }
    }
    
  },
  methods: {
    onFilter (event) {
      this.$emit('filtered-graduate', this.modelStudies)
    }
  }
}
</script>
