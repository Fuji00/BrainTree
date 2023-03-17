let create_folder       //btn

let canvas_wapper;      //main_canvasの親の親
let canvas_area;        //main_canvasの親
let canvas_container;   //この変数内に子キャンバスを入れていく

let instance_count=0;   //folder作成を呼び出した回数


//選択されたCanvas、子要素を入れる用のdiv要素、ctxを入れる
let selectedCanvas={
    touch:null,         //クリック検知
    draw:null,          //描く
};
let selectedDiv;        //この変数内に子キャンバスの子を入れていく
let selectedctx={       //選択されたdrawCanvasのctxをいれる
    draw:null,
}
let selectedObject;     //選択されたobjectを入れる   まだいらない

let inChildFlg=false;   //子キャンバス内にフォルダを表示させるかどうか判別
let mode="1";

//folder,image,text,panel　の移動時に使用する
let moveObj;
let move_flg=false;
let mouseUpFlg=false;
let whatMoves;

//object
let brain_tree={
    selectFlg:true,
    canvasTouch:null,
    canvasDraw:null,
    canvasDrawCtx:null,
    canvasDrawData:null,
    image:{},
    text:{},
    child:{}
}

console.log("main");
//リサイズ
function reSize(){
    //親の親
    canvas_wapper.style.width=window.innerWidth+"px";
    canvas_wapper.style.height=window.innerHeight+"px";
    //親
    canvas_area.style.width=window.innerWidth+"px";
    canvas_area.style.height=window.innerHeight+"px";
    //canvas
    brain_tree.canvasTouch.width=window.innerWidth;
    brain_tree.canvasTouch.height=window.innerHeight;
    brain_tree.canvasDraw.width=window.innerWidth;
    brain_tree.canvasDraw.height=window.innerHeight;
    
}
window.addEventListener('resize',function(){//windowサイズが変更されるたびに呼ばれる
    reSize();
});

window.addEventListener('load',function(){
    //modal
    $('.show').modaal();

    canvas_wapper=document.querySelector('#canvas-wapper');
    canvas_wapper.style.zIndex=1;
    canvas_area=document.querySelector('#canvas-area');
    //canvas群
    brain_tree.canvasTouch=document.querySelector('#main-canvas');
    brain_tree.canvasTouch.data=instance_count;
    brain_tree.canvasDraw=document.querySelector('#draw-canvas');
    brain_tree.canvasDraw.data=instance_count;

    //ctx
    brain_tree.canvasDrawCtx=brain_tree.canvasDraw.getContext('2d');
    
    //この中に子要素を入れていく
    canvas_container=document.querySelector('#canvas-container');
    
    reSize();//最初に一度呼び出してキャンバスサイズを変更しておく。
   
    //新規フォルダ作成ボタン
    create_folder=document.querySelector('#new-folder-btn');
    create_folder.addEventListener('click',createFolder);

    //現在選択中のCanvasを入れる。　（最初に変数selectedCanvasに Canvas群を入れておく） 
    //selectedDivに子要素を入れていくためのcanvas_containerも入れる。
    selectedCanvas.touch=brain_tree.canvasTouch;
    selectedCanvas.touch.parentElement.classList.add('selected-canvas');
    selectedCanvas.draw=brain_tree.canvasDraw;
    selectedDiv=canvas_container;
    selectedctx.draw=brain_tree.canvasDrawCtx;

   
//////
    //モード切り替え（描画　画像　テキスト）
    modeChanger(selectedCanvas.touch,selectedCanvas.draw);      //最初に呼び出しておく　最初は書けるようにしておく
    drawSetting();                                              //最初に呼び出しておく　最初は書けるようにしておく
    //モードによって処理分岐
    $('[name="mode"]').on("change",function(event){
        mode=$('input[name="mode"]:checked').val();
        modeChanger(selectedCanvas.touch,selectedCanvas.draw);
    });

/////
    //save  reset
    //let btn_reset=document.querySelector('#btn-reset').addEventListener('click',function(){
        /*
        let res_reset=confirm("全てのフォルダやフォルダ内の内容が削除されます。よろしいですか？");
        if(res_reset){
            console.log("kese");
            //folder....の配列を全部入れる
            //let delet_array=[];
            console.log(canvas_container);
            for(let i=1;i<=canvas_container.length;i++){
                console.log(canvas_container.length);
                //canvas_container.removeChild(folder[i]);
            }
        }else{
            console.log("akann");
        }
        */
        //dataRestoration();//セーブデータの復元　仮置き
    //});
    //let btn_save=document.querySelector("#btn-save").addEventListener('click',saveAll);
/////
    //親キャンバスが押されたら （子キャンバスを選択後メインキャンバスを押したら呼ばれる）
    canvas_area.addEventListener('click',function(){
        canvasOverlapChanger(brain_tree.canvasTouch,brain_tree.canvasDraw);
        inChildFlg=false;

        selectedDiv=canvas_container;   
    });    
    

    /////////////////操作パネル移動
    const panelObj=document.querySelectorAll('.can-move');
    for(let i=0;i<panelObj.length;i++){
        panelObj[i].addEventListener('mousedown',function(event){
            whatMoves="window";
            pushAll(event);
        });
        panelObj[i].addEventListener('mousemove',function(event){
            moveAll(event);
        });
    
        panelObj[i].addEventListener('mouseup',function(event){
            upAll(event,whatMoves,"null");
        });
    }
});//onload end



