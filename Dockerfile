FROM node:20-alpine
RUN mkdir -p /opt/app
WORKDIR /opt/app
RUN adduser -S app
RUN chown -R app /opt/app
USER app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 5000
RUN npm run build
CMD [ "npm", "run", "preview" ]