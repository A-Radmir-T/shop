import {IBasket, IOrder, IProduct} from "./interface";

export function productFormInit(component: any) {
  component.form.get('id')?.setValue('1')
  component.form.get('category')?.setValue('set')
  component.form.get('title')?.setValue('1')
  component.form.get('image')?.setValue('1')
  component.form.get('composition')?.setValue('1')
  component.form.get('amount')?.setValue(0)
  component.form.get('weight')?.setValue(0)
  component.form.get('price')?.setValue(0)
}

export const testProduct: IProduct = {
  id: '1',
  price: 0,
  amount: 0,
  image: '',
  title: '',
  weight: 0,
  category: 'set',
  composition: ''
}

export const testOrder: IOrder = {
  id: '1',
  phone: '',
  name: '',
  address: '',
  products: []
}

export const testBasket: IBasket = {
  id: '',
  title: '',
  category: '',
  image: '',
  weight: 0,
  amount: 0,
  price: 1,
  composition: '',
  new: false,
  tempura: false,
  sale: false,
  count: 2
}
