FROM node:8.9.4
WORKDIR /usr/app
COPY ["package.json", "package-lock.json", "./"]
RUN npm install
RUN npm install -g @angular/cli@6.1.5
COPY . ./
CMD ng serve --host 0.0.0.0
