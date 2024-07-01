export class DBconfig {

    getHost = (): string => {
        return process.env.DB_HOST;
    }

    getPort = (): string => {
        return process.env.DB_PORT;
    }

    getUsername = (): string => {
        return process.env.DB_USERNAME;
    }
    getPassword = (): string => {
        return process.env.DB_PASSWORD;
    }
    getDatabase = (): string => {
        return process.env.DB_DATABASE;
    }
    getType = (): string => {
        return process.env.DB_TYPE;
    }

}