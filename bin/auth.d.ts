type AuthArgs = {
    clientId: string;
    clientSecret: string;
    scope: string;
    environment: 'prod' | 'stage' | string;
};
export declare function auth({ clientId, clientSecret, scope, environment }: AuthArgs): Promise<string>;
export {};
