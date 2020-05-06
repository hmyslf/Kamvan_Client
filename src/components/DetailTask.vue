<template>
  <!-- MODAL Detail -->
  <div class="modal" tabindex="-1" role="dialog" id="detailModal">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Detail Task for: {{ task.title }}</h5>
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
          <form @submit.prevent="updateTask">
            <div class="form-group">
              <label for="title">Title</label>
              <p>{{ task.title }}</p>
            </div>
            <div class="form-group">
              <label for="description">Description</label>
              <p>{{ task.description }}</p>
            </div>
            <div class="form-group">
              <label for="points">Points</label>
              <p>{{ task.points }}</p>
            </div>
            <div class="form-group">
              <label for="assigned_to">Assigned To</label>
              <p>{{ task.assigned_to }}</p>
            </div>
            <div class="modal-footer d-flex justify-content-between">
              <button type="submit" class="btn btn-primary">Save</button>
              <button type="submit" class="btn btn-danger">Delete</button>
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
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
  name: 'DetailTask',
  data() {
    return {};
  },
  props: ['task'],
  methods: {}
};
</script>

<style></style>
