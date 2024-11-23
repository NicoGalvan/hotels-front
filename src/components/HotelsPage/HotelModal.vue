<template>
    <Modal :isOpen="isOpen" @close="closeModal">
      <template #default>
        <HotelForm
          :hotel="hotel"
          :cities="cities"
          @submit="handleFormSubmit"
        />
      </template>
    </Modal>
  </template>
  
  <script setup>
  import Modal from '@/components/base/Modal.vue'; 
  import HotelForm from './HotelForm.vue';
  
  const props = defineProps({
    isOpen: {
      type: Boolean,
      required: true,
    },
    hotel: {
      type: Object,
      default: () => ({
        name: '',
        address: '',
        city_id: null,
        nit: '',
        max_rooms: 1,
      }),
    },
    cities: {
      type: Array,
      required: true,
    },
  });
  
  const emit = defineEmits(['close', 'submit']);
  
  const closeModal = () => {
    emit('close');
  };
  
  const handleFormSubmit = (formData) => {
    emit('submit', formData); 
    closeModal(); 
  };
  </script>
  