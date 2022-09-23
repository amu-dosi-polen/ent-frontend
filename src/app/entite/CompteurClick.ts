export class CompteurClick {
  id: number;
  compteur : number;
  fname : string;
  applicationId : number;

  constructor(compteur : number, fname : string) {
    this.compteur = compteur;
    this.fname = fname;
  }
}
