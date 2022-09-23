export class Menu {
  id: number;
  name: string;
  position : string;
  applicationsJsonId : string [];

  constructor(name : string, position : string, applicationsJsonId: string[ ]) {
    this.name = name;
    this.position = position;
    this.applicationsJsonId = applicationsJsonId;
  }
}
