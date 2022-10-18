const gameEl=document.getElementById('game');
const ctx=gameEl.getContext('2d');
const countEl=document.getElementById('count');
const shapes=[
    [
        [0,0,0,0],
        [1,1,1,1],
        [0,0,0,0],
        [0,0,0,0],
    ],[
        [1,1,1],
        [0,0,1],
        [0,0,0]
    ],[
        [1,1],
        [1,1],
    ],[
        [1,1,0],
        [0,1,1],
        [0,0,0]
    ],[
        [1,1,1],
        [1,0,0],
        [0,0,0]
    ],[
        [0,1,0],
        [1,1,1],
        [0,0,0]
    ],[
        [0,1,1],
        [1,1,0],
        [0,0,0]
    ]
];
const COL=20;
const ROW=30;
const scale=32
let score=0;
class Pieces{
    constructor(shape,ctx){
        this.shape=shape;
        this.ctx=ctx;
        this.y=0;
        this.x=Math.floor(COL/2)
    }
    renderPiece(){
        this.shape.map((row,i)=>{
            row((cell,j)=>{
                if(cell>0){
                    this.ctx.fillStyle='white';
                    this.ctx.fillRect(this.x+j*scale,this.y+i*scale,1,1)
                }
            })
        })
    }
}
class GameModel{
    constructor(ctx){
        this.ctx=ctx;
        this.fallingPiece=null;
        this.grid=this.makeStartingGrid();
    }
    makeStartingGrid(){
        let grid=[]
        for(let i=0;i<ROW;i++){
            grid[i]=[];
            for(let j=0;j<COL;j++){
                grid[i][j]=0
            }
        }
        return grid;
    }
    renderGameState(){
        for(let i=0;i<this.grid.length;i++){
            for(let j=0;j<this.grid[i].length;j++){
                let cell=this.grid[i][j]
                console.log(cell)
            }
        }
        if(this.fallingPiece!==null){
            this.fallingPiece.renderPiece()
        }
    }
    moveDown(){
        if(this.fallingPiece!==null){
            console.log('a no!')
            this.fallingPiece=null;
        }
    }
}
const model= new GameModel(ctx);
setInterval(()=>{
    score++
    countEl.innerText=`esto es ${score}`;
    if(score%3===0){
        model.fallingPiece=true
    }else if(score%5===0){
        model.fallingPiece=null
    }
    if(model.fallingPiece===null){
        rand=Math.floor(Math.random()*shapes.length)
        const piece= new Pieces(shapes[rand],ctx)
        model.fallingPiece=piece;
        model.moveDown();
    }else{
        model.moveDown();
    }
},1000)