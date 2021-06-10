
//Base Tetrimino
function Tetrimino() {
    this.color = undefined;
    this.blocks=[];
    this.rotations = [];
    this.currentRotation = 0;
};

Tetrimino.prototype.tryMove = function (direction) {
    for (let i = 0; i < this.blocks.length; i++) {
        if(false == playArea.canBlockMoveInDirection(this.blocks[i], direction)){
            return false;
        }
    }
    for (let i = 0; i < this.blocks.length; i++) {
        this.blocks[i].move(direction);
    }
    return true;
}

Tetrimino.prototype.drop = function () {
    let canDrop = true;
    while(canDrop){
        canDrop = this.tryMove("down");
    }
}

Tetrimino.prototype.tryRotate = function () {

    let targetRotationIndex = this.currentRotation + 1;
    if(targetRotationIndex >=this.rotations.length){
        targetRotationIndex = 0;
    }

    let targetRotation = this.rotations[targetRotationIndex];
    let newBlockLocations = [];

    for (let i = 0; i < 4; i++) {
        let newLocation = [targetRotation[i][0] + this.blocks[i].x, targetRotation[i][1] + this.blocks[i].y];
        if(playArea.areCoordinatesUnoccupied(newLocation[0], newLocation[1])){
            newBlockLocations.push(newLocation);
        }else{
            console.log("rotate location: ("+newLocation[0]+", "+newLocation[1]+") is invalid");
            return false;
        }
    }

    this.currentRotation=targetRotationIndex;
    for (let i = 0; i < 4; i++) {
        this.blocks[i].setPosition(newBlockLocations[i][0],newBlockLocations[i][1]);
    }
}

//Square
function TetriminoO()
{
    Tetrimino.call(this);

    this.color="yellow";

    this.blocks.push(new Block(this.color, this));
    this.blocks.push(new Block(this.color, this));
    this.blocks.push(new Block(this.color, this));
    this.blocks.push(new Block(this.color, this));

    this.blocks[0].setPosition(tetriminoSpawnXCoordinate, 0);
    this.blocks[1].setPosition(tetriminoSpawnXCoordinate + 1, 0);
    this.blocks[2].setPosition(tetriminoSpawnXCoordinate, 1);
    this.blocks[3].setPosition(tetriminoSpawnXCoordinate + 1, 1);

    this.rotations = [[[0,0], [0,0], [0,0], [0,0]]];
}
TetriminoO.prototype = new Tetrimino();
TetriminoO.prototype.constructor = TetriminoO;


function TetriminoJ()
{
    Tetrimino.call(this);

    this.color="orange";

    this.blocks.push(new Block(this.color, this));
    this.blocks.push(new Block(this.color, this));
    this.blocks.push(new Block(this.color, this));
    this.blocks.push(new Block(this.color, this));

    this.blocks[0].setPosition(tetriminoSpawnXCoordinate -1, -1);
    this.blocks[1].setPosition(tetriminoSpawnXCoordinate, -1);
    this.blocks[2].setPosition(tetriminoSpawnXCoordinate , 0);
    this.blocks[3].setPosition(tetriminoSpawnXCoordinate, 1);

    this.rotations= [
        [[0, 0],[0,0],[-1,1],[1,1]],
        [[2, 0],[-1,1],[0,0],[1,-1]],
        [[-2,0],[0,0],[-1,1],[-1,1]],
        [[0,0],[1,-1],[2,-2],[-1,-1]],
    ]
}
TetriminoJ.prototype = new Tetrimino();
TetriminoJ.prototype.constructor = TetriminoJ;
