import { UserId } from "./UserId";
import { UserName } from "./UserName";
import { UserEmail } from "./UserEmail";
import { UserCreatedAt } from "./UserCreatedAt";

export class User {
  constructor(
    public readonly id: UserId,
    public readonly name: UserName,
    public readonly email: UserEmail,
    public readonly createdAt: UserCreatedAt
  ) {}

  public mapToPrimitives() {
    return {
      id: this.id.value,
      name: this.name.value,
      email: this.email.value,
      createdAt: this.createdAt.format(),
    };
  }
}
