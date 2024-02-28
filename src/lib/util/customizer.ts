import { medusaUrl } from '../services/config'
import Medusa from '../services/api';


const saveDesign = async (productId: string, data: any, submit = true) => {
  try {
    if (submit) {
      const jsonString = JSON.stringify(data)
      const blob = new Blob([jsonString], { type: 'application/json' })
      const formData = new FormData()
      formData.append('file', blob, productId + '.json');
      var requestOptions: any = {
        method: 'POST',
        body: formData,
        headers: {
          'mime-type': 'application/json'
        },
        redirect: 'follow'
      };
      try {
        var response = await fetch(medusaUrl + "/store/upload/temp", requestOptions)
        const result = await response.json();
        const { url } = result;
        return url;
      } catch (error) {
        console.error(error)
      }
    }
    window.localStorage.setItem(productId, JSON.stringify(data))
  } catch (error) {
    console.error(error)
  }
}


const loadDesign = async (productId?: string, local = true) => {
  if (!productId) return;
  var data = window.localStorage.getItem(productId);
  if (!data && !local) {
    const { data: response } = await Medusa.file.retrieve(productId);
    data = response;
    saveDesign(productId, data, false);
  }
  if (data && typeof data === 'string') return JSON.parse(data);
  return data;
}

const clearDesign = (productId: string) => {
  window.localStorage.removeItem(productId);
  console.info('cleared ␥')
}

export {
  saveDesign,
  loadDesign,
  clearDesign,
};