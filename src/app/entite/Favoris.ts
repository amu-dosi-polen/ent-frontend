export class Favoris {
  id: number;
  position : number;
  uid : string;
  fname : string;
  name : string;
  applicationId : number;

  constructor(position : number, name : string, fname : string, applicationId : number) {
    this.position = position;
    this.fname = fname;
    this.name = name;
    this.applicationId = applicationId;
  }
}
