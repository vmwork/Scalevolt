import axios from 'axios';
import qs from 'qs';

const API_URL = 'http://localhost:1337/api';

export default {
  async getProducts(params = {}) {
    try {
      const defaultParams = {
        populate: {
          general_information: {
            populate: ['images'],
          },
          pricing_and_inventory: true,
          specifications: true,
          categories: true,
          tags: true,
        },
      };

      const mergedParams = { ...defaultParams, ...params };
      const queryString = qs.stringify(mergedParams, { 
        encodeValuesOnly: true,
        arrayFormat: 'brackets',
        encode: false
      });

      const response = await axios.get(`${API_URL}/products?${queryString}`);
      return response.data;

    } catch (error) {
      console.error('ProductService getProducts error:', error);
      throw error;
    }
  },

  async getProductById(id, params = {}) {
    try {
      const defaultParams = {
        populate: {
          general_information: {
            populate: ['images'],
          },
          pricing_and_inventory: true,
          specifications: true,
          categories: true,
          tags: true,
        },
      };

      const mergedParams = { ...defaultParams, ...params };
      const queryString = qs.stringify(mergedParams, {
        encodeValuesOnly: true,
        arrayFormat: 'brackets'
      });

      const response = await axios.get(`${API_URL}/products/${id}?${queryString}`);
      return response.data;

    } catch (error) {
      console.error(`ProductService getProductById(${id}) error:`, error);
      throw error;
    }
  },

  async getPromotionsByCategory(categoryId, params = {}) {
    try {
      const query = qs.stringify(
        {
          filters: {
            category: { id: categoryId },
            active: true,
          },
          populate: ['image'],
          ...params
        },
        { 
          encodeValuesOnly: true,
          arrayFormat: 'brackets'
        }
      );

      const response = await axios.get(`${API_URL}/promotions?${query}`);
      return response.data;

    } catch (error) {
      console.error(`ProductService getPromotionsByCategory(${categoryId}) error:`, error);
      throw error;
    }
  }
};