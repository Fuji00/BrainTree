function createFolder(){
    instance_count++;
    //div                                    div img canvasを作る
        folder[instance_count]=document.createElement('div');
        folder[instance_count].id="folder"+instance_count;
        folder[instance_count].classList.add('absolute');
        folder[instance_count].classList.add('no-copy');
    //ここでifをして、どのキャンバスが選択されているかを判別してそのキャンバスが所属しているdiv要素の子（appendChild）にする 
        if(selectedCanvas.touch==touch_canvas){
            //1個目の要素
            canvas_container.appendChild(folder[instance_count]);
            console.log(canvas_container);
            inChildFlg=false;
        }else{
            //子要素
            folder[instance_count].style.top=20+"px";
            folder[instance_count].style.left=10+"px";
            //選択しているキャンバスの兄弟（div）の子にする
            selectedDiv.appendChild(folder[instance_count]);
        }
      

    //imgButton
        let folder_btn=document.createElement('input');
        folder_btn.id="folder-btn"+instance_count;
        folder_btn.data=instance_count;
        folder_btn.type='image';
        folder_btn.src=folder_img;
        folder_btn.classList.add('absolute');
        folder_btn.classList.add('shadow');
        folder_btn.style.top=20+"px";
        folder_btn.style.zIndex=2;
        folder[instance_count].appendChild(folder_btn);
       

    //titleText
        let folder_title=document.createElement('p');
        folder_title.id="folder-title"+instance_count;
        folder_title.innerHTML="タイトル"+instance_count;
        folder_title.classList.add('absolute');
        folder_title.style.width=100+"px";
        folder_title.style.backgroundColor="yellow";
        folder_title.style.borderRadius=5+"px";
        folder_title.style.zIndex=2;
        folder[instance_count].appendChild(folder_title);
        
        //禁止マーク
        let folder_prohibition_mark=document.createElement('img');//禁止マーク
        folder_prohibition_mark.src="../images/ban2.png";//"https://bt.mpf23.com/BrainTree/brain_tree_test1/images/ban2.png";//"../images/ban2.png";
        folder_prohibition_mark.style.zIndex=2;
        folder_prohibition_mark.style.top=40+"px";
        folder_prohibition_mark.style.left=25+"px";
        folder_prohibition_mark.classList.add('absolute');
        folder_prohibition_mark.style.display="none";
        folder[instance_count].appendChild(folder_prohibition_mark);

    //panel
        let panel=document.createElement('div');
        panel.id="panel"+instance_count;
        panel.classList.add('absolute');
        panel.style.width=200+"px";
        panel.style.height=90+"px";
        panel.style.padding=10+"px";
        panel.style.borderRadius=5+"px";
        panel.style.backgroundColor="pink";
        panel.style.zIndex=2;
        folder[instance_count].appendChild(panel);
        panel.style.display="none";

        //input
        let title=document.createElement('input');
        title.id="title"+instance_count;
        title.type='text';
        title.size='11';
        title.placeholder='title-12文字以内-';
        panel.appendChild(title);
        //button
        let btn_decision=document.createElement('button');
        btn_decision.id="btn-decision"+instance_count;
        btn_decision.data=instance_count;
        btn_decision.innerHTML="決定";
        panel.appendChild(btn_decision);

        let btn_open=document.createElement('button');
        btn_open.id="btn-open"+instance_count;
        btn_open.innerHTML="開く";
        //btn_open.style.marginTop=
        panel.appendChild(btn_open);

        let btn_delete=document.createElement('button');
        btn_delete.id="btn-delete"+instance_count;
        btn_delete.innerHTML="削除";
        panel.appendChild(btn_delete);

    //canvas div
        let canvas_div=document.createElement('div');
        canvas_div.id="canvas-area"+instance_count;
        canvas_div.style.width=window.innerWidth/3+"px";//まずサイズ小で表示
        canvas_div.style.height=window.innerHeight/2+"px";
        canvas_div.classList.add('absolute');
        canvas_div.classList.add('shadow');
        canvas_div.style.zIndex=3;
        canvas_div.style.display='none';
        folder[instance_count].appendChild(canvas_div);
        

        //header
        let header=document.createElement('div');
        header.id="canvas-header"+instance_count;
        header.data_name="header";
        header.data=instance_count;
        header.style.width=100+"%";
        header.style.height=51+"px";
        header.style.zIndex=1;
        header.style.backgroundColor='pink';
        header.style.textAlign="right";
        header.style.display="flex";
        header.style.justifyContent="space-between";
        header.classList.add("no-copy");
        canvas_div.appendChild(header);

        let header_prohibition_mark=document.createElement('img');//禁止マーク
        header_prohibition_mark.src="../images/ban2.png";//"https://bt.mpf23.com/BrainTree/brain_tree_test1/images/ban2.png";//../images/ban2.png";
        header_prohibition_mark.style.display="none";
        header.appendChild(header_prohibition_mark);

        let headerOperationDiv=document.createElement('div');//イベント伝播を止めるために作成する
        headerOperationDiv.id="headerOperationDiv";
        headerOperationDiv.style.margin="0 auto";
        header.appendChild(headerOperationDiv);

        //ラジオボタン
        let radioBtnContainer=document.createElement('div');//
        radioBtnContainer.id="radioBtnContainer"+instance_count;
        radioBtnContainer.classList.add('btn-group');
        radioBtnContainer.classList.add('pointer-on');
        radioBtnContainer.setAttribute('data-toggle', 'buttons');
        radioBtnContainer.style.display="none";
        headerOperationDiv.appendChild(radioBtnContainer);

        let radioBtnLabel1=document.createElement('label');
        radioBtnLabel1.classList.add('btn');
        radioBtnLabel1.classList.add('btn-default');
        radioBtnLabel1.classList.add('active');
        radioBtnLabel1.innerHTML="小";
        radioBtnContainer.appendChild(radioBtnLabel1);
        let radioBtn1=document.createElement('input');
        radioBtn1.autocomplete="off";
        radioBtn1.type="radio";
        radioBtn1.name="size";
        radioBtn1.value="1";
        radioBtn1.checked=true;
        radioBtnLabel1.appendChild(radioBtn1);
        
        let radioBtnLabel2=document.createElement('label');
        radioBtnLabel2.classList.add('btn');
        radioBtnLabel2.classList.add('btn-default');
        radioBtnLabel2.innerHTML="中";
        radioBtnContainer.appendChild(radioBtnLabel2);
        let radioBtn2=document.createElement('input');
        radioBtn2.autocomplete="off";
        radioBtn2.type="radio";
        radioBtn2.name="size";
        radioBtn2.value="2";
        radioBtnLabel2.appendChild(radioBtn2);
        
        let radioBtnLabel3=document.createElement('label');
        radioBtnLabel3.classList.add('btn');
        radioBtnLabel3.classList.add('btn-default');
        radioBtnLabel3.innerHTML="大";
        radioBtnContainer.appendChild(radioBtnLabel3);
        let radioBtn3=document.createElement('input');
        radioBtn3.autocomplete="off";
        radioBtn3.type="radio";
        radioBtn3.name="size";
        radioBtn3.value="3";
        radioBtnLabel3.appendChild(radioBtn3);
        

        //閉じるボタン
        let btn_close=document.createElement('button');
        btn_close.id="btn-close"+instance_count;
        btn_close.innerHTML="閉じる";
        btn_close.style.margin="0px 10px 0px 10px";
        btn_close.classList.add('pointer-on');
        headerOperationDiv.appendChild(btn_close);

        //body
        let body=document.createElement('div');
        body.classList.add('absolute');
        body.style.top=50+"px";
        body.style.zIndex=1;
        body.style.backgroundColor='skyblue';
        body.style.width=window.innerWidth/3+"px";
        body.style.height=window.innerHeight/2-50+"px";
        body.style.overflow='hidden';
        canvas_div.appendChild(body);

        //body in div このbgを変える
        let body_in_div=document.createElement('div');
        body_in_div.id="body-in-div"+instance_count;
        body_in_div.style.width=canvasSizeMax.width+"px";
        body_in_div.style.height=canvasSizeMax.height+"px";
        body_in_div.classList.add('absolute');
        body_in_div.style.zIndex=1;    
        body.appendChild(body_in_div);

        //canvas draw
        let canvasDraw=document.createElement('canvas');
        canvasDraw.width=canvasSizeMax.width;
        canvasDraw.height=canvasSizeMax.height;
        canvasDraw.id="draw-canvas"+instance_count;
        canvasDraw.data=instance_count;
        canvasDraw.classList.add('absolute');
        body_in_div.appendChild(canvasDraw);

        //canvas タッチ用
        let canvas=document.createElement('canvas');
        canvas.width=canvasSizeMax.width;
        canvas.height=canvasSizeMax.height;
        canvas.id="canvas"+instance_count;
        canvas.data=instance_count;
        canvas.data_title="タイトル"+instance_count;
        canvas.classList.add('absolute');
        body_in_div.appendChild(canvas);

        //Canvas ctx
        let canvasDrawCtx=canvasDraw.getContext('2d');

    //子要素を入れていくためのdiv
        let parentChild=document.createElement('div');
        parentChild.style.width=canvas.width+"px";
        parentChild.style.height=canvas.height+"px";
        parentChild.style.overflow='hidden';
        body.appendChild(parentChild);
        
        let div_child=document.createElement('div');
        div_child.id="div-child"+instance_count;
        div_child.classList.add('absolute');
        
        parentChild.appendChild(div_child);
  
        
    //イベント    

    //フォルダを移動
        folder_btn.addEventListener('mousedown',function(event){
            targetFolderNum=event.target.data;
            whatMoves="folder";
            pushAll(event);
            event.stopImmediatePropagation();//これでdocument.addEventListener('mousemove'が呼ばれるのを止める
        });
        folder_btn.addEventListener('mousemove',function(event){
            moveAll(event);
        });
        folder_btn.addEventListener('mouseup',function(event){
            upAll(event,whatMoves,panel);

            //braintree用 folderの位置を記録　　次回起動時復元する
            savePosition(event);
        });

        //Canvas移動
        header.addEventListener('mousedown',function(event){
            whatMoves="canvas";
            pushAll(event,"2")
           
            event.stopImmediatePropagation();//これでdocument.addEventListener('mousemove'が呼ばれるのを止める
        });
        header.addEventListener('mousemove',function(event){
            moveAll(event);
        });
        header.addEventListener('mouseup',function(event){
            upAll(event,"2",whatMoves,"null");
            //位置を記録　次回起動時復元する
            savePosition(event);
        });

        //パネルを消す処理
        document.addEventListener('click',(e)=>{
            console.log("パネル消し");
            if(e.target.id!=folder_btn.id&&e.target.id!=panel.id&&e.target.id!=title.id
            &&e.target.id!=btn_decision.id&&e.target.id!=btn_open.id
            &&e.target.id!=btn_close.id&&e.target.id!=btn_delete.id){
                panel.style.display="none";
            }
        });  
        



        /////////////////////////////
        //イベント  パネル内の要素  
        btn_decision.addEventListener('click',function(){
            //input内の文字を取得し、folder_btnのinnerHTMLを書き換える
            if(title.value.length>=12){
                title.value="";
            }else{
                folder_title.innerHTML=title.value;
                canvas.data_title=title.value;
                //folderTitle復元用　objectに記録しておく
                brain_tree.child["folderContainer"+btn_decision.data].folderTitleData=folder_title.innerHTML;
            }
        });
        btn_open.addEventListener('click',function(){
            canvas_div.style.display='block';
            folder_btn.style.display='none';
            folder_title.style.display='none';
            panel.style.display='none';
        });
        btn_close.addEventListener('click',function(event){
            canvas_div.style.display='none';
            folder_btn.style.display='block';
            folder_title.style.display='block';
            panel.style.display='block';
        });
        btn_delete.addEventListener('click',function(){
            let res_folder_delete=confirm("このフォルダを削除すると、フォルダ内の内容も削除されます。よろしいですか？");
            if(res_folder_delete){
                folder[targetFolderNum].remove();
            }
        });

        ///////////////////////////////canvas関連イベント
        //header
        headerOperationDiv.addEventListener('mousedown',function(event){//コレを入れないと閉じるボタンが押されたらCanvasが移動する
            event.stopPropagation();//これでdocument.addEventListener('mousemove'が呼ばれるのを止める
        });

        //パネルを押した状態で新規フォルダ作成ボタンを押したら子キャンバスにだけフォルダが表示される
        //このcanvasをクリックすると変数selectedCanvasに入れられる。
        body_in_div.addEventListener('click',function(event){
           
            //キャンバスの重なり順を切り替える   選択しているキャンバスを切り替える
            canvasOverlapChanger(canvas,canvasDraw);

            //入れ替え
            selectedDiv=div_child;
           
            inChildFlg=true;//子フォルダを動かすための

            event.stopPropagation();//これでdocument.addEventListener('mousemove'が呼ばれるのを止める
        });


    //キャンバス内のボタン
        $('[name="size"]').on("change",function(event){
            size=$('input[name="size"]:checked').val();
            if(size=="1"){//小
                header.style.width=window.innerWidth/3+"px";
                body.style.width=window.innerWidth/3+"px";
                body.style.height=window.innerHeight/2-50+"px";
                body_in_div.style.width=100+"%";    
                body_in_div.style.heigh=100+"%";
            }else if(size=="2"){//中
                header.style.width=window.innerWidth/2+"px";
                body.style.width=window.innerWidth/2+"px";
                body.style.height=window.innerHeight-100+"px";
                body_in_div.style.width=window.innerWidth/2+"px";
                body_in_div.style.height=window.innerHeight+"px";
            }else if(size=="3"){//大
                header.style.width=window.innerWidth+"px";
                body.style.width=window.innerWidth+"px";
                body.style.height=window.innerHeight-100+"px";
                body_in_div.style.width=window.innerWidth+"px";
                body_in_div.style.height=window.innerHeight+"px";
            }
             event.stopPropagation();//これでdocument.addEventListener('mousemove'が呼ばれるのを止める
        });

       

    ///////////////////////////////
    //brain_tree.child={};
    //brain_tree.child.id=instance_count;
    let folderContainer="folderContainer"+instance_count;//key名
    let temporaryArray={
        [folderContainer]:{}
    };                  //一時的に作る配列　1
    let testfolder={
        selectFlg:false,
        folderWrapper:folder[instance_count],//データ復元時にこれの位置を動かす
        folder:folder_btn,//moveのon,offを切り替える用
        folderTitle:folder_title,
        folderTitleData:folder_title.innerHTML,

        canvasHeader:header,//moveのon,offを切り替える用
        
        prohibition_mark_folder:folder_prohibition_mark,//moveオフ時に画像を表示する用
        prohibition_mark_header:header_prohibition_mark,//moveオフ時に画像を表示する用
        
        //onCanvasData:selectedCanvas.main.data,//どのCanvas上に表示されたか
        //inChildContainer:div_child,//子要素を入れていく要素
        //selectDiv:selectedDiv,//この要素が入れられている親要素
        selectDivString:selectedDiv.id,
        //canvasFolder:canvas,
        canvasDraw:canvasDraw,
        canvasDrawCtx:canvasDrawCtx,
       
        //canvasFolderData:null,//canvasの内容記録用
        canvasDrawData:null,
        
        positionLeft:0,//folderの位置記録用
        positionTop:0,
        
        canvasSizeBtn:radioBtnContainer,//active,hideを切り替える用
        canvasSize:"小",
        parent:null,                     //親要素を記録

        image:{},//data,positionをいれる
        text:{}//data,positionをいれる
    };

    //どの子要素かを記録しておく　現在選択されているCanvasを取得し、そのCanvasの子とする
    if(selectedCanvas.touch.data==0){
        testfolder.parent="mainCanvas"+selectedCanvas.touch.data;
    }else{
        //testfolder.parent="child in folder"+"("+selectedCanvas.main.data_title+")";
        testfolder.parent="folderContainer"+selectedCanvas.touch.data;
    }
    //canvasAssign("folderContainer"+instance_count,folder[instance_count]);
    
    Object.assign(temporaryArray[folderContainer],testfolder);//2の中身を、1の子の中に入れる
    Object.assign(brain_tree.child,temporaryArray);//ここを分岐で変えていく　どの階層に入れるか
    console.log(brain_tree.child);

    function savePosition(movedObj){
        //braintree用 folderの位置を記録
        for(key in brain_tree.child){
            if(key=="folderContainer"+movedObj.target.data){
                brain_tree.child[key].positionLeft=movedObj.target.getBoundingClientRect().left;
                brain_tree.child[key].positionTop=movedObj.target.getBoundingClientRect().top;
            }
        }
    }
    return folder[instance_count];    
}

