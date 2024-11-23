import { storeToRefs } from "pinia";
import { useHotelStore } from "../stores/hotelStore";

export const useHotels = () => {
  const hotelStore = useHotelStore();
  const { pagination, isLoading, error, modal, hotels, cities } =
    storeToRefs(hotelStore);

  const getHotels = async (filters = {}) => {
    hotelStore.loadHotels(filters);
  };

  const getcities = async () => {
    hotelStore.loadCities();
  };

  const openHotelFormModal = () => {
    hotelStore.toggleModal(true);
  };

  const closeHotelFormModal = () => {
    hotelStore.toggleModal(false);
  };

  const saveNewHotel = async (hotel) => {
    await hotelStore.createHotel(hotel);
  };

  const saveEditedHotel = async (hotel, id) => {
    await hotelStore.editHotel(hotel, id);
  };

  const deleteHotel = async (id) => {
    await hotelStore.removeHotel(id);
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
    openHotelFormModal,
    closeHotelFormModal,
    saveNewHotel,
    saveEditedHotel,
    deleteHotel
  };
};
