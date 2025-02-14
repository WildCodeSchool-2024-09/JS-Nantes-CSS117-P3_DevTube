import { T } from "@faker-js/faker/dist/airline-C5Qwd7_q";
import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";
import type { User } from "./../../modules/user/user";

class TeamProfilRepository {
	async readAll() {
		// Execute the SQL SELECT query to retrieve a specific item by its ID
		const [rows] = await databaseClient.query<Rows>(
			"select * from user where is_admin = 1",
		);

		// Return the first row of the result, which represents the user
		return rows;
	}
}

export default new TeamProfilRepository();
