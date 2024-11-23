<template>
    <div class="flex space-x-2">
      <!-- Botón de editar -->
      <button
        @click="handleEdit"
        class="flex items-center text-blue-600 hover:text-blue-800"
        aria-label="Editar habitación"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-5 h-5 mr-1"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.862 3.487a2.25 2.25 0 1 1 3.182 3.182L7.443 19.27a8.454 8.454 0 0 1-3.182 2.018l-2.007.669.669-2.006a8.454 8.454 0 0 1 2.018-3.182L16.862 3.487z"
          />
        </svg>
        Editar
      </button>
      <!-- Botón de eliminar -->
      <button
        @click="handleDelete"
        class="flex items-center text-red-600 hover:text-red-800"
        aria-label="Eliminar habitación"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-5 h-5 mr-1"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18.75V6.75M18 6.75v12M4.5 6.75h15M10.5 10.5v5.25m3-5.25v5.25m-6-11.25h9m-9 0h-1.125a.375.375 0 0 0-.375.375v.75M19.5 6.75h1.125a.375.375 0 0 1 .375.375v.75M16.125 6H7.875c-.345 0-.675.06-.975.17a1.5 1.5 0 0 0-.9 1.06V18a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 18V7.23a1.5 1.5 0 0 0-.9-1.06 2.156 2.156 0 0 0-.975-.17z"
          />
        </svg>
        Eliminar
      </button>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    room: Object,
  });
  
  const emit = defineEmits(['edit', 'delete']);
  
  const handleEdit = () => {
    emit('edit', props.room);
  };
  
  const handleDelete = () => {
    emit('delete', props.room.id);
  };
  </script>
  
  <style scoped>
  /* Opcional: Puedes ajustar el diseño de los botones aquí */
  </style>
  