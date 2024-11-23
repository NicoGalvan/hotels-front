<template>
    <Card class="border border-gray-300">
      <template #header>
        <div class="bg-gray-200 text-gray-800 p-3 flex justify-between items-center">
          <h2 class="text-lg font-semibold truncate">{{ hotel.name }}</h2>
          <div class="flex space-x-2">
            <!-- Botón de habitaciones -->
            <button
              @click="onManageRooms"
              class="bg-gray-500 text-white rounded-md p-2 hover:bg-gray-600"
              title="Gestionar habitaciones"
            >
              🛏️
            </button>
            <!-- Botón de editar -->
            <button
              @click="onEdit"
              class="bg-yellow-500 text-white rounded-md p-2 hover:bg-yellow-600"
              title="Editar"
            >
              ✏️
            </button>
            <!-- Botón de eliminar -->
            <button
              @click="onDelete"
              class="bg-red-500 text-white rounded-md p-2 hover:bg-red-600"
              title="Eliminar"
            >
              🗑️
            </button>
          </div>
        </div>
      </template>
  
      <div class="p-3 text-sm text-gray-700">
        <p><strong>Dirección:</strong> {{ hotel.address }}</p>
        <p><strong>Ciudad:</strong> {{ hotel.city.name }}</p>
        <p><strong>NIT:</strong> {{ hotel.nit }}</p>
        <p><strong>Máx. Habitaciones:</strong> {{ hotel.max_rooms }}</p>
      </div>
  
      <template #footer>
        <div class="bg-gray-100 text-xs text-gray-600 p-2 flex justify-between">
          <p>Creado: {{ formatDate(hotel.created_at) }}</p>
          <p>Actualizado: {{ formatDate(hotel.updated_at) }}</p>
        </div>
      </template>
    </Card>
  </template>
  
  <script setup>
  import Card from '@/components/base/Card.vue';
  
  const props = defineProps({
    hotel: {
      type: Object,
      required: true,
    },
  });
  
  const emit = defineEmits(['edit', 'delete', 'manage-rooms']);
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };
  
  const onEdit = () => {
    emit('edit', props.hotel);
  };
  
  const onDelete = () => {
    emit('delete', props.hotel);
  };
  
  const onManageRooms = () => {
    emit('manage-rooms', props.hotel);
  };
  </script>
  
  <style scoped>
  /* Ajustes para una tarjeta más compacta */
  :host {
    max-width: 350px;
  }
  </style>
  