function shape(canvas,copy,cobj){
    this.canvas=canvas;
    this.cobj=cobj;
    this.copy=copy;
    this.width=this.canvas.width;
    this.height=this.canvas.height;
    this.type="line";
    this.style="stroke";
    this.fillStyle="#000";
    this.strokeStyle="#000";
    this.lineWidth=1;
    this.history=[];
    this.bianNum=5;
    this.jiaoNum=5;
    this.isback=true;
    this.eraserSize=10;
    this.xpHidden=false;
}
shape.prototype={
    init:function(){
        this.cobj.fillStyle=this.fillStyle;
        this.cobj.strokeStyle=this.strokeStyle;
        this.cobj.lineWidth=this.lineWidth;

    },
    draw:function(){
        var that=this;
        this.copy.onmousedown=function(e){
            e.preventDefault();
            var ox= e.offsetX;
            var oy= e.offsetY;
            that.copy.onmousemove=function(e){
                e.preventDefault();
                that.isback=true;
                var  mx= e.offsetX;
                var  my= e.offsetY;
                that.init();
                that.cobj.clearRect(0,0,that.width,that.height);
                if(that.history.length>0){
                    that.cobj.putImageData(that.history[that.history.length-1],0,0);
                }
                that.cobj.beginPath();
                that[that.type](ox,oy,mx,my);
            }
            that.copy.onmouseup=function(){
                that.history.push(that.cobj.getImageData(0,0,that.width,that.height));
                that.copy.onmousemove=null;
                that.copy.onmouseup=null;
            }
        }
    },
    line:function(x,y,x1,y1){
        this.cobj.moveTo(x,y);
        this.cobj.lineTo(x1,y1);
        this.cobj[this.style]();
    },
    rect:function(x,y,x1,y1){
        this.cobj.rect(x, y,x1-x,y1-y);
        this.cobj[this.style]();
    },
    arc:function(x,y,x1,y1){
        this.cobj.beginPath();
        var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
        this.cobj.arc(x,y,r,0,2*Math.PI);
        this.cobj[this.style]();
    },
    duobian:function(x,y,x1,y1){
        var angle=360/this.bianNum*Math.PI/180;
        var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
        for(var i=0;i<this.bianNum;i++){
            this.cobj.lineTo((x+r*Math.cos(angle*i)),(y+r*Math.sin(angle*i)));
        }
        this.cobj.closePath();
        this.cobj[this.style]();
    },
    duojiao:function(x,y,x1,y1){
        var angle=360/(this.jiaoNum*2)*Math.PI/180;
        this.cobj.beginPath();
        var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
        var r1=r/3;
        for(var i=0;i<this.jiaoNum*2;i++){
            if(i%2==0){
                this.cobj.lineTo((x+r*Math.cos(angle*i)),(y+r*Math.sin(angle*i)));
            }else{
                this.cobj.lineTo((x+r1*Math.cos(angle*i)),(y+r1*Math.sin(angle*i)));
            }
        }
        this.cobj.closePath();
        this.cobj[this.style]();
    },
    pen:function(){

        var that=this;
        this.copy.onmousedown=function(e){
            e.preventDefault();
            var ox= e.offsetX;
            var oy= e.offsetY;
            that.cobj.beginPath();
            that.cobj.moveTo(ox,oy);
            that.copy.onmousemove=function(e){
                e.preventDefault();
                that.isback=true;
                var  mx= e.offsetX;
                var  my= e.offsetY;
                that.init();
                that.cobj.clearRect(0,0,that.width,that.height);
                if(that.history.length>0){
                    that.cobj.putImageData(that.history[that.history.length-1],0,0);
                }
                that.cobj.lineTo(mx,my);
                that.cobj.stroke();
            }
            that.copy.onmouseup=function(){
                that.history.push(that.cobj.getImageData(0,0,that.width,that.height));
                that.copy.onmousemove=null;
                that.copy.onmouseup=null;
            }
        }
    },
    eraser:function(xcObj){
        var that=this;
        that.copy.onmousemove=function(e){
            if(that.xpHidden){
                return false;
            }
            var ox= e.offsetX;
            var oy= e.offsetY;
            var lefts=ox-that.eraserSize/2
            var heights=oy-that.eraserSize/2
            if(lefts<0){
                lefts=0;
            }
            if(lefts>that.width-that.eraserSize){
                lefts=that.width-that.eraserSize;
            }


            if(heights<0){
                heights=0;
            }
            if(heights>that.height-that.eraserSize){
                heights=that.height-that.eraserSize;
            }
            xcObj.css({
                display:"block",
                left:lefts+"px",
                top:heights+"px",
            });
        }
        that.copy.onmousedown=function(e){
            var dx= e.clientX;
            var dy= e.clientY;
            that.copy.onmousemove=function(e){
                that.isback=true;
                var ox= e.offsetX;
                var oy= e.offsetY;
                var lefts=ox-that.eraserSize/2
                var heights=oy-that.eraserSize/2
                if(lefts<0){
                    lefts=0;
                }
                if(lefts>that.width-that.eraserSize){
                    lefts=that.width-that.eraserSize;
                }


                if(heights<0){
                    heights=0;
                }
                if(heights>that.height-that.eraserSize){
                    heights=that.height-that.eraserSize;
                }
                xcObj.css({
                    display:"block",
                    left:lefts+"px",
                    top:heights+"px",
                });
                that.cobj.clearRect(ox,oy,that.eraserSize,that.eraserSize);
            }
            that.copy.onmouseup=function(){
                that.history.push(that.cobj.getImageData(0,0,that.width,that.height));
                that.copy.onmousemove=null;
                that.copy.onmouseup=null;
                that.eraser(xcObj);
            }
        }
        that.copy.onmouseout=function(){
            xcObj.css("display","none");
        }
    },
    fanxiang:function(data,x,y){
    for(var i=0;i<data.width*data.height;i++){
        data.data[i*4+0]=255-data.data[i*4+0];
        data.data[i*4+1]=255-data.data[i*4+1];
        data.data[i*4+2]=255-data.data[i*4+2];
        data.data[i*4+3]=255;
    }
    this.cobj.putImageData(data,x,y);
    },
    masaike:function(dataobj,num,x,y){
    var widths=dataobj.width;
    var heights=dataobj.height;
    var w=widths/num;
    var h=heights/num;
    for(var i=0;i<num;i++){
        for(var j=0;j<num;j++){
            var r=0;
            var g=0;
            var b=0;
            var data=this.cobj.getImageData(j*w,i*h,w,h);
            for(var k=0;k<data.width*data.height;k++){
                r+=data.data[k*4+0];
                g+=data.data[k*4+1];
                b+=data.data[k*4+2];
            }
            var r1=parseInt(r/(data.width*data.height));
            var g1=parseInt(g/(data.width*data.height));
            var b1=parseInt(b/(data.width*data.height));
            for(var m=0;m<data.width*data.height;m++){
                data.data[m*4+0]=r1;
                data.data[m*4+1]=g1;
                data.data[m*4+2]=b1;
            }
            this.cobj.putImageData(data,x+j*w,y+i*h)
        }
    }
    },
    gaosimoh:function(dataobj,num,x,y){
    var arr=[];
    var widths=dataobj.width;
    var heights=dataobj.height;
    for(var i=0;i< heights;i++){
        for(var j=0;j<widths;j++){
            var y1=i+num>heights?i-num:i;
            var x1=j+num>heights?j-num:j;
            var dataObj=this.cobj.getImageData(x1,y1,num,num);
            var r=0;var g=0;var b=0;
            for(var k=0;k<dataObj.width*dataObj.height;k++){
                r+=dataObj.data[k*4+0];
                g+=dataObj.data[k*4+1];
                b+=dataObj.data[k*4+2];
            }
            r=parseInt(r/(dataObj.width*dataObj.height));
            g=parseInt(g/(dataObj.width*dataObj.height));
            b=parseInt(b/(dataObj.width*dataObj.height));
            arr.push(r,g,b,255);
        }
    }
    for(var i=0;i<dataobj.data.length;i++){
        dataobj.data[i]=arr[i];
    }
    this.cobj.putImageData(dataobj,x,y);

}










}