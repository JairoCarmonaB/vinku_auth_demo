export interface AuthAdapter {
    loggedByToken(token: string): Promise<string>;
    createSessionToken(id: string): Promise<string>;
    getAccount<T>(email: string): Promise<T>;
    createAccount<T>(accountDetails: {
        email: string;
        psw: string;
        name: string;
    }): Promise<T>;
    deleteAccount(uuid: string): Promise<Boolean>;
}
