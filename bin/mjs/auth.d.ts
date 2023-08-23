type AuthArgs = {
    clientId: string;
    clientSecret: string;
    scope: string;
};
export default function auth({ clientId, clientSecret, scope }: AuthArgs): Promise<string>;
export {};
