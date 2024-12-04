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



