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
    
    var freqs = [];
    var series = [];
    this.n = 0;
    this.freqs = freqs;
    this.series = series;
    
    this.resolve = function(n){//n is the number of ocsine waves that takes to approximate
        that.n = n;
        if(n === 0){
            freqs[0] = that.origin(0.5);//well this is the thing that does thieng
        }
        for(var i = 0; i < n; i++){
            var t = (i+0.5)/n;
            var val = that.origin(t);
            freqs[i] = val;
        }
        for(var i = 0; i < n; i++){
            series[i] = 0;
            var t = (i+0.5)/n;
            for(var j = 0; j < n; j++){
                var freq = n-j;//gets smaller to the end
                series[i] += Math.cos(freq*(t*Math.PI))*freqs[j];
            }
            series[i] /= n;
        }
    };
    
    this.drawResult = function(){
        var n = that.n;
        ctx.beginPath();
        for(var i = 0; i < width; i++){
            var t = i/width*Math.PI*2*5;
            var val = 0;
            for(var j = 0; j < n; j++){
                var freq = n-j;
                val += Math.cos(freq*t)*series[j];
            }
            //val /= n;
            ctx.lineTo(i,height/2-val*height/2);
        }
        ctx.stroke();
    };
    
    this.drawFreq = function(){
        var n = that.n;
        ctx.beginPath();
        for(var i = 0; i < width; i++){
            var t = i/width*Math.PI*2;
            var val = 0;
            for(var j = 0; j < n; j++){
                var freq = n-j;
                val += Math.cos(freq*t)*freqs[j];
            }
            val /= n;
            ctx.lineTo(i,height/2-val*height/2);
            //ctx.lineTo(i,val);
        }
        ctx.stroke();
    }
};



var width = 500;
var height = 500;
var canvas = document.getElementById("canvas");
canvas.width = width;
canvas.height = height;
var ctx = canvas.getContext("2d");


var fa = new createFourierAnimation(canvas);


fa.resolve(30);
fa.drawFreq();
fa.drawResult();

ctx.beginPath();
ctx.moveTo(0,height/2);
ctx.lineTo(width,height/2);
ctx.strokeStyle = "#f00";
ctx.stroke();


