
ScStore is an educational project developed for the Angular course at SoftUni, which includes both Backend (BE) and Frontend (FE) development.

Project Description

ScStore is a web application that connects users who want to sell their laptops or computers with those who are looking for second-hand devices. The platform offers various functionalities for both registered users and guests.

Key Features:
Registration and Login: Users must create an account and log in to access the full functionality of the application.
Offers: Registered users can create, edit, and delete their offers for selling devices.
Profile Page: Each user has their own profile page, which can be edited.
Search and Filter: The application provides a search feature that allows users to filter devices by brand.
Wish List: Users can add devices to their wish list and contact the seller using the provided contact information.
Mailbox: Users can send messages to each other, read them and reply.
Guest Users: Guests can browse the device catalog and view detailed device pages, but they do not have access to seller information.
Technologies Used:
Frontend (FE): Angular 16
Backend (BE): Express.js
Database: MongoDB
Running the Project:
1. Start Frontend:
Navigate to the ScStore folder.
Install dependencies:

cd scStore
npm install

Start the application with the following commands:
ng serve


2. Start Backend:
Navigate to the Server folder.
Install dependencies:
cd server
npm install
Start the server with the following commands:
npm start

The server will run on port 3000.
The database will be connected to localhost:27017, with the name scStore.


3. Make sure that MongoDB is running locally at mongodb://localhost:27017.

