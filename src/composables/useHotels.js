import { storeToRefs } from "pinia";
import { useHotelStore } from "../stores/hotelStore";

export const useHotels = () => {
  const hotelStore = useHotelStore();
  const { pagination, isLoading, error, modal, hotels, cities, roomTypes } =
    storeToRefs(hotelStore);

  const getHotels = async (filters = {}) => {
    hotelStore.loadHotels(filters);
  };

  const getCities = async () => {
    hotelStore.loadCities();
  };
  const getRoomTypes = async () => {
    hotelStore.loadRoomTypes();
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

  const saveNewRoom = async (room) => {
    await hotelStore.createRoom(room);
  };

  const saveEditedHotel = async (hotel, id) => {
    await hotelStore.editHotel(hotel, id);
  };

  const deleteHotel = async (id) => {
    await hotelStore.removeHotel(id);
  };

  const deleteRoom = async (id) => {
    await hotelStore.removeRoom(id);
  };

  const saveEditedRoom = async (room, id) => {
    await hotelStore.editRoom(room, id);
  };

  return {
    //data
    pagination,
    isLoading,
    error,
    modal,
    hotels,
    cities,
    roomTypes,

    //methods
    getHotels,
    getCities,
    openHotelFormModal,
    closeHotelFormModal,
    saveNewHotel,
    saveEditedHotel,
    deleteHotel,
    getRoomTypes,
    saveNewRoom,
    deleteRoom,
    saveEditedRoom,
  };
};
