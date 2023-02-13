export interface IAccount {
    uid: string;
    email: string;
    displayName: string | null;
    photoUrl: string | null;
    disable: boolean;
    metadata: IUserMetadata;
    tokensValidAfterTime: Date;
}

export interface IUserMetadata {
    creationTime: Date;
    lastSignInTime: Date;
    lastRefreshTime: Date;
}
