<template>
  <ul v-if="sortedData.length > 0">
    <li v-for="(item, index) in sortedData" :key="item.id">
      <span>Issue No. // {{ item.id }}</span>

      <div class="progress-bar-container">
        <div class="progress-bar" :style="{ width: `${item.progress * 25}%` }"></div>
      </div>

      <p>
        Name:
        <span v-if="!isEditing[index]">{{ item.name }}</span>
        <input type="text" v-model="item.name" v-else :disabled="!isEditing[index]" />
      </p>
      <p>
        Station:
        <span v-if="!isEditing[index]">{{ item.station }}</span>
        <input type="text" v-model="item.station" v-else :disabled="!isEditing[index]" />
      </p>
      <p>
        Description:
        <span v-if="!isEditing[index]">{{ item.description }}</span>
        <textarea type="text" v-model="item.description" v-else :disabled="!isEditing[index]">
        </textarea>
      </p>
      <p>
        Solution:
        <span v-if="!isEditing[index]">{{ item.solution }}</span>
        <textarea type="text" v-model="item.solution" v-else :disabled="!isEditing[index]">
        </textarea>
      </p>

      <p>
        Importance:
        <span
          :class="['importance-level', `importance-${item.importance}`]"
          v-if="!isEditing[index]"
        >
          {{ item.importance }}
        </span>
        <select v-model="item.importance" v-else :disabled="!isEditing[index]">
          <option value="low">Low</option>
          <option value="middle">Middle</option>
          <option value="high">High</option>
        </select>
      </p>
      <p>
        Progress:
        <span :class="['progress-level', `progress-${item.progress}`]" v-if="!isEditing[index]">
          {{
            item.progress == 0
              ? 'Not started'
              : item.progress == 1
              ? '25%'
              : item.progress == 2
              ? '50%'
              : item.progress == 3
              ? '75%'
              : item.progress == 4
              ? 'Finished'
              : 'Unknown'
          }}
        </span>
        <select v-model="item.progress" v-else :disabled="!isEditing[index]">
          <option value="0">Not started</option>
          <option value="1">25%</option>
          <option value="2">50%</option>
          <option value="3">75%</option>
          <option value="4">Finished</option>
        </select>
      </p>

      <button @click="isEditing[index] = true" v-if="!isEditing[index]">Edit</button>
      <button @click="saveChanges(item.id)" v-if="isEditing[index]">Save</button>
      <button @click="deleteData(item.id)">Delete</button>
    </li>
  </ul>
  <p v-else>No data submitted yet.</p>
</template>

<script setup>
import { ref, computed } from 'vue'
import { defineProps, defineEmits } from 'vue'

// Data from parent component
// *******************************************************
const props = defineProps({
  data: {
    type: Array,
    required: true
  }
})

// *******************************************************
const emit = defineEmits(['save-changes', 'delete-data'])
const isEditing = ref(new Array(props.data.length).fill(false))

// Computed property to sort data in descending order
// *******************************************************
const sortedData = computed(() => {
  return [...props.data].sort((a, b) => {
    return b.id - a.id
  })
})
// *******************************************************

// Save changes to updatedData
// *******************************************************
function saveChanges(id) {
  const updatedData = sortedData.value.find((item) => item.id === id)
  emit('save-changes', updatedData)
  const index = sortedData.value.findIndex((item) => item.id === id)
  if (index !== -1) {
    isEditing.value[index] = false
  }
}

//  Delete data from supabase
// *******************************************************
function deleteData(id) {
  if (confirm('Do you want to delete the data?')) {
    emit('delete-data', id)
  }
}



</script>

<style lang="scss" scoped>
ul {
  list-style-type: none;
  background: rgb(132, 132, 136);
  width: 35rem;
  border: solid 2px white;
  border-radius: 0.75rem;
  margin: 1rem;
  padding: 0.7rem;
  // .importance-low {
  //     background: rgb(2, 86, 2);
  // };
  li {
    background: rgb(62, 62, 102);
    margin: 0.6rem;
    padding: 0.65rem;
    border-radius: 0.75rem;
    color: rgb(224, 224, 224);

    .importance-low {
      background-color: yellow;
      color: black;
    }

    .importance-middle {
      background-color: orange;
      color: black;
    }
    .importance-high {
      background-color: rgb(255, 0, 0);
      color: black;
    }
  }
}

.importance-level {
  width: 3.3rem;
  padding: 0 0.6rem;
  border-radius: 0.2rem;
  display: inline-block;
  text-align: center;
  font-weight: bold;
  font-size: 10px;
}
// Progress bar styles
// *******************************************************

.progress-bar-container {
  width: 100%;
  height: 10px;
  background-color: #f0f0f0;
  border-radius: 4px;
  margin-bottom: 10px;
}

.progress-bar {
  height: 100%;
  background-color: #4caf50;
  border-radius: 4px;
}






// .progress-container {
//   width: 100%;
//   background-color: #f0f0f0;
//   border-radius: 4px;
//   margin-bottom: 10px;
// }

// .progress-bar {
//   height: 10px;
//   background-color: #4caf50;
//   border-radius: 4px;
//   transition: width 0.3s ease-in-out;
// }

// .stage-labels {
//   display: flex;
//   justify-content: space-between;
//   font-size: 12px;
//   margin-top: 5px;

//   span {
//     &.active {
//       font-weight: bold;
//     }
//   }
// }

// .stage-controls {
//   display: flex;
//   gap: 5px;
//   margin-top: 10px;

//   button {
//     flex: 1;
//     padding: 5px;
//     border: none;
//     border-radius: 4px;
//     background-color: #eee;
//     cursor: pointer;

//     &:disabled {
//       opacity: 0.5;
//       cursor: not-allowed;
//     }
//   }
// }
</style>
