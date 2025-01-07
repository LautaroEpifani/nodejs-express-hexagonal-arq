export class UserCreatedAt {
  constructor(public readonly value: Date) {}

  format(): string {
    return this.value.toISOString();
  }
}