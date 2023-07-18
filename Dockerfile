FROM node:lts-alpine
ARG SOME_ARG
ENV NODE_EVN=$SOME_ARG
WORKDIR /usr/src/app
COPY ["package.json", "npm-shrinkwrap.json*", "./"]
# RUN npm install mysql ../
RUN npm install --production --silent && mv node_modules ./
COPY . .
# RUN npm rollback 
# RUN npm test 
# RUN npm seed
EXPOSE 3002
USER node
CMD ["npm", "start"]
