/**
 * Created by Kirito on 1/24/15.
 */
var EleText = vee.Class.extend({
    /**@expose*/
    lbText:null

})

var LyGameController = vee.Class.extend({

    /**@expose*/
    mage : null,

    /**@expose*/
    barbarian:null,

    /**@expose*/
    warrior:null,

    /**@expose*/
    cook:null,

    /**@expose*/
    dragon:null,

    /**@expose*/
    wood:null,

    /**@expose*/
    moveNode:null,

    /**@expose*/
    warriorMoveNode:null,

    /**@expose*/
    mageMoveNode:null,

    /**@expose*/
    cookMoveNode:null,

    /**@expose*/
    message:null,

    roleArray:null,
    startEventCreate:null,
    updateState:null,

    onEnter: function(){
        this.roleArray = [this.dragon.controller,  this.barbarian.controller,this.mage.controller, this.warrior.controller, this.cook.controller];
        this.startEventCreate();
        this.showMessage("龙出现了！")
    },


    updateRoleState:function(eventIndex,branchIndex){

        if(eventIndex==1 && (branchIndex==1||branchIndex==2)) {
            vee.Utils.scheduleOnce(function(){
                gameController.showMessage("现在该干嘛？");},1.5)
        }

        if(eventIndex==2 && (branchIndex==1||branchIndex==2||branchIndex==2)) {
            vee.Utils.scheduleOnce(function(){
                gameController.showMessage("现在该干嘛？");},1.5)
        }

        for (var i = 0; i < gameController.roleArray.length; i++) {
            if(gameController.roleArray[i]!=null) {
                gameController.roleArray[i].eventIndex = eventIndex;
                gameController.roleArray[i].eventBranchIndex = branchIndex;
                gameController.roleArray[i].updateEvent(gameController.roleArray[i].eventIndex, gameController.roleArray[i].eventBranchIndex);
            }
        }
    },

    woodEventCreate:function(){

        //var woodEventCallback = function(){
        //this.showMessage("手工很精湛啊");
        //this.showMessage("龙鄙夷地看了你们一眼");
        //this.showMessage("战士走了上去");
        //this.showMessage("战士爬上了梯子");
        //this.showMessage("卧槽！战士跳砍！");
        //this.showMessage("龙受到了伤害!");
        //this.showMessage("野蛮人爬上了梯子");
        //this.showMessage("尼玛！野蛮人跳砍！");
        //this.showMessage("龙受到了伤害!");
        //this.showMessage("法师走了上去");
        //this.showMessage("法师爬上了梯子");
        //this.showMessage("龙突然叫了一声！");
        //this.showMessage("啊！法师从梯子上掉了下来");
        //this.showMessage("法师卒");
        //this.showMessage("啊！厨师从梯子上掉了下来");
        //this.showMessage("厨师爬上了梯子");
        //this.showMessage("厨师走了上去");
        //this.showMessage("厨师卒");
        //this.showMessage("魔法师施展了大火球术");
        //this.showMessage("树着火了");
        //this.showMessage("龙被火烧到了！受了点伤");
        //this.showMessage("野蛮人走了上去");
        //this.showMessage("龙突然又甩了下尾巴");
        //this.showMessage("树被卷走了！");
        //this.showMessage("龙飞起来了！");
        //this.showMessage("龙的尾巴着火了！");
        //this.showMessage("厨师在现场烤起了肉！");
        //this.showMessage("厨师把肉扔给了龙");
        //this.showMessage("龙喷火了！");
        //this.showMessage("魔法师的衣服给烧破了！");
        //this.showMessage("魔法师娇羞地跑了！");
        //this.showMessage("龙甩了一下尾巴");
        //this.showMessage("野蛮人给龙的尾巴强力的一击！");
        //this.showMessage("龙受伤了！");
        //this.showMessage("龙暴怒");
        //this.showMessage("厨师拿出了一颗菠菜");
        //this.showMessage("龙把菠菜吃了！");
        //this.showMessage("龙变得好强壮！");
        //this.showMessage("龙甩了一下尾巴，十分强力!");
        //this.showMessage("龙从天上俯冲了下来！");
        //this.showMessage("厨师被龙撞飞了！");
        //this.showMessage("战士被龙撞飞了！");
        gameController.updateRoleState(1,0);
        cc.log("woodEventCreate");
        //}

        //var backToStartEventCallback = function(){
        //    gameController.startEventCreate();
        //}

        //var woodEventAction = cc.sequence(cc.callFunc(woodEventCallback),cc.delayTime(globalValues.eventWaitSeconds),cc.callFunc(backToStartEventCallback));
        //this.rootNode.runAction(woodEventAction);
    },

    dragonFlyEventCreate:function(){

        gameController.updateRoleState(2,0);
    },

    updateRoleEvent:function(updateEvent){

        if(updateEvent ==1){
            this.woodEventCreate();
        }
        else if(updateEvent==2){
            this.dragonFlyEventCreate();
        }
    },

    startEventCreate: function () {

        var startEventCallback = function () {
            gameController.enableOtherRoles();
            gameController.wood.setVisible(false);
            cc.log("startEventCreate begin");
            for (var i = 0; i < gameController.roleArray.length; i++) {

                if (gameController.roleArray[i] != null) {
                    gameController.roleArray[i].eventIndex = 0;
                    gameController.roleArray[i].eventBranchIndex=0;
                    gameController.roleArray[i].runStartEvent();
                }
            }
        }

        var nextEventCallback = function () {
            var nextEventIndex = vee.Utils.randomInt(1, globalValues.eventAmounts);
            gameController.updateRoleEvent(nextEventIndex);
        }

        var startEventAction = cc.sequence(cc.callFunc(startEventCallback),cc.delayTime(globalValues.eventWaitSeconds),cc.callFunc(nextEventCallback,2));
        this.rootNode.runAction(startEventAction);
    },

    disableOtherRoles:function(current) {
        for (var i = 0; i < gameController.roleArray.length; i++) {
            if(i!=0&&i!=current){
                gameController.roleArray[i].getButton().setEnabled(false);
            }
        }
    },

    enableOtherRoles:function(){
        for (var i = 0; i < gameController.roleArray.length; i++) {
            if(i!=0){
                gameController.roleArray[i].getButton().setEnabled(true);
            }
        }
    },

    showMessage:function(text){

        this.message.controller.lbText.setString(text);
        this.message.controller.playAnimate("show");
    }
})