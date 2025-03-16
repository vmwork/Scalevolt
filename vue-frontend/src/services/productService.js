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
  },
  
  // NEW: Search products function
  async searchProducts(searchTerm, params = {}) {
    try {
      const defaultParams = {
        populate: {
          general_information: {
            populate: ['images'],
          },
          pricing_and_inventory: true,
        },
        filters: {
          $or: [
            { 'general_information.name': { $containsi: searchTerm } },
            { 'general_information.description': { $containsi: searchTerm } },
            { 'categories.name': { $containsi: searchTerm } },
            { 'tags.name': { $containsi: searchTerm } },
            { 'specifications.value': { $containsi: searchTerm } }
          ]
        }
      };

      const mergedParams = { ...defaultParams, ...params };
      const queryString = qs.stringify(mergedParams, { 
        encodeValuesOnly: true,
        arrayFormat: 'brackets',
        encode: false
      });

      console.log(`Searching for products with term: "${searchTerm}"`);
      const response = await axios.get(`${API_URL}/products?${queryString}`);
      console.log(`Found ${response.data.data?.length || 0} products`);
      
      return response.data;
    } catch (error) {
      console.error(`ProductService searchProducts("${searchTerm}") error:`, error);
      throw error;
    }
  },
  
  // NEW: Get all products for search (optimized version with minimal data)
  async getAllProductsForSearch() {
    try {
      const params = {
        fields: ['id'],
        populate: {
          general_information: {
            fields: ['name', 'description'],
            populate: {
              images: {
                fields: ['url'],
                limit: 1
              }
            }
          },
          pricing_and_inventory: {
            fields: ['price', 'stock_quantity']
          },
          categories: {
            fields: ['name']
          }
        },
        pagination: {
          limit: -1  // Get all products, adjust if your dataset is very large
        }
      };
      
      const queryString = qs.stringify(params, { 
        encodeValuesOnly: true,
        arrayFormat: 'brackets',
        encode: false
      });

      console.log('Fetching all products for search component');
      const response = await axios.get(`${API_URL}/products?${queryString}`);
      
      // Transform the data to match the expected format for the search component
      const transformedProducts = response.data.data.map(product => {
        const attrs = product.attributes;
        return {
          id: product.id,
          name: attrs.general_information?.name || 'Unnamed Product',
          description: attrs.general_information?.description || '',
          price: attrs.pricing_and_inventory?.price,
          stock: attrs.pricing_and_inventory?.stock_quantity,
          image: attrs.general_information?.images?.data?.[0]?.attributes?.url || null,
          category: attrs.categories?.data?.[0]?.attributes?.name || ''
        };
      });
      
      console.log(`Prepared ${transformedProducts.length} products for search`);
      return transformedProducts;
    } catch (error) {
      console.error('ProductService getAllProductsForSearch error:', error);
      throw error;
    }
  }
};