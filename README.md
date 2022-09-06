# NightTable REST API

This is the NightTable server which will be used to funnel various requests from the client facing mobile application,
POS application, and web admin panel.

It will also be used to service requests for payments, messaging, and creating new table requests. 

## Basic Setup

This is a NodeJS project using the Express framework to launch the web server. We are using the supertest
framework to conduct unit tests on the project.

In order to run the project, clone the repository, navigate into the project and run the following command. 

npm install

Once all dependenices are installed, you can start up a local instance by running the command

node server.js
