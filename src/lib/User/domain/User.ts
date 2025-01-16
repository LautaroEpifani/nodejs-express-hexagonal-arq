import { UserId } from "./UserId";
import { UserName } from "./UserName";
import { UserEmail } from "./UserEmail";
import { UserCreatedAt } from "./UserCreatedAt";
import { UserPassword } from "./UserPassword";

export class User {
  constructor(
    public readonly id: UserId,
    public readonly name: UserName,
    public readonly email: UserEmail,
    public readonly createdAt: UserCreatedAt,
    public readonly password?: UserPassword,
  ) {}

  public mapToPrimitives() {
    return {  
      id: this.id.value,
      name: this.name.value,
      email: this.email.value,
      password: this.password?.value,
      createdAt: this.createdAt.format(),
    };
  }
}
