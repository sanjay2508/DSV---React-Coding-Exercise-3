type Geo = {
  lat: string;
  lng: string;
};

type Address = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
};

type User = {
  id: string;
  username: string;
  address: Address;
  age: number;
  companyName: string;
};
