import axios from 'axios';
import qs from 'qs'; // This import should now resolve successfully

const API_URL = 'http://localhost:1337/api';

export default {
  getProducts(params = {}) {
    const defaultParams = {
      populate: {
        general_information: {
          populate: ['images'],
        },
        pricing_and_inventory: true,
        specifications: true,
        categories: true,
        tags: true,
        // Add other nested fields as needed
      },
    };
    const queryString = qs.stringify({ ...defaultParams, ...params }, { encodeValuesOnly: true });
    return axios.get(`${API_URL}/products?${queryString}`);
  },
  getProductById(id, params = {}) {
    const defaultParams = {
      populate: {
        general_information: {
          populate: ['images'],
        },
        pricing_and_inventory: true,
        specifications: true,
        categories: true,
        tags: true,
        // Add other nested fields as needed
      },
    };
    const queryString = qs.stringify({ ...defaultParams, ...params }, { encodeValuesOnly: true });
    return axios.get(`${API_URL}/products/${id}?${queryString}`);
  },
  getPromotionsByCategory(categoryId, params = {}) {
    const query = qs.stringify(
      {
        filters: {
          category: {
            id: categoryId,
          },
          active: true,
        },
        populate: ['image'],
      },
      { encodeValuesOnly: true }
    );
    return axios.get(`${API_URL}/promotions?${query}`);
  },
};