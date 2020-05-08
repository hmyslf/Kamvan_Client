<template>
  <div class="col-lg-3">
    <div class="card">
      <div class="card-header" v-bind:class="backgrounds[index]">
        <p class="text-white font-weight-bold mb-0 pb-0">{{ category.name }}</p>
      </div>
      <div class="card-body">
        <!-- <div v-for="task in tasks" :key="task.id"> -->
        <draggable v-model="category.Tasks" group="task" @change="seeChange($event, category.id)">
          <TaskCard
            v-for="task in category.Tasks"
            :task="task"
            @detailTask="detailTask"
            :key="task.id"
          ></TaskCard>
        </draggable>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import TaskCard from './TaskCard.vue';
import draggable from 'vuedraggable';

export default {
  name: 'CategoryList',
  components: {
    TaskCard,
    draggable
  },
  props: ['index', 'category', 'tasks', 'backgrounds'],
  data() {
    return {
      changeCategory: ''
    };
  },
  methods: {
    detailTask(value) {
      this.$emit('detailTask', value);
    },
    seeChange(event, col) {
      if(event.added) {
        let task = {
          id: event.added.element.id,
          categoryId: col
        }
        this.$emit('updateTask', task);
      }
    }
  }
};
</script>

<style></style>
