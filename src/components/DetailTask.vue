<template>
  <!-- MODAL Detail -->
  <div class="modal" tabindex="-1" role="dialog" id="detailModal">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Detail Task for: {{ task.title }}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="text-danger" id="errorMessage" v-if="errorMessage">
            <span>{{ errorMessage }}</span>
          </div>
          <form>
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
              <div v-if="task.UserId == userId" class="d-flex justify-content-between w-100">
                <div v-for="category in categories" :key="category.id">
                  <button
                    class="btn btn-primary"
                    @click.prevent="updateTask(category.id)"
                    v-if="category.id == task.CategoryId - 1 || category.id == task.CategoryId + 1"
                  >{{ category.name }}</button>
                </div>
                <button class="btn btn-warning" @click.prevent="showEdit(task)">Edit</button>
                <button class="btn btn-danger" @click.prevent="confirmDelete()">Delete</button>
              </div>
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
  name: "DetailTask",
  data() {
    return {};
  },
  props: ["task", "categories", "errorMessage", "userId"],
  methods: {
    confirmDelete() {
      let task = {
        id: this.localTask.id,
        title: this.localTask.title
      };
      this.$emit("confirmDelete", task);
    },
    updateTask(categoryId) {
      console.log(categoryId);
      let task = {
        id: this.localTask.id,
        title: this.localTask.title,
        description: this.localTask.description,
        points: this.localTask.points,
        assigned_to: this.localTask.assigned_to,
        categoryId
      };
      this.$emit("updateTask", task);
    },
    showEdit(task) {
      this.$emit("showEdit", task);
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
