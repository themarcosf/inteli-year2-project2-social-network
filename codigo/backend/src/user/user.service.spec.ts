import { Test } from "@nestjs/testing";
import { HttpService } from "@nestjs/axios";
import { Repository } from "typeorm";
import { UserService } from "./user.service";
import { User } from "./entities/user.entity";
import { of } from "rxjs";
import { LoginDto } from "./dto/login.dto";
import { getRepositoryToken } from "@nestjs/typeorm";

// General test variables
let userService: UserService;
let moduleRef: any;

// Setup
beforeAll(async () => {
  const mockHttpService: Partial<HttpService> = {
    post: jest.fn().mockReturnValue(
      of({
        data: {
          user: {
            id: "1",
            email: "test@example.com",
            name: "John Doe",
          },
          token: "mockToken",
        },
      })
    ) as any,
  };

  const mockRepository: Partial<Repository<User>> = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn().mockResolvedValue(Promise.resolve({} as User)),
  };

  (mockRepository as jest.Mocked<Partial<Repository<User>>>).create = jest.fn();
  (mockRepository as jest.Mocked<Partial<Repository<User>>>).save = jest.fn();

  moduleRef = await Test.createTestingModule({
    providers: [
      UserService,
      {
        provide: HttpService,
        useValue: mockHttpService,
      },
      {
        provide: getRepositoryToken(User),
        useValue: mockRepository,
      },
    ],
  }).compile();

  userService = moduleRef.get(UserService);
});

describe("UserService", () => {
  it("should be defined", () => {
    expect(userService).toBeDefined();
  });

  describe("login method", () => {
    it("should login a user", async () => {
      const mockUserLoginDto: LoginDto = {
        email: "test@example.com",
        password: 123456,
      };

      const mockRepository = moduleRef.get(getRepositoryToken(User));
      mockRepository.findOne.mockResolvedValue(null);
      mockRepository.create.mockReturnValue({});
      mockRepository.save.mockResolvedValue({} as User);

      const loginResponse = await userService.login(mockUserLoginDto);
      expect(loginResponse).toHaveProperty("accessToken");

      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { userIdLegacy: "1" },
      });
      expect(mockRepository.create).toHaveBeenCalledWith({
        userIdLegacy: "1",
        email: "test@example.com",
        name: "John Doe",
      });
      expect(mockRepository.save).toHaveBeenCalledWith({});
      expect(loginResponse).toEqual({ accessToken: "mockToken" });
    });
  });

  describe("findOne method", () => {
    it("should find a user by id", async () => {
      const user = await userService.findOne("1");

      expect(user).toBeDefined();
    });
  });

  describe("findByEmail method", () => {
    it("should find a user by email", async () => {
      const user = await userService.findByEmail("test@example.com");

      expect(user).toBeDefined();
    });
  });

  it("should return accessToken if user already exists", async () => {
    const mockUserLoginDto: LoginDto = {
      email: "test@example.com",
      password: 123456,
    };

    const mockRepository = moduleRef.get(getRepositoryToken(User));
    mockRepository.findOne.mockResolvedValue({} as User);

    const loginResponse = await userService.login(mockUserLoginDto);
    expect(loginResponse).toHaveProperty("accessToken");

    expect(mockRepository.findOne).toHaveBeenCalledWith({
      where: { userIdLegacy: "1" },
    });
    expect(loginResponse).toEqual({ accessToken: "mockToken" });
  });
});
