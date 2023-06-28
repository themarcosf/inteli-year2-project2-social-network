/** nestjs */
import { Test } from "@nestjs/testing";
import { JwtService } from "@nestjs/jwt";

/** controllers */
import { UserController } from "./user.controller";

/** providers */
import { UserService } from "./user.service";

/** dependencies */
import { LoginDto } from "./dto/login.dto";
import { User } from "./entities/user.entity";
import { AuthGuard } from "./guards/auth.guard";
import { Post } from "../post/entities/post.entity";
////////////////////////////////////////////////////////////////////////////////

interface PassportRequest extends Request {
  user?: User;
}

// global test variables
let controller: UserController;

// mock data
const mockUser: Partial<User> = {
  id: 1,
  userIdLegacy: "mockUserIdLegacy",
  email: "mockEmail",
  name: "mockName",
  posts: Promise.resolve(<Post[]>[]),
};

/* setup */
beforeAll(async () => {
  // mock implementation of login method
  const mockUserService: Partial<UserService> = {
    login: jest.fn().mockReturnValue({ accessToken: "mockAccessToken" }),
    // mock implementation of findOne method
    findOne: jest.fn().mockReturnValue(mockUser),
    // mock implementation of findByEmail method
    findByEmail: jest.fn().mockReturnValue(mockUser),
  };

  const mockAuthGuard: Partial<AuthGuard> = {
    canActivate: jest.fn().mockReturnValue(true),
  };

  const mockJwtService: Partial<JwtService> = {
    sign: jest.fn().mockReturnValue("mockAccessToken"),
  };

  // initialize test module
  const moduleRef = await Test.createTestingModule({
    controllers: [UserController],
    providers: [
      {
        provide: UserService,
        useValue: mockUserService,
      },
      {
        provide: AuthGuard,
        useValue: mockAuthGuard,
      },
      {
        provide: JwtService,
        useValue: mockJwtService,
      },
    ],
  }).compile();

  controller = moduleRef.get<UserController>(UserController);
});

/** test suite */
describe("UserController", () => {
  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("login method", () => {
    it("should return an object with an accessToken property", async () => {
      const loginDto: LoginDto = {
        email: "mockEmail@example.com",
        password: 123456,
      };
      const loginResponse = await controller.login(loginDto);
      expect(loginResponse).toHaveProperty("accessToken");
    });
  });

  describe("testJwt method", () => {
    it("should return a user object", async () => {
      const user = await controller.testJwt({
        user: mockUser,
      } as PassportRequest);
      expect(user).toHaveProperty("id");
      expect(user).toHaveProperty("userIdLegacy");
      expect(user).toHaveProperty("email");
      expect(user).toHaveProperty("name");
      expect(user).toHaveProperty("posts");
    });
  });
});
