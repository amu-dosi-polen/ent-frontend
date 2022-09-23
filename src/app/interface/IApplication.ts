export interface IApplication {
  id: number;
  dateDebut : string;
  dateFin : string;
  timeDebut : string;
  timeFin : string;
  actif : boolean;
  name: string;
  fname: string;
  url : string;
  description : string;
  icon : string;
  color : string;
  action : string;
  timer: number;
  conditionAffichage : string;
  applicationsPermission : [{
      id: number;
      name: string;
      typeAccess : string;
      value : string;
    }];
}
