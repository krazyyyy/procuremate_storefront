import { Currency } from "@medusajs/medusa"



export type Size = {
  id: string,
  title: string,
  price_adjust: string | number,
}

export type GraphicSize = {
  id: string,
  title: string,
  price: string | number,
  description: string,
}

export type CustomSize = {
  id: string,
  title: string,
  sizes: Size[],
}


export interface ImageInterface {
  file: string,
  size: any,
  instructions: string,
  name: string,
}

export interface GraphicPricing {
  id: string,
  image_url: string,
  type: string,
  items?: GraphicPricing[]
}

export interface Flag {
  src: string,
  size: GraphicSize,
  name: string,
}

export interface MaterialColor {
  name: string,
  code: string,
  group?: string,
  layerName: string,
  price: number | string,
}


export interface TextSettings {
  outline_color?: Material,
  outline_width?: number,
  patch_color?: Material,
  crystal_color?: Material,
  outline?: boolean,
  shadow?: boolean,
  patch?: boolean,
  crystal?: boolean,
  materials?: Material[],
  name_settings?: CustomName,
  price?: number | string,
  size?: AreaSize,
  text?: string,
  finish?: NameFinish,
  itext?: any,
  addText?: boolean,
}

export interface FontSettings {
  text: string,
  fontFamily?: string,
  textAlign?: string | undefined,
  case?: 0 | 1 | 2 | 3,
  color?: Material,
  fontSize?: number | undefined,
  direction?: 'ltr' | 'rtl' | undefined,
  underline?: boolean | undefined,
  fontWeight?: string | number | undefined,
  charSpacing?: number | undefined,
  angle?: number | undefined,
  shadow?: boolean,
}

export interface AreaSize {
  id: string,
  title: string,
  price_adjust: string | number,
  optional: boolean,
}

/**
 * This is called Type within (Material) in FFG
 */
export interface MaterialType {
  id: string,
  title: string,
  description: string,
  materials?: Material[]
}
/**
 * This is called Custom Product Sizing in FFG
 */
export interface CustomStyle {
  id: string,
  title: string,
  description: string,
  type: string,
  options?: CustomStyleOption[]
}
export interface CustomStyleOption {
  id: string,
  title: string,
  subtitle: string,
  image_url: string,
  price: number | string,
}
/**
 * This is called Material Group in FFG
 */
export interface ColorGroup {
  title: string,
  materialTypes: MaterialType[]
}

export interface GraphicSettings {
  id: string,
  flag_price: string | number,
  graphic_price: string | number,
  muay_thai: string | number,
  remove_boxer_logo: string | number,
}
/**
 * This is called Material in FFG
 */
export interface CustomColorGroup {
  id: string,
  title: string,
  hex_color: string,
  published: boolean,
}
export interface CustomName {
  id: string,
  title: string,
  description: string,
  internal_description: string,
  base_price: string,
  outline_price: number | string,
  crystal_price: number | string,
  patch_price: number | string,
  patch_material: MaterialType,
  crystal_material: MaterialType,
  character_limit: number | string,
  optional: boolean,
  can_have_outline: boolean,
  can_have_patch: boolean,
  can_have_crystals: boolean,
  allow_special_finishes: boolean,
  name_fill_materials: MaterialType[],
  finishes?: NameFinish[]
}

export type NameFinish = {
  id: string,
  title: string,
  price: string,
  is_three_d: boolean,
}

export type ProductionMethod = {
  id: string,
  title: string,
  price: string,
  days: string,
  email_title: string,
  description: string,
  express_shipping: boolean,
  instructions?: string,
}

export interface CurrencyRate extends Currency {
  rate: string
}

/**
 * This is called Material in FFG
 */
export interface Material {
  id: string,
  title: string,
  thai_name: string,
  hex_color: string,
  data_uri: string,
  material_type: MaterialType,
  price: number | string,
  image_url: string,
  customColor?: CustomColorGroup[],
}


export interface CustomDesign {
  id?: string,
  template_url: string,
  design_data: Record<string, any>,
  product_id: string,
  customer_id: string,
}
export interface Graphic {
  id: string;
  name: string;
  type: string;
  image_url: string;
}
export interface CustomGraphicSettings {
  id: string;
  name: string;
  type: string;
  graphic_sizes?: GraphicSize[]
}

export interface Layer {
  id: string,
  name: string,
  thai_name: string,
  customizer_area_id?: AreaSize,
  material_group?: Material,
  preset_material?: any,
  muay_thai?: boolean,
  selected_value?: any,
}

export interface CurrentLayer extends Layer {
  temp_value?: any,
}

export type GraphicResponse = {
  graphics: GraphicSettings[],
  status: string,
}
