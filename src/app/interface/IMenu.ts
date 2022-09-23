import { IApplication } from './IApplication';

export interface IMenu {
  id: number;
  name: string;
  firstname: string;
  email : string;
  uid : string;
  position: number;
  open : boolean;
  menu : [{
      id: number;
      name: string;
      applications : IApplication [];

    }];
  applicationsMandatory : IApplication [];
  applicationsFavorites : IApplication [];
  applicationsMoreClicked : IApplication [];

}
