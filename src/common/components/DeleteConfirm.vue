

<template>
<transition>
  <div class="modal-mask">
    <div class="modal-container card">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">{{title}}</h5>
      </div>
      <div class="modal-body">
        <!-- Are you sure you want to delete this? -->
        <div class="mt-3">
          {{text}}
        </div>
      </div>
      <div class="modal-footer">

        <button @click="$emit('close')" type="button" class="float-left btn btn-outline-secondary">Close</button>
        <button @click="$emit('delete')" type="button" class="float-right btn btn-danger">Delete</button>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
export default {
  name: 'DeleteConfirm',
  props: ['text', 'title'],
  data: function() {
    return {}
  },
  components: {},
  methods: {
    del: function(item) {

    },
    close: function(item) {
      this.active = item.id
    },

  },
}
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.18);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 400px;
  margin: 0px auto;
  margin-top: 4em;
  transition: all 0.3s ease;
}
</style>
