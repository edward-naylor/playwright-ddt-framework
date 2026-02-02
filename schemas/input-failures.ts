import { error } from "node:console";
import { z } from "zod";

export const InputFailureTestSchema = z.object({
    parkingLot: z.string(),
    entryDate: z.string(),
    exitDate: z.string(),
    expectedError: z.string(),
    testName: z.string(),
});

export type InputFailureTest = z.infer<typeof InputFailureTestSchema>;
