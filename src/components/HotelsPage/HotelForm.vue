<template>
    <div class="max-w-md mx-auto p-6 bg-gray-50 border border-gray-200 shadow rounded-lg lg:my-3">
      <h2 class="text-xl font-bold text-center mb-6">
        {{ isEditing ? "Editar Hotel" : "Crear Hotel" }}
      </h2>
      <form @submit.prevent="handleSubmit">
        <FormField
          id="name"
          label="Nombre"
          v-model="form.name"
          :v$="v$"
          field="name"
          input-class="focus:ring-blue-400"
        />
        <FormField
          id="address"
          label="Dirección"
          v-model="form.address"
          :v$="v$"
          field="address"
          input-class="focus:ring-blue-400"
        />
        <FormField
          id="city_id"
          label="Ciudad"
          tag="select"
          v-model="form.city_id"
          :v$="v$"
          field="city_id"
          input-class="focus:ring-blue-400"
        >
          <option value="" disabled>Seleccione una ciudad</option>
          <option v-for="city in cities" :key="city.id" :value="city.id">
            {{ city.name }}
          </option>
        </FormField>
        <FormField
          id="nit"
          label="NIT"
          v-model="form.nit"
          :v$="v$"
          field="nit"
          input-class="focus:ring-blue-400"
        />
        <FormField
          id="max_rooms"
          label="Habitaciones Máximas"
          type="number"
          v-model="form.max_rooms"
          :v$="v$"
          field="max_rooms"
          :min="1"
          input-class="focus:ring-blue-400"
        />
        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {{ isEditing ? "Actualizar Hotel" : "Crear Hotel" }}
        </button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, computed } from "vue";
  import useVuelidate from "@vuelidate/core";
  import { required, minValue } from "@vuelidate/validators";
  import FormField from "@/components/base/FormField.vue";
  
  const props = defineProps({
    hotel: { type: Object, default: () => ({ name: "", address: "", city: { id: null, name: "" }, nit: "", max_rooms: 1 }) },
    cities: { type: Array, required: true },
  });
  
  const emit = defineEmits(["submit"]);
  
  const form = ref({
    name: "",
    address: "",
    city_id: null,
    nit: "",
    max_rooms: 1,
  });
  
  const isEditing = computed(() => !!props.hotel?.id);
  
  const rules = computed(() => ({
    name: { required },
    address: { required },
    city_id: { required },
    nit: { required },
    max_rooms: { required, minValue: minValue(1) },
  }));
  
  const v$ = useVuelidate(rules, form);
  
  watch(
    () => props.hotel,
    (newHotel) => {
      form.value = { ...newHotel, city_id: newHotel.city?.id || null };
    },
    { immediate: true, deep: true }
  );
  
  const handleSubmit = async () => {
    const result = await v$.value.$validate();
    if (!result) return;
    const hotelData = {
      ...form.value,
      city: props.cities.find((c) => c.id === form.value.city_id) || null,
    };
    emit("submit", hotelData);
  };
  </script>
  