import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

class TeamProfilRepository {
	async readAll() {
		const [rows] = await databaseClient.query<Rows>(
			"select * from user where is_admin = 1",
		);

		return rows;
	}
}
export default new TeamProfilRepository();
