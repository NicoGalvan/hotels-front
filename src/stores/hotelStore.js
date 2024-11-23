import { defineStore } from "pinia";
import Swal from 'sweetalert2'
import { ref } from "vue";
import { getHotelsApi, getCitiesApi } from "@/services/hotelService";


export const useHotelStore = defineStore("hotelStore", () => {
  const pagination = ref({});
  const isLoading = ref(false);
  const error = ref(null);
  const modal = ref(false);
  const hotels = ref([])
  const cities = ref([])

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
  };
});
