/**
 * Created by Kirito on 1/25/15.
 */

var logo = vee.Class.extend({


    /**@expose*/
    logoButton:null,

    /**@expose*/
    begin:function(){
        gameController = vee.PopMgr.popCCB(res.lyGameController_ccbi).controller;
        this.logoButton.setEnabled(false)
    }
})