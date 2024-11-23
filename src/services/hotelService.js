import axiosInstance from './axiosInstance';

export const getCitiesApi = () => axiosInstance.get('/cities');
export const getHotelsApi = (params) => axiosInstance.get('/hotels', { params });
export const postHotelApi = (hotel) => axiosInstance.post('/hotels', hotel);
export const putHotelApi = (hotel, id) => axiosInstance.put(`/hotels/${id}`, hotel);
export const deleteHotelApi = (id) => axiosInstance.delete(`/hotels/${id}`);

