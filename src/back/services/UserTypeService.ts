import { PrismaClient } from "../generated/prisma";
const prisma = new PrismaClient();

export class UserTypeService {
    async getAllUserTypes() {
        return prisma.tipousuario.findMany();
    }
}
