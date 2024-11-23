<template>
  <div class="flex justify-center items-center space-x-2 mt-6">
    <!-- Botón Anterior -->
    <button
      @click="changePage(pagination.current_page - 1)"
      :disabled="!hasPreviousPage"
      class="bg-gray-300 hover:bg-gray-400 text-gray-700 px-3 py-1 rounded-md disabled:opacity-50"
    >
      Anterior
    </button>
    
    <!-- Páginas numeradas -->
    <button
      v-for="link in numberedLinks"
      :key="link.label"
      :class="[
        'px-3 py-1 rounded-md',
        link.active ? 'bg-blue-500 text-white' : 'bg-gray-300 hover:bg-gray-400 text-gray-700'
      ]"
      @click="changePage(link.url ? getPageFromUrl(link.url) : pagination.current_page)"
      :disabled="!link.url || link.active"
    >
      {{ link.label }}
    </button>
    
    <!-- Botón Siguiente -->
    <button
      @click="changePage(pagination.current_page + 1)"
      :disabled="!hasNextPage"
      class="bg-gray-300 hover:bg-gray-400 text-gray-700 px-3 py-1 rounded-md disabled:opacity-50"
    >
      Siguiente
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  pagination: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["page-changed"]);

// Verificar si hay una página anterior o siguiente
const hasPreviousPage = computed(() => {
  return props.pagination.links.some(link => link.label === "&laquo; Previous" && link.url);
});
const hasNextPage = computed(() => {
  return props.pagination.links.some(link => link.label === "Next &raquo;" && link.url);
});

// Filtrar solo los enlaces numerados
const numberedLinks = computed(() => {
  return props.pagination.links.filter(link => !isNaN(Number(link.label)));
});

// Extraer número de página de la URL
const getPageFromUrl = (url) => {
  const params = new URL(url).searchParams;
  return Number(params.get("page"));
};

// Emitir evento al cambiar de página
const changePage = (page) => {
  emit("page-changed", page);
};
</script>
