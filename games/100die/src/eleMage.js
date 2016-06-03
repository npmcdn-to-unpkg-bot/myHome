/**
 * Created by Kirito on 1/24/15.
 */
var EleMage = EleBaseRole.extend({

    /**@expose*/
    mageBtn:null,

    onCreate:function(){

        //0: dragon; 1:Barbarian; 2:Cook; 3:Mage; 4:Warrior
        this.id = 2
    },

    /**@expose*/
    mageBtnClicked:function(){

        var eventIndex =gameController.mage.controller.eventIndex;
        var branchIndex =gameController.mage.controller.eventBranchIndex;

        if(eventIndex==1 && branchIndex==0){

        }else if(eventIndex==1 && branchIndex==1){

            //add shadow
            var shadow = gameController.mage.getChildByTag(8888);
            if (shadow) {
                shadow.removeFromParent();
                shadow = null;
                gameController.enableOtherRoles();
                gameController.wood.controller.woodBtn.setEnabled(false);
            } else {

                var shadow = cc.Sprite.create(res.img_role_shadow_png);
                shadow.setAnchorPoint(cc.p(0, 0));
                shadow.setPosition(-80, -140);
                shadow.setTag(8888);
                gameController.mage.addChild(shadow, 20);
                gameController.disableOtherRoles(1);
                gameController.wood.controller.woodBtn.setEnabled(true);
                gameController.wood.controller.woodStatus = 6;
            }
        }else if(eventIndex==1 && branchIndex==2){
            //add shadow
            var shadow = gameController.mage.getChildByTag(8888);
            if (shadow) {
                shadow.removeFromParent();
                shadow = null;
                gameController.enableOtherRoles();
                gameController.wood.controller.woodBtn.setEnabled(false);
            } else {

                var shadow = cc.Sprite.create(res.img_role_shadow_png);
                shadow.setAnchorPoint(cc.p(0, 0));
                shadow.setPosition(-80, -140);
                shadow.setTag(8888);
                gameController.mage.addChild(shadow, 20);
                gameController.disableOtherRoles(2);
                gameController.wood.controller.woodBtn.setEnabled(true);
                gameController.wood.controller.woodStatus=4;
            }
        }else if(eventIndex==2&&branchIndex==1){
            //add shadow
            var shadow = gameController.mage.getChildByTag(8888);
            if (shadow) {
                shadow.removeFromParent();
                shadow = null;
                gameController.enableOtherRoles();
                gameController.dragon.controller.tail.controller.tailBtn.setEnabled(false);
            } else {

                var shadow = cc.Sprite.create(res.img_role_shadow_png);
                shadow.setAnchorPoint(cc.p(0, 0));
                shadow.setPosition(-80, -140);
                shadow.setTag(8888);
                gameController.mage.addChild(shadow, 20);
                gameController.disableOtherRoles(2);
                gameController.dragon.controller.tail.controller.tailBtn.setEnabled(true);
                gameController.dragon.controller.tail.controller.tailStatus=1;
            }
        }else if(eventIndex==2&&branchIndex==2) {
            //add shadow
            var shadow = gameController.mage.getChildByTag(8888);
            if (shadow) {
                shadow.removeFromParent();
                shadow = null;
                gameController.enableOtherRoles();
                gameController.dragon.controller.tail.controller.tailBtn.setEnabled(false);
            } else {

                var shadow = cc.Sprite.create(res.img_role_shadow_png);
                shadow.setAnchorPoint(cc.p(0, 0));
                shadow.setPosition(-80, -140);
                shadow.setTag(8888);
                gameController.mage.addChild(shadow, 20);
                gameController.disableOtherRoles(2);

                vee.PopMgr.alert("特么的再敢动我尾巴试试？？","龙之怒", function(){
                    gameController.dragon.controller.tail.controller.tailBtn.setEnabled(true);
                    gameController.dragon.controller.tail.controller.tailStatus = 3;
                },false)
            }
        }
    },

    updateState:function(eventIndex,branchIndex) {

        cc.log("EleMage updateBranch event is: "+eventIndex + " and branch is " + branchIndex);

        if(eventIndex==1 && branchIndex==0){
            var callback1 = function() {
                gameController.mage.controller.runJumpAnimation();
            }
            var callback2 = function() {
                //vee.GestureController.registerController(gameController.mage, mageBranch1Delegate, false);
            }

            this.rootNode.runAction(cc.sequence(cc.callFunc(callback1),cc.callFunc(callback2)));
        }else if(eventIndex==1 && branchIndex==1){
            //vee.GestureController.registerController(this.rootNode, mageBranch2Delegate, true);
        }else if(eventIndex==1 && branchIndex==2){
            //vee.GestureController.registerController(this.rootNode, mageBranch3Delegate, true);
        }
    },
    getButton:function(){

        return this.mageBtn;
    }
})