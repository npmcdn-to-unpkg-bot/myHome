/**
 * Created by Kirito on 1/24/15.
 */

var EleTail = vee.Class.extend({
    isFlyout:true,
    tailStatus:-1,

    /**@expose*/
    tailBtn:null,
    onCreate:function(){
        this.tailBtn.setEnabled(false);
    },

    /**@expose*/
    tailBtnClicked:function(){
        if(this.tailStatus==1){
            this.tailBtn.setEnabled(false);
            for (var i = 0; i < gameController.roleArray.length; i++) {
                if (i != 0) {
                    gameController.roleArray[i].getButton().setEnabled(false);

                    var shadow = gameController.roleArray[i].rootNode.getChildByTag(8888);
                    if (shadow) {
                        shadow.removeFromParent();
                        shadow = null
                    }
                }
            }
            vee.Utils.scheduleOnce(function () {

                gameController.showMessage("法师走了上去，三鹿火球！");
                gameController.mage.controller.playAnimate("MagicFire",function(){
                    gameController.dragon.controller.playAnimate("firetail");
                })
            }, 0.5);

            vee.Utils.scheduleOnce(function () {

                gameController.showMessage("龙的尾巴着火了，哈哈哈！");
                gameController.mage.controller.playAnimate("HuXi");
            }, 3);

            vee.Utils.scheduleOnce(function () {

                gameController.enableOtherRoles();
                gameController.updateRoleState(2,2);
            }, 3.5);
        }else if(this.tailStatus==2){
            this.tailBtn.setEnabled(false);
            for (var i = 0; i < gameController.roleArray.length; i++) {
                if (i != 0) {
                    gameController.roleArray[i].getButton().setEnabled(false);

                    var shadow = gameController.roleArray[i].rootNode.getChildByTag(8888);
                    if (shadow) {
                        shadow.removeFromParent();
                        shadow = null
                    }
                }
            }
            gameController.showMessage("厨师趁机走了上去，竟然做起肉来了！");
            vee.Utils.scheduleOnce(function () {

                gameController.cook.controller.playAnimate("Barbecue", function(){
                    gameController.showMessage("厨师把肉扔给了龙！");
                    gameController.dragon.controller.playAnimate("shit",function(){
                        vee.PopMgr.alert("获得龙之大翔","龙屁拍的不错",function(){
                            gameController.enableOtherRoles();
                            gameController.startEventCreate();
                        },false)
                    })
                });
            }, 1.5);
        }else if(this.tailStatus==3){
            this.tailBtn.setEnabled(false);
            for (var i = 0; i < gameController.roleArray.length; i++) {
                if (i != 0) {
                    gameController.roleArray[i].getButton().setEnabled(false);

                    var shadow = gameController.roleArray[i].rootNode.getChildByTag(8888);
                    if (shadow) {
                        shadow.removeFromParent();
                        shadow = null;
                    }
                }
            }
            gameController.showMessage("法师想再放一个火球");
            vee.Utils.scheduleOnce(function () {

                gameController.dragon.controller.playAnimate("fire", function(){
                    gameController.showMessage("混元霹雳火！");
                    gameController.mage.controller.playAnimate("MagicFire Die",function(){
                        gameController.showMessage("魔法师娇羞地跑了！");
                        gameController.mage.removeFromParent();
                        gameController.mage.controller=null;
                    });
                })
            }, 1.5);
            vee.Utils.scheduleOnce(function () {

                vee.PopMgr.alert("动你XX","龙之吐槽",function(){
                    gameController.enableOtherRoles();
                    gameController.startEventCreate();
                },false)

            }, 6);
        }else if(this.tailStatus==4){
            var currentPosition1 = gameController.warriorMoveNode.getPosition();
            var currentPosition2 = gameController.moveNode.getPosition();
            this.tailBtn.setEnabled(false);
            for (var i = 0; i < gameController.roleArray.length; i++) {
                if (i != 0) {
                    gameController.roleArray[i].getButton().setEnabled(false);

                    var shadow = gameController.roleArray[i].rootNode.getChildByTag(8888);
                    if (shadow) {
                        shadow.removeFromParent();
                        shadow = null
                    }
                }
            }

            gameController.showMessage("战士刚准备要上去干比大的");
            vee.Utils.scheduleOnce(function(){
                gameController.dragon.controller.tail.isFlyout = false
                gameController.dragon.controller.playAnimate("TailFlick",function(){
                    gameController.showMessage("龙放了个大招，成吨的伤害！");
                    gameController.mage.controller.playAnimate("Death");
                    gameController.cook.controller.playAnimate("Death");
                    gameController.warriorMoveNode.runAction(cc.spawn(cc.rotateBy(2,1000),cc.moveBy(2,cc.p(1000,1000))));
                    gameController.moveNode.runAction(cc.spawn(cc.rotateBy(2,-1000),cc.moveBy(2,cc.p(-1000,1000))));
                });
            },1.5)

            vee.Utils.scheduleOnce(function () {
                vee.PopMgr.alert("你当我萎的？","卒", function(){
                    gameController.warriorMoveNode.setPosition(currentPosition1);
                    gameController.warriorMoveNode.setRotation(0);
                    gameController.moveNode.setRotation(0);
                    gameController.moveNode.setPosition(currentPosition2);}, false);

            }, 6.5);
        }else if(this.tailStatus==5){
            var currentPosition1 = gameController.warriorMoveNode.getPosition();
            var currentPosition2 = gameController.moveNode.getPosition();
            this.tailBtn.setEnabled(false);
            for (var i = 0; i < gameController.roleArray.length; i++) {
                if (i != 0) {
                    gameController.roleArray[i].getButton().setEnabled(false);

                    var shadow = gameController.roleArray[i].rootNode.getChildByTag(8888);
                    if (shadow) {
                        shadow.removeFromParent();
                        shadow = null
                    }
                }
            }

            gameController.showMessage("野蛮人刚准备要上去干比大的");
            vee.Utils.scheduleOnce(function(){
                gameController.dragon.controller.tail.isFlyout = false
                gameController.dragon.controller.playAnimate("TailFlick",function(){
                    gameController.showMessage("龙放了个大招，成吨的伤害！");
                    gameController.mage.controller.playAnimate("Death");
                    gameController.cook.controller.playAnimate("Death");
                    gameController.warriorMoveNode.runAction(cc.spawn(cc.rotateBy(2,1000),cc.moveBy(2,cc.p(1000,1000))));
                    gameController.moveNode.runAction(cc.spawn(cc.rotateBy(2,-1000),cc.moveBy(2,cc.p(-1000,1000))));
                });
            },1.5)

            vee.Utils.scheduleOnce(function () {
                vee.PopMgr.alert("卒","龙之你当我萎的？", function(){
                    gameController.warriorMoveNode.setPosition(currentPosition1);
                    gameController.warriorMoveNode.setRotation(0);
                    gameController.moveNode.setRotation(0);
                    gameController.moveNode.setPosition(currentPosition2);
                    gameController.startEventCreate();}, false);

            }, 6.5);
        }else if(this.tailStatus==6){
            this.tailBtn.setEnabled(true);
            for (var i = 0; i < gameController.roleArray.length; i++) {
                if (i != 0) {
                    gameController.roleArray[i].getButton().setEnabled(false);

                    var shadow = gameController.roleArray[i].rootNode.getChildByTag(8888);
                    if (shadow) {
                        shadow.removeFromParent();
                        shadow = null
                    }
                }
            }
            gameController.showMessage("野蛮人走了上去。想砍尾巴");
            var currentPosition = gameController.moveNode.getPosition();
            vee.Utils.scheduleOnce(function(){

                gameController.moveNode.runAction(cc.moveTo(0.5,cc.p(gameController.dragon.controller.tail.getPositionX()-100,gameController.dragon.controller.tail.getPositionY())));

            },1.5)

            vee.Utils.scheduleOnce(function(){

                gameController.barbarian.controller.playAnimate("TiaoZhan",function(){
                    gameController.showMessage("野蛮人给龙的尾巴强力的一击！");
                    gameController.moveNode.runAction(cc.moveTo(0.3,currentPosition));
                    gameController.dragon.controller.playAnimate("hurt")
                })
            },2.5)

            vee.Utils.scheduleOnce(function(){
                gameController.barbarian.controller.playAnimate("HuXi")
                gameController.enableOtherRoles();
                gameController.updateRoleState(2,3);
            },5.5)
        }else if(this.tailStatus==7){
            var currentPosition1 = gameController.warriorMoveNode.getPosition();
            var currentPosition2 = gameController.moveNode.getPosition();            this.tailBtn.setEnabled(true);
            for (var i = 0; i < gameController.roleArray.length; i++) {
                if (i != 0) {
                    gameController.roleArray[i].getButton().setEnabled(false);

                    var shadow = gameController.roleArray[i].rootNode.getChildByTag(8888);
                    if (shadow) {
                        shadow.removeFromParent();
                        shadow = null
                    }
                }
            }
            gameController.showMessage("厨师走了上去。想拍马屁");
            vee.Utils.scheduleOnce(function(){

                gameController.cook.controller.playAnimate("Food", function(){
                    gameController.showMessage("厨师拿出了菠菜和鱼");
                });
            },0.5)

            vee.Utils.scheduleOnce(function(){
                gameController.dragon.controller.playAnimate("niuB",function(){
                    gameController.showMessage("一波高富帅，大力龙");
                });
            },7)

                vee.Utils.scheduleOnce(function(){
                gameController.showMessage("菠萝蜜咚龙咚锵 扫尾！");
                gameController.dragon.controller.tail.isFlyout = false
                gameController.dragon.controller.playAnimate("TailFlick",function(){
                    gameController.wood.setVisible(false);
                    if(gameController.mage!=null)
                        gameController.mage.controller.playAnimate("Death");
                    if(gameController.cook!=null)
                        gameController.cook.controller.playAnimate("Death");
                    gameController.warriorMoveNode.runAction(cc.spawn(cc.rotateBy(2,1000),cc.moveBy(2,cc.p(1000,1000))));
                    gameController.moveNode.runAction(cc.spawn(cc.rotateBy(2,-1000),cc.moveBy(2,cc.p(-1000,1000))));
                });
            },11)

            vee.Utils.scheduleOnce(function () {
                vee.PopMgr.alert("龙完成了一次四杀","卒", function(){
                    gameController.warriorMoveNode.setPosition(currentPosition1);
                    gameController.warriorMoveNode.setRotation(0);
                    gameController.moveNode.setRotation(0);
                    gameController.moveNode.setPosition(currentPosition2);
                    gameController.startEventCreate();}, false);

            }, 15);
        }else if(this.tailStatus==8){
            var currentPosition = gameController.moveNode.getPosition();
            for (var i = 0; i < gameController.roleArray.length; i++) {
                if (i != 0) {
                    gameController.roleArray[i].getButton().setEnabled(false);

                    var shadow = gameController.roleArray[i].rootNode.getChildByTag(8888);
                    if (shadow) {
                        shadow.removeFromParent();
                        shadow = null
                    }
                }
            }
            vee.Utils.scheduleOnce(function () {
                var p = cc.p(gameController.wood.getPositionX()+30, gameController.wood.getPositionY());
                gameController.showMessage("野蛮人走了上去，想要对尾巴补刀！");

                gameController.moveNode.runAction(cc.moveTo(0.5,cc.p(100,200)));
            }, 0.5);
            vee.Utils.scheduleOnce(function () {

                gameController.dragon.controller.playAnimate("TailFlick", function(){gameController.barbarian.controller.playAnimate("TiaoZhan copy")})
            },3);

            vee.Utils.scheduleOnce(function () {
                if(gameController.barbarian){
                    gameController.showMessage("没想到赛亚人的尾巴这么强力！野蛮人卒");
                    gameController.barbarian.removeFromParent();
                    gameController.barbarian.controller=null;
                }
            },5);

            vee.Utils.scheduleOnce(function () {
                gameController.enableOtherRoles();
                gameController.startEventCreate();
            }, 7);

        }else if(this.tailStatus==9){
            var currentPosition = gameController.warriorMoveNode.getPosition();
            for (var i = 0; i < gameController.roleArray.length; i++) {
                if (i != 0) {
                    gameController.roleArray[i].getButton().setEnabled(false);

                    var shadow = gameController.roleArray[i].rootNode.getChildByTag(8888);
                    if (shadow) {
                        shadow.removeFromParent();
                        shadow = null
                    }
                }
            }
            vee.Utils.scheduleOnce(function () {
                var p = cc.p(gameController.wood.getPositionX()+30, gameController.wood.getPositionY());
                gameController.showMessage("战士走了上去，想要对尾巴补刀！");

                gameController.warriorMoveNode.runAction(cc.moveTo(0.5,cc.p(900,400)));
            }, 0.5);
            vee.Utils.scheduleOnce(function () {

                gameController.dragon.controller.playAnimate("TailFlick", function(){gameController.warrior.controller.playAnimate("Death")})
            },3);

            vee.Utils.scheduleOnce(function () {
                if(gameController.warrior){
                    gameController.showMessage("没想到赛亚人的尾巴这么强力！战士卒");
                    gameController.warrior.removeFromParent();
                    gameController.warrior.controller=null;
                }
            },5);

            vee.Utils.scheduleOnce(function () {
                gameController.enableOtherRoles();
                gameController.startEventCreate();
            },7);

        }

    }
});

