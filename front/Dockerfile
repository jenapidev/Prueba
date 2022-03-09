FROM node:14-alpine AS development
ENV NODE_ENV development
# Add a work directory
WORKDIR /app
# Cache and Install dependencies
COPY package.json /app
RUN npm i
# Copy app files
COPY . /app
# Expose port
EXPOSE 3000
# Start the app
CMD [ "npm", "run", "dev" ]