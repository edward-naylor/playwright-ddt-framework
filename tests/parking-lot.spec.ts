import { expect, test } from "@playwright/test";
import { loadExcel } from "../utils/file-utils";
import { ParkingCalc } from "../pages/parking-calc";
import { CorrectPriceTestSchema } from "../schemas/correct-price";
import path from "path";

const correctPriceTests = loadExcel(path.join(process.env.DATA_PATH ?? "", process.env.TEST_EXCEL_FILE_NAME ?? ""),
    "CorrectPriceTests",
    CorrectPriceTestSchema,
);

correctPriceTests.forEach((correctPriceTest) => {
    test(correctPriceTest.testName, async ({ page }) => {
        const parkCalc = new ParkingCalc(page);
        await parkCalc.goTo();
        await parkCalc.selectParkingLot(correctPriceTest.parkingLot);
        await parkCalc.inputEntryDate(correctPriceTest.entryDate);
        await parkCalc.inputExitDate(correctPriceTest.exitDate);
        await parkCalc.calculateButton.click();
        await expect(
            page.getByText("$ " + correctPriceTest.expectedPrice),
        ).toBeVisible();
    });
});
