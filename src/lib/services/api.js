import medusaRequest from "./request"

const removeNullish = (obj) =>
  Object.entries(obj).reduce((a, [k, v]) => (v ? ((a[k] = v), a) : a), {})

const buildQueryFromObject = (search, prefix = "") =>
  Object.entries(search)
    .map(([key, value]) =>
      typeof value === "object"
        ? buildQueryFromObject(value, key)
        : `${prefix ? `${prefix}[${key}]` : `${key}`}=${value}`
    )
    .join("&")

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  sitemap: {
    fetch() {
      var path = '/api/sitemap';
      return medusaRequest('GET', path)
    }
  },
  collections: {
    listCategories(collection_handle) {
      var path = `/store/collection-categories/${collection_handle}`
      return medusaRequest("GET", path);
    },
    retrieve(collection_handle) {
      const path = `/store/collections/handle/${collection_handle}`;
      return medusaRequest('GET', path);
    }
  },
  currency: {
    list() {
      const path = `/store/currency-rate`
      return medusaRequest("GET", path)
    },
  },
  gallery: {
    list({ pageParam, category_id }) {
      let url = `/store/gallery?pageSize=40&pageNumber=${pageParam}`
      if (category_id) {
        const queryParams = new URLSearchParams();
        var path = `/store/gallery`
        for (var i in category_id) {
          queryParams.set(`category_id[${i}]`, category_id[i]);
        }
        queryParams.set('pageSize', 10)
        queryParams.set('pageNumber', pageParam)
        url = `${path}?${queryParams.toString()}`;
      }

      return medusaRequest("GET", url)
    },
    retrieve(handle) {
      const path = `/store/gallery/${handle}`
      return medusaRequest("GET", path)
    },
  },
  lineItems: {
    updateLineItem(cartId, lineId, payload) {
      const path = `/store/lineitems/${cartId}/${lineId}`
      return medusaRequest("POST", path, payload)
    },
  },
  jobCards: {
    createAll(payload) {
      const path = `/store/job-cards/save`
      return medusaRequest('POST', path, payload)
    },
    list() {
      const path = `/store/job-cards?pageSize=100`
      return medusaRequest("GET", path)
    },
    listByCustomer(customer_id) {
      const path = `/store/job-cards?customer_id=${customer_id}`
      return medusaRequest("GET", path)
    },
    retrieve(id, customer_id) {
      const path = `/store/job-cards?product_id=${id}`
      return medusaRequest("GET", path)
    },
    create(payload) {
      const path = `/store/job-cards`
      return medusaRequest("POST", path, payload)
    },
    update(id, payload) {
      const path = `/store/job-cards/${id}`
      return medusaRequest("PUT", path, payload)
    },
    delete(id) {
      const path = `/store/job-cards/${id}`
      return medusaRequest("DELETE", path)
    }
  },
  orderStatus: {
    orderStatus(payload) {
      const path = `/store/status-created`
      return medusaRequest("POST", path, payload)
    }
  },
  sizeGuide: {
    list() {
      const path = `/store/size-guide?pageSize=1000`
      return medusaRequest("GET", path)
    },
    retrieveSizeGuide(size_guide_key) {
      const path = `/store/size-columns?pageSize=1000&size_key=${size_guide_key}`
      return medusaRequest("GET", path)
    },
  },
  customizer: {
    production: {
      list() {
        const path = `/store/production-type`
        return medusaRequest("GET", path)
      },
    },
    customDesign: {
      list() {
        const path = `/customizer/design`
        return medusaRequest("GET", path)
      },
      listByCustomer(customer_id) {
        const path = `/customizer/design?customer_id=${customer_id}`
        return medusaRequest("GET", path)
      },
      retrieve(id) {
        const path = `/customizer/design/${id}`
        return medusaRequest("GET", path)
      },
      create(payload) {
        const path = `/customizer/design`
        return medusaRequest("POST", path, payload)
      },
      update(id, payload) {
        const path = `/customizer/design/${id}`
        return medusaRequest("PUT", path, payload)
      },
      delete(id) {
        const path = `/customizer/design/${id}`
        return medusaRequest("DELETE", path)
      }
    },
    category: {
      retrieveByProductId(id) {
        const path = `/store/category?product_id=${id}`
        return medusaRequest("GET", path)
      }
    },
    area: {
      list() {
        const path = `/customizer/areas`
        return medusaRequest("GET", path)
      },
      retrieve(id) {
        const path = `/customizer/areas/${id}`
        return medusaRequest("GET", path)
      },
    },
    graphic: {
      list() {
        const path = `/store/graphic?pageSize=1000`
        return medusaRequest("GET", path)
      },
      retrieve(id) {
        const path = `/customizer/graphics/${id}`
        return medusaRequest("GET", path)
      },
    },
    graphics: {
      list() {
        const path = `/customizer/graphics`
        return medusaRequest("GET", path)
      },
      retrieve(id) {
        const path = `/customizer/graphics/${id}`
        return medusaRequest("GET", path)
      },
    },
    name: {
      list(cateogry_id) {
        const path = `/customizer/names?product_category_id=${cateogry_id}`
        return medusaRequest("GET", path)
      },
      retrieve(id) {
        const path = `/customizer/names/${id}`
        return medusaRequest("GET", path)
      },
    },
    settings: {
      list() {
        const path = `/customizer/settings`
        return medusaRequest("GET", path)
      },
      retrieve(id) {
        const path = `/customizer/settings/${id}`
        return medusaRequest("GET", path)
      },
    },
    customMaterial: {
      retrieveByType(id) {
        const path = `/customizer/custom-materials?material_type=${id}`
        return medusaRequest("GET", path)
      },
      list() {
        const path = `/customizer/custom-materials`
        return medusaRequest("GET", path)
      },
      retrieve(id) {
        const path = `/customizer/custom-materials/${id}`
        return medusaRequest("GET", path)
      },
      create(payload) {
        const path = `/customizer/custom-materials`
        return medusaRequest("POST", path, payload)
      },
      update(id, payload) {
        const path = `/customizer/custom-materials/${id}`
        return medusaRequest("PUT", path, payload)
      },
      delete(id) {
        const path = `/customizer/custom-materials/${id}`
        return medusaRequest("DELETE", path)
      }
    },
    materialTypes: {
      list() {
        const path = `/customizer/material-types`
        return medusaRequest("GET", path)
      },
      retrieve(id) {
        const path = `/customizer/material-types/${id}`
        return medusaRequest("GET", path)
      },
      create(payload) {
        const path = `/customizer/material-types`
        return medusaRequest("POST", path, payload)
      },
      update(id, payload) {
        const path = `/customizer/material-types/${id}`
        return medusaRequest("PUT", path, payload)
      },
      delete(id) {
        const path = `/customizer/material-types/${id}`
        return medusaRequest("DELETE", path)
      }
    },
    textSettings: {
      list() {
        const path = `/customizer/text-settings`
        return medusaRequest("GET", path)
      },
      retrieve(id) {
        const path = `/customizer/text-settings/${id}`
        return medusaRequest("GET", path)
      },
      create(payload) {
        const path = `/customizer/text-settings`
        return medusaRequest("POST", path, payload)
      },
      update(id, payload) {
        const path = `/customizer/text-settings/${id}`
        return medusaRequest("PUT", path, payload)
      },
      delete(id) {
        const path = `/customizer/text-settings/${id}`
        return medusaRequest("DELETE", path)
      }
    },
    customProductSettings: {
      list() {
        const path = `/product/settings`
        return medusaRequest("GET", path)
      },
      retrieve(id) {
        const path = `/product/settings?product_id=${id}`
        return medusaRequest("GET", path)
      },
      create(payload) {
        const path = `/product/settings`
        return medusaRequest("POST", path, payload)
      },
      update(id, payload) {
        const path = `/product/settings/${id}`
        return medusaRequest("PUT", path, payload)
      },
      delete(id) {
        const path = `/product/settings/${id}`
        return medusaRequest("DELETE", path)
      }
    },
    customProductSizing: {
      list() {
        const path = `/customizer/sizes`
        return medusaRequest("GET", path)
      },
      retrieveSizing(product_category_id) {
        const path = `/customizer/sizes_list?product_category_id=${product_category_id}`
        return medusaRequest("GET", path)
      },
      retrieve(custom_sizes_id) {
        const path = `/customizer/sizes?custom_sizes_id=${custom_sizes_id}&pageSize=100`
        return medusaRequest("GET", path)
      },
      create(payload) {
        const path = `/customizer/sizes`
        return medusaRequest("POST", path, payload)
      },
      update(id, payload) {
        const path = `/customizer/sizes/${id}`
        return medusaRequest("PUT", path, payload)
      },
      delete(id) {
        const path = `/customizer/sizes/${id}`
        return medusaRequest("DELETE", path)
      }
    },
    customProductStyle: {
      list() {
        const path = `/customizer/styles`
        return medusaRequest("GET", path)
      },
      retrieveByCategoryId(category_id) {
        const path = `/customizer/styles?product_category_id=${category_id}`
        return medusaRequest("GET", path)
      },
      retrieve(id) {
        const path = `/customizer/styles/${id}`
        return medusaRequest("GET", path)
      }
    },
    customProductStyleOption: {
      list() {
        const path = `/customizer/style_option`
        return medusaRequest("GET", path)
      },
      retrieveByStyleId(category_id) {
        const path = `/customizer/style_option?custom_style_id=${category_id}`
        return medusaRequest("GET", path)
      },
      retrieve(id) {
        const path = `/customizer/style_option/${id}`
        return medusaRequest("GET", path)
      },
    },
    customColorGroup: {
      list() {
        const path = `/store/custom-color-groups?pageSize=1000`
        return medusaRequest("GET", path)
      },
      retrieve(id) {
        const path = `/store/custom-color-groups/${id}`
        return medusaRequest("GET", path)
      },
      create(payload) {
        const path = `/store/custom-color-groups`
        return medusaRequest("POST", path, payload)
      },
      update(id, payload) {
        const path = `/store/custom-color-groups/${id}`
        return medusaRequest("PUT", path, payload)
      },
      delete(id) {
        const path = `/store/custom-color-groups/${id}`
        return medusaRequest("DELETE", path)
      }
    },
    layers: {
      retrieve(payload) {
        const path = `/customizer/custom-materials/all`
        return medusaRequest("POST", path, payload)
      },
    },
    colorGroup: {
      list() {
        const path = `/customizer/color-groups`
        return medusaRequest("GET", path)
      },
      retrieve(id) {
        const path = `/customizer/color-groups/${id}`
        return medusaRequest("GET", path)
      },
      create(payload) {
        const path = `/customizer/color-groups`
        return medusaRequest("POST", path, payload)
      },
      update(id, payload) {
        const path = `/customizer/color-groups/${id}`
        return medusaRequest("PUT", path, payload)
      },
      delete(id) {
        const path = `/customizer/color-groups/${id}`
        return medusaRequest("DELETE", path)
      }
    },

    graphicSize: {
      retrieve(product_category_id) {
        const path = `/customizer/graphic-main?product_category_id=${product_category_id}`
        return medusaRequest("GET", path)
      },
      retrieveById(id) {
        const path = `/store/graphic-sizes?graphic_id=${id}`
        return medusaRequest("GET", path)
      },
    },


  },
  customers: {
    retrieve(customerId) {
      const path = `/admin/customers/${customerId}`
      return medusaRequest("GET", path)
    },
    getCustomer(customerId) {
      const path = `/store/customer/${customerId}`
      return medusaRequest("GET", path)
    },
    async create(credentials) {
      const path = '/store/customer';
      return medusaRequest('POST', path, credentials)
    },
    async createWithoutPass(payload) {
      const path = '/store/customer/create';
      return medusaRequest('POST', path, payload)
    },
    list(search = "") {
      const path = `/admin/customers${search}`
      return medusaRequest("GET", path)
    },
    update(update) {
      const path = `store/customers/me`
      return medusaRequest("POST", path, update)
    },
    delete(id) {
      const path = `/user/${id}`;
      return medusaRequest('DELETE', path);
    },
    resetPassword(email) {
      const path = `/user/reset-password?email=${email}`
      return medusaRequest('GET', path);
    }
  },
  email: {
    send(email, name) {
      const path = `/send?email=${email}&name=${name}`;
      return medusaRequest('GET', path);
    },
    submitComingSoon(email) {
      const path = `/send/coming-soon?email=${email}`;
      return medusaRequest('GET', path);
    },

  },
  favorites: {
    list(customer_id) {
      const path = `/store/products/favorites/${customer_id}`
      return medusaRequest("GET", path)
    },
    add(product_id, customer_id) {
      const path = '/store/products/favorites';
      return medusaRequest('POST', path, { product_id, customer_id });
    },
    remove(id) {
      const path = '/store/products/favorites/' + id;
      return medusaRequest('DELETE', path);
    },
  },
  orders: {
    create(payload) {
      const path = `/store/orders/create`
      return medusaRequest("POST", path, payload)
    },
    cancel(orderId) {
      const path = `/store/orders/cancel`
      return medusaRequest("POST", path, { order_id: orderId })
    },
  },
  file: {
    retrieve(productId) {
      const path = `/store/file?key=temp/${productId}.json`
      return medusaRequest("GET", path)
    },
  }
}
