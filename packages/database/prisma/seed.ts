import { PrismaClient,Category,Prisma } from '@prisma/client';
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient();


async function main() {
    await prisma.productImage.deleteMany();
    await prisma.cartItem.deleteMany();
    await prisma.cart.deleteMany();
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.inventory.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    const categories:Category[] = [];
    const categoryNames = ['Electronics','Clothing','Books','Home & Kitchen']

    for (const name of categoryNames){
        const category= await prisma.category.create({
            data:{
                name,
                description:`${name} category description`
            },
        });
        categories.push(category);
    }

    const products:Prisma.ProductCreateInput[] = [];

    for (let i=0;i<50;i++){
        const category = faker.helpers.arrayElement(categories)
        const ProductName = faker.commerce.productName();
        const product:Prisma.ProductCreateManyInput = {
            name:ProductName,
            description:faker.commerce.productDescription(),
            price:parseFloat(faker.commerce.price()),
            sku:faker.string.uuid(),
            categoryId:category.id,


        };
        products.push(product)
    }

    await prisma.product.createMany({
        data:products
    })

    const allProducts = await prisma.product.findMany();

    for (const product of allProducts){
        await prisma.productImage.createMany({
            data:[
                {url:faker.image.dataUri(),productId:product.id},
                {url:faker.image.dataUri(),productId:product.id},
            ]
        })

        await prisma.inventory.create({
            data:{
                productId:product.id,
                quantity:faker.number.int({min:1,max:100}),
            }
        })
    }
    console.log('Products and categories seeded')
    
}

main()
    .catch((e) => {
            console.error("Error in seeding the data");
            process.exit(1)
    })
