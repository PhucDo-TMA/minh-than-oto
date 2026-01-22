export interface Car {
  name: string;
  slug: string;
  image: string;
  year: number;
  price: number;
  priceFormatted: string;
  category: "SUV" | "Sedan" | "Bán tải" | "Hatchback";
  brand: string;
  specs: {
    engine: string;
    power: string;
    gearbox: string;
    acceleration: string;
    topSpeed: string;
    fuelConsumption: string;
  };
  gallery: string[];
  description: string;
  features: string[];
}

export const cars: Car[] = [
  {
    name: "Mercedes C300",
    slug: "mercedes-c300",
    image: "/cars/mercedes.jpg",
    year: 2024,
    price: 1800000000,
    priceFormatted: "1.8 tỷ",
    category: "Sedan",
    brand: "Mercedes-Benz",
    specs: {
      engine: "2.0L Turbo",
      power: "255 HP",
      gearbox: "9AT",
      acceleration: "6.3s",
      topSpeed: "250 km/h",
      fuelConsumption: "6.5 L/100km",
    },
    gallery: ["/cars/mercedes.jpg"],
    description: "Sedan hạng sang Mercedes C300 với thiết kế sang trọng, công nghệ hiện đại và hiệu suất vượt trội.",
    features: [
      "Hệ thống an toàn ADAS",
      "Nội thất da Nappa",
      "Hệ thống âm thanh Burmester",
      "Điều khiển hành trình thích ứng",
      "Cửa sổ trời toàn cảnh",
    ],
  },
  {
    name: "Toyota Fortuner",
    slug: "toyota-fortuner",
    image: "/cars/fortuner.jpg",
    year: 2024,
    price: 1300000000,
    priceFormatted: "1.3 tỷ",
    category: "SUV",
    brand: "Toyota",
    specs: {
      engine: "2.7L",
      power: "164 HP",
      gearbox: "6AT",
      acceleration: "10.5s",
      topSpeed: "190 km/h",
      fuelConsumption: "8.5 L/100km",
    },
    gallery: ["/cars/fortuner.jpg"],
    description: "SUV 7 chỗ mạnh mẽ, bền bỉ và phổ biến tại Việt Nam. Lý tưởng cho gia đình lớn.",
    features: [
      "7 chỗ ngồi thoải mái",
      "Khả năng off-road vượt trội",
      "Hộp số tự động 6 cấp",
      "Hệ thống cân bằng điện tử VSC",
      "Camera lùi tiêu chuẩn",
    ],
  },
  {
    name: "Ford Ranger",
    slug: "ford-ranger",
    image: "/cars/ranger.jpg",
    year: 2024,
    price: 900000000,
    priceFormatted: "900 triệu",
    category: "Bán tải",
    brand: "Ford",
    specs: {
      engine: "2.0L EcoBlue",
      power: "170 HP",
      gearbox: "10AT",
      acceleration: "9.8s",
      topSpeed: "195 km/h",
      fuelConsumption: "7.2 L/100km",
    },
    gallery: ["/cars/ranger.jpg"],
    description: "Bán tải mạnh mẽ, thiết kế thể thao với công nghệ tiên tiến.",
    features: [
      "Động cơ EcoBlue mạnh mẽ",
      "Cầu chủ động Intelligent Driveline",
      "Hệ thống treo độc lập",
      "Ghế da chỉnh điện",
      "Công nghệ FordPass",
    ],
  },
  {
    name: "Honda Civic",
    slug: "honda-civic",
    image: "/cars/civic.jpg",
    year: 2023,
    price: 800000000,
    priceFormatted: "800 triệu",
    category: "Sedan",
    brand: "Honda",
    specs: {
      engine: "1.5L Turbo",
      power: "182 HP",
      gearbox: "CVT",
      acceleration: "7.8s",
      topSpeed: "210 km/h",
      fuelConsumption: "6.0 L/100km",
    },
    gallery: ["/cars/civic.jpg"],
    description: "Sedan thể thao Honda Civic với thiết kế hiện đại, tiết kiệm nhiên liệu.",
    features: [
      "Động cơ Turbo 1.5L",
      "Hộp số CVT mượt mà",
      "Hệ thống Honda Sensing",
      "Cửa sổ trời toàn cảnh",
      "Android Auto & Apple CarPlay",
    ],
  },
  {
    name: "Hyundai Tucson",
    slug: "hyundai-tucson",
    image: "/cars/tucson.jpg",
    year: 2024,
    price: 1000000000,
    priceFormatted: "1.0 tỷ",
    category: "SUV",
    brand: "Hyundai",
    specs: {
      engine: "2.0L Turbo",
      power: "245 HP",
      gearbox: "8AT",
      acceleration: "7.2s",
      topSpeed: "215 km/h",
      fuelConsumption: "7.8 L/100km",
    },
    gallery: ["/cars/tucson.jpg"],
    description: "SUV compact Hyundai Tucson với thiết kế hiện đại, công nghệ an toàn hàng đầu.",
    features: [
      "Hệ thống an toàn SmartSense",
      "Nội thất hiện đại",
      "Động cơ Turbo mạnh mẽ",
      "Treo độc lập 4 bánh",
      "Cảm biến thích ứng",
    ],
  },
  {
    name: "Kia Sorento",
    slug: "kia-sorento",
    image: "/cars/sorento.jpg",
    year: 2024,
    price: 1150000000,
    priceFormatted: "1.15 tỷ",
    category: "SUV",
    brand: "Kia",
    specs: {
      engine: "2.2L Turbo Diesel",
      power: "200 HP",
      gearbox: "8AT",
      acceleration: "8.5s",
      topSpeed: "200 km/h",
      fuelConsumption: "7.0 L/100km",
    },
    gallery: ["/cars/sorento.jpg"],
    description: "SUV 7 chỗ Kia Sorento với thiết kế sang trọng, nội thất rộng rãi.",
    features: [
      "7 chỗ ngồi với hàng ghế giữa có thể xếp gọn",
      "Động cơ Diesel Turbo tiết kiệm",
      "Hệ thống điều khiển hành trình thích ứng",
      "Cửa cốp tự động",
      "Hệ thống âm thanh Bose",
    ],
  },
];
