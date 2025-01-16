import { UserId } from "../../../../src/lib/User/domain/UserId";
import { User } from "../../../../src/lib/User/domain/User";
import { randEmail, randFirstName, randPassword, randUuid } from "@ngneat/falso";
import { UserName } from "../../../../src/lib/User/domain/UserName";
import { UserCreatedAt } from "../../../../src/lib/User/domain/UserCreatedAt";
import { UserEmail } from "../../../../src/lib/User/domain/UserEmail";
import { UserPassword } from "../../../../src/lib/User/domain/UserPassword";

export class UserStub {

  static create(): User {
    return new User(
      new UserId(randUuid()),
      new UserName(randFirstName()),
      new UserEmail(randEmail()),
      new UserCreatedAt(new Date()),
      new UserPassword(randPassword()),
    );
  }

  static update(newName: string, user: User): User {
    return new User(
        user.id, 
        new UserName(newName), 
        user.email, 
        user.createdAt,
    );
}
}
