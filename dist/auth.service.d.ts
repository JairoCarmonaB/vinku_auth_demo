import { ConfigModuleOptions } from "./entities/config_module.entity";
import { FirebaseProvider } from "./providers/firebase.provider";
import { IAccount } from "./entities/account.entity";
export declare class AuthService {
    private readonly authentication;
    private options;
    constructor(authentication: FirebaseProvider, options: ConfigModuleOptions);
    loggedByToken(token: string): Promise<string>;
    createSessionToken(uid: string): Promise<string>;
    getAccount(email: string): Promise<IAccount>;
    createAccount(accountDetails: {
        email: string;
        psw: string;
        name: string;
    }): Promise<IAccount>;
    deleteAccount(uid: string): Promise<boolean>;
}
