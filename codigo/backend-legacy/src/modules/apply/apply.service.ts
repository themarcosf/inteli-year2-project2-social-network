import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { createApplyDTO } from './DTOs/createApply.dto';
import {
  BadRequestException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common/exceptions';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ApplyService {
  constructor(private readonly prisma: PrismaService) {}

  async apply(infos: createApplyDTO) {
    //verify if the project exists
    const project = await this.prisma.project.findUnique({
      where: {
        projectId: infos.projectId,
      },
    });

    if (!project) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: 'Project does not exist',
      });
    }

    if (project.status !== 'Approved') {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: 'Project is not approved',
      });
    }

    let roles = 0;

    JSON.parse(project.roles).map((role) => {
      console.log(role.vacancies)
      roles += role.vacancies
    });

    //Get all applies to the project
    const applies = await this.prisma.apply.findMany({
      where: {
        projectId: infos.projectId,
      },
    });

    if (applies.length >= roles) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: 'Project is full',
      });
    }

    //verify if the user exists
    const user = await this.prisma.user.findUnique({
      where: {
        id: infos.userId,
      },
    });

    if (!user) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: 'User does not exist',
      });
    }

    //verify if the user is already applied to the project
    const alreadyApplied = await this.prisma.apply.findMany({
      where: {
        userId: infos.userId,
        projectId: infos.projectId,
      },
    });

    if (alreadyApplied.length > 0) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: 'Application already exists',
      });
    }

    //veridy if offer exists
    let offerExists = false;
    JSON.parse(project.roles).map((role) => {
      if (role.role === infos.offerName) {
        offerExists = true;
      }
    });

    if (!offerExists) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: 'Offer does not exist',
      });
    }

    //create the apply
    try {
      await this.prisma.apply.create({
        data: {
          id: uuid(),
          userId: infos.userId,
          projectId: infos.projectId,
          offerName: infos.offerName,
          why: infos.why,
          habilities: infos.habilities,
        },
      });
    } catch (err) {
      throw new InternalServerErrorException('Something bad happened', {
        cause: new Error(),
        description: err,
      });
    }

    


    return 'Application created successfully';
  }

  async getApplyByProjectId(projectId: string) {
    const apply = await this.prisma.apply.findMany({
      where: {
        projectId,
      },
    });

    return apply;
  }

  async getApplyByUserId(userId: string) {
    const apply = await this.prisma.apply.findMany({
      where: {
        userId,
        status: 'Approved',
      },
    });

    const projects = await this.prisma.project.findMany({
      where: {
        projectId: {
          in: apply.map((apply) => apply.projectId),
        },
      },
      include: {
        applies: true
      },
    });

    return projects;
  }

  async deleteApply(id: string) {
    //verify if the apply exists
    const applyExists = await this.prisma.apply.findUnique({
      where: {
        id,
      },
    });

    if (!applyExists) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: 'Application does not exist',
      });
    }

    if(applyExists.status === 'Approved') {
      //Add 1 to the number of roles
      const project = await this.prisma.project.findUnique({
        where: {
          projectId: applyExists.projectId,
        },
      });

      let newRoles = JSON.parse(project.roles).map((role) => {
        if (role.role === applyExists.offerName) {
          role.vacancies = Number(role.vacancies)
          role.vacancies += 1;
          role.vacancies = String(role.vacancies);
        } 
        return role;
      });

      try {
        await this.prisma.project.update({
          where: {
            projectId: applyExists.projectId,
          },
          data: {
            roles: JSON.stringify(newRoles),
          },
        });
      } catch (err) {
        throw new InternalServerErrorException('Something bad happened', {cause: new Error(), description: err});
      }
    }

    try {
      await this.prisma.apply.delete({
        where: {
          id,
        },
      });
    } catch (err) {
      throw new InternalServerErrorException('Something bad happened', {
        cause: new Error(),
        description: err,
      });
    }

    return 'Application deleted successfully';
  }

  async updateApply(id: string, data: any) {
    //verify if the apply exists
    const applyExists = await this.prisma.apply.findUnique({
      where: {
        id,
      },
    });

    if (!applyExists) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: 'Application does not exist',
      });
    }

    try {
      await this.prisma.apply.update({
        data,
        where: {
          id: id,
        },
      });
    } catch (err) {
      throw new InternalServerErrorException('Something bad happened', {
        cause: new Error(),
        description: err,
      });
    }

    return 'Application updated successfully';
  }



  async createFeedback(id: string, feedback: string, status: string) {
    const applyExists = await this.prisma.apply.findUnique({
      where: {
        id,
      },
    });

    if (!applyExists) {
      throw new BadRequestException('Something bad happened', {cause: new Error(), description: 'Application does not exist'});
    }

    if(applyExists.status === 'Approved') {
      console.log("entrou")
      //Add 1 to the number of roles
      const project = await this.prisma.project.findUnique({
        where: {
          projectId: applyExists.projectId,
        },
      });

      let newRoles = JSON.parse(project.roles).map((role) => {
        if (role.role === applyExists.offerName) {
          role.vacancies = Number(role.vacancies)
          role.vacancies += 1;
          role.vacancies = String(role.vacancies);
        } 
        return role;
      });

      try {
        await this.prisma.project.update({
          where: {
            projectId: applyExists.projectId,
          },
          data: {
            roles: JSON.stringify(newRoles),
          },
        });
      } catch (err) {
        throw new InternalServerErrorException('Something bad happened', {cause: new Error(), description: err});
      }
    }

    if(feedback) {
      try {
        await this.prisma.apply.update({
          data: {
            status: status,
            feedback: feedback,
          },
          where: {
            id: id,
          },
        });
      } catch (err) {
        throw new InternalServerErrorException('Something bad happened', {cause: new Error(), description: err});
      }
    } else {
      try {
        await this.prisma.apply.update({
          data: {
            status: status,
          },
          where: {
            id: id,
          },
        });
      } catch (err) {
        throw new InternalServerErrorException('Something bad happened', {cause: new Error(), description: err});
      }
    }
   
    return 'Status changed successfully';
  }

  async approveApply(id: string) {
    const applyExists = await this.prisma.apply.findUnique({
      where: {
        id,
      },
    });

    if (!applyExists) {
      throw new BadRequestException('Something bad happened', {cause: new Error(), description: 'Application does not exist'});
    }

    //Remove 1 from the offer quantity
    const project = await this.prisma.project.findUnique({
      where: {
        projectId: applyExists.projectId,
      },
    });

    let newRoles = JSON.parse(project.roles).map((role) => {
      if (role.role === applyExists.offerName) {
        role.vacancies -= 1;
        role.vacancies = String(role.vacancies);
      } 
      return role;
    });

    try {
      await this.prisma.project.update({
        where: {
          projectId: applyExists.projectId,
        },
        data: {
          roles: JSON.stringify(newRoles),
        },
      });
    } catch (err) {
      throw new InternalServerErrorException('Something bad happened', {cause: new Error(), description: err});
    }

    try {
      await this.prisma.apply.update({
        data: {
          status: "Approved",
        },
        where: {
          id: id,
        },
      });
    } catch (err) {
      throw new InternalServerErrorException('Something bad happened', {cause: new Error(), description: err});
    }
  }

  getApplyById(projectId: string, userId: string) {
    const isApplied = this.prisma.apply.findMany({
      where: {
        projectId: projectId,
        userId: userId
      },
    });

    return isApplied;
  }
}
