    //draw
    let draw_mode="1";
    let startX=0;
    let startY=0;
    let holdClick=false;
    let penSize=10;
    
    //img
    let upFile=document.querySelector('#uploadFile');
    let imgCallCount=0;
    let dispImage=[];
    //text
    let textWord="";
    let writeText;
    let dispText=[];
    let textCallCount=0;

    let targetObject;//選択したオブジェクトを入れる用//////////////////
    let paintColor;//色を入れる///////////////////////

   
window.addEventListener('load',function(){
    //draw
    $('[name="draw-type"]').on('change',function(){//描画、消しゴム
        draw_mode=$('input[name="draw-type"]:checked').val();
    });
    //selectedCanvas.drawの内容を削除
    let clearBtn=document.querySelector('#clear-btn-draw').addEventListener('click',function(){
        clearDraw(drawCtx);
    });
    //image
    upFile.addEventListener("change",function(event){
        let file=event.target.files[0];
        
        if(file==undefined) return;//画像も何も選択しなければエラーが出たので記述した
        if(file.type.indexOf("image")<0){//画像でなければ処理終了
            alert("画像ファイルを指定してください")
            return false;
        }
        let reader=new FileReader();
        reader.onload=(function(file){
            return function(event){
                image(event.target.result);
            }
        })(file);
        reader.readAsDataURL(file);
        upFile.value="";//これをしないと同じ画像を選択できない 
    });

    //text
    textWord=document.querySelector('#word').addEventListener("change",function(event){
        writeText=event.target.value;
        let btn_text=document.querySelector('#send-btn').addEventListener('click',function(){
            makeText(writeText);
        });
    });
});

//draw
function drawSetting(){    
    //drawCtx=selectedCanvas.draw.getContext('2d');
    //マウスクリック
    selectedCanvas.draw.addEventListener("mousedown",mouseDown);
    //マウス移動
    selectedCanvas.draw.addEventListener("mousemove",function(event){
        mouseMove(event,selectedctx.draw);
    });
    //マウス外しイベント
    selectedCanvas.draw.addEventListener("mouseup",mouseUp);
}
//マウスクリックイベント
function mouseDown(e){
    console.log("downConunt");
    holdClick=true;
    paintColor=document.querySelector("#inputColor").value;//
    changeScaleDraw();//ペンのサイズを変える
    startX=e.offsetX;//現在のポインター位置記憶
    startY=e.offsetY;
}
//マウス移動イベント
function mouseMove(e,drawCtx){
    if(draw_mode==="1"){
        if(holdClick){
            drawPen(e,drawCtx);
        }
    }else if(draw_mode==="2"){
        if(holdClick){
            drawErase(e,drawCtx);
        }
    }
}
//マウスクリック外しイベント
function mouseUp(e){
    holdClick=false;
}
/////////////////////////////////////////////////////draw
function drawPen(e,drawCtx){
    drawCtx.lineWidth=penSize;
    drawCtx.strokeStyle=paintColor;
    drawCtx.lineJoin="round";
    drawCtx.lineCap="round";
    drawCtx.globalCompositeOperation='source-over';
    drawCtx.beginPath();
    drawCtx.moveTo(startX,startY);
    drawCtx.lineTo(e.offsetX,e.offsetY);
    drawCtx.stroke();
    drawCtx.closePath();

    // 次の描画に向けて現在の座標を保持（開始座標・終了座標を同じ座標にしてしまうと
    //マウスを高速に移動したときに歯抜け状態になる）
    //移動中のマウスポインタの位置を記録　mousemoveの間記録し続ける
    startX=e.offsetX;
    startY=e.offsetY;
}

