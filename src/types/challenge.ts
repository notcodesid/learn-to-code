import { Challenge as PrismaChallenge } from '@prisma/client';

export type Challenge = PrismaChallenge & {
  locked?: boolean;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | string;
};