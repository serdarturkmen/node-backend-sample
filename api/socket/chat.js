module.exports = function (io) {
    io.on('connection', (socket) => {
        socket.on('join chat', (users) => {
            socket.join(users.user1)
            socket.join(users.user2)
        })

        socket.on('start_typing', (data) => {
            io.to(data.receiver).emit('is_typing', data)
        })

        socket.on('stop_typing', (data) => {
            io.to(data.receiver).emit('is_not_typing', data)
        })
    })
}