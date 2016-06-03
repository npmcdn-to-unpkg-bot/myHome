/**
 * Created by Kirito on 1/24/15.
 */
var EleBarbarian = EleBaseRole.extend({

    /**@expose*/
    barbarianBtn: null,
    isClicked: false,

    onCreate: function () {

        //0: dragon; 1:Barbarian; 2:Cook; 3:Mage; 4:Warrior
        this.id = 1;
        this.barbarianBtn.setEnabled(false);
    },

    /**@expose*/
    barbarianClicked: function () {

        cc.log("barbarianClicked");
        var eventIndex = gameController.barbarian.controller.eventIndex;
        var branchIndex = gameController.barbarian.controller.eventBranchIndex;
        if (eventIndex == 1 && branchIndex == 0) {
        } else if (eventIndex == 1 && branchIndex == 1) {

            //add shadow
            var shadow = gameController.barbarian.getChildByTag(8888);
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
                gameController.barbarian.addChild(shadow, 20);
                gameController.disableOtherRoles(1);
                gameController.wood.controller.woodBtn.setEnabled(true);
                gameController.wood.controller.woodStatus=0;
            }

        }else if(eventIndex==1 && branchIndex==2){
            //add shadow
            var shadow = gameController.barbarian.getChildByTag(8888);
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
                gameController.barbarian.addChild(shadow, 20);
                gameController.disableOtherRoles(1);
                gameController.wood.controller.woodBtn.setEnabled(true);
                gameController.wood.controller.woodStatus=1;
            }
        }else if(eventIndex==2&&branchIndex==2){
            //add shadow
            var shadow = gameController.barbarian.getChildByTag(8888);
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
                gameController.barbarian.addChild(shadow, 20);
                gameController.disableOtherRoles(1);
                gameController.dragon.controller.tail.controller.tailBtn.setEnabled(true);
                gameController.dragon.controller.tail.controller.tailStatus=5;
            }

        }else if(eventIndex==2&&branchIndex==1){
            //add shadow
            var shadow = gameController.barbarian.getChildByTag(8888);
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
                gameController.barbarian.addChild(shadow, 20);
                gameController.disableOtherRoles(1);
                gameController.dragon.controller.tail.controller.tailBtn.setEnabled(true);
                gameController.dragon.controller.tail.controller.tailStatus=6;
            }
        }else if(eventIndex==2&&branchIndex==3){
            //add shadow
            var shadow = gameController.barbarian.getChildByTag(8888);
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
                gameController.barbarian.addChild(shadow, 20);
                gameController.disableOtherRoles(1);
                gameController.dragon.controller.tail.controller.tailBtn.setEnabled(true);
                gameController.dragon.controller.tail.controller.tailStatus=8;
            }
        }
    },

    updateState:function(eventIndex,branchIndex) {

        cc.log("EleBarbarian updateBranch event is: "+eventIndex + " and branch is " + branchIndex);

        if(eventIndex==1 && branchIndex==0){

            var callback1 = function() {
                gameController.barbarian.controller.runJumpAnimation();
            }
            var callback2 = function() {
                gameController.barbarian.controller.barbarianBtn.setEnabled(true);
            }

            this.rootNode.runAction(cc.sequence(cc.callFunc(callback1),cc.callFunc(callback2)));
        }else if(eventIndex==1 && branchIndex==1){
            //vee.GestureController.registerController(this.rootNode, barbarianBranch2Delegate, true);
        }else if(eventIndex==1 && branchIndex==2){
            //vee.GestureController.registerController(this.rootNode, barbarianBranch3Delegate, true);
        }
    },

    getButton:function(){
        return this.barbarianBtn;
    }
})