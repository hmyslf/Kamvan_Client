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
    <!-- <DetailTask :task="task"></DetailTask> -->
  </div>
</template>

<script>
// import DetailTask from './DetailTask.vue';

export default {
  // components: {
  //   DetailTask
  // },
  name: 'TaskCard',
  props: ['task', 'card'],
  methods: {
    detailTask() {
      this.$emit('detailTask', this.task);
    }
  }
};
</script>

<style></style>
