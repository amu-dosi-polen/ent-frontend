import { ApplicationPermission } from '../entite/ApplicationPermission';

export class Application {
  id: number;
  name: string;
  fname: string;
  url : string;
  requete : string;
  key : string;
  timer : number;
  description : string;
  icon : string;
  iconFavoris : string;
  color : string;
  action : string;
  isMandatory : boolean;
  isFavorite : boolean;
  isMoreClicked : boolean;
  conditionAffichage : string;
  applicationsPermission : ApplicationPermission[];
  dateDebut : string;
  dateFin : string;
  timeDebut : string;
  timeFin : string;
  actif : boolean;
  tous : boolean;
  tousEmployee : boolean;
  tousFaculty : boolean;
  tousResearch : boolean;
  tousAffiliate : boolean;
  tousRetired : boolean;
  tousEtu : boolean;
  tousAlum : boolean;

  constructor(name : string, fname : string, url : string, requete : string, key : string, timer : number,
    description : string, icon : string, color : string, action : string, conditionAffichage : string,
    applicationsPermission :ApplicationPermission[ ], dateDebut : string, dateFin : string,
    timeDebut : string, timeFin : string, actif : boolean, tous : boolean, tousEmployee : boolean, tousEtu : boolean,
    tousAlum : boolean, tousFaculty : boolean, tousResearch : boolean, tousAffiliate : boolean, tousRetired : boolean ) {
    this.name = name;
    this.fname = fname;
    this.url = url;
    this.requete = requete;
    this.key = key;
    this.timer = timer;
    this.description = description;
    this.icon = icon;
    this.color = color;
    this.action = action;
    this.conditionAffichage = conditionAffichage;
    this.applicationsPermission = applicationsPermission;
    this.dateDebut = dateDebut;
    this.dateFin = dateFin;
    this.actif = actif;
    this.tous = tous;
    this.tousEmployee = tousEmployee;
    this.tousFaculty = tousFaculty;
    this.tousResearch = tousResearch;
    this.tousAffiliate = tousAffiliate;
    this.tousRetired = tousRetired;
    this.tousEtu = tousEtu;
    this.tousAlum = tousAlum;
  }
}
