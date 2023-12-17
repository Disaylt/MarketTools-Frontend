FROM node:14.15.4
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build -- --prod
EXPOSE 4200
CMD [ "npm", "run", "start" ]