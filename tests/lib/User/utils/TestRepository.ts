import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import { users } from "../../../../src/lib/User/infrastructure/DrizzlePostgresUser/schema";

export class TestRespository {
    private db: NodePgDatabase;

    constructor(databaseUrl: string) {
        this.db = drizzle(databaseUrl);
    }

    async deleteAll(): Promise<void> {
        await this.db.delete(users);
    }
}