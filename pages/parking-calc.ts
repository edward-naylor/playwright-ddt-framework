import { Locator, Page } from "playwright";
import { expect } from "playwright/test";


export class ParkingCalc {
    readonly page: Page;
    readonly parkingLotSelection: Locator;
    readonly entryDateInput: Locator;
    readonly exitDateInput: Locator;
    readonly calculateButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.parkingLotSelection = page.getByRole("combobox");
        this.entryDateInput = page.locator("#StartingDate");
        this.exitDateInput = page.locator("#LeavingDate");
        this.calculateButton = page.getByRole("button", { name: "Calculate" });
    }

    async selectParkingLot(parkingLot: string) {
        await expect(this.parkingLotSelection).toBeVisible();
        await this.parkingLotSelection.selectOption(parkingLot);
    }

    async inputEntryDate(entryDate: string) {
        await this.entryDateInput.click();
        await this.entryDateInput.clear();
        await this.entryDateInput.fill(entryDate);
    }

    async inputExitDate(exitDate: string) {
        await this.exitDateInput.click();
        await this.exitDateInput.clear();
        await this.exitDateInput.fill(exitDate);
    }
}