module.exports = function (io, User, _) {
    const user = new User()

    io.on('connection', (socket) => {
        socket.on('refresh', () => {
            io.emit('refreshPage', {})
        })

    })
}
