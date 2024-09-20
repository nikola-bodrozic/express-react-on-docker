FROM node:18-alpine

# install latest upgrades
RUN apk -U upgrade

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Copy the dependencies file
COPY package.json .
COPY package-lock.json .

# Install dependencies
RUN npm install

# add app
COPY . .

CMD yarn start
