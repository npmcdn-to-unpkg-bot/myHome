/**
 * Created by Kirito on 1/24/15.
 */

var EleCook = EleBaseRole.extend({
    /**@expose*/
    cookBtn:null,

    onCreate:function(){

        //0: dragon; 1:Barbarian; 2:Cook; 3:Mage; 4:Warrior
        this.id = 4
    },

    /**@expose*/
    cookBtnClicked:function(){
        var eventIndex =gameController.cook.controller.eventIndex;
        var branchIndex =gameController.cook.controller.eventBranchIndex;
        if(eventIndex==1 && branchIndex==0){

         }else if(eventIndex==1 && branchIndex==1){

            //add shadow
            var shadow = gameController.cook.getChildByTag(8888);
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
                gameController.cook.addChild(shadow, 20);
                gameController.disableOtherRoles(4);
                gameController.wood.controller.woodBtn.setEnabled(true);
                gameController.wood.controller.woodStatus = 7;
            }

        }else if(eventIndex==1 && branchIndex==2){
            //add shadow
            var shadow = gameController.cook.getChildByTag(8888);
            if (shadow) {
                shadow.removeFromParent();
                shadow = null;
                gameController.enableOtherRoles();
                gameController.cook.controller.woodBtn.setEnabled(false);
            } else {

                var shadow = cc.Sprite.create(res.img_role_shadow_png);
                shadow.setAnchorPoint(cc.p(0, 0));
                shadow.setPosition(-80, -140);
                shadow.setTag(8888);
                gameController.cook.addChild(shadow, 20);
                gameController.disableOtherRoles(4);
                gameController.wood.controller.woodBtn.setEnabled(true);
                gameController.wood.controller.woodStatus=5;
            }
        }else if(eventIndex==2 && branchIndex==1){

        }else if(eventIndex==2 && branchIndex==2) {
            //add shadow
            var shadow = gameController.cook.getChildByTag(8888);
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
                gameController.cook.addChild(shadow, 20);
                gameController.disableOtherRoles(4);
                gameController.dragon.controller.tail.controller.tailBtn.setEnabled(true);
                gameController.dragon.controller.tail.controller.tailStatus=2;
            }
        }else if(eventIndex==2&&branchIndex==3){
            var shadow = gameController.cook.getChildByTag(8888);
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
                gameController.cook.addChild(shadow, 20);
                gameController.disableOtherRoles(4);
                gameController.dragon.controller.tail.controller.tailBtn.setEnabled(true);
                gameController.dragon.controller.tail.controller.tailStatus=7;
            }
        }
    },

    updateState:function(eventIndex,branchIndex) {

        cc.log("EleCook updateBranch event is: "+eventIndex + " and branch is " + branchIndex);
        //The dragon tail flick
        if(eventIndex==1 && branchIndex==0){

            var callback1 = function() {
                gameController.cook.controller.runJumpAnimation();
            }
            var callback2 = function() {
                //vee.GestureController.registerController(gameController.cook, cookBranch1Delegate, false);
            }

            this.rootNode.runAction(cc.sequence(cc.callFunc(callback1),cc.callFunc(callback2)));
        }else if(eventIndex==1 && branchIndex==1){
            //vee.GestureController.registerController(this.rootNode, cookBranch2Delegate, true);
        }else if(eventIndex==1 && branchIndex==2){
            //vee.GestureController.registerController(this.rootNode, cookBranch3Delegate, true);
        }
    },

    getButton:function(){

        return this.cookBtn
    }
})