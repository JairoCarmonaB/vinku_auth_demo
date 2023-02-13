import { Injectable, Inject, NotFoundException } from "@nestjs/common";
import { MODULE_OPTIONS_TOKEN } from "./config.module-definition";
import { ConfigModuleOptions } from "./entities/config_module.entity";
import { FirebaseProvider } from "./providers/firebase.provider";
import { IAccount } from "./entities/account.entity";

@Injectable()
export class AuthService {
    constructor(private readonly authentication: FirebaseProvider, @Inject(MODULE_OPTIONS_TOKEN) private options: ConfigModuleOptions) {
        if (!options?.file) throw new NotFoundException(`Its necessary a config file because its needed in initialize auth in vinku_auth`);
        this.authentication.initializeApp(options.file);
    }

    async loggedByToken(token: string) {
        return this.authentication.loggedByToken(token);
    }

    async createSessionToken(uid: string) {
        return this.authentication.createSessionToken(uid);
    }

    async getAccount(email: string) {
        return this.authentication.getAccount<IAccount>(email);
    }

    async createAccount(accountDetails: { email: string; psw: string; name: string }) {
        return this.authentication.createAccount<IAccount>(accountDetails);
    }

    async deleteAccount(uid: string) {
        return this.authentication.deleteAccount(uid);
    }
}
