$(function(){
   var canvasBox=document.querySelector(".canvas-box");
    var canvasBoxW=canvasBox.offsetWidth;
    var canvasBoxH=canvasBox.offsetHeight;
    var canvas=document.querySelector("canvas");
    canvas.width=canvasBoxW;
    canvas.height=canvasBoxH;
    var cobj=canvas.getContext("2d");
    var copy=document.querySelector(".copy");
    var drawObj=new shape(canvas,copy,cobj);
    var img=document.querySelector("img");


    $(".aside-list:eq(6) input").change(function(){
        var fileObj=this.files[0];
        var reader=new FileReader();
        reader.readAsDataURL(fileObj);
        reader.onload=function(e){
            img.src= e.target.result;
            cobj.drawImage(img,0,0,canvas.width,canvas.height);
            dataobj=cobj.getImageData(0,0,canvas.width,canvas.height);
        }
    });





    $(".aside-list:eq(0) li").click(function(){
        var fn=$(this).attr("data-role");
        $(".aside-list:eq(0) li").css("color","#1a1d10")
        $(this).css("color","lightblue")
        if(fn=="1"){

if(drawObj.history.length>0){
    var yes=confirm("是否保存");
    if(yes){
        var url=canvas.toDataURL();
        var newurl=url.replace("image/png","stream/octet");
        location.href=newurl;
    }
}
            cobj.clearRect(0,0,canvas.width,canvas.height);
            drawObj.history=[];



        }else if(fn=="2"){

        if(drawObj.history.length==0){
            cobj.clearRect(0,0,canvas.width,canvas.height);
            setTimeout(function(){
                alert("不能再返回");
            },10);

        } else{
            if(drawObj.isback){
                if(drawObj.history.length==1){
                    drawObj.history.pop();
                    cobj.clearRect(0,0,canvas.width,canvas.height);
                }else{
                    drawObj.history.pop();
                    cobj.putImageData(drawObj.history[drawObj.history.length-1],0,0);
                }
            }else{
                drawObj.history.pop();
                cobj.putImageData(drawObj.history[drawObj.history.length-1],0,0);
            }
        }
        drawObj.isback=false;

        }else if(fn=="3"){
if(drawObj.history.length==0){
   var flag=false;
    alert("不能保存空白文档");
}else{
    if(flag){
        var url=canvas.toDataURL();
        var newurl=url.replace("image/png","stream/octet");
        location.href=newurl;
    }
    flag=true;

}



        }
    });



    $(".aside-list:eq(1) li").click(function(){
       var fn=$(this).attr("data-role");
        $(".aside-list:eq(1) li").css("color","#1a1d10")
        $(this).css("color","lightblue");
        if(fn=="duobian"){
            drawObj.bianNum=prompt("请输入边数:",drawObj.bianNum);
        }
        if(fn=="duojiao"){
            drawObj.jiaoNum=prompt("请输入边数:",drawObj.jiaoNum);
        }
        if(fn=="pen"){
            drawObj.pen();
        }else{
            drawObj.type=fn;
            drawObj.draw();
        }
    })



    $(".aside-list:eq(2) li").click(function(){
        var fn=$(this).attr("data-role");
        $(".aside-list:eq(2) li").css("color","#1a1d10")
        $(this).css("color","lightblue")
            drawObj.style=fn;
            drawObj.draw();
    });




    $(".aside-list:eq(3) input").change(function(){
        var fn=$(this).val();
        drawObj[$(this).attr("data-role")]=fn;
        drawObj.draw();
    });
    $(".aside-list:eq(3)").css("text-align","center");


    $(".aside-list:eq(4) li").click(function(){
        var fn=$(this).attr("data-role");
        $(".aside-list:eq(4) li").css("color","#1a1d10")
        $(this).css("color","lightblue")
        drawObj.lineWidth=fn;
        drawObj.draw();
    });
    $(".aside-list:eq(4)").css("text-align","center");



    $(".aside-list:eq(4) input").change(function(){
        var fn=$(this).val();
        drawObj.lineWidth=fn;
        drawObj.draw();
    });



    $(".aside-list:eq(5) li").click(function(){
        var xcObj=$(".eraser");
        var fn=$(this).attr("data-role");
        $(".aside-list:eq(5) li").css("color","#1a1d10")
        $(this).css("color","lightblue");
        drawObj.xpHidden=false;
        drawObj[fn](xcObj);
    });




    $(".aside-list:eq(5) input").change(function(){
        var xcObj=$(".eraser");
        var fn=$(this).val();
        var fnn=$(this).attr("data-role");
        xcObj.css({
            width:fn+"px",
            height:fn+"px",
        });
        //$(this).val(fn);
        drawObj.eraserSize=fn;
        drawObj[fnn](xcObj);
    });





    $(".aside-list:eq(6) li").click(function(){

        $(".aside-list:eq(6) li").css("color","#1a1d10")
        $(this).css("color","lightblue");
        drawObj[$(this).attr("data-role")](dataobj,20,0,0);

    });


















   $(".menu .menu-list").click(function(){
       drawObj.xpHidden=true;
       var xcObj=$(".eraser");
       xcObj.css({
           display:"none"
       })
      var index=$(".menu .menu-list").index(this);
       $(".menu .menu-list ").css("color","black")
       $(this).css("color","lightblue")
      $(".aside .aside-list").hide().eq(index).slideToggle(200);
   })



    $(".menu-list:last-child").click(function(){

    })













})