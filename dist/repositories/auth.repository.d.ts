import { IAccount } from "../entities/account.entity";
export interface AuthenticationRepository {
    loggedByToken(token: string): Promise<string | null>;
    createSessionToken(uid: string): Promise<string | null>;
    getAccount(email: string): Promise<IAccount | null>;
    createAccount(accountDetails: {
        email: string;
        psw: string;
        name: string;
    }): Promise<IAccount | null>;
    deleteAccount(uuid: string): Promise<Boolean>;
}
