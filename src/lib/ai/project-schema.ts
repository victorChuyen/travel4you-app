import { z } from 'zod';

export const generatedProjectSchema = z.object({
  project: z.record(z.string(), z.unknown()).default({}),
  summary: z.record(z.string(), z.unknown()).default({}),
  days: z.array(z.record(z.string(), z.unknown())).default([]),
  experiences: z.array(z.record(z.string(), z.unknown())).default([]),
  practical_notes: z.array(z.string()).default([]),
  cta: z.record(z.string(), z.unknown()).default({}),
});

export type GeneratedProject = z.infer<typeof generatedProjectSchema>;
