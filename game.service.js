const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function joinGame(userId, gameId) {
    const game = await prisma.game.findUnique({ where: { id: gameId } });
    if (!game) throw new Error("Game not found");
    if (game.status !== 'Waiting') throw new Error("Game already started");

    const existing = await prisma.gameParticipant.findUnique({
        where: { userId_gameId: { userId, gameId } }
    });
    if (existing) throw new Error("User already registered");

    return await prisma.gameParticipant.create({
        data: { userId, gameId, role: 'Player' }
    });
}

module.exports = { joinGame, prisma }; // הוספנו את prisma ליצוא