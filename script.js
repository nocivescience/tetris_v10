const gameEl=document.getElementById('game');
const scale=30;
const countEl=document.getElementById('count');
const shapes=[
    [
        [0,0,0,0],
        [1,1,1,1],
        [0,0,0,0],
        [0,0,0,0],
    ],[
        [2,2,2],
        [0,0,2],
        [0,0,0]
    ],[
        [3,3],
        [3,3],
    ],[
        [4,4,0],
        [0,4,4],
        [0,0,0]
    ],[
        [5,5,5],
        [5,0,0],
        [0,0,0]
    ],[
        [0,6,0],
        [6,6,6],
        [0,0,0]
    ],[
        [0,7,7],
        [7,7,0],
        [0,0,0]
    ]
];
const COLOR=[
    '#000',
    '#fb6c6c',
    '#0088f8',
    '#6cfb8b',
    '#7a6cfb',
    '#fbe16c',
    '#fb6cc2',
    '#6cfbe5'
]
const COL=20;
const ROW=30;
const game_clock=1000;

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
            row.map((cell,j)=>{
                if(cell>0){
                    this.ctx.fillStyle=COLOR[cell];
                    this.ctx.fillRect(this.x+j,this.y+i,1,1)
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
    collision(x,y,candidate=null){
        const shape=candidate||this.fallingPiece.shape;
        const n=shape.length;
        for(let i=0;i<n;i++){
            for(let j=0;j<n;j++){
                if(shape[i][j]!==0){
                    let p=x+j;
                    let q=y+i;
                    if(p>=0&&p<COL&&q<ROW){
                        if(this.grid[q][p]!==0){
                            return true;
                        }
                    }else{
                        return true;
                    }
                }
            }
        }
        return false;
    }
    renderGameState(){
        for(let i=0;i<this.grid.length;i++){
            for(let j=0;j<this.grid[i].length;j++){
                let cell=this.grid[i][j]
                this.ctx.fillStyle=COLOR[cell];
                this.ctx.fillRect(j,i,1,1)
            }
        }
        if(this.fallingPiece!==null){
            this.fallingPiece.renderPiece()
        }
    }
    moveDown(){
        if(this.fallingPiece===null){
            this.renderGameState();
            return;
        }else if(this.collision(this.fallingPiece.x,this.fallingPiece.y+1)){
            const shape=this.fallingPiece.shape;
            const x=this.fallingPiece.x;
            const y=this.fallingPiece.y;
            shape.map((row,i)=>{
                row.map((cell,j)=>{
                    let p=x+j;
                    let q=y+i;
                    if(p>=0&&p<COL&&q<ROW&&cell>0){
                        this.grid[q][p]=shape[i][j];
                    }
                })
            })
            if(this.fallingPiece.y===0){
                alert('Game Over');
                return;
            }
            this.fallingPiece=null;
        }else{
            this.fallingPiece.y+=1;
        }
        this.renderGameState();
    }
}
const ctx=gameEl.getContext('2d');
ctx.scale(scale,scale);
const model= new GameModel(ctx);
setInterval(()=>{
    newGameState()
},1000)
function newGameState(){
    fullSend();
    if(model.fallingPiece===null){
        const rand=Math.floor(Math.random()*COLOR.length);
        const newPiece=new Pieces(shapes[rand],ctx);
        model.fallingPiece=newPiece;
        model.moveDown();
    }else{
        model.moveDown();
    }
}
function fullSend(){
    const allFilled=(row)=>{
        for(let x of row){
            if(x===0){
                return false;
            }
        }
        return true;
    };
    for(let i=0;i<model.grid.length;i++){
        if(allFilled(model.grid[i])){
            model.splice(i,1);
            model.unshift([0,0,0,0,0,0,0,0,0,0]);
        }
    }
}