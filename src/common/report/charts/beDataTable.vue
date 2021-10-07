<template>
<div class="col-10 offset-1 mt-4" style="font-size:11px">
  <table class="table table-sm text-left">
    <thead>
      <tr>
        <th scope="col">FF Goal</th>
        <th scope="col">Business Area</th>
        <th scope="col">Title</th>
        <th scope="col">Applicable</th>
        <th scope="col">Data awareness</th>
        <th scope="col">Progress Indicator</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="be in items">
        <td>{{be.code}}</td>
        <td>{{be.category}}</td>
        <td>{{be.long_name}}</td>
        <td>
          {{be.applicable_text}}
        </td>
        <td>
          <span v-if="be.applicable_text === 'yes'">
            {{be.awareness_score}}
          </span>
          <span v-else>
            n/a
          </span>
        </td>
        <td>
          <span v-if="be.applicable_text === 'yes'">
            {{be.progress_score}}{{be.progress_unit}}
          </span>
          <span v-else>
            n/a
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
export default {
  name: 'beDataTable',
  props: {
    items: {},
  },
}
</script>
