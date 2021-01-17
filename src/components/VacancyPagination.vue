<template>
  <div class="flex flex-center">
    <q-pagination
      v-model="cur"
      color="teal "
      :max="computeMaxpage()"
      :max-pages="6"
      :boundary-numbers="false"
      @click="clickPage(cur)">
    </q-pagination>
  </div>
</template>

<script>
export default {
  name: 'VacancyPagination',
  props: ['vacancyList', 'current', 'total', 'perPage'],
  data () {
    return {
      vacancies: this.vacancyList,
      cur: this.current,
      tot: this.total,
      pPage: this.perPage
    }
  },
  mounted () {
    this.checkList()
  },
  computed: {

  },
  methods: {
    computeMaxpage: function () {
      if(this.vacancies == null || undefined) {
        this.tot
        console.log(this.tot)
        return this.tot
      } else {
        this.tot = Math.ceil(this.vacancies.length / this.pPage)
        console.log(this.vacancies)
        return this.tot
      }
    },
    clickPage(currentPage) {
      // console.log(currentPage)
      this.$emit('click-page', currentPage)
    },
    checkList() {
      // console.log(this.cur)
    }
  }
}
</script>
