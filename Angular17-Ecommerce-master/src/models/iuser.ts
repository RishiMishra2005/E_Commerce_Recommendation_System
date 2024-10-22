export interface Iuser {
  id: number;
  fullName: string;
  email: string;
  mobileNumbers: string[];
  address: {
    city: string;
    postalCode: string;
    street: string;
  };
  password: string;

  role:string;
}
