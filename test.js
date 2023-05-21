

function piPoints(diam,wrapNum){
    if(diam === 0 || wrapNum === 0){
        return;
    } 
    const circumfrence = 3.14 * diam;
    const circle = (3.14 * diam) / wrapNum;
    const points = [];
    for(let i = 1;i < wrapNum + 1;i++){
        let point = circle * i;
        let fracPoint = toFraction(point);
        points.push(fracPoint);        
    }    
    return points;
}

console.log(piPoints(32.82,12));