function selectCanvas(object){//キャンバスが選択されたときの処理 objectの中身(selectedCanvas.main)
    //mainCanvas
    if(object.data==0){
        //親要素であるmainCanvasを選択状態(true)にする
        brain_tree.selectFlg=true;
        selectedctx.draw=brain_tree.canvasDrawCtx;//これでまた書けるようになる
        for(key in brain_tree.child){//子要素はfalseにしておく
            brain_tree.child[key].selectFlg=false;
            //サイズボタンオフ
            brain_tree.child[key].canvasSizeBtn.style.display="none";
        }
    }
    //子要素たち
    for(key in brain_tree.child){
        //押されたCanvasのobjectのselectFlgをtrueにする
        if(key=="folderContainer"+object.data){//keyとクリックしたCanvasのdataが一致したら
            if(brain_tree.child[key].selectFlg==true){//選択解除
                brain_tree.child[key].selectFlg=false;
                //サイズボタンオフ
                brain_tree.child[key].canvasSizeBtn.style.display="none";
            }else{                                     //選択中
                brain_tree.child[key].selectFlg=true;
                //サイズボタンオン
                brain_tree.child[key].canvasSizeBtn.style.display="inline-block";
                //drawSetting()で使用するctx設定
                selectedctx.draw=brain_tree.child[key].canvasDrawCtx;
            }
        }

        //選択されたCanvas上のフォルダやキャンバスだけ移動可能にする
        brain_tree.child[key].folder.classList.add('no-push');//最初は全部オフに
        brain_tree.child[key].canvasHeader.classList.add('no-push');
        brain_tree.child[key].prohibition_mark_folder.style.display="inline-block";
        brain_tree.child[key].prohibition_mark_header.style.display="inline-block";
        if(brain_tree.child[key].parent=="mainCanvas"+object.data){//メインの直下のフォルダ達だけ移動可能に
            brain_tree.child[key].folder.classList.remove('no-push');
            brain_tree.child[key].canvasHeader.classList.remove('no-push');
            brain_tree.child[key].prohibition_mark_folder.style.display="none";
            brain_tree.child[key].prohibition_mark_header.style.display="none";     

        }else if(brain_tree.child[key].parent=="folderContainer"+object.data){//選択されたCanvas内のフォルダ達だけ移動可能に
            //フォルダとキャンバスヘッダーを動かせる様にする
            brain_tree.child[key].folder.classList.remove('no-push');
            brain_tree.child[key].canvasHeader.classList.remove('no-push');
            brain_tree.child[key].prohibition_mark_folder.style.display="none";
            brain_tree.child[key].prohibition_mark_header.style.display="none";
        }
    }
}

