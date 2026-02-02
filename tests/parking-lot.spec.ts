import { expect, test } from "@playwright/test";
import { loadExcel } from "../utils/file-utils";
import { ParkingCalc } from "../pages/parking-calc";
import { CorrectPriceTestSchema } from "../schemas/correct-price";
import path from "path";
import { InputFailureTestSchema } from "../schemas/input-failures";

const correctPriceTests = loadExcel(
    path.join(
        process.env.DATA_PATH ?? "",
        process.env.TEST_EXCEL_FILE_NAME ?? "",
    ),
    "CorrectPriceTests",
    CorrectPriceTestSchema,
);

const inputFailureTests = loadExcel(
    path.join(
        process.env.DATA_PATH ?? "",
        process.env.TEST_EXCEL_FILE_NAME ?? "",
    ),
    "InputFailureTests",
    InputFailureTestSchema,
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

inputFailureTests.forEach((inputFailureTest) => {
    test(inputFailureTest.testName, async ({ page }) => {
        const parkCalc = new ParkingCalc(page);
        await parkCalc.goTo();
        await parkCalc.selectParkingLot(inputFailureTest.parkingLot);
        await parkCalc.inputEntryDate(inputFailureTest.entryDate);
        await parkCalc.inputExitDate(inputFailureTest.exitDate);
        await parkCalc.calculateButton.click();
        if (inputFailureTest.expectedError === "exitBeforeEntry") {
            await expect(
                page.getByText(
                    "ERROR! Your Leaving Date Or Time Is Before Your Starting Date or Time",
                ),
            ).toBeVisible();
        }
    });
});
