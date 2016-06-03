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

var PROPERTY_POSITION = "position";
var PROPERTY_CONTENTSIZE = "contentSize";
var PROPERTY_SKEW = "skew";
var PROPERTY_ANCHORPOINT = "anchorPoint";
var PROPERTY_SCALE = "scale";
var PROPERTY_ROTATION = "rotation";
var PROPERTY_TAG = "tag";
var PROPERTY_IGNOREANCHORPOINTFORPOSITION = "ignoreAnchorPointForPosition";
var PROPERTY_VISIBLE = "visible";
var PROPERTY_NAME = "name";

var ASSERT_FAIL_UNEXPECTED_PROPERTY = function (propertyName) {
    cc.log("Unexpected property: '" + propertyName + "'!");
};

var ASSERT_FAIL_UNEXPECTED_PROPERTYTYPE = function (propertyName) {
    cc.log("Unexpected property type: '" + propertyName + "'!");
};

function BlockData(selMenuHander, target) {
    this.selMenuHander = selMenuHander;
    this.target = target;
}

function BlockCCControlData(selCCControlHandler, target, controlEvents) {
    this.selCCControlHandler = selCCControlHandler;
    this.target = target;
    this.controlEvents = controlEvents;
}

cc.NodeLoader = cc.Class.extend({
    _customProperties:null,

    ctor:function(){
        this._customProperties = new cc._Dictionary();
    },

    loadCCNode:function (parent, ccbReader) {
        return this._createCCNode(parent, ccbReader);
        //this.parseProperties(node, parent, ccbReader);
        //return node;
    },

    parseProperties:function (node, parent, ccbReader) {
        var numRegularProps = ccbReader.readInt(false);
        var numExturaProps = ccbReader.readInt(false);
        var propertyCount = numRegularProps + numExturaProps;

	    this.onParseBegin(node, parent, ccbReader);

        for (var i = 0; i < propertyCount; i++) {
            var isExtraProp = (i >= numRegularProps);
            var type = ccbReader.readInt(false);
            var propertyName = ccbReader.readCachedString();
//			cc.log("parsing " + propertyName + "\t type\t" + type);
            // Check if the property can be set for this platform
            var setProp = true;

//            var platform = ccbReader.readByte();
//            if ((platform === CCB_PLATFORM_ALL) ||(platform === CCB_PLATFORM_IOS) ||(platform === CCB_PLATFORM_MAC) )
//                setProp = true;

            //forward properties for sub ccb files
            if(node instanceof cc.BuilderFile){
                if(node.getCCBFileNode() && isExtraProp){
                    node = node.getCCBFileNode();
                    //skip properties that doesn't have a value to override
                    var getExtraPropsNames = node.userObject;
                    setProp = getExtraPropsNames.indexOf(propertyName) != -1;
                }
            } else if(isExtraProp && node == ccbReader.getAnimationManager().getRootNode()){
                var extraPropsNames = node.userObject;
                if(!extraPropsNames){
                    extraPropsNames = [];
                    node.userObject = extraPropsNames;
                }
                extraPropsNames.push(propertyName);
            }

            switch (type) {
                case CCB_PROPTYPE_POSITION:
                {
                    var position = this.parsePropTypePosition(node, parent, ccbReader, propertyName);
                    if (setProp)
                        this.onHandlePropTypePosition(node, parent, propertyName, position, ccbReader);
                    break;
                }
                case CCB_PROPTYPE_POINT:
                {
                    var point = this.parsePropTypePoint(node, parent, ccbReader);
                    if (setProp)
                        this.onHandlePropTypePoint(node, parent, propertyName, point, ccbReader);
                    break;
                }
                case CCB_PROPTYPE_POINTLOCK:
                {
                    var pointLock = this.parsePropTypePointLock(node, parent, ccbReader);
                    if (setProp)
                        this.onHandlePropTypePointLock(node, parent, propertyName, pointLock, ccbReader);
                    break;
                }
                case CCB_PROPTYPE_SIZE:
                {
                    var size = this.parsePropTypeSize(node, parent, ccbReader);
                    if (setProp)
                        this.onHandlePropTypeSize(node, parent, propertyName, size, ccbReader);
                    break;
                }
                case CCB_PROPTYPE_SCALELOCK:
                {
                    var scaleLock = this.parsePropTypeScaleLock(node, parent, ccbReader, propertyName);
                    if (setProp)
                        this.onHandlePropTypeScaleLock(node, parent, propertyName, scaleLock, ccbReader);
                    break;
                }
                case CCB_PROPTYPE_FLOATXY:
                {
                    var xy = this.parsePropTypeFloatXY(node, parent, ccbReader);
                    if (setProp)
                        this.onHandlePropTypeFloatXY(node, parent, propertyName, xy, ccbReader);
                    break;
                }

                case CCB_PROPTYPE_FLOAT:
                {
                    var f = this.parsePropTypeFloat(node, parent, ccbReader, propertyName);
                    if (setProp) {
                        this.onHandlePropTypeFloat(node, parent, propertyName, f, ccbReader);
                    }
                    break;
                }
                case CCB_PROPTYPE_DEGREES:
                {
                    var degrees = this.parsePropTypeDegrees(node, parent, ccbReader, propertyName);
                    if (setProp) {
                        this.onHandlePropTypeDegrees(node, parent, propertyName, degrees, ccbReader);
                    }
                    break;
                }
                case CCB_PROPTYPE_FLOATSCALE:
                {
                    var floatScale = this.parsePropTypeFloatScale(node, parent, ccbReader);
                    if (setProp) {
                        this.onHandlePropTypeFloatScale(node, parent, propertyName, floatScale, ccbReader);
                    }
                    break;
                }
                case CCB_PROPTYPE_INTEGER:
                {
                    var integer = this.parsePropTypeInteger(node, parent, ccbReader);
                    if (setProp) {
                        this.onHandlePropTypeInteger(node, parent, propertyName, integer, ccbReader);
                    }
                    break;
                }
                case CCB_PROPTYPE_INTEGERLABELED:
                {
                    var integerLabeled = this.parsePropTypeIntegerLabeled(node, parent, ccbReader);
                    if (setProp) {
                        this.onHandlePropTypeIntegerLabeled(node, parent, propertyName, integerLabeled, ccbReader);
                    }
                    break;
                }
                case CCB_PROPTYPE_FLOATVAR:
                {
                    var floatVar = this.parsePropTypeFloatVar(node, parent, ccbReader);
                    if (setProp) {
                        this.onHandlePropTypeFloatVar(node, parent, propertyName, floatVar, ccbReader);
                    }
                    break;
                }
                case CCB_PROPTYPE_CHECK:
                {
                    var check = this.parsePropTypeCheck(node, parent, ccbReader, propertyName);
                    if (setProp) {
                        this.onHandlePropTypeCheck(node, parent, propertyName, check, ccbReader);
                    }
                    break;
                }
	            case CCB_PROPTYPE_TEXTURE:
                case CCB_PROPTYPE_SPRITEFRAME:
                {
                    var ccSpriteFrame = this.parsePropTypeSpriteFrame(node, parent, ccbReader, propertyName);
                    if (setProp) {
                        this.onHandlePropTypeSpriteFrame(node, parent, propertyName, ccSpriteFrame, ccbReader);
                    }
                    break;
                }
                case CCB_PROPTYPE_ANIMATION:
                {
                    var ccAnimation = this.parsePropTypeAnimation(node, parent, ccbReader);
                    if (setProp) {
                        this.onHandlePropTypeAnimation(node, parent, propertyName, ccAnimation, ccbReader);
                    }
                    break;
                }
                case CCB_PROPTYPE_BYTE:
                {
                    var byteValue = this.parsePropTypeByte(node, parent, ccbReader, propertyName);
                    if (setProp) {
                        this.onHandlePropTypeByte(node, parent, propertyName, byteValue, ccbReader);
                    }
                    break;
                }
                case CCB_PROPTYPE_COLOR3:
	            case CCB_PROPTYPE_COLOR4:
                {
                    var color = this.parsePropTypeColor3(node, parent, ccbReader, propertyName);
                    if (setProp) {
                        this.onHandlePropTypeColor3(node, parent, propertyName, color, ccbReader);
                    }
                    break;
                }
                case CCB_PROPTYPE_COLOR4VAR:
                {
                    var color4FVar = this.parsePropTypeColor4FVar(node, parent, ccbReader);
                    if (setProp) {
                        this.onHandlePropTypeColor4FVar(node, parent, propertyName, color4FVar, ccbReader);
                    }
                    break;
                }
                case CCB_PROPTYPE_FLIP:
                {
                    var flip = this.parsePropTypeFlip(node, parent, ccbReader);
                    if (setProp) {
                        this.onHandlePropTypeFlip(node, parent, propertyName, flip, ccbReader);
                    }
                    break;
                }
                case CCB_PROPTYPE_BLENDMODE:
                {
                    var blendFunc = this.parsePropTypeBlendFunc(node, parent, ccbReader);
                    if (setProp) {
                        this.onHandlePropTypeBlendFunc(node, parent, propertyName, blendFunc, ccbReader);
                    }
                    break;
                }
                case CCB_PROPTYPE_FNTFILE:
                {
                    var fntFile = this.parsePropTypeFntFile(node, parent, ccbReader);
                    if (setProp) {
                        this.onHandlePropTypeFntFile(node, parent, propertyName, fntFile, ccbReader);
                    }
                    break;
                }
	            case CCB_PROPTYPE_FILE:
	            case CCB_PROPTYPE_MAP_FILE:
                case CCB_PROPTYPE_FONTTTF:
                {
                    var fontTTF = this.parsePropTypeFile(node, parent, ccbReader);
                    if (setProp) {
                        this.onHandlePropTypeFile(node, parent, propertyName, fontTTF, ccbReader);
                    }
                    break;
                }
                case CCB_PROPTYPE_STRING:
                {
                    var stringValue = this.parsePropTypeString(node, parent, ccbReader);
                    if (setProp) {
                        this.onHandlePropTypeString(node, parent, propertyName, stringValue, ccbReader);
                    }
                    break;
                }
                case CCB_PROPTYPE_TEXT:
                {
                    var textValue = this.parsePropTypeText(node, parent, ccbReader);
                    if (setProp) {
                        this.onHandlePropTypeText(node, parent, propertyName, textValue, ccbReader);
                    }
                    break;
                }
                case CCB_PROPTYPE_BLOCK:
                case CCB_PROPTYPE_BLOCKCCCONTROL:
                {
                    var blockCCControlData = this.parsePropTypeBlockCCControl(node, parent, ccbReader);
                    if (setProp && blockCCControlData != null) {
                        this.onHandlePropTypeBlockCCControl(node, parent, propertyName, blockCCControlData, ccbReader);
                    }
                    break;
                }
                case CCB_PROPTYPE_CCBFILE:
                {
                    var ccbFileNode = this.parsePropTypeCCBFile(node, parent, ccbReader);
                    if (setProp) {
                        this.onHandlePropTypeCCBFile(node, parent, propertyName, ccbFileNode, ccbReader);
                    }
                    break;
                }
                default:
                    ASSERT_FAIL_UNEXPECTED_PROPERTYTYPE(type);
                    break;
            }
        }
	    this.onCompleted(node, parent, ccbReader);
    },

    getCustomProperties:function(){
        return this._customProperties;
    },

    _createCCNode:function (parent, ccbReader) {
        return cc.Node.create();
    },

    parsePropTypePosition:function (node, parent, ccbReader, propertyName) {
        var x = ccbReader.readFloat();
        var y = ccbReader.readFloat();

        var type = ccbReader.readByte();
        var xUnit = ccbReader.readByte();
        var yUnit = ccbReader.readByte();

        var containerSize = ccbReader.getAnimationManager().getContainerSize(parent);
        var pt = cc._getAbsolutePosition(x,y,type,xUnit,yUnit,containerSize,propertyName);

        if(ccbReader.getAnimatedProperties().indexOf(propertyName) > -1){
            var baseValue = [x,y,type,xUnit,yUnit];
            ccbReader.getAnimationManager().setBaseValue(baseValue,node,propertyName);
        }

        return pt;
    },

    parsePropTypePoint:function (node, parent, ccbReader) {
        var x = ccbReader.readFloat();
        var y = ccbReader.readFloat();

        return cc.p(x, y);
    },

    parsePropTypePointLock:function (node, parent, ccbReader) {
        var x = ccbReader.readFloat();
        var y = ccbReader.readFloat();

        return cc.p(x, y);
    },

    parsePropTypeSize:function (node, parent, ccbReader) {
        var width = ccbReader.readFloat();
        var height = ccbReader.readFloat();

        var xUnit = ccbReader.readByte();
	    var yUnit = ccbReader.readByte();

        var containerSize = ccbReader.getAnimationManager().getContainerSize(parent);

        switch (xUnit) {
            case CCB_SIZETYPE_ABSOLUTE:
                /* Nothing. */
                break;
            case CCB_SIZETYPE_RELATIVE_CONTAINER:
                width = containerSize.width - width;
                break;
            case CCB_SIZETYPE_PERCENT:
                width = containerSize.width * width;
                break;
            case CCB_SIZETYPE_MULTIPLY_RESOLUTION:
                var resolutionScale = cc.BuilderReader.getResolutionScale();
                width *= resolutionScale;
                break;
            default:
                cc.log("Unknown CCB type.");
                break;
        }

	    switch (yUnit) {
		    case CCB_SIZETYPE_ABSOLUTE:
			    /* Nothing. */
			    break;
		    case CCB_SIZETYPE_RELATIVE_CONTAINER:
			    height = containerSize.height - height;
			    break;
		    case CCB_SIZETYPE_PERCENT:
			    height = containerSize.height * height;
			    break;
		    case CCB_SIZETYPE_MULTIPLY_RESOLUTION:
			    var resolutionScale = cc.BuilderReader.getResolutionScale();
			    height *= resolutionScale;
			    break;
		    default:
			    cc.log("Unknown CCB type.");
			    break;
	    }

        return cc.size(width, height);
    },

    parsePropTypeScaleLock:function (node, parent, ccbReader, propertyName) {
        var x = ccbReader.readFloat();
        var y = ccbReader.readFloat();

        var type = ccbReader.readByte();

        cc.setRelativeScale(node,x,y,type,propertyName);

        if(ccbReader.getAnimatedProperties().indexOf(propertyName) > -1){
            ccbReader.getAnimationManager().setBaseValue([x,y,type],node,propertyName);
        }

        if (type == CCB_SCALETYPE_MULTIPLY_RESOLUTION) {
            x *= cc.BuilderReader.getResolutionScale();
            y *= cc.BuilderReader.getResolutionScale();
        }

        return [x, y];
    },

    parsePropTypeFloat:function (node, parent, ccbReader, propertyName) {
        var ret = ccbReader.readFloat();
        if(ccbReader.getAnimatedProperties().indexOf(propertyName) > -1){
            ccbReader.getAnimationManager().setBaseValue(ret,node, propertyName);
        }
        return ret;
    },

    parsePropTypeDegrees:function (node, parent, ccbReader, propertyName) {
        var ret = ccbReader.readFloat();
        if(ccbReader.getAnimatedProperties().indexOf(propertyName) > -1){
            ccbReader.getAnimationManager().setBaseValue(ret,node, propertyName);
        }
        return ret;
    },

    parsePropTypeFloatScale:function (node, parent, ccbReader) {
        var f = ccbReader.readFloat();

        var type = ccbReader.readInt(false);

        if (type == CCB_SCALETYPE_MULTIPLY_RESOLUTION) {
            f *= cc.BuilderReader.getResolutionScale();
        }

        return f;
    },

    parsePropTypeInteger:function (node, parent, ccbReader) {
        return ccbReader.readInt(true);
    },

    parsePropTypeIntegerLabeled:function (node, parent, ccbReader) {
        return ccbReader.readInt(true);
    },

    parsePropTypeFloatVar:function (node, parent, ccbReader) {
        var f = ccbReader.readFloat();
        var fVar = ccbReader.readFloat();
        return [f, fVar];
    },

    parsePropTypeCheck:function (node, parent, ccbReader, propertyName) {
        var ret = ccbReader.readBool();
        if(ccbReader.getAnimatedProperties().indexOf(propertyName) > -1){
            ccbReader.getAnimationManager().setBaseValue(ret,node, propertyName);
        }
        return ret;
    },

    parsePropTypeSpriteFrame:function (node, parent, ccbReader, propertyName) {
        var spriteFrame = ccbReader.readSpriteFrame();
        if(spriteFrame){
            if(ccbReader.getAnimatedProperties().indexOf(propertyName) > -1){
                ccbReader.getAnimationManager().setBaseValue(spriteFrame,node,propertyName);
            }
        }

        return spriteFrame;
    },

    parsePropTypeAnimation:function (node, parent, ccbReader) {
        var animationFile = ccbReader.getCCBRootPath() + ccbReader.readCachedString();
        var animation = ccbReader.readCachedString();

        var ccAnimation = null;

        // Support for stripping relative file paths, since ios doesn't currently
        // know what to do with them, since its pulling from bundle.
        // Eventually this should be handled by a client side asset manager
        // interface which figured out what resources to load.
        // TODO Does this problem exist in C++?
        animation = cc.BuilderReader.lastPathComponent(animation);
        animationFile = cc.BuilderReader.lastPathComponent(animationFile);

        if (animation != null && animation != "") {
            var animationCache = cc.animationCache;
            animationCache.addAnimations(animationFile);

            ccAnimation = animationCache.getAnimation(animation);
        }
        return ccAnimation;
    },

    parsePropTypeTexture:function (node, parent, ccbReader) {
        var frame = ccbReader.readSpriteFrame();

        if(frame)
            return frame.getTexture();
        return null;
    },

    parsePropTypeByte:function (node, parent, ccbReader, propertyName) {
        var ret = ccbReader.readByte();
        if(ccbReader.getAnimatedProperties().indexOf(propertyName) > -1){
            ccbReader.getAnimationManager().setBaseValue(ret,node, propertyName);
        }
        return ret;
    },

    parsePropTypeColor3:function (node, parent, ccbReader, propertyName) {
	    var red = 0 | (ccbReader.readFloat() * 255);
	    var green = 0 | (ccbReader.readFloat() * 255);
	    var blue = 0 | (ccbReader.readFloat() * 255);
	    var alpha = ccbReader.readFloat()*255;
        var color = {r:red, g:green, b:blue, a:alpha};
        if(ccbReader.getAnimatedProperties().indexOf(propertyName) > -1){
            ccbReader.getAnimationManager().setBaseValue(cc.Color4BWappe.create(color),node, propertyName);
        }
        return color;
    },

    parsePropTypeColor4FVar:function (node, parent, ccbReader) {
        //TODO Color4F doesn't supports on HTML5
        var red = 0 | (ccbReader.readFloat() * 255);
        var green = 0 | (ccbReader.readFloat() * 255);
        var blue = 0 | (ccbReader.readFloat() * 255);
        var alpha = ccbReader.readFloat();
        alpha = alpha <= 1 ? (0 | (alpha * 255)) : alpha;
        var redVar = 0 | (ccbReader.readFloat() * 255);
        var greenVar = 0 | (ccbReader.readFloat() * 255);
        var blueVar = 0 | (ccbReader.readFloat() * 255);
        var alphaVar = ccbReader.readFloat();
        alphaVar = alphaVar <= 1 ? (0 | (alphaVar * 255)) : alphaVar;

        var colors = [];
        colors[0] = {r:red, g:green, b:blue, a:alpha};
        colors[1] = {r:redVar, g:greenVar, b:blueVar, a:alphaVar};

        return colors;
    },

    parsePropTypeFlip:function (node, parent, ccbReader) {
        var flipX = ccbReader.readBool();
        var flipY = ccbReader.readBool();

        return [flipX, flipY];
    },

    parsePropTypeBlendFunc:function (node, parent, ccbReader) {
        var source = ccbReader.readInt(false);
        var destination = ccbReader.readInt(false);

        return new cc.BlendFunc(source, destination);
    },

    parsePropTypeFntFile:function (node, parent, ccbReader) {
        return ccbReader.getCCBRootPath() + cc.BuilderReader.lastPathComponent(ccbReader.readCachedString());
    },

    parsePropTypeString:function (node, parent, ccbReader) {
	    var txt = ccbReader.readCachedString();
	    var localized = ccbReader.readBool();
	    if(localized) {
		    return this.localizeString(txt);
	    }
	    return txt;
    },

    parsePropTypeText:function (node, parent, ccbReader) {
	    var txt = ccbReader.readCachedString();
	    var localized = ccbReader.readBool();
	    if(localized) {
		    return this.localizeString(txt);
	    }
	    return txt;
    },

    parsePropTypeFile:function (node, parent, ccbReader) {
        return ccbReader.getCCBRootPath() + cc.BuilderReader.lastPathComponent(ccbReader.readCachedString());
    },

    parsePropTypeBlock:function (node, parent, ccbReader) {
        var selectorName = ccbReader.readCachedString();
        var selectorTarget = ccbReader.readInt(false);

        if (selectorTarget !== CCB_TARGETTYPE_NONE) {
            var target = null;
            if(!ccbReader.isJSControlled()) {
                if (selectorTarget === CCB_TARGETTYPE_DOCUMENTROOT) {
                    target = ccbReader.getAnimationManager().getRootNode();
                } else if (selectorTarget === CCB_TARGETTYPE_OWNER) {
                    target = ccbReader.getOwner();
                }

                if (target != null) {
                    if (selectorName.length > 0) {
                        var selMenuHandler = 0;

                        //var targetAsCCBSelectorResolver = target;
                        if (target != null && target.onResolveCCBCCMenuItemSelector)
                            selMenuHandler = target.onResolveCCBCCMenuItemSelector(target, selectorName);

                        if (selMenuHandler == 0) {
                            var ccbSelectorResolver = ccbReader.getCCBSelectorResolver();
                            if (ccbSelectorResolver != null)
                                selMenuHandler = ccbSelectorResolver.onResolveCCBCCMenuItemSelector(target, selectorName);
                        }

                        if (selMenuHandler == 0) {
                            cc.log("Skipping selector '" +selectorName+ "' since no CCBSelectorResolver is present.");
                        } else {
                            return new BlockData(selMenuHandler,target);
                        }
                    } else {
                        cc.log("Unexpected empty selector.");
                    }
                } else {
                    cc.log("Unexpected NULL target for selector.");
                }
            } else {
                if(selectorTarget === CCB_TARGETTYPE_DOCUMENTROOT){
                    ccbReader.addDocumentCallbackNode(node);
                    ccbReader.addDocumentCallbackName(selectorName);
                    ccbReader.addDocumentCallbackControlEvents(0);
                } else {
                    ccbReader.addOwnerCallbackNode(node);
                    ccbReader.addOwnerCallbackName(selectorName);
                    ccbReader.addOwnerCallbackControlEvents(0);
                }
            }
        }
        return null;
    },

    parsePropTypeBlockCCControl:function (node, parent, ccbReader) {
        var selectorName = ccbReader.readCachedString();
        var selectorTarget = ccbReader.readInt(false);
//        var controlEvents = ccbReader.readInt(false);
        var controlEvents = 1 << 5;

        if (selectorTarget !== CCB_TARGETTYPE_NONE) {
            if(!ccbReader.isJSControlled()){
                var target = null;
                if (selectorTarget == CCB_TARGETTYPE_DOCUMENTROOT) {
                    target = ccbReader.getAnimationManager().getRootNode();
                } else if (selectorTarget == CCB_TARGETTYPE_OWNER) {
                    target = ccbReader.getOwner();
                }

                if (target != null) {
                    if (selectorName.length > 0) {
                        var selCCControlHandler = 0;

                        if (target != null && target.onResolveCCBCCControlSelector) {
                            selCCControlHandler = target.onResolveCCBCCControlSelector(target, selectorName);
                        }
                        if (selCCControlHandler == 0) {
                            var ccbSelectorResolver = ccbReader.getCCBSelectorResolver();
                            if (ccbSelectorResolver != null) {
                                selCCControlHandler = ccbSelectorResolver.onResolveCCBCCControlSelector(target, selectorName);
                            }
                        }

                        if (selCCControlHandler == 0) {
                            cc.log("Skipping selector '" + selectorName + "' since no CCBSelectorResolver is present.");
                        } else {
                            return new BlockCCControlData(selCCControlHandler,target,controlEvents);
                        }
                    } else {
                        cc.log("Unexpected empty selector.");
                    }
                } else {
                    cc.log("Unexpected NULL target for selector.");
                }
            } else {
                if(selectorTarget == CCB_TARGETTYPE_DOCUMENTROOT){
                    ccbReader.addDocumentCallbackNode(node);
                    ccbReader.addDocumentCallbackName(selectorName);
                    ccbReader.addDocumentCallbackControlEvents(controlEvents);
                } else {
                    ccbReader.addOwnerCallbackNode(node);
                    ccbReader.addOwnerCallbackName(selectorName);
                    ccbReader.addOwnerCallbackControlEvents(controlEvents);
                }
            }
        }
        return null;
    },

    parsePropTypeCCBFile:function (node, parent, ccbReader) {
        var ccbFileName = ccbReader.readCachedString();
        /* Change path extension to .ccbi. */
        var ccbFileWithoutPathExtension = cc.BuilderReader.deletePathExtension(cc.BuilderReader.lastPathComponent(ccbFileName));
        ccbFileName = ccbFileWithoutPathExtension + ".ccbi";
		ccbFileName = ccbReader.getCCBRootPath() + ccbFileName;
        var myCCBReader = new cc.BuilderReader(ccbReader);

        var bytes = cc.loader.getRes(ccbFileName);
        if(!bytes){
            var realUrl = cc.loader.getUrl(ccbFileName);
            bytes = cc.loader.loadBinarySync(realUrl);
            cc.loader.cache[ccbFileName] = bytes;
        }

        myCCBReader.initWithData(bytes,ccbReader.getOwner());
        myCCBReader.getAnimationManager().setRootContainerSize(parent.getContentSize());
        myCCBReader.setAnimationManagers(ccbReader.getAnimationManagers());

        myCCBReader.getAnimationManager().setOwner(ccbReader.getOwner());
        var ccbFileNode = myCCBReader.readFileWithCleanUp(false);

        ccbReader.setAnimationManagers(myCCBReader.getAnimationManagers());

        if(ccbFileNode && myCCBReader.getAnimationManager().getAutoPlaySequenceId() != -1)
            myCCBReader.getAnimationManager().runAnimations(myCCBReader.getAnimationManager().getAutoPlaySequenceId(),0);

        return ccbFileNode;
    },

    parsePropTypeFloatXY:function(node, parent, ccbReader){
        var x = ccbReader.readFloat();
        var y = ccbReader.readFloat();
        return [x,y];
    },

    onHandlePropTypePosition:function (node, parent, propertyName, position, ccbReader) {
        if (propertyName === PROPERTY_POSITION) {
            node.setPosition(position);
        } else {
            ASSERT_FAIL_UNEXPECTED_PROPERTY(propertyName);
        }
    },

    onHandlePropTypePoint:function (node, parent, propertyName, position, ccbReader) {
        if (propertyName === PROPERTY_ANCHORPOINT) {
            node.setAnchorPoint(position);
        } else {
            ASSERT_FAIL_UNEXPECTED_PROPERTY(propertyName);
        }
    },

    onHandlePropTypePointLock:function (node, parent, propertyName, pointLock, ccbReader) {
        ASSERT_FAIL_UNEXPECTED_PROPERTY(propertyName);
    },

    onHandlePropTypeSize:function (node, parent, propertyName, sizeValue, ccbReader) {
        if (propertyName === PROPERTY_CONTENTSIZE) {
            node.setContentSize(sizeValue);
        } else {
            ASSERT_FAIL_UNEXPECTED_PROPERTY(propertyName);
        }
    },

    onHandlePropTypeScaleLock:function (node, parent, propertyName, scaleLock, ccbReader) {
        if (propertyName === PROPERTY_SCALE) {
            node.setScaleX(scaleLock[0]);
            node.setScaleY(scaleLock[1]);
        } else {
            ASSERT_FAIL_UNEXPECTED_PROPERTY(propertyName);
        }
    },
    onHandlePropTypeFloatXY: function (node, parent, propertyName, xy, ccbReader) {
        if (propertyName === PROPERTY_SKEW) {
            node.setSkewX(xy[0]);
            node.setSkewY(xy[1]);
        } else {
            var nameX = propertyName + "X";
            var nameY = propertyName + "Y";
            if (!node[nameX] || !node[nameY])
                ASSERT_FAIL_UNEXPECTED_PROPERTY(propertyName);
            //TODO throw an error when source code was confused
            node[nameX](xy[0]);
            node[nameY](xy[1]);
        }
    },
    onHandlePropTypeFloat:function (node, parent, propertyName, floatValue, ccbReader) {
        //ASSERT_FAIL_UNEXPECTED_PROPERTY(propertyName);
        // It may be a custom property, add it to custom property dictionary.
        this._customProperties.setObject(floatValue, propertyName);
    },

    onHandlePropTypeDegrees:function (node, parent, propertyName, degrees, ccbReader) {
        if (propertyName === PROPERTY_ROTATION) {
            node.setRotation(degrees);
        } else {
            ASSERT_FAIL_UNEXPECTED_PROPERTY(propertyName);
        }
    },

    onHandlePropTypeFloatScale:function (node, parent, propertyName, floatScale, ccbReader) {
        ASSERT_FAIL_UNEXPECTED_PROPERTY(propertyName);
    },

    onHandlePropTypeInteger:function (node, parent, propertyName, integer, ccbReader) {
        if (propertyName === PROPERTY_TAG) {
            node.setTag(integer);
        } else {
            ASSERT_FAIL_UNEXPECTED_PROPERTY(propertyName);
        }
    },

    onHandlePropTypeIntegerLabeled:function (node, parent, propertyName, integerLabeled, ccbReader) {
        ASSERT_FAIL_UNEXPECTED_PROPERTY(propertyName);
    },

    onHandlePropTypeFloatVar:function (node, parent, propertyName, floatVar, ccbReader) {
        ASSERT_FAIL_UNEXPECTED_PROPERTY(propertyName);
    },

    onHandlePropTypeCheck:function (node, parent, propertyName, check, ccbReader) {
        if (propertyName === PROPERTY_VISIBLE) {
            node.setVisible(check);
        } else if (propertyName === PROPERTY_IGNOREANCHORPOINTFORPOSITION) {
            node.ignoreAnchorPointForPosition(check);
        } else {
            ASSERT_FAIL_UNEXPECTED_PROPERTY(propertyName);
        }
    },

    onHandlePropTypeSpriteFrame:function (node, parent, propertyName, spriteFrame, ccbReader) {
        ASSERT_FAIL_UNEXPECTED_PROPERTY(propertyName);
    },

    onHandlePropTypeAnimation:function (node, parent, propertyName, ccAnimation, ccbReader) {
        ASSERT_FAIL_UNEXPECTED_PROPERTY(propertyName);
    },

    onHandlePropTypeTexture:function (node, parent, propertyName, ccTexture2D, ccbReader) {
        ASSERT_FAIL_UNEXPECTED_PROPERTY(propertyName);
    },
    onHandlePropTypeByte:function (node, parent, propertyName, byteValue, ccbReader) {
        ASSERT_FAIL_UNEXPECTED_PROPERTY(propertyName);
    },
    onHandlePropTypeColor3:function (node, parent, propertyName, ccColor3B, ccbReader) {
        ASSERT_FAIL_UNEXPECTED_PROPERTY(propertyName);
    },
    onHandlePropTypeColor4FVar:function (node, parent, propertyName, ccColor4FVar, ccbReader) {
        ASSERT_FAIL_UNEXPECTED_PROPERTY(propertyName);
    },
    onHandlePropTypeFlip:function (node, parent, propertyName, flip, ccbReader) {
        ASSERT_FAIL_UNEXPECTED_PROPERTY(propertyName);
    },
    onHandlePropTypeBlendFunc:function (node, parent, propertyName, ccBlendFunc, ccbReader) {
        ASSERT_FAIL_UNEXPECTED_PROPERTY(propertyName);
    },
    onHandlePropTypeFntFile:function (node, parent, propertyName, fntFile, ccbReader) {
        ASSERT_FAIL_UNEXPECTED_PROPERTY(propertyName);
    },
    onHandlePropTypeString:function (node, parent, propertyName, strValue, ccbReader) {
	    if (propertyName === PROPERTY_NAME) {
		    node.setName(strValue);
		    return;
	    }
        this._customProperties.setObject(strValue, propertyName);
    },
    onHandlePropTypeText:function (node, parent, propertyName, textValue, ccbReader) {
        ASSERT_FAIL_UNEXPECTED_PROPERTY(propertyName);
    },
    onHandlePropTypeFontTTF:function (node, parent, propertyName, fontTTF, ccbReader) {
        ASSERT_FAIL_UNEXPECTED_PROPERTY(propertyName);
    },
    onHandlePropTypeBlock:function (node, parent, propertyName, blockData, ccbReader) {
        ASSERT_FAIL_UNEXPECTED_PROPERTY(propertyName);
    },
    onHandlePropTypeBlockCCControl:function (node, parent, propertyName, blockCCControlData, ccbReader) {
        ASSERT_FAIL_UNEXPECTED_PROPERTY(propertyName);
    },
    onHandlePropTypeCCBFile:function (node, parent, propertyName, ccbFileNode, ccbReader) {
        ASSERT_FAIL_UNEXPECTED_PROPERTY(propertyName);
    },
	onHandlePropTypeFile:function (node, parent, propertyName, file, ccbReader) {
		ASSERT_FAIL_UNEXPECTED_PROPERTY(propertyName);
	},

	onParseBegin : function(node, parent, ccbReader) {},
	onCompleted : function(node, parent, ccbReader) {},

	localizeString : function(text){
//		cc.log("没有实现 spritebuilder 的多语言功能，修改 NodeLoader.localizeString() 方法来实现对应功能");
		return cc.Localize(text);
	}
});

