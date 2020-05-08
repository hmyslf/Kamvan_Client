<template>
  <!-- MODAL Edit -->
  <div class="modal" tabindex="-1" role="dialog" id="editModal">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Edit Task: {{ task.title }}</h5>
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
          <form @submit.prevent="updateTask">
            <div class="form-group">
              <label for="title">Title</label>
              <input
                type="text"
                class="form-control"
                id="title"
                aria-describedby="emailHelp"
                placeholder="First Name"
                v-model="localTask.title"
              />
            </div>
            <div class="form-group">
              <label for="description">Description</label>
              <input
                type="textarea"
                class="form-control"
                id="description"
                aria-describedby="emailHelp"
                placeholder="Description"
                v-model="localTask.description"
              />
            </div>
            <div class="form-group">
              <label for="points">Points</label>
              <input
                type="number"
                class="form-control"
                id="points"
                aria-describedby="emailHelp"
                placeholder="Points"
                v-model="localTask.points"
              />
            </div>
            <div class="form-group">
              <label for="assigned_to">Assigned To</label>
              <input
                type="text"
                class="form-control"
                id="assigned_to"
                aria-describedby="emailHelp"
                placeholder="Assigned To"
                v-model="localTask.assigned_to"
              />
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-primary">Save</button>
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
  name: 'EditTask',
  props: ['task', 'errorMessage'],
  data() {
    return {};
  },
  methods: {
    updateTask() {
      let taskData = {
        id: this.localTask.id,
        title: this.localTask.title,
        description: this.localTask.description,
        points: this.localTask.points,
        assigned_to: this.localTask.assigned_to,
        CategoryId: this.localTask.CategoryId
      };
      this.$emit('updateTask', taskData);
    }
  },
  computed: {
    localTask() {
      return { ...this.task };
    }
  }
};
</script>

<style></style>
