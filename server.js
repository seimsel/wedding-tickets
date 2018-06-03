const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const childProcess = require('child_process');


if (process.env.NODE_ENV !== 'production') {
    const Bundler = require('parcel-bundler');
    const bundler = new Bundler('public/index.html');
    app.use(bundler.middleware());
} else {
    app.use(express.static('dist'));
}

const state = {
    waitingNumbers: [
        ''
    ],
    nextNumber: 1
};

childProcess.execFileSync('./printer_setfont.sh');

function waitingNumbersChanged(socket) {
    if (!socket) {
        socket = io.sockets;
    }

    socket.emit('waitingNumbersChanged', {
        waitingNumbers: state.waitingNumbers.slice(0, 10),
        hasMore: state.waitingNumbers.length > 10
    });
}

io.on('connection', (socket) => {
    waitingNumbersChanged(socket);

    socket.on('print', () => {
        state.waitingNumbers.push(state.nextNumber);
        childProcess.execFileSync('./printer_print_number.sh');
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
