# We don't want to start from scratch.
# That is why we tell node here to use the current node image as base.
FROM node:alpine

# Create an application directory
RUN mkdir -p /app

# The /app directory should act as the main application directory
WORKDIR /app

# Copy the app package and package-lock.json file
COPY package*.json ./

# Install node packages
RUN npm install

 # Copy the types folder into the container
#COPY ../types /app/types 
ADD  C:\\Users\\Shira Levinzon\\Desktop\\TwitterProject\\types\\  /app/types/
# Copy or project directory (locally) in the current directory of our docker image (/app)
COPY . .

# Build the app
#RUN npm run build



# Start the app
CMD [ "npm", "start" ]