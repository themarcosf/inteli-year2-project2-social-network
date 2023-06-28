import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsService } from './projects.service';
import { compareAsc, format } from 'date-fns';

format(new Date(23, 2, 2023), 'dd-MM-yyyy')

describe('ProjectsService', () => {
  let service: ProjectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectsService],
    }).compile();

    service = module.get<ProjectsService>(ProjectsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Unit test for the "get all projects" endpoint function
  it("Should return all the projects", async () => {
    var projects = ["Projeto Python", "Projeto Java", "Projeto Javascript"]
    expect((await service.getAllProjects()).length).toBe(projects.length)
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
    expect(service.createProject(projectCreated.id, projectCreated)).toBe(
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

  // Unit test for the "delete project" endpoint function
  it("Should delete project", async () => {
    const projectIdToDelete = '8080';
    const beforeDelete = service.getAllProjects();
    service.deleteProject(projectIdToDelete);
    const afterDelete = service.getAllProjects();
    expect((await afterDelete).length).toBe((await beforeDelete).length - 1);
    expect((await afterDelete).some(project => project.projectId === projectIdToDelete)).toBe(false);
  });

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
    expect(service.updateProject(newProjectData.id, newProjectData)).toEqual({
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

  // Unit test for the "edit already created specific project" endpoint function
  //-------------------------------------------------------------------------------//
  it('Should edit a specifc project information', () => {
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
    expect(service.updateProject(newProjectData.id, newProjectData)).toEqual({
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


  // Unit test for the "approving a project" endpoint function
  it('Should approve a project', () => {
    let newApproveData = {
      projectId: '23',
      ownerId: '20',
      approve: true
    }
    expect(service.approveProject(newApproveData.projectId, newApproveData.projectId)).toEqual({
      projectId: '23',
      ownerId: '20',
      approve: true
    })
  })

  // Unit test for the "get project by ID" endpoint function
  it('Should return a project by its ID', () => {
    const projectId = '8080';

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

    expect(service.getProjectById(projectId)).toBe(projectToReturn)
  });

  //   // Unit test for the "apply project vacancy" endpoint function
  //   it('Should apply for a project vacancy', () => {
  //     let apply = {
  //       applicantId: 1,
  //       projectId: 2,
  //       roleId: 4,
  //       why: "Eu desejo para aprimorar minhas habilidade",
  //       habilities: "programaçao"
  //     }

  //     expect(service.applyProject(apply)).toEqual("Aplicação feita com sucesso!")
  //   })

  //   //Unit test for the "get specific apply" endpoint function
  //   it('Should get a specific apply', () => {
  //     expect(service.getApply(1)).toEqual({
  //       id: 1,
  //       applicantId: 1,
  //       projectId: 2,
  //       roleId: 4,
  //       why: "Eu desejo para aprimorar minhas habilidade",
  //       habilities: "Programaçao"
  //     })
  //   })

  //   // Unit test for the "get all applies" endpoint function
  //   it('Should all applies', () => {
  //     expect(service.getAllApplies()).toEqual([
  //       {
  //         id: 1,
  //         applicantId: 1,
  //         projectId: 2,
  //         roleId: 4,
  //         why: "Eu desejo para aprimorar minhas habilidade",
  //         habilities: "programaçao"
  //       },
  //       {
  //         id: 2,
  //         applicantId: 3,
  //         projectId: 6,
  //         roleId: 5,
  //         why: "Eu desejo aprender mais sobre programação",
  //         habilities: "UX"
  //       }
  //     ])
  //   })
});
