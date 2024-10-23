export interface ProductImage{
    id:number;
    url:string;
}

export interface Category{
    id:number;
    name:string;
    description:string;
}

export interface Product{
    id:number;
    name:string;
    description:string;
    price:number;
    sku:string;
    categoryId:number;
    category:Category;
    images:ProductImage[]
}