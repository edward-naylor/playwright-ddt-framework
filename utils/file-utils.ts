import xlsx from "xlsx"

export class FileUtils {

    static async readExcelFile(filePath: string): Promise< { [key: string]: any}[]> {
        const file = xlsx.readFile(filePath);
        const data: any[] = [];
        const sheets = file.SheetNames;
        for (let i = 0; i < sheets.length; i++) {
            const sheetData = xlsx.utils.sheet_to_json(file.Sheets[sheets[i]]);
            data.push(...sheetData);
        }
        return data;
    }
}