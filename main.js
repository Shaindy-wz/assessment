const { joinGame, prisma } = require('./game.service');

async function main() {
    try {
        await prisma.$connect();
        
        // יצירת נתונים
        const user = await prisma.user.create({ data: {} });
        const game = await prisma.game.create({ data: { status: 'Waiting' } });

        await joinGame(user.id, game.id);
        console.log("---------------------------------------");
        console.log("SUCCESS: User joined game successfully!");
        console.log("---------------------------------------");

    } catch (error) {
        console.error("ERROR:", error.message);
    } finally {
        await prisma.$disconnect();
        process.exit(0);
    }
}

main();