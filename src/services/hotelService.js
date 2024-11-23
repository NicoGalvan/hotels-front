import axiosInstance from './axiosInstance';

export const getHotelsApi = (params) => axiosInstance.get('/hotels', { params });
export const getCitiesApi = () => axiosInstance.get('/cities');

