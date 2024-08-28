<template>
    <ul v-if="sortedData.length > 0">
   <!-- <li v-for="(item, index) in sortedData" :key="item.id"> -->
    <li v-for="(item, index) in sortedData" :key="item.id" >
        <span>{{  item.id }}</span> 
        <p>Name: 
            <span v-if="!isEditing[index]">{{ item.name }}</span>
            <input type="text" 
            v-model="item.name" 
            v-else
            :disabled="!isEditing[index]"
            />
        </p>
        <p>Station: 
            <span v-if="!isEditing[index]">{{ item.station }}</span>
            <input type="text" 
            v-model="item.station" 
            v-else
            :disabled="!isEditing[index]"
            />
        </p>
        <p>Description: 
            <span v-if="!isEditing[index]">{{ item.description }}</span>
            <textarea type="text" 
            v-model="item.description" 
            v-else
            :disabled="!isEditing[index]"
            >
            </textarea>
        </p>
        <p>Solution:  
            <span v-if="!isEditing[index]">{{ item.solution }}</span>
            <textarea type="text" 
            v-model="item.solution" 
            v-else
            :disabled="!isEditing[index]"
            >
            </textarea>
        </p>

        <button @click="isEditing[index] = true" v-if="!isEditing[index]">Edit</button>
        <button @click="saveChanges(item.id)" v-if="isEditing[index]">Save</button>
        <!-- <button @click="cancelChanges(index)" v-else >Cancel</button> -->
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
});
// *******************************************************
const emit = defineEmits(["save-changes"]);
const isEditing = ref(new Array(props.data.length).fill(false));
// const isEditing = computed({
//   get() {
//     return new Array(props.data.length).fill(false);
//   },
// });

// watch(
//   () => props.data,
//   () => {
//     // Update isEditing when props.data changes
//     isEditing.value = new Array(props.data.length).fill(false);
//   }
// );



// Computed property to sort data in descending order
// *******************************************************
const sortedData = computed(() => {
  return [...props.data].sort((a, b) => {
    return b.id - a.id; 
  });
});
// *******************************************************



function saveChanges (id) {
  
  const updatedData = sortedData.value.find(item => item.id === id);
     emit('save-changes', updatedData);
     const index = sortedData.value.findIndex(item => item.id === id);
      if (index !== -1) {
          isEditing.value[index] = false; 
      }

// const itemIndex = sortedData.findIndex(item => item.id === itemId);
//   if (itemIndex !== -1) {
//     emit('save-changes', { ...sortedData[itemIndex], index: itemIndex });
//     // No need to manually manage isEditing here,
//     // as it's handled by the computed property and watch.
//   }
    console.log( index, id, updatedData.name)
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
    padding: .7rem;
    
    li {
        background:rgb(62, 62, 102);
        margin: 0.6rem;
        padding: .65rem;
        border-radius: 0.75rem;
        color: rgb(224, 224, 224);          
    }

}

</style>