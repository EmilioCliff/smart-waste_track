import { z } from 'zod';

export const DustbinFormSchema = z.object({
	apartmentId: z.number(),
	latitude: z.number(),
	longitude: z.number(),
});

export type DustbinFormType = z.infer<typeof DustbinFormSchema>;
