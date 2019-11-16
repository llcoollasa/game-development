export function detectCollition(ball, gameObject) {

    let bottomOfTheBall = ball.position.y + ball.size.height;
    let topOfTheBall = ball.position.y;

    // let topOfTheObject = gameObject.position.y;
    // let bottomOfTheObject = gameObject.position.y - gameObject.size.height;
    // let leftSideOfTheObject = gameObject.position.x;
    // let rightSideOfTheObject = gameObject.position.x + gameObject.size.width;


    let topOfTheObject = gameObject.position.y;
    let bottomOfTheObject = gameObject.position.y + gameObject.size.height;
    let leftSideOfTheObject = gameObject.position.x;
    let rightSideOfTheObject = gameObject.position.x + gameObject.size.width;

    if(
        bottomOfTheBall >= topOfTheObject && 
        topOfTheBall <= bottomOfTheObject &&
        ball.position.x >= leftSideOfTheObject &&
        ball.position.x + ball.size.width <= rightSideOfTheObject
    ){
      return true;
    }

    return false;
}