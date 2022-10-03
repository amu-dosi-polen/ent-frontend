# AMUENT

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


# Plusieurs fichiers à modifier

```
src/environments/environment.ts:  listeEntInfoURL : 'https://ent.univ.fr/amu-ent-infos-backend/message/liste-messages-user',
src/environments/environment.ts:  closeEntInfoURL : 'https://uportal4.univ.fr/amu-ent-info-backend/message/close-message-liste',
src/environments/environment.ts:  mailURL : 'https://mail.univ.fr/AmuInfoUser/api/stats',
src/index.html:    <link rel="stylesheet" href="https://ent.univ.fr/fonts-fa/css/all.min.css">
src/app/application/application.component.ts:    var groupieUrl = "https://groupie.univ.fr/group/see/"+groupLdap+"/false/all";
src/app/navbar/navbar.component.html:   <a class="navbar-brand" href="https://www.univ.fr/" target="true">
src/app/navbar/navbar.component.html:       <button class="fa fa-globe-americas" (click)="openLink('https://www.univ.fr/intramu', 'amu')" title="IntrAMU"></button>
src/app/navbar/navbar.component.html:   <img src="../assets/img/logo/logo_amu.png" width="auto" height="40" alt="logo Amu">
src/app/navbar/navbar.component.html:	<button class="fa fa-globe-americas" (click)="openLink('https://www.univ.fr/intramu', 'amu')" title="IntrAMU"></button>
src/app/navbar/navbar.component.html:	<button class="fab fa-facebook-f" (click)="openLink('https://www.facebook.com/','fb')" title="facebook"></button>
src/app/navbar/navbar.component.html:	<button class="fab fa-twitter"(click)="openLink('https://twitter.com/', 'tw')" title="twitter"></button>
src/app/navbar/navbar.component.html:   <button class="fab fa-linkedin-in"(click)="openLink('https://www.linkedin.com/edu/', 'lk')" title="linkedin"></button>
src/app/tableauBord/tableau-bord.component.html:      <a target="_blank" href="http://www.univ.fr/fr/mentions-legales">MENTIONS LÉGALES</a>
src/img/logo/logo-amu.svg
src/assets/img/logo/logo_amu.png
src/assets/img/logo/logo-amu.svg
```

## Run via docker

This may be the fastest way to get this application working for testing.

With this, you don't have to install specific versions of node / npm / angular on your system. You "just" have to install docker.

```
docker build . -t ent-frontend
docker run -p 4200:4200 ent-frontend
```
Navigate to `http://localhost:4200/`


