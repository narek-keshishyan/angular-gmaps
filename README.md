## Table of contents
* [Smile](#smile)
* [Installation pre-requisites](#installation-pre-requisites)
* [Installing the Angular CLI](#installing-the-Angular-CLI)
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [To Run the Development Backend Server](#To Run the Development Backend Server)
* [To run the Development UI Server](#To run the Development UI Server)
* [Helpers](#Helpers)

## Smile
Do not forget to smile :)
<img src="https://cdn.cdnparenting.com/articles/2021/06/04112330/115992457.jpg" data-canonical-src="https://cdn.cdnparenting.com/articles/2021/06/04112330/115992457.jpg" width="300" />

## Installation pre-requisites
For running this project we need node and npm installed on our machine.

## Installing the Angular CLI
With the following command the angular-cli will be installed globally in your machine:
```
npm install -g @angular/cli
```

## General info
A mobile-friendly application using the latest Angular version. 
The application has a navigation bar with two routes: the first one containing 
a fullscreen map displaying markers from a JSON file, and the second one containing 
a table with pagination and the ability to add, edit, and sort entries. 
Additionally, many locations are possible to add for example 15000 and more, 
the process is optimized.

## Technologies
Project is created with:
* Angular CLI: 15.2.0
* Node: 18.14.2
* Package Manager: npm 9.5.0
* Angular Material: 15.2.0
* Angular Google Maps: 15.2.0

## Setup
To run this project:

1. Using command line clone Git repository into your machine
```
git clone https://github.com/narek-keshishyan/angular-gmaps.git
```

2. Install npm dependencies
```
cd angular-gmaps
npm install
```

3. Create an API_KEY to provide it in the project and be able to work with the Google Maps. You can check 
steps how to create an API_KEY by this [link](https://developers.google.com/maps/documentation/embed/get-api-key)

## To Run the Development Backend Server

In order to be able to provide realistic examples, you will need in the playground a small REST API backend server. You can start the sample application backend with the following command:

    npm run server

This is a small Node REST API server.

## To run the Development UI Server

To run the frontend part of the code, you will use the Angular CLI:

    npm start 

The application is visible at port 4200: [http://localhost:4200](http://localhost:4200)

## Helpers
* Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

* Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

* Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

* Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

* Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
