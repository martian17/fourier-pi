var createFourierAnimation = function(canvas){
    var width = canvas.width;
    var height = canvas.height;
    
    /*this.origin = function(t){
        return Math.sqrt(1-t*t);
    };*/
    /*this.origin = function(){
        return 1;//this is the default function
    };*/
    /*this.origin = function(t){
        if(t < 0.5){
            return 1;
        }else{
            return -1;
        }
    };*/
    this.origin = function(t){
        if(t < 0.5){
            return 1;
        }else{
            return 0;
        }
    };
    var that = this;
    
    var amps = [];
    var offs = [];
    this.n = 0;
    this.amps = amps;
    this.offs = offs;
    
    
    var generateFourier = function(steps){
        //now interpolate the points
        var line = new Line(points);
        var ds = -degree;
        var de = degree;
        //steps is the steps for the number of numerical integration
        var steps = 1000;
        var cs = [];
        
        for(var n = ds; n < de+1; n++){//positive and negative, nicely symmetrical
            var csum = [0,0];//complex sum of the steps
            for(var j = 0; j < steps; j++){
                var t = j/steps;
                var coeffAngle = 2*n*t*Math.PI;//not gonna derive pi this time lol
                var coefficient = [Math.cos(coeffAngle),Math.sin(coeffAngle)];
                var lt = line.get(t);
                //then now multiply lt with coefficent, and then add to the summation
                var muled = complexMul(coefficient,lt);
                //then now incrementing the csum
                csum[0] += muled[0];
                csum[1] += muled[1];
            }
            var cn = [csum[0]/steps,csum[1]/steps];
            cs[n-ds] = complexToExponential(cn);
        }
        return cs;
    };
    
    
    this.analyze = function(n){
        that.n = n;
        var sum = 0;
        for(var k = 0; k < n; k++){//looping through data
            var real = 0;
            var imag = 0;
            for(var i = 0; i < n; i++){
                var t = i/n;
                var aa = -2*Math.PI*k*t;
                var amp = that.origin(t);
                real += amp*Math.cos(aa);
                imag += amp*Math.sin(aa);
            }
            //real /= n;
            //imag /= n;
            var amp = Math.sqrt(real*real+imag*imag);
            var offset = Math.atan2(imag,real);
            amps[k] = amp;
            offs[k] = offset;
        }
    };
    
    this.drawResult = function(){
        var n = that.n;
        ctx.beginPath();
        for(var i = 0; i < width; i++){
            var t = i/width*Math.PI*2;
            var val = 0;
            for(var j = 0; j < n; j++){
                val += amps[j]*Math.sin(offs[j]+j*t);
            }
            val /= n;
            ctx.lineTo(i,height/2-val*height/2);
        }
        ctx.stroke();
    };
};



var width = 500;
var height = 500;
var canvas = document.getElementById("canvas");
canvas.width = width;
canvas.height = height;
var ctx = canvas.getContext("2d");


var fa = new createFourierAnimation(canvas);


fa.analyze(30);
//fa.drawFreq();
fa.drawResult();

ctx.beginPath();
ctx.moveTo(0,height/2);
ctx.lineTo(width,height/2);
ctx.strokeStyle = "#f00";
ctx.stroke();


