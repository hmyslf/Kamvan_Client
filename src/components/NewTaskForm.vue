<template>
  <!-- MODAL NEW TASK -->
  <div class="modal" tabindex="-1" role="dialog" id="newTaskModal">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">New Task</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="addNewTask">
            <div class="form-group">
              <label for="title">Title</label>
              <input
                type="text"
                class="form-control"
                id="title"
                aria-describedby="emailHelp"
                placeholder="Title"
                v-model="title"
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
                v-model="description"
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
                v-model="points"
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
                v-model="assigned_to"
              />
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-primary">Add Task</button>
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewTaskForm",
  data() {
    return {
      title: "",
      description: "",
      points: "",
      assigned_to: ""
    };
  },
  methods: {
    addNewTask() {
      let taskData = {
        title: this.title,
        description: this.description,
        points: this.points,
        assigned_to: this.assigned_to
      };
      this.$emit("addnewTask", taskData);
    }
  }
};
</script>

<style></style>
