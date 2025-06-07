import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export async function hashPassword(password: string){
    const hashedSenha = await bcrypt.hash(password, SALT_ROUNDS);
    return hashedSenha;
}

export async function compareHashedPassword(password: string, hashedPassword: string) {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
}