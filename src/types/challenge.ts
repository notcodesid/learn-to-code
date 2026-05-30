import { Challenge as PrismaChallenge } from '@prisma/client';

export type Challenge = PrismaChallenge & {
  difficulty: 'beginner' | 'intermediate' | 'advanced' | string;
};