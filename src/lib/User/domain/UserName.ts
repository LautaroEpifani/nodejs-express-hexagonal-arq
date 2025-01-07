export class UserName {
  constructor(public readonly value: string) {}

  capitalize(): string {
    return this.value.charAt(0).toUpperCase() + this.value.slice(1);
  }
}