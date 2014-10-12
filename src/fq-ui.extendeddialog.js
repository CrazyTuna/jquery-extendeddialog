/**
 * @author Crazy Tuna & Great Salmon
 * powered by @Foreign Quiche
 * version: 1.0.0 - work from Jquery 1.7.0 and Jquery ui 1.9.0
 */
(function ($) {

    $.widget('fq-ui.extendeddialog', $.ui.dialog, {
        version: '1.0.0',
        defaults: {
            fixedContainer: undefined
        },
        options: {
            beforeMaximize: null,
            beforeMinimize: null,
            beforeRestore: null,
            maximizable: true,
            maximize: null,
            maximizeIcon: 'ui-icon-extlink',
            maximizeText: 'Maximize',
            minimizable: true,
            minimize: null,
            minimizeIcon: 'ui-icon-minus',
            minimizeLocation: 'left',
            minimizeText: 'Minimize',
            resizeOnDlbclick: true,
            restore: null,
            restoreIcon: 'ui-icon-newwin',
            restoreText: 'Restore'
        },

        _create: function () {
            this._super();
            this._isMinimize = false;
            this._isMaximize = false;

            // Get de minimize container
            if ($('#dialog-extend-fixed-container').length == 1) {
                this.defaults.fixedContainer = $('#dialog-extend-fixed-container');
            } else {
                this.defaults.fixedContainer = $('<div id="dialog-extend-fixed-container"></div>').appendTo('body');
            }

            // Add default class to the wrapper
            this.uiDialog.addClass('ui-dialog-extended');
            this._setMinimizeLocation();

            // Get the close button
            this.uiDialogTitlebarClose = this.uiDialogTitlebar.find('.ui-dialog-titlebar-close')
                .addClass('ui-dialog-titlebar-button');

            // Set minimize and maximize options
            this._makeMaximizable(this.options.maximizable);
            this._makeMinimizable(this.options.minimizable);

            this._toggleDblclickEvent();
        },

        _changeIconClass: function (element, oldClass, iconClass) {
            element.removeClass(oldClass)
                .addClass(iconClass);
        },

        _changeIconText: function (element, text) {
            element.text(text);
        },

        _createButton: function () {
            return $('<a href="#"></a>')
                .addClass('ui-dialog-titlebar-close ui-corner-all ui-dialog-titlebar-button')
                .attr('role', 'button');
        },

        _createRestoreButton: function () {
            var that = this;
            if (typeof this.uiDialogTitlebarRestore === 'undefined') {
                this.uiDialogTitlebarRestore = this._createButton()
                    .hide().on('click', function (event) {
                        event.preventDefault();
                        that.restore(event);
                    });

                this.uiDialogTitlebarRestoreText = this._createIcon(this.options.restoreIcon, this.options.restoreText)
                    .appendTo(this.uiDialogTitlebarRestore);

                this._hoverable(this.uiDialogTitlebarRestore);
                this._focusable(this.uiDialogTitlebarRestore);
            }

            if (this.uiDialogTitlebarRestore.parent().length === 0) {
                this.uiDialogTitlebarRestore.appendTo(this.uiDialogTitlebar);
            }
        },

        _createIcon: function (iconClass, iconText) {
            return $('<span>')
                .addClass('ui-icon')
                .addClass(iconClass)
                .text(iconText);
        },

        _makeMaximizable: function (maximizable) {
            var that = this;
            if (maximizable) {
                if (typeof this.uiDialogTitlebarMaximize === 'undefined') {
                    this.uiDialogTitlebarMaximize = this._createButton().on('click', function (event) {
                        event.preventDefault();
                        that.maximize(event);
                    });

                    this.uiDialogTitlebarMaximizeText = this._createIcon(this.options.maximizeIcon, this.options.maximizeText)
                        .appendTo(this.uiDialogTitlebarMaximize);

                    this._hoverable(this.uiDialogTitlebarMaximize);
                    this._focusable(this.uiDialogTitlebarMaximize);
                }

                this.uiDialogTitlebarClose.after(this.uiDialogTitlebarMaximize);
                this._createRestoreButton();
            } else {
                if (typeof this.uiDialogTitlebarMaximize !== 'undefined') {
                    this.uiDialogTitlebarMaximize.detach();
                }

                if (!this.options.minimizable && typeof this.uiDialogTitlebarRestore !== 'undefined') {
                    this.uiDialogTitlebarRestore.detach();
                }
            }
        },

        _makeMinimizable: function (minimizable) {
            var that = this;
            if (minimizable) {
                this._createRestoreButton();
                if (typeof this.uiDialogTitlebarMinimize === 'undefined') {
                    this.uiDialogTitlebarMinimize = this._createButton().on('click', function (event) {
                        event.preventDefault();
                        that.minimize(event);
                    });

                    this.uiDialogTitlebarMinimizeText = this._createIcon(this.options.minimizeIcon, this.options.minimizeText)
                        .appendTo(this.uiDialogTitlebarMinimize);

                    this._hoverable(this.uiDialogTitlebarMinimize);
                    this._focusable(this.uiDialogTitlebarMinimize);
                }

                this.uiDialogTitlebarMinimize.appendTo(this.uiDialogTitlebar);
            } else {
                if (typeof this.uiDialogTitlebarMinimize !== 'undefined') {
                    this.uiDialogTitlebarMinimize.detach();
                }

                if (!this.options.maximizable && typeof this.uiDialogTitlebarRestore !== 'undefined') {
                    this.uiDialogTitlebarRestore.detach();
                }
            }
        },

        _maximize: function (maximize) {
            if (maximize) {
                if (this.options.draggable && $.fn.draggable) {
                    this.uiDialog.draggable('disable');
                }

                if (this.options.resizable && $.fn.resizable) {
                    this.uiDialog.resizable('disable');
                }

                this.uiDialog.addClass('ui-dialog-maximize');

                var zIndex = this.uiDialog.zIndex();
                $('.ui-dialog-maximize').each(function () {
                    var $zIndex = $(this).zIndex();
                    if ($zIndex > zIndex) {
                        zIndex = $zIndex + 1;
                    }
                });

                //To set element height
                var offsetWidthDialog = this.uiDialog.outerWidth(true) - this.uiDialog.width();
                this.uiDialog.css({
                    'width': ($(window).width() - offsetWidthDialog) + 'px',
                    'height': 'auto',
                    'top': 0,
                    'left': 0,
                    'z-index': zIndex
                });

                var offsetHeightElement = this.element.outerHeight(true) - this.element.height();
                var offsetHeightDialog = this.uiDialog.outerHeight(true) - this.uiDialog.height();
                this.element.css('height', ($(window).height() - this.uiDialogTitlebar.outerHeight(true) - this.uiDialogButtonPane.outerHeight(true) - offsetHeightElement - offsetHeightDialog) + 'px');

                this._hide(this.uiDialogTitlebarMaximize);
                this._show(this.uiDialogTitlebarRestore);

            } else {
                if (this.options.draggable && $.fn.draggable) {
                    this.uiDialog.draggable('enable');
                }

                if (this.options.resizable && $.fn.resizable) {
                    this.uiDialog.resizable('enable');
                }

                this.uiDialog.removeClass('ui-dialog-maximize');

                this._size();
                this._position();

                this._hide(this.uiDialogTitlebarRestore);
                this._show(this.uiDialogTitlebarMaximize);
            }

            this._isMaximize = maximize;
        },

        _minimize: function (minimize) {
            if (minimize) {
                if (this.options.draggable && $.fn.draggable) {
                    this.uiDialog.draggable('disable');
                }

                if (this.options.resizable && $.fn.resizable) {
                    this.uiDialog.resizable('disable');
                }

                this._focusedElement = null;
                this.uiDialog.appendTo(this.defaults.fixedContainer);
                this._hide(this.uiDialogTitlebarMinimize);
                this._show(this.uiDialogTitlebarRestore);                

            } else {
                if (this.options.draggable && $.fn.draggable) {
                    this.uiDialog.draggable('enable');
                }

                if (this.options.resizable && $.fn.resizable) {
                    this.uiDialog.resizable('enable');
                }

                this._hide(this.uiDialogTitlebarRestore);
                this._show(this.uiDialogTitlebarMinimize);
                this.uiDialog.appendTo('body');

            }

            this._isMinimize = minimize;
        },

        _setMinimizeLocation: function () {
            this.uiDialog.removeClass('left').removeClass('right')
               .addClass(this.options.minimizeLocation);
        },

        _setOption: function (key, value) {
            if (key === 'maximizeIcon') {
                if (typeof this.uiDialogTitlebarMaximizeText !== 'undefined') {
                    this._changeIconClass(this.uiDialogTitlebarMaximizeText, this.options.maximizeIcon, value);
                }
            }

            if (key === 'minimizeIcon') {
                if (typeof this.uiDialogTitlebarMinimizeText !== 'undefined') {
                    this._changeIconClass(this.uiDialogTitlebarMinimizeText, this.options.minimizeIcon, value);
                }
            }

            if (key === 'restoreIcon') {
                if (typeof this.uiDialogTitlebarRestoreText !== 'undefined') {
                    this._changeIconClass(this.uiDialogTitlebarRestoreText, this.options.restoreIcon, value);
                }
            }

            this._super(key, value);

            if (key === 'maximizable') {
                if (!value && this._isMaximize) {
                    this._maximize(false);
                }
                this._makeMaximizable(value);
            }

            if (key === 'maximizeText') {
                if (typeof this.uiDialogTitlebarMaximizeText !== 'undefined') {
                    this._changeIconText(this.uiDialogTitlebarMaximizeText, value);
                }
            }

            if (key === 'minimizable') {
                if (!value && this._isMinimize) {
                    this._minimize(false);
                }
                this._makeMinimizable(value);
            }

            if (key === 'minimizeText') {
                if (typeof this.uiDialogTitlebarMinimizeText !== 'undefined') {
                    this._changeIconText(this.uiDialogTitlebarMinimizeText, value);
                }
            }

            if (key === 'resizeOnDlbclick') {
                this._toggleDblclickEvent();
            }

            if (key === 'restoreText') {
                if (typeof this.uiDialogTitlebarRestoreText !== 'undefined') {
                    this._changeIconText(this.uiDialogTitlebarRestoreText, value);
                }
            }

            if (key === 'minimizeLocation') {
                this._setMinimizeLocation();
            }
        },

        _toggleDblclickEvent: function () {
            var that = this;
            this.uiDialogTitlebar.off('dblclick');
            if (this.options.resizeOnDlbclick && (this.options.maximizable || this.options.minimizable)) {
                this.uiDialogTitlebar.on('dblclick', function (event) {
                    event.preventDefault();
                    if (that._isMaximize) {
                        that.restore(event);
                    } else if (that._isMinimize) {
                        if (that.lastState == 'maximize') {
                            that.maximize(event);
                        } else {
                            that.restore(event);
                        }
                        
                    } else {
                        that.maximize(event);
                    }
                });
            }
        },

        isMaximize: function () {
            return this._isMaximize;
        },

        isMinimize: function () {
            return this._isMinimize;
        },

        maximize: function (event) {
            if (!this._isOpen) {
                this._show(this.uiDialog);
                this._isOpen = true;
            }

            if (!this.options.maximizable || this._isMaximize || this._trigger('beforeMaximize', event) === false) {
                return;
            }

            this._show(this.uiDialog);

            this.lastState = null;
            if (this._isMinimize) {
                this.lastState = 'minimize';
                this._minimize(false);
            }

            this._maximize(true);
            this._trigger('maximize', event);
        },

        minimize: function (event) {
            if (!this._isOpen) {
                this._show(this.uiDialog);
                this._isOpen = true;
            }

            if (!this.options.minimizable || this._isMinimize || this._trigger('beforeMinimize', event) === false) {
                return;
            }

            this.lastState = null;
            if (this._isMaximize) {
                this.lastState = 'maximize';
                this._maximize(false);
            }

            this._minimize(true);

            this._trigger('minimize', event);
        },

        open: function () {
            if (this._isMinimize) {
                this._minimize(false);
            } else if (this._isMaximize) {
                this._maximize(false);
            }
            this.lastState = null;
            this._super();
        },

        restore: function (event) {
            if (this._trigger('beforeRestore', event) === false) {
                return;
            }

            this.open();
            this._trigger('restore', event);
        }
    });
})(jQuery);
