
export type Property = {
  id: number;
  title: string;
  price: number;
  location: string;
  image: string;
  beds: number;
  baths: number;
  parking: number;
  verified: boolean;
};

export const properties: Property[] = [
  {
    id: 1,
    title: "1BHK Apartment in Andheri",
    price: 45000,
    location: "Mumbai, MH",
    image: "https://placehold.co/400x225/3F51B5/E8EAF6.png",
    beds: 1,
    baths: 1,
    parking: 1,
    verified: true,
  },
  {
    id: 2,
    title: "2BHK Sea-Facing Flat",
    price: 85000,
    location: "Bandra, Mumbai",
    image: "https://placehold.co/400x225/7E57C2/FFFFFF.png",
    beds: 2,
    baths: 2,
    parking: 1,
    verified: false,
  },
  {
    id: 3,
    title: "Spacious Villa in Koramangala",
    price: 120000,
    location: "Bengaluru, KA",
    image: "https://placehold.co/400x225/4CAF50/FFFFFF.png",
    beds: 4,
    baths: 5,
    parking: 3,
    verified: true,
  },
  {
    id: 4,
    title: "Modern 3BHK in HSR Layout",
    price: 65000,
    location: "Bengaluru, KA",
    image: "https://placehold.co/400x225/FF9800/FFFFFF.png",
    beds: 3,
    baths: 3,
    parking: 2,
    verified: true,
  },
  {
    id: 5,
    title: "Studio PG for Boys",
    price: 18000,
    location: "Hinjewadi, Pune",
    image: "https://placehold.co/400x225/F44336/FFFFFF.png",
    beds: 1,
    baths: 1,
    parking: 0,
    verified: false,
  },
  {
    id: 6,
    title: "2BHK in Gachibowli",
    price: 40000,
    location: "Hyderabad, TS",
    image: "https://placehold.co/400x225/2196F3/FFFFFF.png",
    beds: 2,
    baths: 2,
    parking: 2,
    verified: true,
  },
  {
    id: 7,
    title: "Luxury Penthouse in Gurgaon",
    price: 150000,
    location: "Gurgaon, HR",
    image: "https://placehold.co/400x225/9C27B0/FFFFFF.png",
    beds: 3,
    baths: 4,
    parking: 2,
    verified: true,
  },
  {
    id: 8,
    title: "Cozy 1RK near Metro",
    price: 22000,
    location: "Noida, UP",
    image: "https://placehold.co/400x225/795548/FFFFFF.png",
    beds: 1,
    baths: 1,
    parking: 1,
    verified: false,
  },
];


export const analyticsData = [
    { month: 'Jan', views: 4230 },
    { month: 'Feb', views: 3120 },
    { month: 'Mar', views: 5540 },
    { month: 'Apr', views: 7890 },
    { month: 'May', views: 6320 },
    { month: 'Jun', views: 8150 },
];

export const inquiriesData = [
  { id: 1, name: "Ravi Kumar", initials: "RK", message: "Is the price negotiable for the Andheri flat?"},
  { id: 2, name: "Sunita Sharma", initials: "SS", message: "I'd like to schedule a viewing for the villa."},
  { id: 3, name: "Amit Patel", initials: "AP", message: "Are bachelors allowed in the Gachibowli flat?"},
];
