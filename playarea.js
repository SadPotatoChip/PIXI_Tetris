const playAreaStartX = 9;
const playAreaStartY = 112;
const blockSize = 42;
const gridRows = 20;
const gridColumns = 10;

const tetriminoSpawnXCoordinate = 4;

function PlayArea() {
    this.grid=[];
    for(let i=0; i<gridRows; i++) {
        this.grid[i] = [];
        for(let j=0; j<gridColumns; j++) {
            this.grid[i][j] = undefined;
        }
    }
}

PlayArea.prototype.getPositionFromCoordinates = function (x,y) {
    var realX= playAreaStartX + blockSize * x;
    var realY= playAreaStartY + blockSize * y;
    return [realX,realY]
}

PlayArea.prototype.canBlockMoveInDirection = function (block, direction) {
    switch (direction) {
        case "left":
            if(block.x <= 0 || this.grid[block.y][ block.x - 1] != undefined){
                return false;
            }
            break;
        case "right":
            if(block.x >= gridColumns - 1 || this.grid[block.y][ block.x+1] != undefined){
                return false;
            }
            break;
        case "down":
            //console.log(this.grid[block.x, block.y+1])
            if(block.y >= gridRows - 1 || this.grid[block.y+1][ block.x] != undefined){
                return false;
            }
            break;
    }
    return true;
}

PlayArea.prototype.areCoordinatesUnoccupied = function (x,y) {
    if(x<0 || x >= gridColumns || y<0 || y>=gridRows){
        return false;
    }
    return this.grid[y][x] == undefined;
}



PlayArea.prototype.insertTetriminoIntoGird = function (tetrimino) {
    for (let i = 0; i < tetrimino.blocks.length; i++) {
        let block = tetrimino.blocks[i];
        this.grid[block.y][ block.x] = block;
    }
}

PlayArea.prototype.destroyFilledRows = function () {

    for (let i = 0; i < gridRows; i++) {
        let isRowFilled = true;
        for (let j = 0; j < gridColumns; j++) {
            if(this.grid[i][j] == undefined){
                isRowFilled=false;
                break;
            }
        }
        if(isRowFilled){
            console.log("destroy row " + i);
            this.destroyRow(i);
        }
    }
}

PlayArea.prototype.destroyRow = function (n) {
    for (let i = 0; i < gridColumns; i++) {
        //probably should be deallocated in some way
        this.grid[n][i].sprite.visible = false;
        this.grid[n][i] = undefined;
    }
    for (let i = n; i >= 0; i--) {
        for (let j = 0; j < gridColumns; j++) {
            if(i > 0){
                this.grid[i][j]=this.grid[i-1][j];
                if(this.grid[i][j] != undefined){
                    this.grid[i][j].move("down");
                }
                this.grid[i-1][j]=undefined;
            }

        }
    }
}

PlayArea.prototype.onTetriminoLanded = function () {
    if(currentPiece != undefined){
        //console.log("Piece INSERTED")
        this.insertTetriminoIntoGird(currentPiece);
    }
    this.destroyFilledRows();

    let debugText = "";
    for (let i = 0; i < gridRows; i++) {

        for (let j = 0; j < gridColumns; j++) {
            if(typeof(this.grid[i][j]) === 'undefined'){
                debugText+="-";
            }else{
                debugText+="X";
            }
        }
        debugText+="\n";
    }

    console.log(debugText);

    currentPiece = new TetriminoJ();
}