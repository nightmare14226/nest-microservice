import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { Product } from "./product.model";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create.product.dto";
import { UpdateProductDto } from "./dto/update.product.dto";

type Nullable<T> = T | null;

@Resolver(() => Product)
export class ProductResolver {
    constructor(private productService: ProductService) { }

    @Query(() => [Product])
    async findAll(): Promise<Product[]> {
        return this.productService.findAll();
    }

    @Query(() => Product, { nullable: true })
    async findOne(@Args('id') id: number): Promise<Product | null> {
        return this.productService.findOne(id);
    }

    @Mutation(() => Product)
    async createProduct(
        @Args('name') name: string,
        @Args('price') price: number,
        @Args('stock') stock: number
    ) {
        return this.productService.create({
            name, price, stock
        })
    }

    @Mutation(() => Product)
    async remove(@Args('id') id: number) {
        return this.productService.remove(id);
    }

    @Mutation(() => Product)
    async updateProduct(
        @Args('id') id: number,
        @Args('product') updateInfo: UpdateProductDto
    ) {
        return this.productService.update(id, updateInfo)
    }
}

