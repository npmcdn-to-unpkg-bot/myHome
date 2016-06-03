/**
 * Created by Kirito on 1/24/15.
 */

var EleBaseRole = vee.Class.extend({

    //0: start event; 1: wood event; 2: dragon fly event
    eventIndex:0,

    //0: tail frick
    eventBranchIndex:0,

    //0: dragon; 1:Barbarian; 2:Cook; 3:Mage; 4:Warrior
    id:0,

    addShadowOrNot:function(){
        //add shadow
        var shadow= this.rootNode.getChildByTag(8888);
        if(shadow){
            shadow.removeFromParent();
            shadow=null;
            gameController.enableOtherRoles();
        }else{

            var shadow = cc.Sprite.create(res.img_role_shadow_png);
            shadow.setAnchorPoint(cc.p(0,0));
            shadow.setPosition(-80,-140);
            shadow.setTag(8888);
            this.rootNode.addChild(shadow,20);
            gameController.disableOtherRoles(this.id);
        }
    },

    //eventIndex = 1, branchIndex = 0
    runJumpAnimation:function(){
        if(this.id !=0) {

            this.playAnimate("Jump", function(){this.runStartEvent()});
        }

    },

    runStartEvent:function(){
        if(this.id!=0)
            this.playAnimate("HuXi");
    },

    updateState:function(eventIndex,branchIndex){
        //update the state
    },

    updateEvent:function(eventIndex,branchIndex){
        //this.updateBranch(eventIndex,updateBranch)
        this.updateState(eventIndex,branchIndex);
    },

    getRoleBtn:function(){

    }
})