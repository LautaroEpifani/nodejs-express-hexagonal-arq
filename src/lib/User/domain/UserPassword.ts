export class UserPassword {
  constructor(public readonly value: string) {}
  get(): string {
    return this.value;
  }
}