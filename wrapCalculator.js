
let diam;
let shell;
let lea;
let pit;
let wrap;
let start;
let result2;
let newText;
const regex = /[\|]/g;
const latPoint = [];
const points = [];

let isUnclicked = true;


document.getElementById('button').addEventListener('click', eventHandler);
document.getElementById('wrapNum').addEventListener('keyup',eventHandler);

function anim(){
   const animate = document.getElementById('title');
   animate.classList.add('animate');

   setTimeout(()=> { 
        animate.classList.remove('animate');
   },2000);
};

function toggleSwitch(){
   if(isUnclicked){
    //   runAll();
    anim();
    document.getElementById('lat').innerHTML = "Loading...";
    setTimeout(()=> {  
       document.getElementById('lat').innerHTML = " ";
       director();
    },2000)
   }else{
       location.reload();
   }
   isUnclicked = !isUnclicked;
   document.getElementById('button').value = "reset";
};

function eventHandler(event){
   if(event.type === 'click' || event.type === 'keyup' && event.key === 'Enter'){
       toggleSwitch();
   }
}

function getValue(){
   diam = document.getElementById('diameter').value;
   shell = document.getElementById('length').value;
   lea = document.getElementById('lead').value;
   pit  = document.getElementById('pitch').value;
   wrap = document.getElementById('wrapNum').value;
};

function wrapCalc(shellLength,lead,pitch){

    let result = Math.floor(shellLength / lead);
    result2 = result * lead;
    let shellDiff = shellLength - result2;
    start = shellDiff / 2;
    if (start > pitch){
        start = start % pitch;
    }


}

function loopAll(val1,val2,val3){
    if(shell === 0 || lea === 0 || pit === 0){
        return;
    }
    const pap = Number(val3);
    for(let i = val1;i < val2;i+= pap){
        let frac = toFraction(i)
        latPoint.push(` ${frac}`)
    } return latPoint;
}

function formLat(arr){
    return arr.map((number,index) => (index + 1) % 5 === 0 ? `${number}<br><br>` : number)
    .join(' || ');
}

function reformat(str){
    const container = document.getElementById('lat');
    const text = container.innerHTML;
    newText = str.replace(/[\|]/g, '<span class="pole">|</span>')
    return newText;
}

function piPoints(diam,wrapNum){
    if(diam === 0 || wrapNum === 0){
        return;
    } 
    const circumfrence = 3.14 * diam;
    const circle = (3.14 * diam) / wrapNum;
    let point = 0;
    for(let i = 1;i < wrapNum + 1;i++){
        if(point < circumfrence){
            point = circle * i;
            let fracPoint = toFraction(point);
            points.push(fracPoint); 
        }            
    }    
    return
}

function prin(var1,var2){
    document.getElementById('lat').innerHTML = `<br><span class="head">Lat marks:</span><br><br><span class="pole">||</span>${var1}`;
    document.getElementById('circ').innerHTML = `<br><span class="head">Circ marks:</span><br><br><span class="pole">||</span>${var2}`;
}

function director(){
    getValue();
    if(diam !== "" && shell !== "" && lea !== "" && pit !== "" && wrap !== ""){
        runAll();
    } else if(diam !== "" && wrap !== "") {
        let circum = toFraction(piPoints(diam,wrap));
        return document.getElementById('circ').innerHTML = `<br><span class="head">Circ Marks:</span><br><br>${circum}`;
    } else if (shell !=="" && lea !== "" && pit !== ""){
        wrapCalc(shell,lea,pit);
        loopAll(start,result2,pit);
        const teem = formLat(latPoint);
        reformat(teem);
        return document.getElementById('lat').innerHTML = `<br><span class="head">Lat Marks:</span><br><br><span class="pole">||</span>${newText}`;
    }
}       

function runAll(){
    wrapCalc(shell,lea,pit);
    loopAll(start,result2,pit);
    piPoints(diam,wrap);
    const teem = formLat(latPoint);
    const teem2 = formLat(points);
    const slat = reformat(teem);
    const slat2 = reformat(teem2);
    prin(slat, slat2);

}

function toFraction(decimal){
   const wholeNumberPart = Math.floor(decimal);
   const decimalPart = decimal % 1;
   const roundedDecimalPart = Math.round(decimalPart * 16) / 16;
   const newPart = wholeNumberPart + roundedDecimalPart;
   const decimalPlaces = decimalPart.toString().length - 2;
   const numerator = Math.round(roundedDecimalPart  * Math.pow(10, decimalPlaces)) 
   const denominator = Math.pow(10, decimalPlaces);

   function gcd(a,b){
       if(b === 0) return a;
       return gcd(b, a % b);
   }

   const divisor = gcd(numerator,denominator);
   const simplifiedNumerator = numerator / divisor;
   const simplifiedDenominator = denominator / divisor;

   return ` ${wholeNumberPart}  <span class="fracNum">${simplifiedNumerator}/${simplifiedDenominator}</span>`
}
