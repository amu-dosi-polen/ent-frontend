export class Gestionnaire {

  id : number;
  uid : string;
  name : string;
  firstname : string;
  role : string;

  constructor(uid: string, name: string, firstname: string, role: string) {
    this.uid = uid;
    this.name = name;
    this.firstname = firstname;
    this.role = role;
  }
}
