var createFourierAnimation = function(canvas){
    var width = canvas.width;
    var height = canvas.height;
    var ctx = canvas.getContext("2d");
    var that = this;
    
    this.origin = function(t){
        return Math.sqrt(1-t*t);
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
    }
    
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
    
};



var width = 500;
var height = 1000;
var canvas = document.getElementById("canvas");
canvas.width = width;
canvas.height = height;
var ctx = canvas.getContext("2d");


var fa = new createFourierAnimation(canvas);


//fa.analyze(30);
//fa.drawFreq();
ctx.strokeStyle = "#0f0";
fa.drawOriginal();
ctx.strokeStyle = "#000";
fa.drawTransformed()
ctx.strokeStyle = "#f00";
fa.drawOTO();
ctx.beginPath();
ctx.moveTo(0,height/2);
ctx.lineTo(width,height/2);
ctx.strokeStyle = "#f00";
ctx.stroke();

ctx.strokeStyle = "#ff0";
fa.drawNthDegree(500);

