const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const childProcess = require('child_process');
const Bundler = require('parcel-bundler');
const bundler = new Bundler('public/index.html');

const state = {
    waitingNumbers: [
        ''
    ],
    nextNumber: 1
};

childProcess.exec('echo -e "\x1d\x21\x60" > /dev/ttyUSB0');

app.use(bundler.middleware());

function waitingNumbersChanged(socket) {
    if (!socket) {
        socket = io.sockets;
    }

    socket.emit('waitingNumbersChanged', {
        waitingNumbers: state.waitingNumbers.slice(0, 10),
        hasMore: state.waitingNumbers > 10
    });
}

io.on('connection', (socket) => {
    waitingNumbersChanged(socket);

    socket.on('print', () => {
        state.waitingNumbers.push(state.nextNumber);
        childProcess.exec('echo -e "\n\n\n             128 \n\n\n\n\n\n" > /dev/ttyUSB0');
        state.nextNumber++;
        waitingNumbersChanged();
    });

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
