
//Global object - shellWrap encapsulates required variables.
const shellWrap = {
    diameter: null,
    length: null,
    lead: null,
    pitch: null,
    wrapNum: null,
    start: null,
    result: null,
    newText: null,
    latPoint: [],
    points: [],
    isUnclicked: true,
};
// ****  UI  ****

// eventlisteners 
document.getElementById('button').addEventListener('click', eventHandler);
document.getElementById('wrapNum').addEventListener('keyup',eventHandler);

// eventhandler && trigger function
function eventHandler(event){
    if(event.type === 'click' || event.type === 'keyup' && event.key === 'Enter'){
        toggleSwitch();
    }
 };

 function toggleSwitch(){
    if(shellWrap.isUnclicked){
     anim();
     document.getElementById('lat').innerHTML = "Loading...";
     setTimeout(()=> {  
        document.getElementById('lat').innerHTML = " ";
        director();
     },2000)
    }else{
        location.reload();
    }
    shellWrap.isUnclicked = !shellWrap.isUnclicked;
    document.getElementById('button').value = "reset";
 };

 // animation
function anim(){
   const animate = document.getElementById('title');
   animate.classList.add('animate');
   setTimeout(()=> { 
        animate.classList.remove('animate');
   },2000);
};

// director
function director(){
    getValue();
    if(shellWrap.diameter !== null && shellWrap.length !== null && shellWrap.lead !== null && shellWrap.pitch !== null && shellWrap.wrapNum !== null){
        runAll();
    } else if(shellWrap.diameter !== null && shellWrap.wrapNum !== null) {
        piPoints(shellWrap.diam,shellWrap.wrapNum);
        const format2 = formLat(shellWrap.points);
        const final2 = reformat(format2);
        return document.getElementById('circ').innerHTML = `<br><span class="head">Circ Marks:</span><br><br><span class="pole">||</span>${final2}`;
    } else if (shellWrap.length !== null && shellWrap.lead !== null && shellWrap.pitch !== null){
        wrapCalc(shellWrap.length,shellWrap.lead,shellWrap.pitch);
        loopAll(shellWrap.start,shellWrap.result,shellWrap.pitch);
        const format = formLat(shellWrap.latPoint);
        const final = reformat(format);
        return document.getElementById('lat').innerHTML = `<br><span class="head">Lat Marks:</span><br><br><span class="pole">||</span>${final}`;
    }
};

// executor
function runAll(){
    wrapCalc(shellWrap.length,shellWrap.lead,shellWrap.pitch);
    loopAll(shellWrap.start,shellWrap.result,shellWrap.pitch);
    piPoints(shellWrap.diameter,shellWrap.wrapNum);
    const format = formLat(shellWrap.latPoint);
    const format2 = formLat(shellWrap.points);
    const final = reformat(format);
    const final2 = reformat(format2);
    document.getElementById('lat').innerHTML = `<br><span class="head">Lat marks:</span><br><br><span class="pole">||</span>${final}`;
    document.getElementById('circ').innerHTML = `<br><span class="head">Circ marks:</span><br><br><span class="pole">||</span>${final2}`;
};

// value assignment
function getValue(){
   shellWrap.diameter = document.getElementById('diameter').value;
   shellWrap.length = document.getElementById('length').value;
   shellWrap.lead = document.getElementById('lead').value;
   shellWrap.pitch  = document.getElementById('pitch').value;
   shellWrap.wrapNum = document.getElementById('wrapNum').value;
};

// ****  CALCULATIONS  ****

// lat marks
function wrapCalc(shellLength,lead,pitch){
    const result = Math.floor(shellLength / lead);
    shellWrap.result = result * lead;
    let shellDiff = shellLength - shellWrap.result;
    shellWrap.start = shellDiff / 2;
    if (shellWrap.start > pitch){
        shellWrap.start = shellWrap.start % pitch;
    }
};

function loopAll(val1,val2,val3){
    if(val1 === 0 || val2 === 0 || val3 === 0){
        return;
    }
    const pap = Number(val3);
    for(let i = val1;i < val2;i+= pap){
        const frac = toFraction(i);
        shellWrap.latPoint.push(` ${frac}`);
    } return shellWrap.latPoint;
};

// circ marks
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
            const fracPoint = toFraction(point);
            shellWrap.points.push(fracPoint); 
        }            
    }    
    return shellWrap.points;
};

// ****  FORMATING  ****

// line breaks and pole spans
function formLat(arr){
    return arr.map((number,index) => (index + 1) % 5 === 0 ? `${number}<br><br>` : number)
    .join(' || ');
};

function reformat(str){
    shellWrap.newText = str.replace(/[\|]/g, '<span class="pole">|</span>')
    return shellWrap.newText;
};

// decimal to fractio conversion
function toFraction(decimal){
   const wholeNumberPart = Math.floor(decimal);
   const decimalPart = decimal % 1;
   const roundedDecimalPart = Math.round(decimalPart * 16) / 16;
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
};