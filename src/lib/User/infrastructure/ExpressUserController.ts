import { NextFunction, Request, Response } from "express";
import { ServiceContainer } from "../../Shared/infrastructure/ServiceContainer";

export class ExpressUserController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await ServiceContainer.user.getAll.run();
      return res.json(users.map((user) => user.mapToPrimitives())).status(200);
    } catch (error) {
      next(error);
    }
  }

  async getOneById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await ServiceContainer.user.getOneById.run(req.params.id);
      return res.json(user.mapToPrimitives()).status(200);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { createdAt, email, name } = req.body as {
        name: string;
        email: string;
        createdAt: string;
      };
      await ServiceContainer.user.create.run(name, email, new Date(createdAt));

      return res.status(201).send();
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    console.log(req)
    try {
      const { createdAt, email, name } = req.body as {
        name: string;
        email: string;
        createdAt: string;
      };
      await ServiceContainer.user.update.run(
        req.params.id,
        name,
        email,
        new Date(createdAt)
      );

      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await ServiceContainer.user.delete.run(req.params.id);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
