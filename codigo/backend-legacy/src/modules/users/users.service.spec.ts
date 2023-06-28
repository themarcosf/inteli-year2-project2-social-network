import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../../prisma.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Unit test for the "get all users" endpoint function
  it('Should return all users', async () => {
    let users = await service.getAll()
    let qnt = users.length
    expect((await service.getAll()).length).toEqual(qnt)  
  });

  // Unit test for the "get a specific user by id" endpoint function
  it('Should return a user', async () => {
    let User = await service.getUser("583b42ff-fa7a-4c51-a574-72f47ec0fb9e")

    User.projects = []
    User.projectsColeader = []
    delete User.createdAt
    delete User.updatedAt
    delete User.bornDate

    expect(User).toEqual({"id":"583b42ff-fa7a-4c51-a574-72f47ec0fb9e","email":"victor.carvalho@sou.inteli.edu.br","name":"Victor Carvalho","gender":"Masculino","n_dell":"123456","managerId":"asdsadasdasd21312","habilities":"[]","isAdmin":false, "projects": [], "projectsColeader": []})
  });

  it('Should return a user that not exists', async () => {
    let User = await service.getUser("ID")

    User.projects = []
    User.projectsColeader = []
    delete User.createdAt
    delete User.updatedAt
    delete User.bornDate

    expect(User).toEqual({"id":"583b42ff-fa7a-4c51-a574-72f47ec0fb9e","email":"victor.carvalho@sou.inteli.edu.br","name":"Victor Carvalho","gender":"Masculino","n_dell":"123456","managerId":"asdsadasdasd21312","habilities":"[]","isAdmin":false, "projects": [], "projectsColeader": []})
  });

  // Unit test for the "update user" endpoint function 
  it('Should update a user', async() => {

    await service.update("583b42ff-fa7a-4c51-a574-72f47ec0fb9e", {"name": "Victor Carvalho"})

    let User = await service.getUser("583b42ff-fa7a-4c51-a574-72f47ec0fb9e")

    delete User.projects
    delete User.projectsColeader
    delete User.createdAt
    delete User.updatedAt
    delete User.bornDate

    expect(User).toEqual({"id":"583b42ff-fa7a-4c51-a574-72f47ec0fb9e","email":"victor.carvalho@sou.inteli.edu.br","name":"Victor Carvalho","gender":"Masculino","n_dell":"123456","managerId":"asdsadasdasd21312","habilities":"[]","isAdmin":false})
  });

  it("Should update a user that doesn't exists", async() => {

    await service.update("ID", {"name": "Victor Carvalho"})

    let User = await service.getUser("ID")

    delete User.projects
    delete User.projectsColeader
    delete User.createdAt
    delete User.updatedAt
    delete User.bornDate

    expect(User).toEqual({"id":"583b42ff-fa7a-4c51-a574-72f47ec0fb9e","email":"victor.carvalho@sou.inteli.edu.br","name":"Victor Carvalho","gender":"Masculino","n_dell":"123456","managerId":"asdsadasdasd21312","habilities":"[]","isAdmin":false})
  });

  it('Should get a user by name', async() => {

    let User = await service.getUserByName("Victor Carvalho")

    expect(User).toEqual([{"id":"583b42ff-fa7a-4c51-a574-72f47ec0fb9e","name":"Victor Carvalho","n_dell":"123456"}])
  });

  it("Should try to get a user that doesnt't exitst by name", async() => {

    let User = await service.getUserByName("Teste de nome")

    expect(User).toEqual([])
  });
});
