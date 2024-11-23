<template>
    <div class="mb-4">
      <!-- Etiqueta para cada campo -->
      <label :for="id" class="block text-sm font-medium text-gray-700">{{ label }}</label>
  
      <!-- Si no es un select, renderizamos un input -->
      <input
        v-if="!tag"
        v-model="modelValue"
        :type="type || 'text'"
        :id="id"
        :placeholder="placeholder"
        :class="[ 
          inputClass, 
          'mt-1 block w-full p-2 border border-gray-300 rounded-md',
          (v$[field]?.$error ? 'border-red-500' : 'border-gray-300'),
          (v$[field]?.$pending ? 'opacity-50' : '')
        ]"
      />
  
      <!-- Si es un select, lo renderizamos con sus estilos -->
      <select
        v-else
        v-model="modelValue"
        :id="id"
        :class="[ 
          inputClass, 
          'mt-1 block w-full p-2 border border-gray-300 rounded-md',
          (v$[field]?.$error ? 'border-red-500' : 'border-gray-300'),
          (v$[field]?.$pending ? 'opacity-50' : '')
        ]"
      >
        <slot></slot>
      </select>
  
      <!-- Mensajes de error -->
      <div v-if="v$[field]?.$error" class="text-red-500 text-sm mt-1">
        <div v-if="v$[field]?.$errors?.length > 0">
          <p v-for="(error, index) in v$[field]?.$errors" :key="index">
            {{ getErrorMessage(error.$validator) }}
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits, ref, watch } from "vue";
  
  const errorMessages = {
    required: "Este campo es obligatorio",
    minValue: "El valor debe ser mayor o igual a 1",
    minLength: "Debe tener al menos {min} caracteres",
  };
  
  // Función para traducir el mensaje de error
  function getErrorMessage(errorMessage) {
    const message = errorMessages[errorMessage];
    if (message) {
      return message;
    }
    return errorMessage; // Si no se encuentra la traducción, retorna el mensaje original
  }
  
  // Recibe las propiedades del componente
  const props = defineProps({
    id: String,
    label: String,
    tag: String,
    inputClass: String,
    modelValue: [String, Number, Object],
    placeholder: String,
    v$: Object,
    field: String,
    type: String,
  });
  
  // Emite el valor actualizado al componente padre
  const emit = defineEmits(["update:modelValue"]);
  
  // Referencia para manejar el valor del campo
  const modelValue = ref(props.modelValue);
  
  // Cuando cambia el valor del campo, emitimos el nuevo valor
  watch(modelValue, (newVal) => {
    emit("update:modelValue", newVal);
  });
  
  // Para sincronizar el modelo de entrada cuando la propiedad cambia
  watch(() => props.modelValue, (newValue) => {
    modelValue.value = newValue;
  }, { immediate: true });
  </script>
  
  <style scoped>
  /* Puedes agregar más estilos específicos si es necesario */
  </style>
  