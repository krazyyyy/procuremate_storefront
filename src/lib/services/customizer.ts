import { ProductCategory } from '@medusajs/medusa';
import Medusa from './api'
import {
  CustomColorGroup,
  Graphic,
  GraphicSize,
  GraphicResponse,
  CustomGraphicSettings,
  Material,
  MaterialType,
  CustomStyle,
  CustomDesign,
  CustomSize,
  CustomStyleOption,
  CustomName,
  ProductionMethod,
  CurrencyRate,
  Layer,
} from 'types/ffg'
// import { decompress } from 'lz-string';

export const fetchCustomDesign = async (design_id?: string): Promise<CustomDesign | null> => {

  if (!design_id) return null;
  const { data: response } = await Medusa.customizer.customDesign.retrieve(design_id);
  const decompressed = response.custom_design
  if (decompressed.length > 0) {
    return decompressed[0];
  }
  return null;
}


export const fetchCurrencyRates = async (): Promise<CurrencyRate[]> => {
  const { data: response } = await Medusa.currency.list();
  const { data } = response;
  const { storeCurrencies } = data;
  if (storeCurrencies.length === 0) return []
  const { currencies } = storeCurrencies[0]
  return currencies
}

export const fetchProductionMethods = async (): Promise<ProductionMethod[]> => {
  const { data: response } = await Medusa.customizer.production.list();
  const { production_type: data, status } = response;
  if (status === 'success') {
    const { production_type } = data
    return production_type;
  }
  return [];
}

export const fetchNameSettings = async (category_id?: string): Promise<CustomName[]> => {
  if (!category_id) return [];
  const { data: response } = await Medusa.customizer.name.list(category_id);
  const { names, status } = response;
  if (status === 'success') {
    return names;
  }
  return [];
}

export const fetchGraphicCategory = async (category_id?: string): Promise<CustomGraphicSettings[]> => {
  if (!category_id) return [];
  try {
    const { data: response } = await Medusa.customizer.graphicSize.retrieve(category_id);
    const { graphic_main: data } = response;
    const { graphic_main } = data;
    if (graphic_main) {
      return graphic_main;
    }
    return [];
  } catch (error) {
    console.error(error)
    return [];
  }
}

export const fetchGraphicPricing = async (category_id?: string): Promise<GraphicSize[]> => {
  if (!category_id) return [];
  const { data: response } = await Medusa.customizer.graphicSize.retrieveById(category_id);
  const { graphic_size: data } = response;
  const { graphic_size } = data;
  if (graphic_size) {
    return graphic_size;
  }

  return [];
}

export const fetchLayerMaterials = async (layers?: Layer[]): Promise<MaterialType[]> => {
  if (!layers) return [];
  const { data } = await Medusa.customizer.layers.retrieve({ layers });
  if (data) return data;
  return [];
}
export const fetchMaterialTypes = async (mat_group_id?: string): Promise<MaterialType[]> => {
  if (!mat_group_id) return [];
  const { data } = await Medusa.customizer.colorGroup.retrieve(mat_group_id);

  const { color_group } = data;
  if (color_group.length > 0) {
    const { materialTypes } = color_group[0];
    return materialTypes;
  }
  return [];
}

export const fetchAllGraphics = async (): Promise<Graphic[]> => {
  const { data: response } = await Medusa.customizer.graphic.list();
  const { graphics: data } = response;
  if (data) {
    const { graphics } = data;
    return graphics;
  }
  return [];
}

export const fetchCategoryCustomStyle = async (category_id?: string): Promise<CustomStyle | undefined> => {
  if (!category_id) return;
  const { data: axiosResponse } = await Medusa.customizer.customProductStyle.retrieveByCategoryId(category_id);
  const { custom_style: data } = axiosResponse;
  const { custom_style } = data;
  if (custom_style.length > 0) {
    return custom_style[0];
  }
}
export const fetchCustomStyleOptions = async (style_id?: string): Promise<CustomStyleOption[]> => {
  if (!style_id) return [];
  const { data: axiosResponse } = await Medusa.customizer.customProductStyleOption.retrieveByStyleId(style_id);
  const { custom_style_options: data } = axiosResponse;
  const { custom_style_option } = data;
  if (custom_style_option.length > 0) {
    return custom_style_option;
  }
  return [];
}

export const fetchCustomSizing = async (mat_group_id?: string): Promise<MaterialType[]> => {
  if (!mat_group_id) return [];
  const { data } = await Medusa.customizer.colorGroup.retrieve(mat_group_id);

  const { color_group } = data;
  if (color_group.length > 0) {
    const { materialTypes } = color_group[0];
    return materialTypes;
  }
  return [];
}


const saveCustomDesign = async (payload: CustomDesign): Promise<CustomDesign | undefined> => {
  let { data: response } = await Medusa.customizer.customDesign.create(payload);
  if (response) {

  }
  return;
}


export const fetchGraphicsSettings = async (): Promise<GraphicResponse> => {
  var response = await Medusa.customizer.graphics.list();
  const { status, graphics } = response.data;
  if (status === 'success')
    return {
      graphics,
      status
    }
  return {
    graphics: [],
    status: 'error'
  };
}

export const fetchCustomSize = async (prod_cat_id: string): Promise<CustomSize | undefined> => {
  const { data: sizingResponse } = await Medusa.customizer.customProductSizing.retrieveSizing(prod_cat_id)
  let { status, custom_product_sizings: data } = sizingResponse;
  if (status === 'success') {
    const { custom_product_sizings } = data;
    try {
      const { title, id } = custom_product_sizings[0];
      const { data: response } = await Medusa.customizer.customProductSizing.retrieve(id);
      const { status, custom_product_sizings: sizing_object } = response;
      const { custom_product_sizings: sizing_list } = sizing_object;
      if (status === 'success') {
        return {
          id,
          title,
          sizes: sizing_list,
        }
      }
    } catch (error) {
      return
    }
  }
}

export const fetchProductCategory = async (product_id: string): Promise<ProductCategory | undefined> => {
  try {
    const { data } = await Medusa.customizer.category.retrieveByProductId(product_id);
    const { category } = data;
    return category as ProductCategory;
  } catch (error) {
    return;
  }
}



export const fetchColorGroups = async (): Promise<CustomColorGroup[]> => {
  const { data: response } = await Medusa.customizer.customColorGroup.list();
  const { custom_color_group: data } = response;
  const { custom_color_group } = data;
  if (custom_color_group) return custom_color_group;
  return [];
}

export const fetchMaterialGroups = async (): Promise<Material[]> => {
  const { data } = await Medusa.customizer.customMaterial.list();
  return [];
}


export const fetchMaterials = async (materialTypeId: string): Promise<Material[]> => {
  const { data: response } = await Medusa.customizer.customMaterial.retrieveByType(materialTypeId);
  const { custom_material: data } = response;
  const { custom_material } = data;
  return custom_material;
}