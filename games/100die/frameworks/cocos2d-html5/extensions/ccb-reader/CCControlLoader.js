/****************************************************************************
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011-2012 cocos2d-x.org
 Copyright (c) 2013-2014 Chukong Technologies Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

var PROPERTY_CCBFILE = "ccbFile";

cc.BuilderFileLoader = cc.NodeLoader.extend({
    _createCCNode:function (parent, ccbReader) {
        return cc.BuilderFile.create();
    },
    onHandlePropTypeCCBFile:function (node, parent, propertyName, ccbFileNode, ccbReader) {
        if (propertyName == PROPERTY_CCBFILE) {
            node.setCCBFileNode(ccbFileNode);
        } else {
            cc.NodeLoader.prototype.onHandlePropTypeCCBFile.call(this, node, parent, propertyName, ccbFileNode, ccbReader);
        }
    }
});

cc.BuilderFileLoader.loader = function () {
    return new cc.BuilderFileLoader();
};

var PROPERTY_ENABLED = "userInteractionEnabled";
var PROPERTY_SELECTED = "selected";
var PROPERTY_CCCONTROL = "ccControl";

cc.ControlLoader = cc.NodeLoader.extend({
    _createCCNode:function (parent, ccbReander) {
    },
    onHandlePropTypeBlockCCControl:function (node, parent, propertyName, blockCCControlData, ccbReader) {
        if (propertyName == PROPERTY_CCCONTROL) {
            node.addTargetWithActionForControlEvents(blockCCControlData.target, blockCCControlData.selCCControlHandler, blockCCControlData.controlEvents);
        } else {
            cc.NodeLoader.prototype.onHandlePropTypeBlockCCControl.call(this, node, parent, propertyName, blockCCControlData, ccbReader);
        }
    },
    onHandlePropTypeCheck:function (node, parent, propertyName, check, ccbReader) {
        if (propertyName == PROPERTY_ENABLED) {
            node.setEnabled(check);
        } else if (propertyName == PROPERTY_SELECTED) {
            node.setSelected(check);
        } else {
            cc.NodeLoader.prototype.onHandlePropTypeCheck.call(this, node, parent, propertyName, check, ccbReader);
        }
    }
});

var PROPERTY_ZOOMONTOUCHDOWN  = "zoomWhenHighlighted";
var PROPERTY_TITLE  = "title";
var PROPERTY_TITLECOLOR_NORMAL  = "labelColor|Normal";
var PROPERTY_TITLECOLOR_HIGHLIGHTED  = "labelColor|Highlighted";
var PROPERTY_TITLECOLOR_DISABLED  = "labelColor|Disabled";
var PROPERTY_TITLECOLOR_SELECTED  = "labelColor|Selected";

var PROPERTY_TITLETTF_FONTNAME  = "fontName";
var PROPERTY_TITLETTF_FONTSIZE  = "fontSize";
var PROPERTY_TITLETTF_FONTCOLOR  = "fontColor";
var PROPERTY_TITLETTF_STROKECOLOR  = "outlineColor";
var PROPERTY_TITLETTF_STROKESIZE  = "outlineWidth";
var PROPERTY_TITLETTF_SHADOWCOLOR  = "shadowColor";
var PROPERTY_TITLETTF_SHADOWBLUR  = "shadowBlurRadius";
var PROPERTY_TITLETTF_SHADOWOFFSET  = "shadowOffset";

var PROPERTY_TITLETTF_HORIZONTALPADDING  = "horizontalPadding";
var PROPERTY_TITLETTF_VERTICALPADDING  = "verticalPadding";

var PROPERTY_LABELANCHORPOINT  = "labelAnchorPoint";

var PROPERTY_PREFEREDSIZE  = "preferredSize";
var PROPERTY_MAXSIZE  = "maxSize";
var PROPERTY_BACKGROUNDSPRITEFRAME_NORMAL  = "backgroundSpriteFrame|Normal";
var PROPERTY_BACKGROUNDSPRITEFRAME_HIGHLIGHTED  = "backgroundSpriteFrame|Highlighted";
var PROPERTY_BACKGROUNDSPRITEFRAME_DISABLED  = "backgroundSpriteFrame|Disabled";
var PROPERTY_BACKGROUNDSPRITEFRAME_SELECTED  = "backgroundSpriteFrame|Selected";

var PROPERTY_BACKGROUNDCOLOR_NORMAL  = "backgroundColor|Normal";
var PROPERTY_BACKGROUNDCOLOR_HIGHLIGHTED  = "backgroundColor|Highlighted";
var PROPERTY_BACKGROUNDCOLOR_DISABLED  = "backgroundColor|Disabled";
var PROPERTY_BACKGROUNDCOLOR_SELECTED  = "backgroundColor|Selected";

cc.ControlButtonLoader = cc.ControlLoader.extend({
    _createCCNode:function (parent, ccbReader) {
        return cc.ControlButton.create();
    },

	_shadowColor : null,
	_shadowOffset : null,
	_shadowBlur : null,
	_strokeColor : null,
	_strokeSize : null,
	_position : null,
	_marginH : null,
	_marginV : null,

    onHandlePropTypeCheck:function (node, parent, propertyName, check, ccbReader) {
        if (propertyName == PROPERTY_ZOOMONTOUCHDOWN) {
            node.setZoomOnTouchDown(check);
        } else {
            cc.ControlLoader.prototype.onHandlePropTypeCheck.call(this, node, parent, propertyName, check, ccbReader);
        }
    },
	onHandlePropTypeString:function (node, parent, propertyName, stringValue, ccbReader) {
        if (propertyName == PROPERTY_TITLE) {
            node.setTitleForState(stringValue, cc.CONTROL_STATE_NORMAL);
        } else {
            cc.ControlLoader.prototype.onHandlePropTypeString.call(this, node, parent, propertyName, stringValue, ccbReader);
        }
    },
    onHandlePropTypeFile:function (node, parent, propertyName, file, ccbReader) {
        if (propertyName == PROPERTY_TITLETTF_FONTNAME) {
            node.setTitleTTFForState(file, cc.CONTROL_STATE_NORMAL);
        } else {
            cc.ControlLoader.prototype.onHandlePropTypeFile.call(this, node, parent, propertyName, file, ccbReader);
        }
    },
    onHandlePropTypeFloatScale:function (node, parent, propertyName, floatScale, ccbReader) {
        if (propertyName == PROPERTY_TITLETTF_FONTSIZE) {
            node.setTitleTTFSizeForState(floatScale, cc.CONTROL_STATE_NORMAL);
        } else if(propertyName == PROPERTY_TITLETTF_HORIZONTALPADDING) {
	        this._marginH = floatScale;
        } else if(propertyName == PROPERTY_TITLETTF_VERTICALPADDING) {
	        this._marginV = floatScale;
        } else if (propertyName == PROPERTY_TITLETTF_STROKESIZE) {
			this._strokeSize = floatScale;
        } else if (propertyName == PROPERTY_TITLETTF_SHADOWBLUR) {
            this._shadowBlur = floatScale;
        } else {
            cc.ControlLoader.prototype.onHandlePropTypeFloatScale.call(this, node, parent, propertyName, floatScale, ccbReader);
        }
    },
    onHandlePropTypePoint:function (node, parent, propertyName, point, ccbReader) {
        if (propertyName == PROPERTY_LABELANCHORPOINT) {
            node.setLabelAnchorPoint(point);
        } else {
            cc.ControlLoader.prototype.onHandlePropTypePoint.call(this, node, parent, propertyName, point, ccbReader);
        }
    },
    onHandlePropTypeSize:function (node, parent, propertyName, size, ccbReader) {
        if (propertyName == PROPERTY_PREFEREDSIZE) {
            node.setPreferredSize(size);
        } else {
            cc.ControlLoader.prototype.onHandlePropTypeSize.call(this, node, parent, propertyName, size, ccbReader);
        }
    },
    onHandlePropTypeSpriteFrame:function (node, parent, propertyName, spriteFrame, ccbReader) {
	    if(propertyName == PROPERTY_BACKGROUNDSPRITEFRAME_NORMAL) {
		    if(spriteFrame && spriteFrame._textureLoaded) {
			    node.setBackgroundSpriteFrameForState(spriteFrame, cc.CONTROL_STATE_NORMAL);
			    if (!node.getBackgroundSpriteForState(cc.CONTROL_STATE_HIGH_LIGHTED))
				    node.setBackgroundSpriteFrameForState(spriteFrame, cc.CONTROL_STATE_HIGH_LIGHTED);
			    if (!node.getBackgroundSpriteForState(cc.CONTROL_STATE_DISABLED))
				    node.setBackgroundSpriteFrameForState(spriteFrame, cc.CONTROL_STATE_DISABLED);
		    }
	    } else if(propertyName == PROPERTY_BACKGROUNDSPRITEFRAME_HIGHLIGHTED) {
		    if(spriteFrame && spriteFrame._textureLoaded) {
			    node.setBackgroundSpriteFrameForState(spriteFrame, cc.CONTROL_STATE_HIGH_LIGHTED);
		    }
	    } else if(propertyName == PROPERTY_BACKGROUNDSPRITEFRAME_DISABLED) {
		    if(spriteFrame && spriteFrame._textureLoaded) {
			    node.setBackgroundSpriteFrameForState(spriteFrame, cc.CONTROL_STATE_DISABLED);
		    }
	    } else if(propertyName == PROPERTY_BACKGROUNDSPRITEFRAME_SELECTED) {
		    if(spriteFrame && spriteFrame._textureLoaded) {
			    node.setBackgroundSpriteFrameForState(spriteFrame, cc.CONTROL_STATE_SELECTED);
		    }
	    } else {
		    cc.ControlLoader.prototype.onHandlePropTypeSpriteFrame(node, parent, propertyName, spriteFrame, ccbReader);
	    }
    },
    onHandlePropTypeColor3:function (node, parent, propertyName, ccColor3B, ccbReader) {
	    if(propertyName == PROPERTY_TITLECOLOR_NORMAL) {
		    node.setTitleColorForState(ccColor3B, cc.CONTROL_STATE_NORMAL);
	    } else if(propertyName == PROPERTY_TITLECOLOR_HIGHLIGHTED) {
		    node.setTitleColorForState(ccColor3B, cc.CONTROL_STATE_HIGH_LIGHTED);
	    } else if(propertyName == PROPERTY_TITLECOLOR_DISABLED) {
		    node.setTitleColorForState(ccColor3B, cc.CONTROL_STATE_DISABLED);
	    }  else if(propertyName == PROPERTY_TITLECOLOR_SELECTED) {
		    node.setTitleColorForState(ccColor3B, cc.CONTROL_STATE_SELECTED);
	    } else if(propertyName == PROPERTY_TITLETTF_FONTCOLOR) {
		    //        node.setTitleColorForState(ccColor3B, CCControlStateNormal);
	    } else if(propertyName == PROPERTY_TITLETTF_STROKECOLOR) {
		    this._strokeColor = ccColor3B;
	    } else if(propertyName == PROPERTY_BACKGROUNDCOLOR_NORMAL) {
		    var sp = node.getBackgroundSpriteForState(cc.CONTROL_STATE_NORMAL);
		    if(sp)sp.setColor(ccColor3B);
	    } else if(propertyName == PROPERTY_BACKGROUNDCOLOR_HIGHLIGHTED) {
		    var sp = node.getBackgroundSpriteForState(cc.CONTROL_STATE_HIGH_LIGHTED);
		    if(sp)sp.setColor(ccColor3B);
	    } else if(propertyName == PROPERTY_BACKGROUNDCOLOR_DISABLED) {
		    var sp = node.getBackgroundSpriteForState(cc.CONTROL_STATE_DISABLED);
		    if(sp)sp.setColor(ccColor3B);
	    } else if(propertyName == PROPERTY_BACKGROUNDCOLOR_SELECTED) {
		    var sp = node.getBackgroundSpriteForState(cc.CONTROL_STATE_SELECTED);
		    if(sp)sp.setColor(ccColor3B);
	    } else if(propertyName == PROPERTY_TITLETTF_SHADOWCOLOR) {
		    this._shadowColor = ccColor3B;
	    } else {
		    cc.ControlLoader.prototype.onHandlePropTypeColor3(node, parent, propertyName, ccColor3B, ccbReader);
	    }
    },
	onHandlePropTypePosition:function (node, parent, propertyName, pt, ccbReader) {
		if(propertyName == PROPERTY_TITLETTF_SHADOWOFFSET) {
			this._shadowOffset = cc.size(pt.x, pt.y);
		} else {
			cc.ControlLoader.prototype.onHandlePropTypePosition(node, parent, propertyName, pt, ccbReader)
		}
	},

	onParseBegin : function(node, parent, ccbReader){
		this._strokeSize = 0;
		this._shadowBlur = 0;
	},

	onCompleted : function(node, parent, ccbReader){
		var ttf = node.getTitleLabelForState(cc.CONTROL_STATE_NORMAL);
		if(ttf){
			if (this._strokeSize) ttf.enableStroke(this._strokeColor, this._strokeSize);
//			if (this._shadowBlur) ttf.enableShadow(this._shadowColor, this._shadowOffset, this._shadowBlur);
		}
		node.visit();
		node.needsLayout();
		vee.btn = node;
	}

});

cc.ControlButtonLoader.loader = function () {
    return new cc.ControlButtonLoader();
};

var PROPERTY_CONTAINER = "contentNode";
var PROPERTY_SCROLL_HORIZONTAL = "horizontalScrollEnabled";
var PROPERTY_SCROLL_VERTICAL  = "verticalScrollEnabled";
var PROPERTY_CLIPSTOBOUNDS = "clippingToBounds";
var PROPERTY_BOUNCES = "bounces";
var PROPERTY_SCALE = "scale";

cc.ScrollViewLoader = cc.NodeLoader.extend({
    _createCCNode:function (parent, ccbReader) {
        return cc.ScrollView.create();
    },

    onHandlePropTypeSize:function(node,parent,propertyName,size,ccbReader){
        if(propertyName == PROPERTY_CONTENTSIZE){
            node.setViewSize(size);
        }else{
            cc.NodeLoader.prototype.onHandlePropTypeSize.call(this, node,parent,propertyName,size,ccbReader);
        }
    },

    onHandlePropTypeCCBFile:function (node, parent, propertyName, ccbFileNode, ccbReader) {
        if (propertyName == PROPERTY_CONTAINER) {
            node.setContainer(ccbFileNode);
            node.updateInset();
        } else {
            cc.NodeLoader.prototype.onHandlePropTypeCCBFile.call(this, node, parent, propertyName, ccbFileNode, ccbReader);
        }
    },
    onHandlePropTypeCheck:function (node, parent, propertyName, check, ccbReader) {
        if (propertyName == PROPERTY_CLIPSTOBOUNDS) {
            node.setClippingToBounds(check);
        } else if (propertyName == PROPERTY_BOUNCES) {
            node.setBounceable(check);
        } else if (propertyName == PROPERTY_SCROLL_HORIZONTAL) {
	        this._horizontalEnabled = true;
        } else if (propertyName == PROPERTY_SCROLL_VERTICAL) {
	        this._verticalEnabled = true;
        } else {
            cc.NodeLoader.prototype.onHandlePropTypeCheck.call(this, node, parent, propertyName, check, ccbReader);
        }
    },
    onHandlePropTypeFloat:function (node, parent, propertyName, floatValue, ccbReader) {
        if (propertyName == PROPERTY_SCALE) {
            node.setScale(floatValue);
        } else {
            cc.NodeLoader.prototype.onHandlePropTypeFloat.call(this, node, parent, propertyName, floatValue, ccbReader);
        }
    },
	_horizontalEnabled : false,
	_verticalEnabled : false,
	onParseBegin : function(node, parent, ccbReader){
		this._horizontalEnabled = false;
		this._verticalEnabled = false;
	},
	onCompleted : function(node, parent, ccbReader){
		var dir = cc.SCROLLVIEW_DIRECTION_NONE;
		if (this._horizontalEnabled){
			if (this._verticalEnabled) dir = cc.SCROLLVIEW_DIRECTION_BOTH;
			else dir = cc.SCROLLVIEW_DIRECTION_HORIZONTAL;
		} else dir = cc.SCROLLVIEW_DIRECTION_VERTICAL;
		node.setDirection(dir);
	}
});

cc.ScrollViewLoader.loader = function () {
    return new cc.ScrollViewLoader();
};

var PROPERTY_CONTENTSIZE = "contentSize";
var PROPERTY_SPRITEFRAME = "spriteFrame";
var PROPERTY_COLOR = "color";
var PROPERTY_OPACITY = "opacity";
var PROPERTY_BLENDFUNC = "blendFunc";
var PROPERTY_INSETLEFT = "marginLeft";
var PROPERTY_INSETTOP = "marginTop" ;
var PROPERTY_INSETRIGHT = "marginRight";
var PROPERTY_INSETBOTTOM = "marginBottom";

cc.Scale9SpriteLoader = cc.NodeLoader.extend({
    _createCCNode:function(parent,ccbReader){
        var sprite = cc.Scale9Sprite.create();

        sprite.setAnchorPoint(0, 0);

        return sprite;
    },

	_contentSize : {width:0, height:0},
	_textureSize : {width:0, height:0},
	_insetTop : 0,
	_insetBottom : 0,
	_insetLeft : 0,
	_insetRight : 0,

    onHandlePropTypeColor3:function(node, parent, propertyName, ccColor3B,ccbReader){
        if(propertyName == PROPERTY_COLOR) {
            if(ccColor3B.r !== 255 || ccColor3B.g !== 255 || ccColor3B.b !== 255){
                node.setColor(ccColor3B);
            }
        } else {
            cc.NodeLoader.prototype.onHandlePropTypeColor3.call(this, node, parent, propertyName, ccColor3B,ccbReader);
        }
    },
    onHandlePropTypeBlendFunc:function(node, parent, propertyName, ccBlendFunc,ccbReader){
        if(propertyName == PROPERTY_BLENDFUNC) {
            // TODO Not exported by CocosBuilder yet!
            // node.setBlendFunc(ccBlendFunc);
        } else {
            cc.NodeLoader.prototype.onHandlePropTypeBlendFunc.call(this, node, parent, propertyName, ccBlendFunc,ccbReader);
        }
    },
    onHandlePropTypeSpriteFrame:function(node, parent, propertyName, spriteFrame,ccbReader){
        if(propertyName == PROPERTY_SPRITEFRAME) {
            node.setSpriteFrame(spriteFrame);
	        this._textureSize = spriteFrame.getRect();
        } else {
            cc.NodeLoader.prototype.onHandlePropTypeSpriteFrame.call(this, node, parent, propertyName, spriteFrame,ccbReader);
        }
    },
    onHandlePropTypeSize:function(node, parent, propertyName, size,ccbReader){
        if(propertyName == PROPERTY_CONTENTSIZE) {
            this._contentSize = size;
        } else if(propertyName == PROPERTY_PREFEREDSIZE) {
			this._contentSize = size;
        } else {
            cc.NodeLoader.prototype.onHandlePropTypeSize.call(this, node, parent, propertyName, size,ccbReader);
        }
    },
    onHandlePropTypeFloat:function(node, parent, propertyName, floatValue, ccbReader){
	    if(propertyName == PROPERTY_OPACITY) {
		    node.setOpacity(floatValue);
	    } else if(propertyName == PROPERTY_INSETLEFT) {
		    this._insetLeft = floatValue;
        } else if(propertyName == PROPERTY_INSETTOP) {
		    this._insetTop = floatValue;
        } else if(propertyName == PROPERTY_INSETRIGHT) {
		    this._insetRight = floatValue;
        } else if(propertyName == PROPERTY_INSETBOTTOM) {
		    this._insetBottom = floatValue;
        } else {
            cc.NodeLoader.prototype.onHandlePropTypeFloat.call(this, node, parent, propertyName, floatValue,ccbReader);
        }
    },

	onParseBegin : function(node, parent, ccbReader) {
		this._contentSize = cc.Size.ZERO;
		this._textureSize = cc.Size.ZERO;
	},

	onCompleted : function(node, parent, ccbReader) {
		node.setPreferredSize(this._contentSize);
		node.setInsetTop(this._insetTop * this._textureSize.height);
		node.setInsetBottom(this._insetBottom * this._textureSize.height);
		node.setInsetLeft(this._insetLeft * this._textureSize.width);
		node.setInsetRight(this._insetRight * this._textureSize.width);
	}
});

cc.Scale9SpriteLoader.loader = function(){
   return new cc.Scale9SpriteLoader();
};



