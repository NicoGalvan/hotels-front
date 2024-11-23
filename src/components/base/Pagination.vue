<template>
    <div class="flex justify-center items-center space-x-2 mt-6">
      <button
        @click="changePage(pagination.current_page - 1)"
        :disabled="!pagination.prev_page_url"
        class="bg-gray-300 hover:bg-gray-400 text-gray-700 px-3 py-1 rounded-md disabled:opacity-50"
      >
        Anterior
      </button>
      <span class="text-sm text-gray-700">
        Página {{ pagination.current_page }} de {{ pagination.last_page }}
      </span>
      <button
        @click="changePage(pagination.current_page + 1)"
        :disabled="!pagination.next_page_url"
        class="bg-gray-300 hover:bg-gray-400 text-gray-700 px-3 py-1 rounded-md disabled:opacity-50"
      >
        Siguiente
      </button>
    </div>
  </template>
  
  <script setup>
  defineProps({
    pagination: {
      type: Object,
      required: true,
    },
  });
  
  const emit = defineEmits(["page-changed"]);
  
  const changePage = (page) => {
    emit("page-changed", page);
  };
  </script>
  