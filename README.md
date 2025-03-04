# Topic
Repo holding api for task project

# Prisma things:
For prisma configuration make sure to add something like this to .env:
DATABASE_URL="postgresql://${POSTGRESQL_USERNAME}:${POSTGRESQL_PASSWORD}@${POSTGRESQL_DB_HOST}:${POSTGRESQL_DB_PORT}/${POSTGRESQL_DB_NAME}?schema=public"

(Optional if you want it:)
DIRECT_URL="postgresql://${POSTGRESQL_USERNAME}:${POSTGRESQL_PASSWORD}@${POSTGRESQL_DB_HOST}:${POSTGRESQL_DB_PORT}/${POSTGRESQL_DB_NAME}?schema=public"

Next:
npm install prisma --save-dev
npm install @prisma/client

Next:
npx prisma init

For prisma validation:
npx prisma validate

To do a migration:
npx prisma migrate dev --name MIGRATION_NAME

For verifying using prisma studio:
npx prisma studio

Delete all data and start fresh:
npx prisma migrate reset

