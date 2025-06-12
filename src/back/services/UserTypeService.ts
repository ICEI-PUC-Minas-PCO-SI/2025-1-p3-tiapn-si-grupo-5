import { PrismaClient } from "../generated/prisma";
const prisma = new PrismaClient();

export class UserTypeService {
    async getUserTypes() {
        return prisma.tipousuario.findMany();
    }
}
