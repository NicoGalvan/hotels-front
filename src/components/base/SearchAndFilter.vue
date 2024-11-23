<template>
    <div class="mb-6 flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0">
      <!-- Buscador -->
      <input
        v-model="searchQuery"
        @input="debouncedSearch"
        type="text"
        class="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        placeholder="Buscar hoteles por nombre..."
      />
  
      <select
        v-model="selectedCity"
        @change="onCityChange"
        class="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
      >
        <option value="">Todas las ciudades</option>
        <option v-for="city in cities" :key="city.id" :value="city.id">
          {{ city.name }}
        </option>
      </select>
  
      <button
        @click="openModal('create')"
        class="bg-blue-600 text-white py-2 px-4 rounded-lg"
      >
        Crear Hotel
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from "vue";
  import { debounce } from "lodash";
  
  const props = defineProps({
    modelValue: {
      type: String,
      default: "",
    },
    cities: {
      type: Array,
      required: true,
    },
    fetchHotels: {
      type: Function,
      required: true,
    },
    openModal: {
      type: Function,
      required: true,
    },
  });
  
  // Emitir cambios de valores a través de eventos
  const emit = defineEmits(["update:modelValue", "changeSelectedCity"]);
  
  // Datos locales para manejar el estado de los filtros
  const searchQuery = ref(props.modelValue);
  const selectedCity = ref("");
  
  // Debounce para optimizar el input del buscador
  const debouncedSearch = debounce(() => {
    emit("update:modelValue", searchQuery.value);
    props.fetchHotels();
  }, 300);
  
  // Emitir cuando cambia la ciudad
  const onCityChange = () => {
    emit("changeSelectedCity", selectedCity.value);
  };
  
  // watch(searchQuery, (newVal) => {
  //   emit("update:modelValue", newVal);
  // });
  
  // watch(selectedCity, (newVal) => {
  //   emit("update:selectedCity", newVal);
  // });
  </script>
  