<template>
    <ul v-if="data.length > 0">
    <li v-for="(item, index) in data" :key="index">
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
import { ref } from 'vue'   
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
    data: {
        type: Array,
        required: true
    
    }
});

const emit = defineEmits(["save-changes"]);
const isEditing = ref(new Array(props.data.length).fill(false));

console.log(isEditing);



function saveChanges(index) {
  emit('save-changes', { ...props.data[index], index }); // Include the index for parent to update
  isEditing.value[index] = false;
}

// function cancelChanges(index) {
//   // Revert changes (e.g., reload data from the original source)
//   isEditing.value[index] = false;
// }



</script>

<style lang="scss" scoped>

</style>