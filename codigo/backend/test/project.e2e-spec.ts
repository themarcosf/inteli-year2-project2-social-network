import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { ProjectModule } from 'src/project/project.module';
import { ProjectService } from 'src/project/project.service';
import { INestApplication } from '@nestjs/common';


describe('Project', () => {
    // usada para armazenar a instância da aplicação NestJS durante os testes.
    let app: INestApplication;
    // findAll() retorna um array com o valor 'test'.
    let projectService = { findAll: () => ['test'] };

    let userService =

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [ProjectModule],
        })

            .overrideProvider(ProjectService)
            .useValue(ProjectService)
            .compile();

        // set global serialization
        app = moduleRef.createNestApplication();
        await app.init();
    });

    describe("Authentication (e2e)", () => {
        it("/POST: should create a new project", () => {
            const newProject = {
                name: "Smart Contracts",
                description: "This project is about ...",
                tags: ["solidity", "Web 3", "JS"],
                roles: ["frontEnd developer", "backEnd developer", "Ux design"],
                start: 10 / 12 / 2023,
                end: 15 / 6 / 2024,
                endSubscription: 10 / 1 / 2024,
                badge: "badge",
                coleaderId: "12eckjsnubub233"
            }
            const config = {
                headers: 
            }
            return request(app.getHttpServer())
                .post(`/project`)
                .send(newProject, )
                .expect(200)
                .expect((res) => {
                    expect(res.body).toEqual(newProject);
                });
        })

    })
})

// function should add two numbers