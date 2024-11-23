<template>
    <div class="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg my-3 ">
      <h2 class="text-2xl font-bold text-center mb-6">{{ isEditing ? "Editar Hotel" : "Crear Hotel" }}</h2>
      <form @submit.prevent="handleSubmit">
        <!-- Nombre -->
        <div class="mb-4">
          <label for="name" class="block text-gray-700 font-bold mb-2">Nombre</label>
          <input
            type="text"
            id="name"
            v-model="form.name"
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Nombre del hotel"
            required
          />
        </div>
  
        <!-- Dirección -->
        <div class="mb-4">
          <label for="address" class="block text-gray-700 font-bold mb-2">Dirección</label>
          <input
            type="text"
            id="address"
            v-model="form.address"
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Dirección del hotel"
            required
          />
        </div>
  
        <!-- Ciudad -->
        <div class="mb-4">
          <label for="city_id" class="block text-gray-700 font-bold mb-2">Ciudad</label>
          <select
            id="city_id"
            v-model="form.city_id"
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            required
          >
            <option value="" disabled>Seleccione una ciudad</option>
            <option v-for="city in cities" :key="city.id" :value="city.id">
              {{ city.name }}
            </option>
          </select>
        </div>
  
        <!-- NIT -->
        <div class="mb-4">
          <label for="nit" class="block text-gray-700 font-bold mb-2">NIT</label>
          <input
            type="text"
            id="nit"
            v-model="form.nit"
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="NIT del hotel"
            required
          />
        </div>
  
        <!-- Habitaciones máximas -->
        <div class="mb-6">
          <label for="max_rooms" class="block text-gray-700 font-bold mb-2">Habitaciones Máximas</label>
          <input
            type="number"
            id="max_rooms"
            v-model="form.max_rooms"
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Número máximo de habitaciones"
            min="1"
            required
          />
        </div>
  
        <!-- Botón de acción -->
        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700"
        >
          {{ isEditing ? "Actualizar Hotel" : "Crear Hotel" }}
        </button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  
  // Props
  const props = defineProps({
    hotel: {
      type: Object,
      default: () => ({
        name: '',
        address: '',
        city: { id: null, name: '' },
        nit: '',
        max_rooms: 1,
      }),
    },
    cities: {
      type: Array,
      required: true,
    },
  });
  
  // Emitir eventos
  const emit = defineEmits(['submit']);
  
  // Estado del formulario
  const form = ref({
    name: '',
    address: '',
    city_id: null,
    nit: '',
    max_rooms: 1,
  });
  
  // Determinar si es edición
  const isEditing = ref(false);
  
  // Inicializar el formulario al cargar o cambiar los datos
  watch(
    () => props.hotel,
    (newHotel) => {
      isEditing.value = Boolean(newHotel.id);
      form.value = {
        ...newHotel,
        city_id: newHotel.city?.id || null, // Convertir la ciudad al formato esperado
      };
    },
    { immediate: true, deep: true }
  );
  
  // Manejar el envío del formulario
  const handleSubmit = () => {
    const hotelData = {
      ...form.value,
      city: cities.find((c) => c.id === form.value.city_id) || null, // Restaurar la estructura completa
    };
    emit('submit', hotelData);
  };
  </script>
  