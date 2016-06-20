/**
 * Created by Kirito on 1/24/15.
 */

var EleWarrior = EleBaseRole.extend({
    /**@expose*/
    warriorBtn:null,

    onCreate:function(){

        //0: dragon; 1:Barbarian; 2:Cook; 3:Mage; 4:Warrior
        this.id = 3
    },

    /**@expose*/
    warriorBtnClicked:function(){
        var eventIndex =gameController.warrior.controller.eventIndex;
        var branchIndex =gameController.warrior.controller.eventBranchIndex;
        if(eventIndex==1 && branchIndex==0){

        }else if(eventIndex==1 && branchIndex==1){

            var shadow = cc.Sprite.create(res.img_role_shadow_png);
            shadow.setAnchorPoint(cc.p(0, 0));
            shadow.setPosition(-80, -140);
            shadow.setTag(8888);
            gameController.warrior.addChild(shadow, 20);
            gameController.disableOtherRoles(1);
            gameController.wood.controller.woodBtn.setEnabled(true);
            gameController.wood.controller.woodStatus = 8;
        }else if(eventIndex==1 && branchIndex==2){
            //add shadow
            var shadow = gameController.warrior.getChildByTag(8888);
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
                gameController.warrior.addChild(shadow, 20);
                gameController.disableOtherRoles(1);
                gameController.wood.controller.woodBtn.setEnabled(true);
                gameController.wood.controller.woodStatus=3;
            }
        }else if(eventIndex==2&&branchIndex==2){
            //add shadow
            var shadow = gameController.warrior.getChildByTag(8888);
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
                gameController.warrior.addChild(shadow, 20);
                gameController.disableOtherRoles(1);
                gameController.dragon.controller.tail.controller.tailBtn.setEnabled(true);
                gameController.dragon.controller.tail.controller.tailStatus=4;
            }

        }else if(eventIndex==2&&branchIndex==3){
            //add shadow
            var shadow = gameController.warrior.getChildByTag(8888);
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
                gameController.warrior.addChild(shadow, 20);
                gameController.disableOtherRoles(1);
                gameController.dragon.controller.tail.controller.tailBtn.setEnabled(true);
                gameController.dragon.controller.tail.controller.tailStatus=9;
            }

        }
    },

    updateState:function(eventIndex,branchIndex) {

        cc.log("EleWarrior updateBranch event is: "+eventIndex + " and branch is " + branchIndex);

        if(eventIndex==1 && branchIndex==0){
            var callback1 = function() {
                gameController.warrior.controller.runJumpAnimation();
            }
            var callback2 = function() {
                //vee.GestureController.registerController(gameController.warrior, warriorBranch1Delegate, false);
            }
            this.rootNode.runAction(cc.sequence(cc.callFunc(callback1),cc.callFunc(callback2)));
        }else if(eventIndex==1 && branchIndex==1){
            //vee.GestureController.registerController(this.rootNode, warriorBranch2Delegate, true);
        }else if(eventIndex==1 && branchIndex==2){
            //vee.GestureController.registerController(this.rootNode, warriorBranch3Delegate, true);
        }
    },

    getButton:function(){
        return this.warriorBtn;
    }
})