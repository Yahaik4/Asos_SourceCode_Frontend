import { Category } from "./Category";
import { Brand } from "./Brand";

export interface ProductGroup {
    id: number,
    name: string,
    Category: Category,
    Brand: Brand,
}