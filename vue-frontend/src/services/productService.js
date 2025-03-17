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
        async getUserOrders(userId, params = {}) {
          try {
            const defaultParams = {
              filters: {
                user: userId
              },
              populate: {
                items: {
                  populate: ['product']
                },
                shippingAddress: true,
                billingAddress: true
              },
              sort: ['createdAt:desc'],
              pagination: {
                page: params.page || 1,
                pageSize: params.pageSize || 10
              }
            };
      
            const mergedParams = { ...defaultParams, ...params };
            const queryString = qs.stringify(mergedParams, { 
              encodeValuesOnly: true,
              arrayFormat: 'brackets',
              encode: false
            });
      
            const response = await axios.get(`${API_URL}/orders?${queryString}`);
            
            // Transform the response to a more convenient format for the frontend
            const transformedData = {
              data: response.data.data.map(order => {
                const attrs = order.attributes;
                return {
                  id: order.id,
                  orderNumber: attrs.orderNumber || `ORD-${order.id}`,
                  status: attrs.status,
                  createdAt: attrs.createdAt,
                  updatedAt: attrs.updatedAt,
                  shipping: attrs.shippingCost || 0,
                  tax: attrs.tax || 0,
                  total: attrs.total,
                  paymentMethod: attrs.paymentMethod,
                  paymentStatus: attrs.paymentStatus,
                  shippingAddress: attrs.shippingAddress?.data?.attributes || {},
                  billingAddress: attrs.billingAddress?.data?.attributes || {},
                  items: attrs.items?.data?.map(item => {
                    const itemAttrs = item.attributes;
                    const product = itemAttrs.product?.data;
                    
                    return {
                      id: item.id,
                      productId: product?.id,
                      name: itemAttrs.name || product?.attributes?.general_information?.name || 'Product',
                      price: itemAttrs.price,
                      quantity: itemAttrs.quantity,
                      image: product?.attributes?.general_information?.images?.data?.[0]?.attributes?.url || null
                    };
                  }) || []
                };
              }),
              pagination: response.data.meta.pagination
            };
      
            return transformedData;
          } catch (error) {
            console.error('OrderService getUserOrders error:', error);
            throw error;
          }
        },
      
        async getOrderById(id, userId) {
          try {
            const params = {
              populate: {
                items: {
                  populate: ['product']
                },
                shippingAddress: true,
                billingAddress: true,
                user: true
              }
            };
      
            const queryString = qs.stringify(params, { 
              encodeValuesOnly: true,
              arrayFormat: 'brackets'
            });
      
            const response = await axios.get(`${API_URL}/orders/${id}?${queryString}`);
            
            // Verify that this order belongs to the user
            const orderUserId = response.data.data.attributes.user?.data?.id;
            if (orderUserId && orderUserId !== userId) {
              throw new Error('Unauthorized: This order does not belong to the current user');
            }
      
            // Transform the response
            const order = response.data.data;
            const attrs = order.attributes;
            
            return {
              id: order.id,
              orderNumber: attrs.orderNumber || `ORD-${order.id}`,
              status: attrs.status,
              createdAt: attrs.createdAt,
              updatedAt: attrs.updatedAt,
              shipping: attrs.shippingCost || 0,
              tax: attrs.tax || 0,
              total: attrs.total,
              paymentMethod: attrs.paymentMethod,
              paymentStatus: attrs.paymentStatus,
              shippingAddress: attrs.shippingAddress?.data?.attributes || {},
              billingAddress: attrs.billingAddress?.data?.attributes || {},
              items: attrs.items?.data?.map(item => {
                const itemAttrs = item.attributes;
                const product = itemAttrs.product?.data;
                
                return {
                  id: item.id,
                  productId: product?.id,
                  name: itemAttrs.name || product?.attributes?.general_information?.name || 'Product',
                  price: itemAttrs.price,
                  quantity: itemAttrs.quantity,
                  image: product?.attributes?.general_information?.images?.data?.[0]?.attributes?.url || null
                };
              }) || []
            };
          } catch (error) {
            console.error(`OrderService getOrderById(${id}) error:`, error);
            throw error;
          }
        }
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