<template>
    <div class="p-6">
      <!-- Buscador y filtro -->
      <div class="mb-6 flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0">
        <input
          v-model="searchQuery"
          @input="fetchHotels"
          type="text"
          class="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Buscar hoteles por nombre..."
        />
        <select
          v-model="selectedCity"
          @change="fetchHotels"
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
  
      <!-- Lista de hoteles -->
      <div v-if="isLoading" class="text-center text-gray-500 py-10">
        Cargando hoteles...
      </div>
      <div v-else-if="hotels.length === 0" class="text-center text-gray-500 py-10">
        No se encontraron hoteles.
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <HotelCard
          v-for="hotel in hotels"
          :key="hotel.id"
          :hotel="hotel"
          @edit="openModal('edit', hotel)"
          @delete="handleDelete(hotel)"
          @manage-rooms="handleManageRooms(hotel)"
        />
      </div>
  
      <!-- Paginación -->
      <Pagination
        v-if="pagination.last_page > 1"
        :pagination="pagination"
        @page-changed="fetchHotels"
      />
  
      <!-- Modal -->
      <HotelModal
        :isOpen="modal"
        :hotel="selectedHotel"
        :cities="cities"
        @close="closeModal"
        @submit="handleHotelSubmit"
      />
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useHotels } from "@/composables/useHotels";
  import HotelCard from "@/components/HotelsPage/HotelCard.vue";
  import HotelModal from "@/components/HotelsPage/HotelModal.vue";
  import Pagination from "@/components/base/Pagination.vue";
  
  const { getHotels, getcities, hotels, cities, pagination, isLoading, modal } = useHotels();
  
  const searchQuery = ref("");
  const selectedCity = ref("");
  const selectedHotel = ref(null);
  const modalType = ref("create");
  
  // Modal
  const openModal = (type, hotel = null) => {
    modalType.value = type;
    selectedHotel.value = type === "edit" ? { ...hotel } : { name: "", address: "", city_id: null, nit: "", max_rooms: 1 };
    modal.value = true;
  };
  
  const closeModal = () => {
    modal.value = false; 
    selectedHotel.value = null;
  };
  
  const handleHotelSubmit = async (hotelData) => {
    fetchHotels(pagination.value.current_page);
    closeModal();
  };
  
  const handleDelete = async (hotel) => {
    fetchHotels(pagination.value.current_page);
  };
  
  const handleManageRooms = (hotel) => {
    alert(`Gestionar habitaciones para: ${hotel.name}`);
  };
  
  const fetchHotels = async (page = 1) => {
    await getHotels({
      search: searchQuery.value,
      city_id: selectedCity.value,
      page,
    });
  };
  
  getcities();
  fetchHotels();
  </script>
  