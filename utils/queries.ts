// import { apiCall } from './api'
import AuthAxios from './api/authAxios';

export const getShopCategories = async (url: string) => {
  const categories = await AuthAxios.get(url);
  return categories.data.data.data;
  // try {
  // } catch (error) {
  //   throw error;
  // }
};

export const getStates = async (url: string) => {
  const states = await AuthAxios.get(url);
  return states.data.data.data;
};

export const getCities = async (stateId: number | string) => {
  const cities = await AuthAxios(`/auth/city/list/${stateId}`);
  return cities.data.data.data;
  // try {
  // } catch (error) {
  //   throw error;
  // }
};

export const getVendorLatestOder = async (stateId: number) => {
  const cities = await AuthAxios(`/auth/city/list/${stateId}`);
  return cities.data.data.data;
  // try {
  // } catch (error) {
  //   throw error;
  // }
};
