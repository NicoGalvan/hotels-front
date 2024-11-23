import axiosInstance from './axiosInstance';

export const getRoomTypesApi = () => axiosInstance.get('/room-types');
export const postRoomsApi = (room) => axiosInstance.post('/rooms', room);
export const putRoomsApi = (room, id) => axiosInstance.put(`/rooms/${id}`, room);
export const deleteRoomApi = (id) => axiosInstance.delete(`/rooms/${id}`);


