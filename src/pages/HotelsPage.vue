<template>
    <div class="p-6">
        <SearchAndFilter v-model="searchQuery" :cities="cities" :fetchHotels="fetchHotels" :openModal="openModal"
            @changeSelectedCity="changeCity" />

        <div v-show="isLoading" class="text-center text-gray-500 py-10">
            <span class="loader"></span> Cargando hoteles...
        </div>
        <div v-show="hotels.length === 0 && !isLoading" class="text-center text-gray-500 py-10">
            No se encontraron hoteles.
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[60vh] lg:max-h-[80vh] overflow-auto">
            <HotelCard v-for="hotel in hotels" :key="hotel.id" :hotel="hotel" @edit="openModal('edit', hotel)"
                @delete="handleDelete(hotel)" @manage-rooms="handleManageRooms(hotel)" />
        </div>

        <Pagination v-if="pagination.last_page > 1" :pagination="pagination" @page-changed="fetchHotels" />

        <HotelModal :isOpen="modal" :hotel="selectedHotel" :cities="cities" @close="closeModal"
            @submit="handleHotelSubmit" />

        <ManageRoomsModal v-if="isManageRoomsModalOpen" :isOpen="isManageRoomsModalOpen" :hotel="selectedHotel"
            @close="closeManageRoomsModal" />
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useHotels } from "@/composables/useHotels";
import SearchAndFilter from "@/components/base/SearchAndFilter.vue";
import HotelCard from "@/components/HotelsPage/HotelCard.vue";
import HotelModal from "@/components/HotelsPage/HotelModal.vue";
import Pagination from "@/components/base/Pagination.vue";
import ManageRoomsModal from "@/components/HotelsPage/Accommodations/ManageRoomsModal.vue";
import Swal from "sweetalert2";

const { getHotels, getCities, hotels, cities, pagination, isLoading, modal, openHotelFormModal, closeHotelFormModal, saveNewHotel, saveEditedHotel, deleteHotel, roomTypes, getRoomTypes } = useHotels();

const searchQuery = ref("");
const selectedCity = ref("");
const selectedHotel = ref(null);
const modalType = ref("create");
const isManageRoomsModalOpen = ref(false);


const openModal = (type, hotel = null) => {
    modalType.value = type;
    selectedHotel.value =
        type === "edit"
            ? { ...hotel }
            : { name: "", address: "", city_id: null, nit: "", max_rooms: 1 };
    openHotelFormModal()
};

const closeModal = () => {
    closeHotelFormModal()
    selectedHotel.value = null;
};

const handleHotelSubmit = async (hotelData) => {
    if (hotelData.id) {
        await saveEditedHotel(hotelData, hotelData.id);
    } else {
        await saveNewHotel(hotelData);
    }
    await fetchHotels(pagination.value.current_page);
    closeModal();
};

const handleManageRooms = (hotel) => {
    openManageRoomsModal(hotel)
};

const fetchHotels = async (page = 1) => {
    await getHotels({
        search: searchQuery.value,
        city_id: selectedCity.value,
        page,
    });
};

const changeCity = (city) => {
    selectedCity.value = city
    fetchHotels(pagination.value.current_page);
}

const handleDelete = async (hotel) => {
    Swal.fire({
        title: `¿Está seguro de eliminar el hotel "${hotel.name}" ?`,
        showCancelButton: true,
        confirmButtonText: "Eliminar",
    }).then(async (result) => {
        if (result.isConfirmed) {
            await deleteHotel(hotel.id);
            fetchHotels()
        }
    });
};

const openManageRoomsModal = (hotel) => {
  selectedHotel.value = hotel;
  isManageRoomsModalOpen.value = true;
};

const closeManageRoomsModal = () => {
  isManageRoomsModalOpen.value = false;
};

onMounted(() => {
    if (!cities.value.length) getCities();
    if (!roomTypes.value.length) getRoomTypes();
    fetchHotels();
});
</script>

<style scoped>
/* Loader para UX mejorada */
.loader {
    border: 4px solid #f3f3f3;
    border-radius: 50%;
    border-top: 4px solid #3498db;
    width: 24px;
    height: 24px;
    animation: spin 2s linear infinite;
    margin: 0 auto;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>