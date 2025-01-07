export class UserId {
  constructor(public readonly value: string) {}

  equals(otherId: UserId): boolean {
    return this.value === otherId.value;
  }
}
