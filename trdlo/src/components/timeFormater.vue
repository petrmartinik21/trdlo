<template>
    <span>{{ formattedDate }}</span>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  
  const props = defineProps({
    timestamp: {
      type: String,
      required: true
    }
  })
  
  const formattedDate = computed(() => {
    if (!props.timestamp) return 'N/A'
    
    const date = new Date(props.timestamp)
    return date.toLocaleString('cz-CZ', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    })
  })
  </script>