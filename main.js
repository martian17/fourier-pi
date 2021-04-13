var createFourierAnimation = function(canvas){
    var width = canvas.width;
    var height = canvas.height;
    var ctx = canvas.getContext("2d");
    var that = this;
    
    this.origin = function(t){
        return Math.sqrt(1/4-(t-1/2)*(t-1/2));
        //return (Math.sin(t*10)+Math.sin(t*20)+Math.sin(t*30)+Math.sin(t*50))/4;
        //if(t < 0.5){
        //    return 1;
        //}else{
        //    return -1;
        //}
        //return t;
    };
    
    var complexMultiple = function(a,b){
        return [a[0]*b[0]-a[1]*b[1],a[0]*b[1]+a[1]*b[0]];
    };
    
    var series = [0];
    this.series = series;
    
    this.generateFourierSeries = function(nn){//until the nn th term
        series = [0];
        that.series = series;
        //the first term
        //numerically integrate
        var n = 10000;
        for(var a = 1; a < nn; a++){
            var sum = 0;
            for(var i = 0; i < n; i++){
                var t = i/n;
                sum += Math.sin(a*t)*that.origin(t);
                //sum += Math.sin(Math.PI*a*t)*that.origin(t);
            }
            series[a] = 2*sum/n;
        }
    };
    
    this.drawTransformed = function(){
        ctx.beginPath();
        var valM = 0;
        for(var j = 0; j < series.length; j++){
            valM += series[j]*Math.sin(j*0.5);
            //valM += series[j]*Math.sin(Math.PI*j*0.5);
        }
        console.log(valM);
        var pi = valM/0.5;
        console.log(pi);
        document.getElementById("display").innerHTML = "π: "+pi;
        for(var i = 0; i < width; i++){
            var t = i/width;
            var val = 0;
            for(var j = 0; j < series.length; j++){
                val += series[j]*Math.sin(j*t);
                //val += series[j]*Math.sin(Math.PI*j*t);
            }
            ctx.lineTo(i,height-val/valM*0.5*4*250/2);
            //ctx.lineTo(i,height/2-val*height/2);
        }
        ctx.stroke();
    };
    
    /*
    this.generateFourierSeries = function(){
        //the first term
        //numerically integrate
        var n = 1000;
        var sum = 0;
        for(var i = 0; i < n; i++){
            var t = i/n;
            sum += that.origin(t);
        }
        series[0] = sum/n;
        
        var nn = 1000;//until the 10th term
        for(var a = 1; a < nn; a++){
            var sum = 0;
            for(var i = 0; i < n; i++){
                var t = i/n;
                sum += -Math.cos(Math.PI*(a)*t)*that.origin(t)/2;
            }
            series[a] = sum/n;
        }
    };
    */
    
    /*
    this.drawTransformed = function(){
        ctx.beginPath();
        var valM = 0;
        for(var j = 0; j < series.length; j++){
            valM += series[j]*Math.sin(1*j*0.5);
            //valM += series[j]*Math.sin(Math.PI*j*0.5);
        }
        console.log(valM);
        for(var i = 0; i < width; i++){
            var t = i/width;
            var val = 0;
            for(var j = 0; j < series.length; j++){
                val += series[j]*Math.sin(1*j*t);
                //val += series[j]*Math.sin(Math.PI*j*t);
            }
            ctx.lineTo(i,height/2-val/valM/2*height/2);
            //ctx.lineTo(i,height/2-val*2*height/2);
        }
        ctx.stroke();
    };
    */
    
    /*this.getPi = function(){
        for(var i = 0; i < ){
            
        }
    };*/
    
    this.drawOrigin = function(){
        ctx.beginPath();
        for(var i = 0; i < width; i++){
            var t = i/width;
            var val = 0;
            ctx.lineTo(i,height-that.origin(t)*4*250/2);
        }
        ctx.stroke();
    };
    
    /*
    var fourierTransform = function(arr){
        var arr1 = [];
        for(var i = 0; i < arr.length; i++){
            arr1[i] = [0,0];
            for(var j = 0; j < arr.length; j++){
                var a = -2*Math.PI*i*j/arr.length;
                var val1 = complexMultiple(arr[j],[Math.cos(a),Math.sin(a)]);
                arr1[i][0] += val1[0];
                arr1[i][1] += val1[1];
            }
        }
        return arr1;
    };
    
    var complexToExponential = function(c){//converts complex numbers into exponential form
        var magn = Math.sqrt(c[0]*c[0]+c[1]*c[1]);
        var angle = Math.atan2(c[1],c[0]);//y,x
        return [magn,angle];
    };
    
    this.drawOriginal = function(){
        var arr = [];
        for(var i = 0; i < width; i++){
            var t = i/width;
            arr[i] = [that.origin(t),0];
        }
        ctx.beginPath();
        for(var i = 0; i < width; i++){
            ctx.lineTo(i,height/2-arr[i][0]*height/2);
        }
        ctx.stroke();
    };
    this.fs = [];
    this.drawTransformed = function(){
        var arr = [];
        for(var i = 0; i < width; i++){
            var t = i/width;
            arr[i] = [that.origin(t),0];
        }
        arr = fourierTransform(arr);
        this.fs = fourierTransform(arr);
        ctx.beginPath();
        for(var i = 0; i < width; i++){
            ctx.lineTo(i,height/2-arr[i][0]*height/2);
        }
        ctx.stroke();
    };
    this.getNthDegree = function(t,n){
        var fs = that.fs;
        var val = 0;
        for(var i = 0; i < n; i++){
            var [magn,angle] = complexToExponential(fs[i]);
            val += magn*Math.sin(angle+i*t);
        }
        return val;
    };
    this.drawNthDegree = function(n){
        ctx.beginPath();
        for(var i = 0; i < width; i++){
            var t = i/width*6.28;
            var val = that.getNthDegree(t,n);
            ctx.lineTo(i,height/2-val*height/1000);
        }
        ctx.stroke();
    };
    this.drawOTO = function(){
        var arr = [];
        for(var i = 0; i < width; i++){
            var t = i/width;
            arr[i] = [that.origin(t),0];
        }
        arr = fourierTransform(arr);
        arr = fourierTransform(arr);
        ctx.beginPath();
        for(var i = 0; i < width; i++){
            ctx.lineTo(i,height/2-arr[i][0]*height/1000);
        }
        ctx.stroke();
    };
    */
    
};



var width = 500;
var height = 350;
var canvas = document.getElementById("canvas");
canvas.width = width;
canvas.height = height;
var ctx = canvas.getContext("2d");


var fa = new createFourierAnimation(canvas);

var start = 0;
var N = 1;
var animate = function(){
    /*if(start === 0)start = t;
    var dt = t - start;
    start = t;*/
    
    ctx.clearRect(0,0,width,height);
    ctx.strokeStyle = "#000";
    fa.generateFourierSeries(N);
    N++;
    fa.drawOrigin();
    ctx.strokeStyle = "#f00";
    fa.drawTransformed();

    ctx.beginPath();
    ctx.moveTo(0,height);
    ctx.lineTo(width,height);
    ctx.strokeStyle = "#00f";
    ctx.stroke();

    ctx.strokeStyle = "#ff0";
    //setTimeout(animate,10);
    requestAnimationFrame(animate);
};


animate();