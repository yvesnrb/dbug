## Dbug Server

This package implements the web server for the dbug application. You must fill
out the following environment variables for this application to work properly. A
file called '.env.template' at the root of the package is provided for your
convenience, copy it to the same path with the name of '.env' and fill where
necessary.

|variable              |recommended value             |
|----------------------|------------------------------|
|APP_PORT              |5000                          |
|GITHUB_CLIENT_ID      |N/A                           |
|GITHUB_CLIENT_SECRET  |N/A                           |
|TYPEORM_CONNECTION    |postgres                      |
|TYPEORM_HOST          |N/A                           |
|TYPEORM_PORT          |N/A                           |
|TYPEORM_USERNAME      |N/A                           |
|TYPEORM_PASSWORD      |N/A                           |
|TYPEORM_DATABASE      |N/A                           |
|TYPEORM_MIGRATIONS    |src/database/migrations/*.ts  |
|TYPEORM_ENTITIES      |src/entities/*.ts             |
|JWT_KEY               |a very long and random string |
|JWT_EXP               |1h                            |
|CORS_ORIGIN           |url of your front-end         |
