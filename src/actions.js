import network from './network.js';
import Action from './Action';

const actions = {
    movement: {
        moveLeft: new Action('move_left', network.socketID),
        moveRight: new Action('move_right', network.socketID),
        moveUp: new Action('move_up', network.socketID),
        moveDown: new Action('move_down', network.socketID)
    }
};

export default actions;