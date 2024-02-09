import { Response, Router } from "express";
import { z } from "zod";
import validate from "../utils/validate";
import { UserRequest } from "../types/user";
import Domain from "../models/domain";

const domainSchema = z.object({
  body: z.object({
    name: z.string().max(32),
    ip: z.string().regex(/^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/, {
      message: "is not valid",
    }),
    port: z.number().min(1).max(65535),
    username: z.string().max(32),
    password: z.string().max(32),
  }),
});

const domainRouter = Router()
  .get("/all", async (req: UserRequest, res: Response) => {
    try {
      if (!req.user) return res.status(403).end();

      const domains = await Domain.find({ userId: req.user.id });

      return res.json(domains);
    } catch (err) {
      return res.status(400).json(err);
    }
  })
  .post(
    "/add",
    validate(domainSchema),
    async (req: UserRequest, res: Response) => {
      try {
        const { name, ip, port, username, password } = req.body;

        if (!req.user) return res.status(403).end();

        const newDomain = new Domain({
          userId: req.user.id,
          name,
          ip,
          port,
          username,
          password,
        });

        await newDomain.save();

        return res.json("Added new domain");
      } catch (err) {
        return res.status(400).json(err);
      }
    }
  )
  .post("/remove", async (req: UserRequest, res: Response) => {
    try {
      const { id } = req.body;

      const domain = await Domain.findById(id);

      if (!domain) return res.status(404).end();

      if (domain.userId !== req.user?.id) return res.status(403).end();

      await domain.deleteOne();

      return res.json(`Domain ${id} deleted`);
    } catch (err) {
      return res.status(400).json(err);
    }
  });

export default domainRouter;
