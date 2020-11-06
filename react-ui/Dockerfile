FROM node:12

WORKDIR /usr/bin/twitsearch/ui
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm","start"]