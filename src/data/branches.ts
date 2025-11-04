export interface Branch {
  id: number;
  name: string;
  address: string;
  phone: string;
}

export const branches: Branch[] = [
  {
    id: 1,
    name: "Vancouver Branch",
    address: "1300 Burrard St, Vancouver, BC, V6Z 2C7",
    phone: "604-456-0022",
  },
  // ...add rest of sample branches
];
