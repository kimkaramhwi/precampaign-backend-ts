declare const _default: {
    NODE_ENV: string;
    PORT: string;
    db: {
        DB_HOST: string;
        DB_USER: string;
        DB_PASS: string;
        DB_NAME: string;
        dialect: string;
        pool: {
            max: number;
            min: number;
            acquire: number;
            idle: number;
        };
    };
    auth: {
        secret: string;
    };
};
export default _default;
