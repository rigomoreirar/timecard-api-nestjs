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
