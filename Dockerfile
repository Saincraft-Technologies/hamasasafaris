FROM node:lts-alpine
ARG SOME_ARG
ENV NODE_EVN=$SOME_ARG
WORKDIR /usr/src/hamasa
COPY ["package.json", ".env.example","package-lock.json*", "npm-shrinkwrap.json*", "./"]
# RUN npm install mysql2 ../
RUN npm install --production --silent && mv node_modules ./
COPY . .
RUN rm -rf .env && cp .env.example .env
# RUN npm run migrate 
# RUN npm run seed 
EXPOSE 3001
USER node
CMD ["npm", "start"]
