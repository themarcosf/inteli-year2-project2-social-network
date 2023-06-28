import { Test, TestingModule } from '@nestjs/testing';
import { ProjectService } from './project.service';
import { compareAsc, format } from 'date-fns';
import { ProjectController } from "./project.controller";
import { HttpService } from '@nestjs/axios';


format(new Date(23, 2, 2023), 'dd-MM-yyyy')

let service: ProjectService;

describe('ProjectsService', () => {

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [ProjectController],
            providers: [ProjectService],
        }).compile();

        service = moduleRef.get<ProjectService>(ProjectService);
    });

    // Unit test for the "project service" endpoint function
    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    // Unit test for the "create new project" endpoint function
    it("Should create new project", () => {
        let projectCreated = {
            id: "8080",
            name: "Desenvolvimento de aplicação",
            description: "Desenvolvimento de aplicação para notebooks dell",
            tags: "javascript, html",
            roles: "developer, scrum master",
            start: new Date(10, 10, 2023),
            end: new Date(10, 11, 2023),
            endSubscription: new Date(5, 10, 2023),
            badge: "badge",
            coleaderId: "56",
            ownerId: "1"
        }
        expect(service.create(projectCreated.id, projectCreated)).toBe(
            {
                id: "8080",
                name: "Desenvolvimento de aplicação",
                description: "Desenvolvimento de aplicação para notebooks dell",
                tags: "javascript, html",
                roles: "developer, scrum master",
                start: new Date(10, 10, 2023),
                end: new Date(10, 11, 2023),
                endSubscription: new Date(5, 10, 2023),
                badge: "badge",
                coleaderId: "56",
                ownerId: "1"
            }
        )
    })

    // Unit test for the "edit already created project" endpoint function
    it('Should edit a project', () => {
        let newProjectData = {
            id: "8080",
            name: "Desenvolvimento de aplicação",
            description: "Desenvolvimento de aplicação para notebooks dell",
            tags: "javascript, html",
            roles: "developer, scrum master",
            start: new Date(10, 10, 2023),
            end: new Date(10, 11, 2023),
            endSubscription: new Date(5, 10, 2023),
            badge: "badge",
            coleaderId: "56",
            ownerId: "1"
        }
        let token = {
            Authorization: ""
        }
        expect(service.update(newProjectData.id, token, newProjectData)).toEqual({
            id: "8080",
            name: "Desenvolvimento de aplicação",
            description: "Desenvolvimento de aplicação para notebooks dell",
            tags: "javascript, html",
            roles: "developer, scrum master",
            start: new Date(10, 10, 2023),
            end: new Date(10, 11, 2023),
            endSubscription: new Date(5, 10, 2023),
            badge: "badge",
            coleaderId: "56",
            ownerId: "1"
        })
    })

    // Unit test for the "delete project" endpoint function
    it("Should delete project", async () => {
        let newProjectData = {
            id: "8080",
            name: "Desenvolvimento de aplicação",
            description: "Desenvolvimento de aplicação para notebooks dell",
            tags: "javascript, html",
            roles: "developer, scrum master",
            start: new Date(10, 10, 2023),
            end: new Date(10, 11, 2023),
            endSubscription: new Date(5, 10, 2023),
            badge: "badge",
            coleaderId: "56",
            ownerId: "1"
        }
        let token = {
            Authorization: ""
        }
        const projectIdToDelete = '8080';
        const beforeDelete = service.getAll(token);
        service.delete(newProjectData.id, token);
        const afterDelete = service.getAll(token);
        expect((await afterDelete).length).toBe((await beforeDelete).length - 1);
        expect((await afterDelete).some(project => project.newProjectData.id === projectIdToDelete)).toBe(false);
    });

    // Unit test for the "get all projects" endpoint function
    it("Should return all the projects", async () => {
        let token = {
            Authorization: ""
        }
        var projects = ["Projeto Python", "Projeto Java", "Projeto Javascript"]
        expect((await service.getAll(token)).length).toBe(projects.length)
    });

    // Unit test for the "get one project" endpoint function
    it('Should return a project by its ID', async () => {
        const projectId = '8080';
        let token = {
            Authorization: ""
        }
        const projectToReturn = {
            id: projectId,
            name: 'Desenvolvimento de aplicação',
            start: '2022-01-01',
            end: '2022-12-31',
            description: 'Desenvolvimento de aplicação para notebooks dell',
            ownerId: 1,
            coleaderId: 2,
            projectType: 'Dev',
            blockedSubscriptions: false,
        };
        expect(service.getOne(projectId, token)).toBe(projectToReturn)
    });
});


