FROM node:14
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# ARG PORT=3000
# ENV PORT $PORT
# EXPOSE $PORT

# ARG DATABASE_URL
# ENV DATABASE_URL $DATABASE_URL
ARG DATABASE_URL
ENV DATABASE_URL $DATABASE_URL
RUN npm install -g nodemon
WORKDIR /movieKnexDatabase
COPY package*.json ./
RUN npm install 
COPY . .
CMD ["nodemon", "app.js";]
