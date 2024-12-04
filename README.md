After downloaded de code in your disk, find the folder where you put it.  Install Angular 16 with:

npm i @angular/cli@16.1.0

##

to communicate with the backend to frontend use a service with the default parameters, you need to change it if necessary

![001](https://github.com/user-attachments/assets/8be86523-64b0-4432-b816-494a334a5d4a)

Change the port and path if necessary.

![002](https://github.com/user-attachments/assets/b6ce84c4-f38e-4f80-a680-0df1e024c3ef)

##

# FrontendC

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

# Bug in Angular (Maybe)
When you run "ng serve" in angular 16, this could produce an error like:

![bug_angular](https://github.com/user-attachments/assets/0720fee5-88a8-47dc-9322-6c6c496c040c)

For an unkown reason the picture "check2.png" does not load and this image does not exist anywhere.  To solve this you need to go to your folder: "..\src\assets\images" where you should find 2 pictures: img0.png and img1.png, copy bouth of them somewhere in your disk then delete the originals, after this acction "ng serve" would show success.
Finaly copy again the images: img0.png and img1.png to "..\src\assets\images".

![bug_angular02](https://github.com/user-attachments/assets/200e3431-7c9d-4e36-95ca-6a7cbd93d563)



