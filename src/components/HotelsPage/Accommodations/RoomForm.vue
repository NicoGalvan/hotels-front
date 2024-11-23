<template>
    <div class="mt-4">
        <h3 class="text-lg font-semibold mb-4 text-center text-gray-800">
            Formulario de Habitación
        </h3>
        <form @submit.prevent="submitForm" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <!-- Cantidad -->
                <div>
                    <label class="block text-gray-700 mb-2">Cantidad</label>
                    <input v-model="formData.total_rooms" type="number" min="1"
                        class="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300" required />
                </div>

                <!-- Tipo de Habitación -->
                <div>
                    <label class="block text-gray-700 mb-2">Tipo de Habitación</label>
                    <select v-model="formData.room_type_id" @change="updateAccommodations"
                        class="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300" required>
                        <option value="">Seleccione un tipo</option>
                        <option v-for="type in roomTypes" :key="type.id" :value="type.id">
                            {{ type.name }}
                        </option>
                    </select>
                </div>

                <!-- Acomodación -->
                <div>
                    <label class="block text-gray-700 mb-2">Acomodación</label>
                    <select v-model="formData.accommodation_id"
                        class="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                        :disabled="!availableAccommodations.length" required>
                        <option value="">Seleccione una acomodación</option>
                        <option v-for="accommodation in availableAccommodations" :key="accommodation.id"
                            :value="accommodation.id">
                            {{ accommodation.name }}
                        </option>
                    </select>
                </div>
            </div>

            <!-- Botones de acción -->
            <div class="flex justify-end mt-4">
                <button @click="closeForm" type="button" class="text-gray-500 hover:text-gray-700 mr-4">
                    Cancelar
                </button>
                <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                    Guardar
                </button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref } from "vue";

// Simulación de roomTypes cargado desde un composable o API
import { useHotels } from "@/composables/useHotels";
const { roomTypes } = useHotels();

const props = defineProps({
    hotel: Object,
    room: Object,
});

const emit = defineEmits(["close", "submit"]);

const formData = ref({ ...props.room });
const availableAccommodations = ref([]);

// Actualizar las acomodaciones disponibles según el tipo seleccionado
const updateAccommodations = () => {
    const selectedType = roomTypes.value.find((type) => type.id === formData.value.room_type_id);
    availableAccommodations.value = selectedType
        ? selectedType.accommodations
        : [];
};

// Al cargar los datos iniciales, si hay un tipo de habitación seleccionado, cargar sus acomodaciones
if (formData.value.room_type_id) {
    updateAccommodations();
}

const submitForm = () => {
    emit("submit", formData.value);
};

const closeForm = () => {
    emit("close");
};
</script>

<style scoped>
/* Estilos adicionales */
.grid {
    align-items: start;
}

button {
    transition: all 0.2s ease-in-out;
}
</style>