export class ApplicationPermission {
  id: number;
  typeAccess: string;
  value : string;
  constructor(typeAccess : string, value : string) {
    this.typeAccess = typeAccess;
    this.value = value;
  }
}
