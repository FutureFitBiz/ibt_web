<template>
<div class="d-block">
  <span v-for="crumb in crumbs">
    <span v-if="crumb.path" @click="goto(crumb.path)">
      <span class="crumb">{{crumb.title}}</span>
      <span style="color:grey"> / </span>
    </span>
    <span style="color:grey" v-if="!crumb.path" aria-current="page">{{crumb.title}}</span>
  </span>
</div>
</div>
</div>
</template>
<script>
export default {
  name: 'Home',
  props: ['crumbs', 'colour'],
  data: function() {
    return {}
  },

  components: {},
  computed: {

  },
  methods: {
    goto: function(path) {
      let fullPath = ''
      for (let crumb of this.crumbs) {
        fullPath += '/' + crumb.path
        if (crumb.path === path) {
          break
        }
      }
      console.log(fullPath)

      this.$router.push({ path: fullPath }).catch(err => {})
    }

  }
}
</script>
