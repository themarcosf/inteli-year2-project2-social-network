import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // User 1
    await prisma.user.create({
        data: {
            id: "1d344c78-15d2-453d-848c-d31ac003cd48",
            email: "pepehaggeb@gmail.com",
            password: "$2b$08$Q6Bhp9yLptFvYcTeAyOPiuXkdXvGQpHW0tpAarb/h8KZsbQZJBdhu",
            name: "Pedro Hagge Baptista",
            bornDate: new Date(),
            gender: "Masculino",
            n_dell: "123456789",
            managerId: "1d344c78-15d2-453d-848c-d31ac003cd48",
            habilities: "[]",
            photoURL: "",
            createdAt: new Date(),
            updatedAt: new Date()
        }
    })

    // User 2
    await prisma.user.create({
        data: {
            id: "583b42ff-fa7a-4c51-a574-72f47ec0fb9e",
            email: "luiz.couto@prof.inteli.edu.br",
            password: "$2b$08$Q6Bhp9yLptFvYcTeAyOPiuXkdXvGQpHW0tpAarb/h8KZsbQZJBdhu",
            name: "Mrs. Cloud",
            bornDate: new Date(),
            gender: "Masculino",
            n_dell: "123456789",
            managerId: "583b42ff-fa7a-4c51-a574-72f47ec0fb9e",
            habilities: "[]",
            photoURL: "",
            createdAt: new Date(),
            updatedAt: new Date()
        }
    })

    // Project 1
    await prisma.project.create({
        data: {
            projectId: "0fc14aa6-6212-431d-996e-198ca787e836",
            name: "Projeto Teste Prova",
            start: new Date(),
            end: new Date(),
            tags: '["Nest","React","Mongo"]',
            endSubscription: new Date(),
            badge: "Teste",
            roles: '[{"area":"Technology","role":"BackEnd","vacancies":"20"},{"area":"Technology","role":"DevOps","vacancies":"5"}]',
            createdAt: new Date(),
            updatedAt: new Date(),
            description: "Projeto de teste para a prova",
            coleaderId: "1d344c78-15d2-453d-848c-d31ac003cd48",
            ownerId: "583b42ff-fa7a-4c51-a574-72f47ec0fb9e",
            blockedSubscription: true,
            status: "Pending"
        }
    })
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });