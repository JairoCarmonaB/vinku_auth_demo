import admin from "firebase-admin";
import { Injectable } from "@nestjs/common";
import { AuthAdapter } from "../interface/auth-adapter.interface";
import { FirebaseConfig } from "../interface/firebase_config.interface";

@Injectable()
export class FirebaseProvider implements AuthAdapter {
    constructor() {}

    initializeApp(instance: FirebaseConfig) {
        admin.initializeApp({
            credential: admin.credential.cert(instance.accessData as admin.ServiceAccount),
            databaseURL: instance.databaseURL,
        });
    }

    async loggedByToken(token: string) {
        try {
            const DecodedIdToken = await admin.auth().verifyIdToken(token);
            return DecodedIdToken.uid;
        } catch (error) {
            throw new Error("Error verifying logged by token - Check logs");
        }
    }

    async createSessionToken(uid: string) {
        try {
            return admin.auth().createCustomToken(uid);
        } catch (error) {
            throw new Error("Error creating session token - Check logs");
        }
    }

    async getAccount<T>(email: string): Promise<T> {
        try {
            const account: any = await admin.auth().getUserByEmail(email);
            return account as T;
        } catch (error) {
            throw new Error("Error by getting account - Check logs");
        }
    }

    async createAccount<T>(accountDetails: { email: string; psw: string; name: string }): Promise<T> {
        try {
            const newUser: any = await admin.auth().createUser({
                disabled: false,
                email: accountDetails.email,
                password: accountDetails.psw,
                displayName: accountDetails.name,
            });
            return newUser as T;
        } catch (error) {
            throw new Error("Error by create account - Check logs");
        }
    }

    async deleteAccount(uid: string) {
        try {
            await admin.auth().deleteUser(uid);
            return true;
        } catch (error) {
            throw new Error("Error by delete account - Check logs");
        }
    }
}
