import { AuthAdapter } from "../interface/auth-adapter.interface";
import { FirebaseConfig } from "../interface/firebase_config.interface";
export declare class FirebaseProvider implements AuthAdapter {
    constructor();
    initializeApp(instance: FirebaseConfig): void;
    loggedByToken(token: string): Promise<string>;
    createSessionToken(uid: string): Promise<string>;
    getAccount<T>(email: string): Promise<T>;
    createAccount<T>(accountDetails: {
        email: string;
        psw: string;
        name: string;
    }): Promise<T>;
    deleteAccount(uid: string): Promise<boolean>;
}
