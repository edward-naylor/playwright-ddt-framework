import { z } from "zod";

export const CorrectPriceTestSchema = z.object({
    parkingLot: z.string(),
    entryDate: z.string(),
    exitDate: z.string(),
    expectedPrice: z.coerce.number(),
    testName: z.string()
});

export type CorrectPriceTest = z.infer<typeof CorrectPriceTestSchema>;