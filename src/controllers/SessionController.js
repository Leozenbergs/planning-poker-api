
OPTIONS = {
    cors: {
        origin: ['http://localhost:3000','http://localhost:5000', '*'],
        credentials: true,
    }
}

const SessionController = {

    cards: [],

    connect(server) {
        try {
            const io = require("socket.io")(server, OPTIONS);
            console.log('connecting')
            io.on('connection', socket => {
                console.log(`Session started, socket: ${socket.id}`)
                this.onChooseCard(socket)
                this.showAllPickedCards(socket)
                this.onDisconnect(socket)
            })
        } catch (e) {
            console.log(`Error: ${e}`)
        }
    },

    showAllPickedCards(socket) {
        console.log('Emit all cards')
        socket.emit('showAllPickedCards', this.cards)
    },

    onDisconnect(socket) {
        socket.on('disconnect', function() {
            console.log('Client disconnected.');
        });
    },

    onChooseCard(socket) {
        socket.on('choose', card => {
            console.log('Choosen card received: ', card)
            this.cards.push(card)
            socket.broadcast.emit('pickedCard', this.cards)
        })
    }
}

module.exports = SessionController
