import bcrypt from 'bcrypt'

export async function hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hashed = await bcrypt.hash(password, saltRounds)
    return hashed;
}

export async function comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
    const matched = await bcrypt.compare(password, hashedPassword);
    return matched;
  }