function saveAll(){//記録
    //mainCanvas保存
    brain_tree.canvasDrawData=brain_tree.canvasDraw.toDataURL();
    //各キャンバスの内容を保存
    for(key in brain_tree.child){
        brain_tree.child[key].canvasDrawData=brain_tree.child[key].canvasDraw.toDataURL();
    }
    //Json形式でlocalStrageに保存
    let jsonData=JSON.stringify(brain_tree);
    localStorage.setItem('data',jsonData);
}
function dataRestoration(){//data復元
    let restoration=JSON.parse(localStorage.getItem('data'));
    //描画復元　mainCanvasの描画
        draw(restoration.canvasDrawData,brain_tree.canvasDrawCtx);
    /*
    //画像復元　mainCanvasの画像
        for(imgKey in restoration.image){
            //image復元
            image(restoration.image[imgKey].data);
            //画像位置変更
            //brain_tree.image.movedObj.style.left=restoration.image.positionLeft;
            //brain_tree.image.movedObj.style.top=restoration.image.positionTop;
        }
    //テキスト復元　mainCanvasのテキスト    
        for(textKey in restoration.text){
            //text復元
            makeText(restoration.text[textKey].data);
            //テキスト位置変更
            //brain_tree.text.movedObj.style.left=restoration.text.positionLeft;
            //brain_tree.text.movedObj.style.top=restoration.text.positionTop;
        }
    */
    //子キャンバス達を復元
    for(key in restoration.child){
        let object=createFolder();

        //folder in folder復元
        brain_tree.child[key].selectDiv=restoration.child[key].selectDiv;
        let parentC=document.querySelector('#'+restoration.child[key].selectDivString);
        canvasAssign(parentC,object);
        
        //parent情報復元
        brain_tree.child[key].parent=restoration.child[key].parent;
        if(brain_tree.child[key].parent!="mainCanvas0"){//メインの直下のフォルダ達だけ移動可能に
            brain_tree.child[key].folder.classList.add('no-push');//最初は全部オフに
            brain_tree.child[key].canvasHeader.classList.add('no-push');
            brain_tree.child[key].prohibition_mark_folder.style.display="inline-block";
            brain_tree.child[key].prohibition_mark_header.style.display="inline-block";  
        }
        ////親キャンバスの数字から位置を差し引く要素をとる
        brain_tree.child[key].onCanvasData=restoration.child[key].onCanvasData;
        /*
        let parentObj;
        if(brain_tree.child[key].parent!="mainCanvas0"){
            parentObj=document.querySelector('#folder'+brain_tree.child[key].onCanvasData);
            console.log(parentObj.getBoundingClientRect());
        }*/
        //folder位置復元
        if(brain_tree.child[key].parent=="mainCanvas0"){//mainCanvas
            brain_tree.child[key].folderWrapper.style.left=restoration.child[key].positionLeft+"px";
            brain_tree.child[key].folderWrapper.style.top=restoration.child[key].positionTop+"px";
        }else{
            //うまくいかなかったので子要素たちは座標０  （子の子からまたずれていった）
            brain_tree.child[key].folderWrapper.style.left=0//restoration.child[key].positionLeft-parentObj.getBoundingClientRect().left+"px";
            brain_tree.child[key].folderWrapper.style.top=0//restoration.child[key].positionTop-parentObj.getBoundingClientRect().top-40+"px";
        }

        //キャンバスの中身を復元
        draw(restoration.child[key].canvasDrawData,brain_tree.child[key].canvasDrawCtx);
        //タイトル復元
        console.log(brain_tree.child[key].folderTitle);
        brain_tree.child[key].folderTitle.innerHTML=restoration.child[key].folderTitleData;
        /*
        //画像復元　mainCanvasの画像
        for(imgKey in restoration.child[key].image){
            image(restoration.child[key].image[imgKey].data);
            //画像位置変更
            brain_tree.child[key].image.movedObj.style.left=restoration.image.positionLeft;
            brain_tree.child[key].image.movedObj.style.top=restoration.image.positionTop;
        }
        テキスト復元　childCanvasの画像
        for(textKey in restoration.child[key].text){   
            makeText(restoration.child[key].text[textKey].data);
             //テキスト位置変更
            brain_tree.child[key].text.movedObj.style.left=restoration.child[key].text.positionLeft;
            brain_tree.child[key].text.movedObj.style.top=restoration.child[key].text.positionTop;
        }
        */
    }
}
function canvasAssign(parentObj,childObj){//どのCanvas上に表示するか特定し割り当てる
    parentObj.appendChild(childObj);
}
function draw(src,ctx) {
    var img = new Image();
    img.src = src;
    img.onload = function() {
        ctx.drawImage(img, 0, 0);
    }
}

