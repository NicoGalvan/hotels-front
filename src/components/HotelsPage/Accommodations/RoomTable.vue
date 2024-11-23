<template>
    <div class="overflow-x-auto bg-white shadow-md rounded-lg">
        <table class="min-w-full text-sm text-left text-gray-500 border-collapse">
            <thead class="bg-gray-100">
                <tr>
                    <th class="px-4 py-2 text-xs font-semibold text-gray-600 uppercase tracking-wider">Cantidad</th>
                    <th class="px-4 py-2 text-xs font-semibold text-gray-600 uppercase tracking-wider">Tipo de
                        Habitación</th>
                    <th class="px-4 py-2 text-xs font-semibold text-gray-600 uppercase tracking-wider">Acomodación</th>
                    <th class="px-4 py-2 text-xs font-semibold text-gray-600 uppercase tracking-wider">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="room in rooms" :key="room.id" class="border-b hover:bg-gray-50">
                    <td class="px-4 py-2">{{ room.total_rooms }}</td>
                    <td class="px-4 py-2">{{ room.room_type.name }}</td>
                    <td class="px-4 py-2">{{ room.accommodation.name }}</td>
                    <td class="px-4 py-2">
                        <ActionButtons :room="room" @edit="emitEdit(room)" @delete="onDelete(room.id)" />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import ActionButtons from './ActionButtons.vue';

const props = defineProps({
    rooms: Array,
});

const emit = defineEmits(['edit', 'delete']);

const emitEdit = (room) => {
    const formattedRoom = {
        id: room.id,
        total_rooms: room.total_rooms,
        room_type_id: room.room_type.id,
        accommodation_id: room.accommodation.id,
    };
    emit('edit', formattedRoom);
};

const onDelete = (id) => {
    emit('delete', id)
}
</script>