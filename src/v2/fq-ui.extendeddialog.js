/**
 * @author Crazy Tuna & Great Salmon
 * powered by @Foreign Quiche
 * version: 1.1.0 - work from Jquery 1.7.0 and Jquery ui 1.10.0
 */
(function ($) {

    $.widget('fq-ui.extendeddialog', $.ui.dialog, {
        version: '1.1.0',
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
            maximizeText: 'maximize',
            minimizable: true,
            minimize: null,
            minimizeIcon: 'ui-icon-minus',
            minimizeLocation: 'left',
            minimizeText: 'minimize',
            resizeOnDlbclick: true,
            restore: null,
            restoreIcon: 'ui-icon-newwin',
            restoreText: 'restore'
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

            this._toggleDblclickEvent();
        },

        _createTitlebar: function () {
            this._super();

            // Get the close button
            this.uiDialogTitlebarClose = this.uiDialogTitlebar.find('.ui-dialog-titlebar-close')
                .addClass('ui-dialog-titlebar-button');

            // Set minimize and maximize options
            this._makeMaximizable(this.options.maximizable);
            this._makeMinimizable(this.options.minimizable);
        },

        _changeIconClass: function (element, iconClass) {
            element.button("option", "icons", { primary: iconClass });
        },

        _changeIconText: function (element, text) {
            element.button("option", "label", text);
        },

        _createButton: function (iconClass, iconText) {
            return $('<button></button>')
                .button({
                    label: iconText,
                    icons: {
                        primary: iconClass
                    },
                    text: false
                })
                .addClass('ui-dialog-titlebar-close ui-dialog-titlebar-button');
        },

        _createRestoreButton: function () {
            if (typeof this.uiDialogTitlebarRestore === 'undefined') {
                this.uiDialogTitlebarRestore = this._createButton(this.options.restoreIcon, this.options.restoreText).hide();
                this._on(this.uiDialogTitlebarRestore, {
                    click: function (event) {
                        event.preventDefault();
                        this.restore(event);
                    }
                });
            }

            if (this.uiDialogTitlebarRestore.parent().length === 0) {
                this.uiDialogTitlebarRestore.appendTo(this.uiDialogTitlebar);
            }
        },

        _makeMaximizable: function (maximizable) {
            if (maximizable) {
                if (typeof this.uiDialogTitlebarMaximize === 'undefined') {
                    this.uiDialogTitlebarMaximize = this._createButton(this.options.maximizeIcon, this.options.maximizeText);

                    this._on(this.uiDialogTitlebarMaximize, {
                        click: function (event) {
                            event.preventDefault();
                            this.maximize(event);
                        }
                    });
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
                    this.uiDialogTitlebarMinimize = this._createButton(this.options.minimizeIcon, this.options.minimizeText);

                    this._on(this.uiDialogTitlebarMinimize, {
                        click: function (event) {
                            event.preventDefault();
                            this.minimize(event);
                        }
                    });
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
            this._super(key, value);

            if (key === 'maximizable') {
                if (!value && this._isMaximize) {
                    this._maximize(false);
                }
                this._makeMaximizable(value);
            }

            if (key === 'maximizeIcon') {
                if (typeof this.uiDialogTitlebarMaximize !== 'undefined') {
                    this._changeIconClass(this.uiDialogTitlebarMaximize, value);
                }
            }
           
            if (key === 'maximizeText') {
                if (typeof this.uiDialogTitlebarMaximize !== 'undefined') {
                    this._changeIconText(this.uiDialogTitlebarMaximize, value);
                }
            }

            if (key === 'minimizable') {
                if (!value && this._isMinimize) {
                    this._minimize(false);
                }
                this._makeMinimizable(value);
            }

            if (key === 'minimizeIcon') {
                if (typeof this.uiDialogTitlebarMinimize !== 'undefined') {
                    this._changeIconClass(this.uiDialogTitlebarMinimize, value);
                }
            }

            if (key === 'minimizeText') {
                if (typeof this.uiDialogTitlebarMinimize !== 'undefined') {
                    this._changeIconText(this.uiDialogTitlebarMinimize, value);
                }
            }

            if (key === 'resizeOnDlbclick') {
                this._toggleDblclickEvent();
            }

            if (key === 'restoreIcon') {
                if (typeof this.uiDialogTitlebarRestore !== 'undefined') {
                    this._changeIconClass(this.uiDialogTitlebarRestore, value);
                }
            }

            if (key === 'restoreText') {
                if (typeof this.uiDialogTitlebarRestore !== 'undefined') {
                    this._changeIconText(this.uiDialogTitlebarRestore, value);
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
