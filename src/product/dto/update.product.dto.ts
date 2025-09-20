import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateProductDto {
  @Field()
  name?: string;

  @Field({ nullable: true })
  price?: number;

  @Field({ nullable: true })
  stock?: number;
}