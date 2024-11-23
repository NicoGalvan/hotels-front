import { defineStore } from "pinia";
import Swal from "sweetalert2";
import { ref } from "vue";
import {
  getHotelsApi,
  getCitiesApi,
  postHotelApi,
  putHotelApi,
  deleteHotelApi,
} from "@/services/hotelService";

export const useHotelStore = defineStore("hotelStore", () => {
  const pagination = ref({});
  const isLoading = ref(false);
  const error = ref(null);
  const modal = ref(false);
  const hotels = ref([]);
  const cities = ref([]);

  const loadCities = async () => {
    try {
      const response = await getCitiesApi();
      cities.value = response.data.data;
    } catch (err) {
      error.value = err.message;
      console.error("Error loading cities:", err);
    }
  };

  const loadHotels = async (filters = {}) => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await getHotelsApi(filters);
      pagination.value = response.data.meta;
      hotels.value = response.data.data;
    } catch (err) {
      error.value = err.message;
      console.error("Error loading hotels:", err);
      Swal.fire({
        icon: "error",
        title: "error",
        text: "Ocurrió un error en el servidor al cargar los productos, por favor inténtelo nuevamente",
      });
    } finally {
      isLoading.value = false;
    }
  };

  const toggleModal = (value) => {
    modal.value = value;
  };

  const createHotel = async (hotel) => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await postHotelApi(hotel);
      Swal.fire({
        title: "Hotel guardado",
        text: response.data.message,
        icon: "success",
      });
    } catch (err) {
      error.value = err.message;
      console.error("Error updating hotel:", err);
      Swal.fire({
        icon: "error",
        title: "error",
        text: err.response.data.message,
      });
    } finally {
      isLoading.value = false;
    }
  };

  const editHotel = async (hotel, id) => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await putHotelApi(hotel, id);
      Swal.fire({
        title: "Hotel actualizado",
        text: response.data.message,
        icon: "success",
      });
    } catch (err) {
      error.value = err.message;
      console.error("Error updating hotel:", err);
      Swal.fire({
        icon: "error",
        title: "error",
        text: err.response.data.message,
      });
    } finally {
      isLoading.value = false;
    }
  };

  const removeHotel = async (id) => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await deleteHotelApi(id);
      Swal.fire({
        title: "Hotel eliminado",
        text: response.data.message,
        icon: "success",
      });
    } catch (err) {
      error.value = err.message;
      console.error("Error updating product:", err);
      Swal.fire({
        icon: "error",
        title: "error",
        text: "Ocurrió un error inesperado, inténtelo nuevamente!",
      });
    } finally {
      isLoading.value = false;
    }
  };

  return {
    //data
    pagination,
    isLoading,
    error,
    modal,
    hotels,
    cities,

    //methods
    loadHotels,
    loadCities,
    toggleModal,
    createHotel,
    editHotel,
    removeHotel,
  };
});
