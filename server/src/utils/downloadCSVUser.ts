import type { Response } from "express";
import { Parser } from "json2csv";
import type { User } from "../modules/user/user";

export const downloadCsvUser = (
  res: Response,
  data: User[],
  fileName: string,
) => {
  const fields = [
    "firstname",
    "lastname",
    "email",
    "github_url",
    "linkedin_url",
    "register_date",
    "is_admin",
  ];
  const json2csv = new Parser({ fields, delimiter: ";" });

  const csv = json2csv.parse(data);

  res.header("Content-Type", "text/csv");
  res.attachment(fileName);
  res.send(csv);
  return;
};
