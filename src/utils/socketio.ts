import { Server } from 'socket.io'
import { roomService } from '../services/room.service';
const socketServer = (server, port) => {
    const io = new Server(server, {
        cors: {
            origin: process.env.FRONT_END_URL,
            methods: ['GET', 'POST'],
        },
    });

    io.listen(Number(port));

    io.on('connection', (socket) => {
        console.log(`⚡: ${socket.id} user just connected!`);
        socket.on('disconnect', () => {
            console.log('🔥: A user disconnected');
        });

        socket.on('join-room', room => {
            console.log(room);
            socket.join(room);
        });

        socket.on('add-video', ({ room, data }) => {
            socket.to(room).emit('add-video', data);
        });


        socket.on('remove-video', ({ room, playlist }, callback) => {
            roomService.updatePlaylist(room, playlist)
            socket.to(room).emit('remove-video', playlist);
            
        })

        // socket.on('remove-video', ({ room, videoIndex }, callback) => {
        //     console.log('video index: ', videoIndex);
        //     roomService.removeVideo(room, videoIndex)
        //     .then((data) => {
        //         console.log(data)
        //         callback({
        //             status: 'ok'
        //         });
        //         socket.to(room).emit('remove-video', videoIndex);
        //     })
        //     .catch((error) => {
        //         console.log(error.toJSON)
        //         callback(error.toJSON )
        //     })
            
        // })
    })
}

export default socketServer