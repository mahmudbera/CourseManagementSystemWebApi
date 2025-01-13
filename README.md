# Course Management System

## Introduction

The Course Management System is a web application developed using ASP.Net Core MVC. This project aims to provide basic CRUD operations and their representation on the front end for a basic level course management system.

## Technical Features

* ASP.Net Core MVC Framework

  Combines front-end and back-end functionalities in one structure.

* Entity Framework Core
  
  Provides seamless database integration and management.

## Technological Used

* ASP.Net Core MVC: For building the application logic and views.
* Entity Framework Core: For database operations.
* Sqlite3: As the primary database.

## Project Structure
* Entities: Contains classes that represent the application's core data models.
* ManagementSystem: Here, there are front-end pages (views) that the user interacts with and controller structures that allow the user to transmit data to the back-end.
* Repositories: Layer files where data coming from the service layer is processed in the database are located here.
* Services: There are services that process the logic of the data sent by the user using the controller and transfer it to the relevant layer according to the result.

## Alternate Version
The Course Management System also has a version where the back-end is rewritten as a Web API using ASP.Net Core, and the front-end is developed using React. You can find it here:

<a href="https://github.com/mahmudbera/CourseManagementSystemWebApi" target="_blank"> </a>