var EleWood = vee.Class.extend({

    /**@expose*/
    woodBtn:null,
    woodStatus:-1,

    /**@expose*/
    woodBtnClicked: function () {
        cc.log("wood clicked");
        if(this.woodStatus==0) {
            this.woodBtn.setEnabled(false);
            for (var i = 0; i < gameController.roleArray.length; i++) {
                if (i != 0) {
                    gameController.roleArray[i].getButton().setEnabled(false);

                    var shadow = gameController.roleArray[i].rootNode.getChildByTag(8888);
                    if (shadow) {
                        shadow.removeFromParent();
                        shadow = null
                    }
                }
            }
            var currentPosition = gameController.moveNode.getPosition();
            gameController.showMessage("野蛮人走了上去");
            vee.Utils.scheduleOnce(function () {
                var p = cc.p(gameController.wood.getPositionX() - 780, gameController.wood.getPositionY() - 250);
                vee.Utils.logObj(p, "===");
                gameController.moveNode.runAction(cc.moveTo(1, p));
            }, 0.5);

            vee.Utils.scheduleOnce(function () {
                gameController.barbarian.controller.playAnimate("KanChai");
                gameController.showMessage("野蛮人把树做成了梯子,手工很精湛啊");
            }, 2.6);

            vee.Utils.scheduleOnce(function () {
                gameController.wood.controller.playAnimate("The ladder", function () {
                    gameController.dragon.controller.playAnimate("disdain")
                    gameController.showMessage("龙鄙夷地看了你们一眼");
                })
            }, 4);

            vee.Utils.scheduleOnce(function () {
                gameController.barbarian.controller.playAnimate("HuXi");
            }, 4.3);

            vee.Utils.scheduleOnce(function () {
                gameController.moveNode.runAction(cc.moveTo(1, currentPosition));
            }, 5.5);

            vee.Utils.scheduleOnce(function () {
                gameController.enableOtherRoles();
                gameController.updateRoleState(1, 2);
            }, 6.5);

        }else if(this.woodStatus==1){
            var currentPosition = gameController.moveNode.getPosition();
            for (var i = 0; i < gameController.roleArray.length; i++) {
                if (i != 0) {
                    gameController.roleArray[i].getButton().setEnabled(false);

                    var shadow = gameController.roleArray[i].rootNode.getChildByTag(8888);
                    if (shadow) {
                        shadow.removeFromParent();
                        shadow = null
                    }
                }
            }
            vee.Utils.scheduleOnce(function () {
                var p = cc.p(gameController.wood.getPositionX() - 650, gameController.wood.getPositionY() - 300);
                vee.Utils.logObj(p, "===");
                gameController.showMessage("野蛮人走了上去,爬上了梯子");
                gameController.moveNode.runAction(cc.sequence(cc.moveTo(0.5, p),cc.delayTime(0.5),cc.moveBy(0.5,cc.p(0,300))));
            }, 0.5);
            vee.Utils.scheduleOnce(function () {

                gameController.showMessage("野蛮人跳砍！龙受到了伤害!");
                gameController.barbarian.controller.playAnimate("TiaoZhan", function(){gameController.dragon.controller.playAnimate("hurt")})
            },2.5);

            vee.Utils.scheduleOnce(function () {

                gameController.moveNode.runAction(cc.moveTo(0.3,currentPosition));
            },4.5);

            vee.Utils.scheduleOnce(function () {
                gameController.barbarian.controller.playAnimate("HuXi");
            },7);
            vee.Utils.scheduleOnce(function () {
                gameController.enableOtherRoles();
                gameController.startEventCreate();
            }, 9);

        }else if(this.woodStatus==3){

            var currentPosition = gameController.warriorMoveNode.getPosition();
            for (var i = 0; i < gameController.roleArray.length; i++) {
                if (i != 0) {
                    gameController.roleArray[i].getButton().setEnabled(false);

                    var shadow = gameController.roleArray[i].rootNode.getChildByTag(8888);
                    if (shadow) {
                        shadow.removeFromParent();
                        shadow = null
                    }
                }
            }
            vee.Utils.scheduleOnce(function () {
                var p = cc.p(gameController.wood.getPositionX()-20, gameController.wood.getPositionY());
                gameController.showMessage("战士走了上去,爬上了梯子");
                gameController.warriorMoveNode.runAction(cc.sequence(cc.moveTo(0.5, p),cc.delayTime(0.5),cc.moveBy(0.5,cc.p(0,100))));
            }, 0.5);
            vee.Utils.scheduleOnce(function () {

                gameController.showMessage("战士跳砍！龙受到了伤害!");
                gameController.warrior.controller.playAnimate("TiaoZhan", function(){gameController.dragon.controller.playAnimate("hurt")})
            },2.5);

            vee.Utils.scheduleOnce(function () {

                gameController.warriorMoveNode.runAction(cc.moveTo(0.3,currentPosition));
            },4.5);

            vee.Utils.scheduleOnce(function () {
                gameController.warrior.controller.playAnimate("HuXi");
            },7);
            vee.Utils.scheduleOnce(function () {

                gameController.enableOtherRoles();

                vee.PopMgr.alert("获得黑龙的红焰角","素材奖励",function(){ gameController.startEventCreate();}, false)
            }, 9);
        }else if(this.woodStatus==4){

            var currentPosition = gameController.mageMoveNode.getPosition();
            for (var i = 0; i < gameController.roleArray.length; i++) {
                if (i != 0) {
                    gameController.roleArray[i].getButton().setEnabled(false);

                    var shadow = gameController.roleArray[i].rootNode.getChildByTag(8888);
                    if (shadow) {
                        shadow.removeFromParent();
                        shadow = null
                    }
                }
            }
            vee.Utils.scheduleOnce(function () {
                var p = cc.p(gameController.wood.getPositionX()+30, gameController.wood.getPositionY());
                gameController.showMessage("法师走了上去，爬上了梯子！");

                gameController.mageMoveNode.runAction(cc.sequence(cc.moveTo(0.5, p),cc.delayTime(0.5),cc.moveBy(0.5,cc.p(0,100))));
            }, 0.5);
            vee.Utils.scheduleOnce(function () {

                gameController.showMessage("龙恶狠狠地吼了一声");
                gameController.dragon.controller.playAnimate("roar", function(){gameController.mage.controller.playAnimate("Death")})
            },2.5);

            vee.Utils.scheduleOnce(function () {
                if(gameController.mage){
                    gameController.showMessage("法师卒");
                    gameController.mage.removeFromParent();
                    gameController.mage.controller=null;
                }
            },8);

            vee.Utils.scheduleOnce(function () {
                gameController.enableOtherRoles();
                gameController.startEventCreate();
            }, 9);
        }else if(this.woodStatus==5){

            var currentPosition = gameController.cookMoveNode.getPosition();
            for (var i = 0; i < gameController.roleArray.length; i++) {
                if (i != 0) {
                    gameController.roleArray[i].getButton().setEnabled(false);

                    var shadow = gameController.roleArray[i].rootNode.getChildByTag(8888);
                    if (shadow) {
                        shadow.removeFromParent();
                        shadow = null
                    }
                }
            }
            vee.Utils.scheduleOnce(function () {
                var p = cc.p(gameController.wood.getPositionX(), gameController.wood.getPositionY()+40);
                gameController.showMessage("厨师走了上去，爬上了梯子！");

                gameController.cookMoveNode.runAction(cc.sequence(cc.moveTo(0.5, p),cc.delayTime(0.5),cc.moveBy(0.5,cc.p(0,100))));
            }, 0.5);
            vee.Utils.scheduleOnce(function () {

                gameController.showMessage("龙恶狠狠地吼了一声");
                gameController.dragon.controller.playAnimate("roar", function(){gameController.cook.controller.playAnimate("Death")})
            },2.5);

            vee.Utils.scheduleOnce(function () {
                if(gameController.cook){
                    gameController.showMessage("厨师，挂了");
                    gameController.cook.removeFromParent();
                    gameController.cook.controller=null;
                }
            },8);

            vee.Utils.scheduleOnce(function () {
                gameController.enableOtherRoles();
                gameController.startEventCreate();
            }, 9);
        }else if(this.woodStatus==6){


            gameController.showMessage("法师走了上去");
            var currentPosition = gameController.cookMoveNode.getPosition();
            for (var i = 0; i < gameController.roleArray.length; i++) {
                if (i != 0) {
                    gameController.roleArray[i].getButton().setEnabled(false);

                    var shadow = gameController.roleArray[i].rootNode.getChildByTag(8888);
                    if (shadow) {
                        shadow.removeFromParent();
                        shadow = null
                    }
                }
            }
            vee.Utils.scheduleOnce(function () {
                gameController.mage.controller.playAnimate("MagicFire",function(){
                    gameController.showMessage("魔法师施展了大火球术");
                    gameController.wood.controller.playAnimate("Fire",function(){
                            gameController.dragon.controller.playAnimate("hurt",function(){
                                gameController.showMessage("树着火了，龙被火烧到了！受了点伤");
                                gameController.mage.controller.playAnimate("HuXi");})})});
            }, 0.5);
            //vee.Utils.scheduleOnce(function () {
            //
            //    gameController.dragon.controller.playAnimate("roar", function(){gameController.cook.controller.playAnimate("Death")})
            //},2.5);
            //
            //vee.Utils.scheduleOnce(function () {
            //    if(gameController.cook){
            //        gameController.cook.removeFromParent();
            //        gameController.cook.controller=null;
            //    }
            //},8);

            vee.Utils.scheduleOnce(function () {
                gameController.enableOtherRoles();
                gameController.startEventCreate();
            }, 7);
        }else if(this.woodStatus==7){

            gameController.showMessage("厨师走了上去");
            var currentPosition1 = gameController.warriorMoveNode.getPosition();
            var currentPosition2 = gameController.moveNode.getPosition();
            for (var i = 0; i < gameController.roleArray.length; i++) {
                if (i != 0) {
                    gameController.roleArray[i].getButton().setEnabled(false);

                    var shadow = gameController.roleArray[i].rootNode.getChildByTag(8888);
                    if (shadow) {
                        shadow.removeFromParent();
                        shadow = null
                    }
                }
            }

            vee.Utils.scheduleOnce(function(){
                gameController.dragon.controller.tail.isFlyout = false
                gameController.showMessage("龙突然又甩了下尾巴，成吨的伤害！");
                gameController.dragon.controller.playAnimate("TailFlick",function(){
                    gameController.wood.setVisible(false);
                    if(gameController.mage!=null)
                        gameController.mage.controller.playAnimate("Death");
                    if(gameController.cook!=null)
                        gameController.cook.controller.playAnimate("Death");
                    if(gameController.warriorMoveNode!=null)
                        gameController.warriorMoveNode.runAction(cc.spawn(cc.rotateBy(2,1000),cc.moveBy(2,cc.p(1000,1000))));
                    if(gameController.moveNode!=null)
                    gameController.moveNode.runAction(cc.spawn(cc.rotateBy(2,-1000),cc.moveBy(2,cc.p(-1000,1000))));
                });
            },1.5)

            vee.Utils.scheduleOnce(function () {
                vee.PopMgr.alert("龙完成了一次四杀","卒", function() {
                    if (gameController.warriorMoveNode != null) {
                        gameController.warriorMoveNode.setPosition(currentPosition1);
                        gameController.warriorMoveNode.setRotation(0);
                    }
                    if (gameController.moveNode != null){

                        gameController.moveNode.setRotation(0);
                        gameController.moveNode.setPosition(currentPosition2);
                    }
                    gameController.startEventCreate();}, false);

            }, 5.5);
        }else if(this.woodStatus==8){
            gameController.showMessage("战士走了上去");
            var currentPosition1 = gameController.warriorMoveNode.getPosition();
            var currentPosition2 = gameController.moveNode.getPosition();
            for (var i = 0; i < gameController.roleArray.length; i++) {
                if (i != 0) {
                    gameController.roleArray[i].getButton().setEnabled(false);

                    var shadow = gameController.roleArray[i].rootNode.getChildByTag(8888);
                    if (shadow) {
                        shadow.removeFromParent();
                        shadow = null
                    }
                }
            }

            vee.Utils.scheduleOnce(function(){
                gameController.showMessage("龙突然又甩了下尾巴，成吨的伤害！");
                gameController.dragon.controller.tail.isFlyout = false
                gameController.dragon.controller.playAnimate("TailFlick",function(){
                    gameController.wood.setVisible(false);
                    if(gameController.mage!=null)
                        gameController.mage.controller.playAnimate("Death");
                    if(gameController.cook!=null)
                        gameController.cook.controller.playAnimate("Death");
                    gameController.warriorMoveNode.runAction(cc.spawn(cc.rotateBy(2,1000),cc.moveBy(2,cc.p(1000,1000))));
                    gameController.moveNode.runAction(cc.spawn(cc.rotateBy(2,-1000),cc.moveBy(2,cc.p(-1000,1000))));
                });
            },1.5)

            vee.Utils.scheduleOnce(function () {
                vee.PopMgr.alert("龙完成了一次四杀","卒", function(){
                    if (gameController.warriorMoveNode != null) {
                        gameController.warriorMoveNode.setPosition(currentPosition1);
                        gameController.warriorMoveNode.setRotation(0);
                    }
                    if (gameController.moveNode != null) {
                        gameController.moveNode.setRotation(0);
                        gameController.moveNode.setPosition(currentPosition2);
                    }
                    gameController.startEventCreate();}, false);

            }, 5.5);
        }
    },

    onCreate:function(){
        this.woodBtn.setEnabled(false);
    }
});

var EleDragon = EleBaseRole.extend({

    /**@expose*/
    woodFlyout:function() {
        if (gameController.dragon.controller.tail.isFlyout){

            gameController.showMessage("龙的攻击卷到了一棵树");
            gameController.wood.setVisible(true);
            gameController.wood.controller.playAnimate("Flyout");
        }
    },

    /**@expose*/
    tail:null,

    onCreate:function(){

        //0: dragon; 1:Barbarian; 2:Cook; 3:Mage; 4:Warrior
        this.id = 0;
    },

    updateState:function(eventIndex,branchIndex) {

        //The dragon tail flick
        if(eventIndex==1 && branchIndex==0) {
            cc.log("dragon tail flick!!!!!");

            gameController.dragon.controller.tail.isFlyout = true;
            gameController.dragon.controller.playAnimate("TailFlick", function(){

                gameController.updateRoleState(1, 1);
            });
        }else if(eventIndex==2 && branchIndex==0){
            gameController.dragon.controller.playAnimate("fly",function(){
                gameController.showMessage("龙飞起来了！");
                gameController.dragon.controller.playAnimate("flyC");
                gameController.updateRoleState(2,1)
            });
        }
    }
});

