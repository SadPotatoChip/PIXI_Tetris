function Block(color, parent) {
    this.x = 0;
    this.y = 0;
    this.parent = parent;
    let texture = PIXI.Texture.from("assets/block_"+color+".png");
    this.sprite = new PIXI.Sprite(
        texture
    );
    app.stage.addChild(this.sprite);
};

Block.prototype.move = function (direction) {
    switch (direction) {
        case "left":
            this.setPosition(this.x-1, this.y);
            break;
        case "right":
            this.setPosition(this.x+1, this.y);
            break;
        case "down":
            this.setPosition(this.x, this.y+1);
            break;
    }
}

Block.prototype.setPosition = function (x,y) {
    this.x = x;
    this.y = y;
    let position = playArea.getPositionFromCoordinates(x,y);
    this.sprite.x = position[0];
    this.sprite.y = position[1];
}