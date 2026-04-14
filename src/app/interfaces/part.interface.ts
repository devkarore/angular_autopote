export interface Brand {
  id: number;
  name: string;
  country: string | null;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Part {
  id: number;
  name: string;
  reference: string;
  description: string | null;
  price: string;
  stock: number;
  part_condition: string | null;
  isAvailable: boolean;
  createdAt: string;
  brand: Brand;
  category: Category;
}

export interface PartCollection {
  member: Part[];
  totalItems: number;
}

export interface BrandCollection {
  member: Brand[];
  totalItems: number;
}

export interface CategoryCollection {
  member: Category[];
  totalItems: number;
}