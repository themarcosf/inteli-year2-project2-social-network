import { Test, TestingModule } from '@nestjs/testing';
import { ApplyService } from './apply.service';

describe('ApplyService', () => {
  let service: ApplyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApplyService],
    }).compile();

    service = module.get<ApplyService>(ApplyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Unit test to application
  it("Should apply to the project", async () => {
    var data: {
      roleId: '1',
      userId: "1",
      projectId: "1",
      offerId: "3",
      why: "know about react",
      which: "React, commucation and leadership",
      habilities: '',
      message: ''
    }

    expect(service.apply(data)).toBe(
      {
        userId: "1",
        projectId: "1",
        offerId: "3",
        why: "know about react",
        which: "React, commucation and leadership",
      }
    )
  });

  // Unit test for find apply by project id
  it("Should find a project applies", async () => {
    const projectId = '8080';
    const applyToFind = {
      userId: "1",
      projectId: "1",
      offerId: "3",
      why: "know about react",
      which: "React, commucation and leadership",
    };
    expect(service.getApplyByProjectId(projectId)).toBe(applyToFind);
  });
  // Unit test for find apply by user id
  it("Should find a user applies", async () => {
    const userId = '1';
    const applyToFind = {
      userId: "1",
      projectId: "1",
      offerId: "3",
      why: "know about react",
      which: "React, commucation and leadership",
    };
    expect(service.getApplyByUserId(userId)).toBe(applyToFind);
  });

  // Unit test for delete apply
  it("Should delete a apply", async () => {
    const applyId = '1';
    expect(service.deleteApply(applyId)).toBe('Application deleted successfully');
  });

  // Unit test for update a apply
  it("Should update a apply", async () => {
    const applyId = '1';
    const newData = {
      userId: "1",
      projectId: "1",
      offerId: "3",
      why: "know about nest",
      which: "Nest, commucation and leadership",
    };
    expect(service.updateApply(applyId, newData)).toBe(newData);
  });

  // Unit test for add feedback to apply
  it("Should add a feedback", async () => {
    const applyId = '1';
    const data = {
      feedback: "Sorry, we don't need more backend developers."
    };
    expect(service.updateApply(applyId, data)).toBe({
      userId: "1",
      projectId: "1",
      offerId: "3",
      why: "know about nest",
      which: "Nest, commucation and leadership",
      feedback: "Sorry, we don't need more backend developers."
    });
  });
});
