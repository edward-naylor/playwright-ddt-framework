import xlsx from "xlsx";
import fs from "fs";
import { ZodType, z } from "zod";

export function loadExcel<T>(filePath: string, sheetName: string, schema: ZodType<T>): T[] {
    const workbook = xlsx.read(fs.readFileSync(filePath));
    const sheet = workbook.Sheets[sheetName];

    const rawRows = xlsx.utils.sheet_to_json(sheet);

    return rawRows.map((row, index) => {
        const result = schema.safeParse(row);
        if (!result.success) {
            throw new Error(
                `Invalid test data in ${filePath}", " ${sheetName} (row ${index + 2}):\n` +
                    JSON.stringify(z.treeifyError(result.error), null, 2),
            );
        }
        return result.data;
    });
}