//関数
function pushAll(event){
    moveObj=event.target;
    move_flg=true;
    mouseUpFlg=false;
   
    moveObj.ondragstart = function() {
        return false;
    };
    document.addEventListener('mousemove',moveAll);     
    document.addEventListener('mouseup',function(event){
        upAll(event,whatMoves,"null");
    }); 
}

function moveAll(event){
    if(!move_flg) return;

    event.stopImmediatePropagation();//これでdocument.addEventListener('mousemove'が呼ばれるのを止める
    if(whatMoves=="window"){
        moveObj.parentNode.style.left=event.clientX-50+"px";
        moveObj.parentNode.style.top=event.clientY-10+"px";
    }else if(whatMoves=="folder"){
        if(inChildFlg==true){
            moveObj.parentNode.style.left=event.clientX-selectedCanvas.touch.getBoundingClientRect().left-30+"px";//子要素用
            moveObj.parentNode.style.top=event.clientY-selectedCanvas.touch.getBoundingClientRect().top-60+"px";
        }else{
            moveObj.parentNode.style.left=event.clientX-50+"px";
            moveObj.parentNode.style.top=event.clientY-60+"px";
        }
    }else if(whatMoves=="canvas"){
        if(inChildFlg==true){//子
            console.log("child");
            moveObj.parentNode.parentNode.style.left=event.clientX-selectedCanvas.touch.getBoundingClientRect().left-30+"px";//子要素用
            moveObj.parentNode.parentNode.style.top=event.clientY-selectedCanvas.touch.getBoundingClientRect().top-60+"px";
        }else{
            moveObj.closest("#folder"+moveObj.data).style.left=event.clientX-selectedCanvas.touch.getBoundingClientRect().left-100+"px";
            moveObj.closest("#folder"+moveObj.data).style.top=event.clientY-selectedCanvas.touch.getBoundingClientRect().top-40+"px";
        }
    }else if(whatMoves=="img"){
        if(inChildFlg==true){//子
            console.log("child");
            moveObj.style.left=event.clientX-selectedCanvas.touch.getBoundingClientRect().left-30+"px";//子要素用
            moveObj.style.top=event.clientY-selectedCanvas.touch.getBoundingClientRect().top-60+"px";
        }else{
            moveObj.style.left=event.clientX-selectedCanvas.touch.getBoundingClientRect().left-100+"px";
            moveObj.style.top=event.clientY-selectedCanvas.touch.getBoundingClientRect().top-40+"px";
        }
    }else if(whatMoves=="text"){
        if(inChildFlg==true){//子
            console.log("child");
            moveObj.style.left=event.clientX-selectedCanvas.touch.getBoundingClientRect().left-3+"px";//子要素用
            moveObj.style.top=event.clientY-selectedCanvas.touch.getBoundingClientRect().top-10+"px";
        }else{
            console.log("text");
            moveObj.style.left=event.clientX-selectedCanvas.touch.getBoundingClientRect().left-3+"px";
            moveObj.style.top=event.clientY-selectedCanvas.touch.getBoundingClientRect().top-10+"px";
        }
    }
}

function upAll(event,whatMoves,panel){
    if(!move_flg){return;}
    mouseUpFlg=true;
    move_flg=false;
    console.log(whatMoves);
    if(whatMoves=="folder"){
        panel.style.display="block";
        panel.style.top=80+"px";
    }
    event.stopImmediatePropagation();       //これでdocument.addEventListener('mousemove'が呼ばれるのを止める
}

function modeChanger(touchC,drawC){         //モードパネルの内容次第で重なり順を変える
    let touch=touchC;
    let draw=drawC;
  
    //パネル    最初は消しとく　
    $("#text-info").hide();
    $("#image-info").hide();

    if(mode=="1"){
        console.log("描画モード");
        draw.classList.add("z-position");
        touch.classList.remove("z-position");
        $('#draw-info').show();
        $("#text-info").hide();
        $("#image-info").hide();

    }else if(mode=="2"){
        console.log("画像モード");
        draw.classList.remove("z-position");
        touch.classList.remove("z-position");
        $("#image-info").show();
        $("#text-info").hide();
        $('#draw-info').hide();

    }else if(mode=="3"){
        console.log("テキストモード");
        draw.classList.remove("z-position");
        touch.classList.remove("z-position");
        $("#text-info").show();
        $('#draw-info').hide();
        $("#image-info").hide();
    }
}

function canvasOverlapChanger(touchC,drawC){//Canvasの選択　切り替え
    //子キャンバスを押したときに親キャンバスを押せる状態にする（逆も）(兄弟も)
    //前のキャンバスの重なり順を切り替える　mainが一番上になるように
    selectedCanvas.touch.classList.add('z-position');//前のキャンバスをまた押せる状態にする
    selectedCanvas.draw.classList.remove('z-position');
    selectedCanvas.touch.parentElement.classList.remove('selected-canvas');//まず前のヤツ消す
    selectedCanvas.touch.parentElement.classList.add('remove-canvas');
    selectCanvas(selectedCanvas.touch);

    //入れ替え
    selectedCanvas.touch=touchC;
    selectedCanvas.draw=drawC;
        
    //今のキャンバス
    selectedCanvas.touch.parentElement.classList.add('selected-canvas');
    selectedCanvas.touch.parentElement.classList.remove('remove-canvas');
    modeChanger(selectedCanvas.touch,selectedCanvas.draw);
    selectCanvas(selectedCanvas.touch);//object関連
    drawSetting();//描画セッティング
}
