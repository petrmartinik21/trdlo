<template>
    <ul v-if="sortedData.length > 0">
   <!-- <li v-for="item in sortedData" :key="item.id"> -->
    <li v-for="(item, index) in sortedData" :key="index" >
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
        <button @click="saveChanges(index)" v-if="isEditing[index]">Save</button>
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


// Computed property to sort data in descending order
// *******************************************************
const sortedData = computed(() => {
  return [...props.data].sort((a, b) => {
    return b.id - a.id; 
  });
});
// *******************************************************

// Editing 
function saveChanges(index) {
  emit('save-changes', { ...props.data[index], index }); // Include the index for parent to update
  isEditing.value[index] = false;
}



</script>

<style lang="scss" scoped>

</style>