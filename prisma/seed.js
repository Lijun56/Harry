// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const mockData = require('./mock_data.json');
const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting seed...');

    try {
        // Insert HabitCategories
        console.log('Creating categories...');
        for (const category of mockData.categories) {
            await prisma.habitCategory.upsert({
                where: { id: category.id },
                update: {
                    name: category.name,
                    logSummary: category.logSummary
                },
                create: {
                    id: category.id,
                    name: category.name,
                    logSummary: category.logSummary
                },
            });
        }

        // Insert Tips
        console.log('Creating tips...');
        for (const tip of mockData.tips) {
            await prisma.tip.upsert({
                where: { id: tip.id },
                update: {
                    categoryName: tip.categoryName,
                    description: tip.description,
                    equation: tip.equation
                },
                create: {
                    id: tip.id,
                    categoryName: tip.categoryName,
                    description: tip.description,
                    equation: tip.equation
                },
            });
        }

        // Insert SuggestedHabits
        console.log('Creating suggested habits...');
        for (const suggestedHabit of mockData.suggestedHabits) {
            await prisma.suggestedHabit.upsert({
                where: { id: suggestedHabit.id },
                update: {
                    name: suggestedHabit.name,
                    categoryName: suggestedHabit.categoryName,
                    frequency: suggestedHabit.frequency
                },
                create: {
                    id: suggestedHabit.id,
                    name: suggestedHabit.name,
                    categoryName: suggestedHabit.categoryName,
                    frequency: suggestedHabit.frequency
                },
            });
        }

        console.log('✅ Seed completed successfully');

    } catch (error) {
        console.error('❌ Seed failed:', error);
        throw error;
    }
}

main()
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });