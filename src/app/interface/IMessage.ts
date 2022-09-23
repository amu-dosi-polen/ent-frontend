export interface IMessage {
  id: number;
  message : string;
  toogleMsgStandard : boolean;
  toogleMsgImportant : boolean;
  dateDebut : string;
  dateFin : string;
  heureDebut : string;
  heureFin : string;
  sites: string[];
  campus : string[];
  typePeople : string;
  sender : string;
}
