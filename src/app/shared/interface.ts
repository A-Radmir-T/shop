export interface IUser {
  returnSecureToken?: boolean,
  email: string,
  password: string
}

export interface IFbAuthResponse {
  idToken: string,
  expiresIn: string
}

export interface IProduct {
  id?: string
  title: string,
  category: string,
  image: string,
  weight: number,
  amount?: number,
  price: number,
  composition: string,
  new?: boolean,
  tempura?: boolean,
  sale?: boolean,
}

export interface ICategory {
  value: valueCategoryType,
  viewValue: string
}

export interface IAlert {
  type: alertType,
  text: string
}

export type alertType = 'warning' | 'success'

export type valueCategoryType = 'set' | 'sushi' | 'wok' | 'dessert' | 'drink'

export interface ISlider {
  id?: string
  image: string
}

export interface IFbCreateResponse {
  name: string
}

export interface IBasket extends IProduct{
  count: number
}

export interface IOrder {
  id?: string,
  name: string,
  phone: string,
  address: string
  products: IBasket[]
}

