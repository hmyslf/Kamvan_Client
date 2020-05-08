<template>
  <div class="card mb-3">
    <div class="card-header">
      <p class="font-weight-bold mb-0 pb-0">{{ task.title }}</p>
    </div>
    <div class="card-body">
      <p class="card-text">Point : {{ task.points }}</p>
      <p class="card-text">Assigned To: {{ task.assigned_to }}</p>
      <a class="btn btn-primary text-white" @click="detailTask">Show Detail</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskCard',
  props: ['task'],
  methods: {
    detailTask() {
      console.log(this.task);
      this.$emit('detailTask', this.task);
    }
  }
};
</script>

<style></style>
