export type Product = {
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

export type User = {
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
  ProductDetails: undefined | { item: Product };
  ProductList: undefined;
  Orders: undefined;
  Favorites: undefined;
  Register: undefined;
};
