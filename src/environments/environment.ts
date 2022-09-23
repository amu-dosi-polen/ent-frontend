// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  origin: '',

  callback :'http://localhost:8080/ent/login?callback=JSONP_CALLBACK',
  login : 'http://localhost:8080/ent/login?then=',
  remoteAccueil: 'http://localhost:4200/index.html',
  logoutURL : 'http://localhost:8080/ent/logout',
  allGestionnaireURL :'http://localhost:8080/ent/all-users',
  addGestionnaireURL :'http://localhost:8080/ent/add-user',
  deleteGestionnaireURL :'http://localhost:8080/ent/delete-user',
  updateGestionnaireURL :'http://localhost:8080/ent/update-user',
  infoGestionnaireURL : 'http://localhost:8080/ent/info-user',
  currentUidURL : 'http://localhost:8080/ent/current-uid',
  menuURL : 'http://localhost:8080/ent/get-menus-applications-user',
  applicationsFavoritesURL : 'http://localhost:8080/ent/get-applications-favorites',
  applicationsMoreClickedURL : 'http://localhost:8080/ent/get-applications-more-cliked',
  allApplicationURL : 'http://localhost:8080/ent/get-all-applications',
  addApplicationURL : 'http://localhost:8080/ent/add-application',
  deleteApplicationURL : 'http://localhost:8080/ent/delete-application',
  updateApplicationURL : 'http://localhost:8080/ent/update-application',
  getLdapApplicationPermissionURL : 'http://localhost:8080/ent/get-ldap-application-permission',
  getUserApplicationPermissionURL : 'http://localhost:8080/ent/get-user-application-permission',
  allPermissionURL :'http://localhost:8080/ent/get-all-application-permission',
  addPermissionURL :'http://localhost:8080/ent/add-application-permission',
  deletePermissionURL :'http://localhost:8080/ent/delete-application-permission',
  updatePermissionURL :'http://localhost:8080/ent/update-application-permission',
  allMenuURL : 'http://localhost:8080/ent/get-all-menus',
  addMenuURL : 'http://localhost:8080/ent/add-menu',
  deleteMenuURL : 'http://localhost:8080/ent/delete-menu',
  updateMenuURL : 'http://localhost:8080/ent/update-menu',
  updateMenuPositionURL : 'http://localhost:8080/ent/update-menu-position',
  addFiltreURL : 'http://localhost:8080/ent/add-filtre',
  deleteFiltreURL : 'http://localhost:8080/ent/delete-filtre',
  updateFiltreURL : 'http://localhost:8080/ent/update-filtre',
  allFiltreUrl :'http://localhost:8080/ent/all-filtres',
  addFavorisURL : 'http://localhost:8080/ent/add-favoris',
  deleteFavorisURL : 'http://localhost:8080/ent/delete-favoris',
  addCompteurClickURL : 'http://localhost:8080/ent/add-compteur-click',
  deleteCompteurClickURL : 'http://localhost:8080/ent/delete-compteur-click',
  getAllGroupsLdapURL : 'http://localhost:8080/ent/get-all-groups',
  getUsersLdapURL : 'http://localhost:8080/ent/get-users-ldap',
  siamuURL : 'http://localhost:8080/ent/get-siamu',
  listeEntInfoURL : 'https://ent.univ.fr/amu-ent-infos-backend/message/liste-messages-user',
  closeEntInfoURL : 'https://uportal4.univ.fr/amu-ent-info-backend/message/close-message-liste',
  mailURL : 'https://mail.univ.fr/AmuInfoUser/api/stats',
  getURL : 'http://localhost:8080/ent/get-compteur'


};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
