export class Store {
  Name: string;
  Branches: string[];
  Logo: string;

  constructor(name: string, branches:string[], logo: string) {
    this.Name = name;
    this.Branches = branches;
    this.Logo = logo;
  }
}
