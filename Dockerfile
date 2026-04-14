FROM node:20

WORKDIR /app

# מעתיקים את כל הקבצים (כולל node_modules שהרגע נוצר אצלך)
COPY . .

# הגדרה למקרה שצריך להתחבר למסד הנתונים
ENV NODE_TLS_REJECT_UNAUTHORIZED=0

# אנחנו לא מריצים npm install ולא prisma generate כי הכל כבר מוכן!
CMD ["sh", "-c", "npx prisma migrate dev --name init && node main.js"]