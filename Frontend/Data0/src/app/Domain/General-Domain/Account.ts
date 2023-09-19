export class Account {
    constructor(
      public userId: string,
      public isOwner: boolean,
      public isActivated: boolean,
      public activationKey: string,
      public email: string,
      public name1: string | null,
      public mobNo: string,
      public password: string | null,
      public city: string
    ) {}
  }