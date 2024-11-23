<template>
    <Modal :isOpen="isOpen" @close="closeModal">
        <div class="space-y-6 p-5">
            <!-- Título -->
            <div class="flex justify-center items-center">
                <h2 class="text-2xl font-semibold text-gray-800">
                    Gestión de Habitaciones - Hotel: <span class="text-blue-600">{{ hotel.name }}</span>
                </h2>
            </div>

            <!-- Información de habitaciones -->
            <p class="text-sm text-gray-600 text-center">
                Max. habitaciones: {{ maxRooms }} - Habitaciones registradas: {{ registeredRooms }}
            </p>

            <!-- Tabla de habitaciones -->
            <RoomTable :rooms="hotel.rooms" @edit="openRoomForm" @delete="removeRoom" />

            <!-- Botón para añadir habitación -->
            <div class="flex justify-center">
                <button @click="openRoomForm"
                    class="bg-blue-600 text-white font-medium py-2 px-6 rounded-lg hover:bg-blue-700 transition">
                    Añadir Habitación
                </button>
            </div>

            <!-- Formulario de habitación -->
            <RoomForm v-if="isRoomFormOpen" :hotel="hotel" :room="selectedRoom" @close="closeRoomForm"
                @submit="handleRoomSubmit" />
        </div>
    </Modal>
</template>

<script setup>
import { ref, computed } from "vue";
import Modal from "@/components/base/Modal.vue";
import RoomTable from "./RoomTable.vue";
import RoomForm from "./RoomForm.vue";
import { useHotels } from "@/composables/useHotels";

const { saveNewRoom, deleteRoom, saveEditedRoom} = useHotels();

const props = defineProps({
    isOpen: Boolean,
    hotel: Object,
});

const emit = defineEmits(["close", "updateHotelRooms"]);

const selectedRoom = ref(null);
const isRoomFormOpen = ref(false);

const closeModal = () => {
    emit("close");
};

const openRoomForm = (room = null) => {
    selectedRoom.value = room ? { ...room } : { total_rooms: 1, room_type_id: "", accommodation_id: "" };
    isRoomFormOpen.value = true;
};

const closeRoomForm = () => {
    isRoomFormOpen.value = false;
};

const handleRoomSubmit = (roomData) => {
    if (roomData.id) {
        saveEditedRoom({
            ...roomData,
            hotel_id: props.hotel.id,
        }, roomData.id)
    } else {
        saveNewRoom({
            ...roomData,
            hotel_id: props.hotel.id,
        });
    }
    emit("updateHotelRooms", props.hotel);
    closeRoomForm();
};

const removeRoom = (roomId) => {
    deleteRoom(roomId)
    props.hotel.rooms = props.hotel.rooms.filter((room) => room.id !== roomId);
    emit("updateHotelRooms", props.hotel);
};

// Computed properties para las estadísticas de habitaciones
const maxRooms = computed(() => props.hotel.max_rooms || 0); // Reemplaza con el límite real si está disponible
const registeredRooms = computed(() =>
    props.hotel.rooms.reduce((sum, room) => sum + (room.total_rooms || 0), 0)
);
</script>

<style scoped>
/* Espaciado y alineación */
.space-y-6>*+* {
    margin-top: 1.5rem;
}

/* Título */
h2 {
    text-align: center;
}

/* Botón */
button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
}
</style>
