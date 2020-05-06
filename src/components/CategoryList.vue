<template>
  <div class="col-lg-3">
    <div class="card">
      <div class="card-header" v-bind:class="card.color">
        <p class="text-white font-weight-bold mb-0 pb-0">{{ card.title }}</p>
      </div>
      <div class="card-body">
        <div v-for="task in tasks" :key="task.id">
          <TaskCard
            v-if="task.category == card.slug"
            :task="task"
            @detailTask="detailTask"
          ></TaskCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TaskCard from './TaskCard.vue';
export default {
  name: 'CategoryList',
  components: {
    TaskCard
  },
  props: ['card', 'tasks'],
  methods: {
    detailTask(value) {
      this.$emit('detailTask', value);
    }
  }
};
</script>

<style></style>
