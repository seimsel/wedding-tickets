const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
//const ioHook = require('iohook');
const childProcess = require('child_process');

const state = {
    waitingNumbers: [
        ''
    ],
    nextNumber: 1
};

childProcess.exec('echo -e "\x1d\x21\x60" > /dev/ttyUSB0');

app.use(express.static('public'));

function waitingNumbersChanged(socket) {
    if (!socket) {
        socket = io.sockets;
    }

    socket.emit('waitingNumbersChanged', state.waitingNumbers.slice(0, 10));
}

/*ioHook.on('keydown', (event) => {
    if (event.keycode !== 57) {
        return;
    }
    
    state.waitingNumbers.push(state.nextNumber);
    childProcess.exec('echo -e "\n\n\n             128 \n\n\n\n\n\n" > /dev/ttyUSB0');
    state.nextNumber++;
    waitingNumbersChanged();
});
*/
io.on('connection', (socket) => {
    waitingNumbersChanged(socket);

    //ioHook.start();

    socket.on('next', () => {
        state.waitingNumbers.shift();

        if (!state.waitingNumbers.length) {
            state.waitingNumbers[0] = '';
        }

        waitingNumbersChanged();
    });

    socket.on('needABreak', () => {
        state.waitingNumbers.splice(1, 0, 'Pause');
        waitingNumbersChanged();
    });
});

server.listen(9000);
