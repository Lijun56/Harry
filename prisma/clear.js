// prisma/clear.js
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function clearDatabase() {
  try {
    // Clear all tables in correct order due to foreign key constraints
    await prisma.$transaction([
      // Delete child tables first
      prisma.log.deleteMany(),
      prisma.tip.deleteMany(),
      prisma.suggestedHabit.deleteMany(),
      prisma.habit.deleteMany(),
      // Delete parent table last
      prisma.habitCategory.deleteMany(),
    ]);

    console.log('✅ Database cleared successfully');
  } catch (error) {
    console.error('❌ Error clearing database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

clearDatabase();