cc.NodeLoader.loader = function () {
    return new cc.NodeLoader();
};


cc.LocalizationManager = {

    _preferredLanguage : null,
    _translations : null,

    getInstance : function(){
        if (!this._translations) this._loadStringsFile();
        return this;
    },

    setLanguage : function(lan){
        this._preferredLanguage = lan;
        this._loadStringsFile();
    },

    _loadStringsFile : function(){
        if (!this._preferredLanguage) this._preferredLanguage = (cc.sys.language == cc.sys.LANGUAGE_CHINESE ? "zh-Hans" : cc.sys.language);
        this._translations = {};
        var file = res.CCBLanguageFile;
        if (!file) file = "res/LStrings.plist";
        var ser = cc.loader.getRes(file);
        if (!ser) return;
        if (ser["fileType"] != "SpriteBuilderTranslations") throw "Invalid file format for spritebuilder localizations";
        if (ser["fileVersion"] != 1) throw "Invalid file version for spritebuilder localizations";
        var translates = ser["translations"];
        for (var i in translates){
            var item = translates[i];
            key = item["key"];
            value = item["translations"][this._preferredLanguage];
            this._translations[key] = value;
        }
    },

    localiazedStringForKey : function(key){
        var localizedString = this._translations[key];
        if (!localizedString) return key;
        return localizedString;
    }
}

cc.Localize = function(key) {
    return cc.LocalizationManager.getInstance().localiazedStringForKey(key);
}
