<template>
<div class="col-10 offset-1" style="font-size:11px">
  <table class="table table-sm text-left">
    <thead>
      <tr>
        <th scope="col">Activity</th>
        <th scope="col">Impact</th>
        <th scope="col">Applicable</th>
        <th scope="col">FF Positive Pursuit</th>
        <th scope="col">SDGs</th>
        <th scope="col">Stakeholder</th>
        <th scope="col">Measurement Type</th>
        <th scope="col">Intensity</th>
        <th scope="col">Scale</th>
        <th scope="col">Depth</th>
        <th scope="col">Depth Unit</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items">
        <td>{{item.name}}</td>
        <td>{{item.impact}}</td>
        <td>{{item.applicable}}</td>
        <td>{{item.pp_action}}</td>
        <td>{{item.sdgs}}</td>
        <td>{{item.stakeholder}}</td>
        <td>{{item.measurement_type}}</td>
        <td>{{item.intensity}}</td>
        <td>{{item.scale}} </td>
        <td>{{item.depth_value}} </td>
        <td>{{item.depth_unit}} </td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
export default {
  name: 'ppDataTable',
  props: {
    items: {},
  },
}
</script>