//消しゴム　
function drawErase(e,drawCtx){
    drawCtx.lineWidth=penSize;
    drawCtx.lineCap="round";
    drawCtx.strokeStyle="rgba(255,255,255,1)";
    drawCtx.globalCompositeOperation='destination-out';//透明色
    drawCtx.beginPath();
    drawCtx.moveTo(startX,startY);
    drawCtx.lineTo(e.offsetX,e.offsetY);
    drawCtx.stroke();
    drawCtx.closePath();

    // 次の描画に向けて現在の座標を保持（開始座標・終了座標を同じ座標にしてしまうと
    //マウスを高速に移動したときに歯抜け状態になる）
    startX=e.offsetX;
    startY=e.offsetY;
}
function changeScaleDraw(event){
    let sliderD =document.querySelector("#zoom-slider-draw");
    sliderD.value=penSize;
    sliderD.min=1;
    sliderD.max=20;
    sliderD.step='any';
    //targetObject=containerImage.children[event.target.value];//container（配列的なヤツ）の中から添え字がevent.target.valueのヤツを変数に入れる
    sliderD.addEventListener('input',(e)=>{
        penSize=e.target.value;
    });
}
function clearDraw(drawCtx){
    let res_delete=confirm("現在選択中のキャンバスの描画を削除します。よろしいですか？");
    if(res_delete){
        drawCtx.clearRect(0,0,selectedCanvas.draw.getBoundingClientRect().width ,selectedCanvas.draw.getBoundingClientRect().height );
    }
}
////////////////////////////////////////////////////image
function image(src){
    imgCallCount++
            let unko;
    let img=new Image();
    img.src=src;
    img.onload=()=>{
        //loadした情報で要素を作成
        let makeImage=document.createElement('input');
        makeImage=document.createElement('input');
        makeImage.id="image"+imgCallCount;
        makeImage.src=img.src;
        makeImage.type='image';
        makeImage.data=imgCallCount;
        makeImage.classList.add('absolute');
        makeImage.classList.add('shadow');
        makeImage.style.top=20+"px";
        makeImage.style.zIndex=2;
        dispImage[imgCallCount]=makeImage;
        selectedDiv.appendChild(dispImage[imgCallCount]);

        imageTextInObject("image",src,dispImage[imgCallCount],imgCallCount);//brain_treeにimage情報を入れる
        //イベント
        dispImage[imgCallCount].addEventListener('mousedown',function(event){
            //targetObject=null;//複数選択を避けるために、空にしておく
            targetObject=event.target;//拡大縮小のためにオブジェクトを入れる、削除時の添え字としても使う
            whatMoves="img";
            pushAll(event);
            var clearBtn=document.querySelector("#clear-button-image").addEventListener("click",clearImage);
            changeScaleImage(targetObject);
        });
        dispImage[imgCallCount].addEventListener('mousemove',function(event){
            moveAll(event);
        });
        dispImage[imgCallCount].addEventListener('mouseup',function(event){
            upAll(event,whatMoves,"null");
            imageTextInObject("image",src,dispImage[event.target.data],event.target.data);//brain_treeにimage情報を入れる
        });
        console.log(dispImage[imgCallCount]);
        unko=dispImage[imgCallCount];
        console.log(unko);
    };
    return unko;
}
///画像の大きさを変える
function changeScaleImage(event){
    let slider =document.querySelector("#zoom-slider-img");
    slider.value=1;
    slider.min=0.01;
    slider.max=2;
    slider.step='any';
    slider.addEventListener('input',(e)=>{
        targetObject.style.transform="scale("+e.target.value+","+e.target.value+")";
    });
}
//画像を削除
function clearImage(event){
    let res_delete=confirm("現在選択中の画像を削除します。よろしいですか？");
    if(res_delete){
        dispImage[targetObject.data].remove();
    }
}
////////////////////////////////////////////////////text
function makeText(writeText){
    textCallCount++
    paintColor=document.querySelector("#inputColor").value;//
    let makeText=document.createElement('p');
    makeText.innerHTML=writeText;
    makeText.classList.add('absolute');
    makeText.classList.add('shadow');
    makeText.style.zIndex=2
    makeText.style.color=paintColor;
    makeText.data=textCallCount;
    dispText[textCallCount]=makeText;
    selectedDiv.appendChild(dispText[textCallCount]);

    imageTextInObject("text",writeText,dispText[textCallCount],textCallCount);//brain_treeにimage情報を入れる

    dispText[textCallCount].addEventListener('mousedown',function(event){
        targetObject=event.target;//拡大縮小のためにオブジェクトを入れる、削除時の添え字としても使う
        whatMoves="text";
        pushAll(event);
        let clearBtn=document.querySelector("#clear-button-text").addEventListener("click",clearText);
        changeScaleText(targetObject);
    });
    dispText[textCallCount].addEventListener('mousemove',function(event){
        moveAll(event);
    });
    dispText[textCallCount].addEventListener('mouseup',function(event){
        upAll(event,whatMoves,"null");
        imageTextInObject("text",writeText,dispText[event.target.data],event.target.data);//brain_treeにimage情報を入れる
    });

    return dispText[textCallCount];
}    
///textの大きさを変える
function changeScaleText(event){
    
    let sliderT =document.querySelector("#zoom-slider-text");
    sliderT.value=1;
    sliderT.min=0.01;
    sliderT.max=2;
    sliderT.step='any';
    //targetObject=containerImage.children[event.target.value];//container（配列的なヤツ）の中から添え字がevent.target.valueのヤツを変数に入れる
    sliderT.addEventListener('input',(e)=>{
        targetObject.style.transform="scale("+e.target.value+","+e.target.value+")";
    });
}
//画像を削除
function clearText(event){
    let res_delete=confirm("現在選択中のテキストを削除します。よろしいですか？");
    if(res_delete){
        dispText[targetObject.data].remove();
    }
}
////////////////////////////////////////
function imageTextInObject(name,src,movedObj,num){
    let objectName="object"+num;
    let imageText={
        [objectName]:{
            movedObj:null,//コレを動かすpositionの位置へ
            data:null,
            positionLeft:null,
            positionTop:null,
        }   
    }

    let moveObj=document.querySelector('#image'+num);
    imageText[objectName].movedObj=moveObj;
    
    if(selectedCanvas.touch.data==0){//main-canvas
        
        imageText[objectName].data=src;
        //位置を記録
            //console.log(movedObj.target.getBoundingClientRect().left);
            imageText[objectName].positionLeft=movedObj.getBoundingClientRect().left;
            imageText[objectName].positionTop=movedObj.getBoundingClientRect().top;
        Object.assign(brain_tree[name],imageText);
    }else{                        //子Canvas達
        for(key in brain_tree.child){
            imageText[objectName].data=src;
            //位置を記録
                imageText[objectName].positionLeft=movedObj.getBoundingClientRect().left;
                imageText[objectName].positionTop=movedObj.getBoundingClientRect().top;
            Object.assign(brain_tree.child[key][name],imageText);
        }
    }
    console.log(brain_tree);
}





