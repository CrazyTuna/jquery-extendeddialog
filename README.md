# Jquery-ui Extended dialog

Provides minimze and maximize options for jquery ui dialog widget by entending it.

## Downloads
 - For Jquery Ui v1.10.0 + (Coming soon)
 - [For Jquery Ui v1.9.0 +] (https://github.com/CrazyTuna/jquery-extendeddialog/releases)

## Samples
 - For Jquery Ui v1.10.0 + (Coming soon)
 - [For Jquery Ui v1.9.0 +] (http://crazytuna.github.io/jquery-extendeddialog/)

## API Documentation
[Options](#options) | [Methods](#methods) | [Events](#events)
------------- | ------------- | -------------
[maximizable](#maximizable) | [maximize](#maximize) | [beforeMaximize](#beforemaximize)
[maximizeIcon](#maximizeIcon) | [minimize](#minimize) | [beforeMinimize](#beforeminimize)
[maximizeText](#maximizeText) | [restore](#restore) | [beforeRestore](#beforerestore)
[minimizable](#minimizable) || [maximize](#maximize-1)
[minimizeIcon](#minimizeIcon) || [minimize](#minimize-1)
[minimizeText](#minimizeText) || [restore](#restore-1)
[resizeOnDlbclick](#resizeOnDlbclick) ||
[restoreIcon](#restoreIcon) ||
[restoreText](#restoreText) ||

## Options

### maximizable
 - Type: boolean
 - Default: true

If set to "true", the dialog will be maximizable by the tittle bar maximize button.

### maximizeIcon
 - Type: string
 - Default: ui-icon-extlink

Specifies the icon for the maximize button. Note that the default icon is part of the Jquery UI Framework icons.

### maximizeText ###
 - Type: string
 - Default: maximize

Specifies the text for the maximize button. Note that the maximize text is visibly hidden when using a standard theme.

### minimizable ###
 - Type: boolean
 - Default: true

If set to "true", the dialog will be minimizable by the tittle bar minimize button.

### minimizeIcon ###
 - Type: string
 - Default: ui-icon-minus

Specifies the icon for the minimize button. Note that the default icon is part of the Jquery UI Framework icons.

### minimizeText ###
 - Type: string
 - Default: minimize

Specifies the text for the minimize button. Note that the minimize text is visibly hidden when using a standard theme.

### resizeOnDlbclick ###
 - Type: boolean
 - Default: true

If set to "true", the dialog will be resized by a tittle bar double click.

### restoreIcon ###
 - Type: string
 - Default: ui-icon-newwin

Specifies the icon for the restore button. Note that the default icon is part of the Jquery UI Framework icons.

### restoreText ###
 - Type: string
 - Default: restore

Specifies the text for the restore button. Note that the restore text is visibly hidden when using a standard theme.

## Methods ##
### maximize() ###
 - Returns: jQuery (plugin only)

Maximizes the dialog
 - This method does not accept any arguments.

### minimize() ###
 - Returns: jQuery (plugin only)

Minimizes the dialog
 - This method does not accept any arguments.

### restore() ###
 - Returns: jQuery (plugin only)

Restores the dialog
 - This method does not accept any arguments.

## Events ##
### beforeMaximize(event, ui) ###
 - Type: extendeddialogbeforemaximize

Triggered when a dialog is about to maximize. If canceled, the dialog will not maximize.
 - event:
  - Type: event
 - ui:
  - Type: Object 

### beforeMinimize(event, ui) ###
 - Type: extendeddialogbeforeminimize

Triggered when a dialog is about to minimize. If canceled, the dialog will not minimize.
 - event:
  - Type: event
 - ui:
  - Type: Object 

### beforeRestore(event, ui) ###
 - Type: extendeddialogbeforerestore

Triggered when a dialog is about to restore. If canceled, the dialog will not restore.
 - event:
  - Type: event
 - ui:
  - Type: Object 

### maximize(event, ui) ###
 - Type: extendeddialogmaximize

Triggered when the dialog is maximized.
 - event:
  - Type: event
 - ui:
  - Type: Object 

Note: The ui object is empty but included for consistency with other events.

### minimize(event, ui) ###
 - Type: extendeddialogminimize

Triggered when the dialog is minimized.
 - event:
  - Type: event
 - ui:
  - Type: Object 

Note: The ui object is empty but included for consistency with other events.

### restore(event, ui) ###
 - Type: extendeddialogrestore

Triggered when the dialog is restored.
 - event:
  - Type: event
 - ui:
  - Type: Object 

Note: The ui object is empty but included for consistency with other events.
