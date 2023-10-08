export type ICart = {
  _id: string;
  cartItem: {
    _id: string;
    imageUrl: string;
    price: string;
    supplier: string;
    title: string;
  };
  quantity: number;
};

export type IOrder = {
  _id: string;
  customerId: string;
  delivery_status: string;
  payment_status: string;
  productId: IProduct;
  quantity: number;
  total: number;
  userId: string;
};

export type IProduct = {
  _id: string;
  title: string;
  supplier: string;
  price: string;
  imageUrl: string;
  description: string;
  product_location: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type IUser = {
  _id: string;
  username: string;
  email: string;
  location: string;
};

export type RootStackParamList = {
  BottomNavigation: undefined;
  Home: undefined;
  Search: undefined;
  Profile: undefined;
  Cart: undefined;
  Login: undefined;
  ProductDetails: undefined | { item: IProduct };
  ProductList: undefined;
  Orders: undefined;
  Favorites: undefined;
  Register: undefined;
};
