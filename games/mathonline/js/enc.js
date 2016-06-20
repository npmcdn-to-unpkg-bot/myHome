
var h = window[location][host], f = h[substring](0, 6), s = h[substring](6, 10), u = h[substring](10, 14);
var ICal = {randomBetween: function(_0x23dbx6, _0x23dbx7) {
        return Math[floor](Math[random]() * (_0x23dbx7 - _0x23dbx6 + 1) + _0x23dbx6);
    }};
function CM_Game(_0x23dbx9) {
    this[$] = _0x23dbx9;
    this[prop] = {curr_result: null,score: 0,curr_bg_index: 0,btn_toggle_timeout: 100,curr_screen: home,play_timeout: 1400,runners: []};
}
;
CM_Game[prototype][init] = function() {
    var _0x23dbxa = this;
    _0x23dbxa.$(body)[height](_0x23dbxa.$(window)[height]());
    _0x23dbxa.$(.player_container)[height](_0x23dbxa.$(window)[height]());
    _0x23dbxa.$(window)[resize](function(_0x23dbxb) {
        _0x23dbxa.$(body)[height](_0x23dbxa.$(window)[height]());
        _0x23dbxa.$(.player_container)[height](_0x23dbxa.$(window)[height]());
    });
    _0x23dbxa.$(window)[keyup](function(_0x23dbxb) {
        _0x23dbxb[preventDefault]();
        if (_0x23dbxa[prop][curr_screen] == play) {
            var _0x23dbxc = -1;
            if (_0x23dbxb[keyCode] == 37) {
                _0x23dbxc = 1;
            } else {
                if (_0x23dbxb[keyCode] == 39) {
                    _0x23dbxc = 0;
                } else {
                    if (_0x23dbxb[keyCode] == 27) {
                        _0x23dbxa[goScreen](home);
                        return;
                    }
                    ;
                }
                ;
            }
            ;
            if (_0x23dbxc >= 0) {
                _0x23dbxa[submit](_0x23dbxc);
            }
            ;
        } else {
            if (_0x23dbxa[prop][curr_screen] == game_over) {
                if (_0x23dbxb[keyCode] == 13) {
                    _0x23dbxa[goScreen](play);
                } else {
                    if (_0x23dbxb[keyCode] == 27) {
                        _0x23dbxa[goScreen](home);
                    }
                    ;
                }
                ;
            } else {
                if (_0x23dbxa[prop][curr_screen] == home) {
                    if (_0x23dbxb[keyCode] == 13) {
                        _0x23dbxa[goScreen](play);
                    }
                    ;
                }
                ;
            }
            ;
        }
        ;
    });
    _0x23dbxa.$(.btn-true)[click](function(_0x23dbxb) {
        _0x23dbxb[preventDefault]();
        _0x23dbxa[submit](1);
    });
    _0x23dbxa.$(.btn-fail)[click](function(_0x23dbxb) {
        _0x23dbxb[preventDefault]();
        _0x23dbxa[submit](0);
    });
    _0x23dbxa.$(.btn-play)[click](function(_0x23dbxb) {
        _0x23dbxb[preventDefault]();
        _0x23dbxa[goScreen](play);
        $(.sound-reload)[0][play]();
    });
    _0x23dbxa.$(.player_container)[theObj[10]](_0x23dbxa.$(window)[theObj[10]]());
    _0x23dbxa.$(.btn-boot-game)[click](function(_0x23dbxb) {
        _0x23dbxb[preventDefault]();
        if (_0x23dbxa[prop][curr_screen] != home) {
            return;
        }
        ;
        _0x23dbxa[goScreen](play);
    });
    _0x23dbxa.$(.btn-home)[click](function(_0x23dbxb) {
        _0x23dbxb[preventDefault]();
        if (_0x23dbxa[prop][curr_screen] != game_over) {
            return;
        }
        ;
        _0x23dbxa[goScreen](home);
    });
};
CM_Game[prototype][changeBodyColor] = function() {
    var _0x23dbxa = this, _0x23dbxd = 1, _0x23dbxe = 16;
    var _0x23dbxf = ICal[randomBetween](_0x23dbxd, _0x23dbxe);
    _0x23dbxa.$(body)[removeClass](mc-screen- + _0x23dbxa[prop][curr_bg_index]);
    _0x23dbxa.$(body)[addClass](mc-screen- + _0x23dbxf);
    _0x23dbxa[prop][curr_bg_index] = _0x23dbxf;
};
CM_Game[prototype][goScreen] = function(_0x23dbx10) {
    if (!(f == freaky && s == math && u == .com)) {
        return false;
    }
    ;
    var _0x23dbxa = this;
    _0x23dbxa.$(.screen)[hide]();
    if (_0x23dbx10 == home) {
        _0x23dbxa.$(.screen-3)[fadeIn](fast);
        _0x23dbxa[theObj[6]][curr_screen] = home;
        _0x23dbxa[theObj[6]][score] = 0;
    } else {
        if (_0x23dbx10 == play) {
            _0x23dbxa.$(.screen-1)[fadeIn](fast);
            _0x23dbxa[theObj[6]][curr_screen] = play;
            _0x23dbxa[theObj[6]][score] = 0;
            _0x23dbxa.$(.sound-reload)[0][theObj[16]]();
            _0x23dbxa[newQuestion]();
        } else {
            if (_0x23dbx10 == game_over) {
                _0x23dbxa.$(.screen-2)[fadeIn](fast);
                _0x23dbxa.$(.new-score)[html](_0x23dbxa[theObj[6]][score]);
                _0x23dbxa.$(.best-score)[html](_0x23dbxa[get_score]());
                _0x23dbxa.$(.screen-2)[fadeIn](fast);
                _0x23dbxa[theObj[6]][curr_screen] = game_over;
            }
            ;
        }
        ;
    }
    ;
};
CM_Game[prototype][timelineStep] = function(_0x23dbx11, _0x23dbx12, _0x23dbx13) {
    var _0x23dbxa = this;
    if (_0x23dbx12 + 25 <= 0) {
        _0x23dbxa[action_game_over]();
    }
    ;
    _0x23dbx12 -= 1;
    _0x23dbxa.$(.loading)[width](_0x23dbx11 * _0x23dbx12);
    var _0x23dbx14 = setTimeout(function() {
        _0x23dbxa[timelineStep](_0x23dbx11, _0x23dbx12, _0x23dbx13);
    }, 8);
    if (_0x23dbxa[$][inArray](_0x23dbx13, _0x23dbxa[theObj[6]][runners]) < 0) {
        clearTimeout(_0x23dbx14);
    }
    ;
};
CM_Game[prototype][startTimeline] = function() {
    this.$(.loading)[width](this.$(window)[width]())[show]();
    var _0x23dbxa = this, _0x23dbx15 = _0x23dbxa.$(.loading)[width](), _0x23dbx16 = _0x23dbx15 / (_0x23dbxa[theObj[6]][play_timeout] / 10);
    var _0x23dbx12 = _0x23dbxa[theObj[6]][play_timeout] / 10;
    _0x23dbxa[theObj[6]][runners] = [];
    var _0x23dbx13 = new Date()[getTime]() / 1000;
    _0x23dbxa[theObj[6]][runners][push](_0x23dbx13);
    _0x23dbxa[timelineStep](_0x23dbx16, _0x23dbx12, _0x23dbx13);
};
CM_Game[prototype][newQuestion] = function() {
    var _0x23dbxa = this, _0x23dbxd = 1, _0x23dbxe = 9, _0x23dbx17 = ICal[randomBetween](_0x23dbxd, _0x23dbxe), _0x23dbx18 = ICal[randomBetween](_0x23dbxd, _0x23dbxe), _0x23dbx19 = _0x23dbx17 + _0x23dbx18, _0x23dbx1a = 0;
    var _0x23dbx1b = ICal[randomBetween](0, 1);
    switch (_0x23dbx1b) {
        case 0:
            _0x23dbx1a = _0x23dbx19 + ICal[randomBetween](0, 2);
            break;
            ;
        case 1:
            while (_0x23dbx1a <= 0) {
                _0x23dbx1a = _0x23dbx19 - ICal[randomBetween](0, 2);
            }
            ;
            break;
            ;
        default:
            break;
            ;
    }
    ;
    if (_0x23dbx1a == _0x23dbx19) {
        _0x23dbx1a++;
    }
    ;
    var _0x23dbx1c;
    var _0x23dbx1d = ICal[randomBetween](0, 1);
    switch (_0x23dbx1d) {
        case 0:
            _0x23dbx1c = _0x23dbx1a;
            break;
            ;
        case 1:
            _0x23dbx1c = _0x23dbx19;
            break;
            ;
        default:
            break;
            ;
    }
    ;
    _0x23dbxa[theObj[6]][curr_result] = _0x23dbx1d;
    _0x23dbxa[changeBodyColor]();
    _0x23dbxa.$(.cm-display .statement)[html](_0x23dbx17 +  +  + _0x23dbx18);
    _0x23dbxa.$(.cm-display .result)[html](= + _0x23dbx1c);
    _0x23dbxa.$(.cm-display .current-score)[html](_0x23dbxa[theObj[6]][score]);
    if (_0x23dbxa[theObj[6]][score] > 0) {
        _0x23dbxa[startTimeline]();
    }
    ;
};
CM_Game[prototype][save_score] = function() {
    var _0x23dbxa = this;
    localStorage[setItem](score, _0x23dbxa[theObj[6]][score]);
};
CM_Game[prototype][get_score] = function() {
    return localStorage[getItem](score);
};
CM_Game[theObj[9]][action_game_over] = function() {
    var _0x23dbxa = this;
    _0x23dbxa.$(.sound-fail)[0][theObj[16]]();
    if (_0x23dbxa[get_score]() < _0x23dbxa[theObj[6]][theObj[43]]) {
        _0x23dbxa[save_score]();
    }
    ;
    _0x23dbxa[theObj[18]](game_over);
    _0x23dbxa[theObj[6]][theObj[43]] = 0;
    _0x23dbxa[theObj[6]][runners] = [];
    _0x23dbxa.$(.loading)[hide]();
};
CM_Game[theObj[9]][action_game_passed] = function() {
    var _0x23dbxa = this;
    _0x23dbxa.$(.sound-passed)[0][theObj[16]]();
    _0x23dbxa[theObj[6]][theObj[43]] += 1;
    _0x23dbxa[newQuestion]();
    _0x23dbxa.$(.current-score)[html](_0x23dbxa[theObj[6]][theObj[43]]);
};
CM_Game[theObj[9]][submit] = function(_0x23dbx1e) {
    if (!(f == freaky && s == math && u == .com)) {
        return false;
    }
    ;
    var _0x23dbxa = this;
    if (_0x23dbx1e == _0x23dbxa[theObj[6]][curr_result]) {
        _0x23dbxa[action_game_passed]();
    } else {
        _0x23dbxa[action_game_over]();
    }
    ;
};
(function(_0x23dbx9) {
    _0x23dbx9(document)[ready](function() {
        var _0x23dbx1f = (f == freaky && s == math && u == .com) ? new CM_Game(_0x23dbx9) : null;
        if (_0x23dbx1f != null) {
            _0x23dbx1f[init]();
        }
        ;
    });
})(jQuery);