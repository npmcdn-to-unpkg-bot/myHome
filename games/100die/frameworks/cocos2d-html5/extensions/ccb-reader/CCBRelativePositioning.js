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

cc.getAbsolutePosition = function(pt, type, xUnit, yUnit, containerSize, propName){
    return cc._getAbsolutePosition(pt.x, pt.y, type, xUnit, yUnit, containerSize, propName);
};

cc._getAbsolutePosition = function(x, y, type, xUnit, yUnit, containerSize, propName){
    var absPt = cc.p(0,0);
	var pt = cc.p(0,0);

	if (xUnit === CCB_UNITTYPE_POINT) {
		pt.x= x;
	} else if (xUnit === CCB_UNITTYPE_MULTIPLY_RESOLUTION) {
		pt.x = x * cc.BuilderReader.getResolutionScale();
	} else if (xUnit === CCB_UNITTYPE_PERCENT) {
		pt.x = containerSize.width*x;
	}

	if (yUnit === CCB_UNITTYPE_POINT) {
		pt.y = y;
	} else if (yUnit === CCB_UNITTYPE_MULTIPLY_RESOLUTION) {
		pt.y = y * cc.BuilderReader.getResolutionScale();
	} else if (yUnit === CCB_UNITTYPE_PERCENT) {
		pt.y = containerSize.height*y;
	}

	if (type == CCB_POSITIONTYPE_RELATIVE_BOTTOM_LEFT)
	{
		absPt = pt;
	}
	else if (type == CCB_POSITIONTYPE_RELATIVE_TOP_LEFT)
	{
		absPt.x = pt.x;
		absPt.y = containerSize.height - pt.y;
	}
	else if (type == CCB_POSITIONTYPE_RELATIVE_TOP_RIGHT)
	{
		absPt.x = containerSize.width - pt.x;
		absPt.y = containerSize.height - pt.y;
	}
	else if (type == CCB_POSITIONTYPE_RELATIVE_BOTTOM_RIGHT)
	{
		absPt.x = containerSize.width - pt.x;
		absPt.y = pt.y;
	}

	return absPt;
};

cc.setRelativeScale = function(node,scaleX, scaleY, type, propName){
    if(!node)
        throw "cc.setRelativeScale(): node should be non-null";

    if (type === CCB_SCALETYPE_MULTIPLY_RESOLUTION) {
        var resolutionScale = cc.BuilderReader.getResolutionScale();

        scaleX *= resolutionScale;
        scaleY *= resolutionScale;
    }

    node.setScaleX(scaleX);
    node.setScaleY(scaleY);
};