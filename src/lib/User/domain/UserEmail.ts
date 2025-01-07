export class UserEmail {
  constructor(public readonly value: string) {}

  domain(): string {
    return this.value.split("@")[1];
  }
}
