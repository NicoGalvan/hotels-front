import { storeToRefs } from "pinia";
import Swal from 'sweetalert2'
import { useHotelStore } from "../stores/hotelStore";
import { computed } from "vue";

export const useHotels = () => {
  const hotelStore = useHotelStore();
  const {
    pagination,
    isLoading,
    error,
    modal,
    hotels,
    cities,
  } = storeToRefs(hotelStore);

  const getHotels = async (filters = {}) => {
    hotelStore.loadHotels(filters);
  };
  
  const getcities = async () => {
    hotelStore.loadCities();
  };

  const openModal = () => {
    hotelStore.toggleModal(true);
  };
  
  const closeModal = () => {
    hotelStore.toggleModal(false);
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
    getHotels,
    getcities,
  };
};
