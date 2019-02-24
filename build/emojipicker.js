+function($) {

    "use strict";
    var _createClass = (function() {
        function defineProperties(target, props) {
            for (var key in props) {
                var prop = props[key];
                prop.configurable = true;
                if (prop.value) prop.writable = true;
            }
            Object.defineProperties(target, props);
        };
        return function(Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    })();

    var _classCallCheck = function(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    };

    var EmojiPicker = (function($) {

        var className = "emojipicker";
        var _jQueryNoConflict = $.fn[className];

        // Public options and methods
        var defaults = {
            className: '.emojipicker', // string, class name of input wrap
            input: '.form-control', // string, selector or jQuery object of input
            toggle: '.emojipicker-toggle', // string, selector of emojipicker popover toggle
            template: '<div class="popover emojipicker-popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>', // string, popover template
            debug: true, // boolean, flag if need debug in console log
            onShow: function onShow() { }, // The function that is called when the emojipicker popover is ready to be displayed
            onShown: function onShown() { }, // The function that is called when the emojipicker popover is displayed
            onHide: function onHide() { }, // The function that is called when emojipicker popover to prepare for hiding
            onHidden: function onHidden() { }, // The function that is called when the emojipicker popover is hidden
        };

        var EmojiPicker = (function() {

            function EmojiPicker($element, config) {

                var _this = this;
                _classCallCheck(_this, EmojiPicker);

                // Prepare class name to remove dots (.) from selector
                config.className = config.className.replace(/\./g, '');

                // Merge default and custom options
                _this._config = $.extend({}, defaults, config);

                // Configure variables
                _this._$element = $('<div />');
                _this._$input = $element instanceof jQuery ? $element : $($element);
                _this._header = 'Test header';
                _this._content = 'Test content';

                // Wrap input and Add base emojipicker class
                if(_this._$input) {

                    var _id = 'emojipicker-' + ((Math.floor(Math.random() * 11)) + Math.floor(Math.random() * 1000000)).toString().trim();
                    var _style = _this._$input.attr('style');
                    var _class = _this._$input.attr('class');
                    var _placeholder = _this._$input.attr('placeholder');

                    if(_this._config.toggle instanceof jQuery)
                        var $toggle = _this._config.toggle;
                    else
                        var $toggle = $('<a href="#" class="' + _this._config.toggle.replace(/\./g, '') + '" role="button" data-toggle="popover">&#x263A;</a>');

                    var $content = $('<div class="emojipicker-content" contenteditable="true" />');
                    _this._$element.attr('id', _id);
                    $content.attr('style', _style).attr('data-placeholder', _placeholder).attr('class', _class + ' ' + $content.attr('class')).attr('data-type', _this._$input.get(0).type);
                    _this._$input.attr('aria-describedby', _id).attr('type', 'hidden').css('display', 'none');

                    // Init popover component
                    _this._$popover = $toggle.popover({
                        placement: 'right',
                        html: true,
                        trigger: 'focus',
                        template: _this._config.template,
                        title: function() {
                            return _this._header;
                        },
                        content: function() {
                            return _this._content;
                        },
                    }).click(function(event) {
                        event.preventDefault();
                        $(event.target).popover('show');
                    });

                    _this._$element.addClass(config.className).append($content).append($toggle).append($toggle);
                    _this._$input.after(_this._$element);

                    // Call a public methods
                    _this._$popover.on('show.bs.popover', function(event) {

                        if(_this._config.debug)
                            console.log('Call `onShow` method', _this);

                        _this._$popover.not(event.target).popover("destroy");
                        $('.popover.popover-emojipicker').remove();

                        return _this._config.onShow.call(_this);

                    }).on('shown.bs.popover', function() {

                        if(_this._config.debug)
                            console.log('Call `onShown` method', _this);

                        return _this._config.onShown.call(_this);

                    }).on('hide.bs.popover', function() {

                        if(_this._config.debug)
                            console.log('Call `onHide` method', _this);

                        return _this._config.onHide.call(_this);

                    }).on('hidden.bs.popover', function() {

                        if(_this._config.debug)
                            console.log('Call `onHidden` method', _this);

                        return _this._config.onHidden.call(_this);

                    });

                    $(document).on('click', function(event) {
                        _this._$popover.each(function() {
                            if (!$(this).is(event.target) && $(this).has(event.target).length === 0 && $('.popover').has(event.target).length === 0) {
                                (($(this).popover('hide').data('bs.popover')||{}).inState||{}).click = false;
                            }
                        });
                    });
                }
            }

            _createClass(EmojiPicker, {
                element: {
                    value: function element() {
                        var _this = this;
                        return _this._$element;
                    }
                },
                input: {
                    value: function element() {
                        var _this = this;
                        return _this._$input;
                    }
                },
            }, {
                Default: {
                    get: function() {
                        return defaults;
                    }
                },
                _jQueryInterface: {
                    value: function _jQueryInterface(config) {
                        var _this = this;
                        config = config || {};
                        return _this.each(function() {
                            var $this = $(_this);
                            var _config = $.extend({}, EmojiPicker.Default, $this.data(), typeof config === "object" && config);
                            new EmojiPicker(_this, _config);
                        });
                    }
                }
            });

            return EmojiPicker;

        })();

        $.fn[className] = EmojiPicker._jQueryInterface;
        $.fn[className].Constructor = EmojiPicker;
        $.fn[className].noConflict = function() {
            $.fn[className] = _jQueryNoConflict;
            return EmojiPicker._jQueryInterface;
        };

        return EmojiPicker;

    })(jQuery);
}(jQuery);