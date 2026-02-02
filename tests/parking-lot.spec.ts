import { expect, test } from "@playwright/test";
import { FileUtils } from "../utils/file-utils";
import { ParkingCalc } from "../pages/parking-calc";

const data = await FileUtils.readExcelFile("./test-data/garages.xlsx");

data.forEach((record) => {
    test(record.testName, async ({ page }) => {
        const parkCalc = new ParkingCalc(page);
        await page.goto("https://www.shino.de/parkcalc/")
        if (record.parkingLot) {
            await parkCalc.selectParkingLot(record.parkingLot);
        }
        if (record.entryDate) {
            await parkCalc.inputEntryDate(record.entryDate);
        }
        if (record.exitDate) {
            await parkCalc.inputExitDate(record.exitDate);
        }
        await parkCalc.calculateButton.click();
        if (record.expectedPrice) {
            await expect(page.getByText("$ " + record.expectedPrice)).toBeVisible();
        }
    })
});