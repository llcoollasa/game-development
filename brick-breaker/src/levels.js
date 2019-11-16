import Brick from './brick'

export function buildLevel(game, level) {
    let bricks = [];
    level.forEach((row, rowIndex) => {
        row.forEach((item, ItemIndex) => {
            if(item === 1) {
                let brick = new Brick(game);
                brick.position = {x: ItemIndex * brick.size.width , y: rowIndex * brick.size.height + 100};
                bricks.push(brick); 
            }
                
             
        })
    });

    return bricks;
}

export const level1 = [
    // [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0, 0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
    // [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],  
    [0,0,0,0,1],  
];


export const level2 = [
    [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0, 0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], 
];