<template>
  <!-- MODAL Edit -->
  <div class="modal" tabindex="-1" role="dialog" id="deleteModal">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Delete Task: {{ task.title }}</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="text-danger" id="errorMessage" v-if="errorMessage">
            <span>{{ errorMessage }}</span>
          </div>
          <form @submit.prevent="deleteTask">
            <p id="deleteconfirmation">Delete Task {{ task.title }} ?</p>
            <div class="modal-footer">
              <button type="submit" class="btn btn-danger">Delete</button>
              <button
                type="button"
                class="btn btn-primary"
                data-dismiss="modal"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeleteTask',
  props: ['task', 'errorMessage'],
  data() {
    return {};
  },
  methods: {
    deleteTask() {
      this.$emit('deleteTask', this.task.id);
    }
  }
};
</script>

<style></style>
