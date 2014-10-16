# Jquery-ui Extended dialog

Provides minimze and maximize options for jquery ui dialog widget by entending it.

## Downloads
 - [For Jquery Ui v1.9.0 +] (https://github.com/CrazyTuna/jquery-extendeddialog/releases)

## Samples
 - [For Jquery Ui v1.9.0 +] (http://crazytuna.github.io/jquery-extendeddialog/)

## API Documentation
[Options](#options) | [Methods](#methods) | [Events](#events)
------------- | ------------- | -------------
[maximizable](#maximizable) | [maximize](#maximize) | [beforeMaximize](#beforemaximizeevent-ui)
[maximizeIcon](#maximizeicon) | [minimize](#minimize) | [beforeMinimize](#beforeminimizeevent-ui)
[maximizeText](#maximizetext) | [restore](#restore) | [beforeRestore](#beforerestoreevent-ui)
[minimizable](#minimizable) || [maximize](#maximizeevent-ui)
[minimizeIcon](#minimizeicon) || [minimize](#minimizeevent-ui)
[minimizeText](#minimizetext) || [restore](#restoreevent-ui)
[resizeOnDlbclick](#resizeondlbclick) ||
[restoreIcon](#restoreicon) ||
[restoreText](#restoretext) ||

## Options

### maximizable
 - Type: boolean
 - Default: true

If set to "true", the dialog will be maximizable by the tittle bar maximize button.

**Code examples:**
Initialize the dialog with the maximizable option specified:

```
$( ".selector" ).dialog({ maximizable: true });
```

Get or set the ```maximizable``` option, after initialization:
```
// getter
var maximizable = $( ".selector" ).dialog( "option", "maximizable" );
 
// setter
$( ".selector" ).dialog( "option", "maximizable", false );
```

### maximizeIcon
 - Type: string
 - Default: ui-icon-extlink

Specifies the icon for the maximize button. Note that the default icon is part of the Jquery UI Framework icons.

**Code examples:**
Initialize the dialog with the maximizeIcon option specified:

```
$( ".selector" ).dialog({ maximizeIcon: 'ui-icon-extlink' });
```

Get or set the ```maximizeIcon``` option, after initialization:
```
// getter
var maximizeIcon = $( ".selector" ).dialog( "option", "maximizeIcon" );
 
// setter
$( ".selector" ).dialog( "option", "maximizeIcon", 'ui-icon-extlink' );
```

### maximizeText ###
 - Type: string
 - Default: maximize

Specifies the text for the maximize button. Note that the maximize text is visibly hidden when using a standard theme.

**Code examples:**
Initialize the dialog with the maximizeText option specified:

```
$( ".selector" ).dialog({ maximizeText: 'maximize' });
```

Get or set the ```maximizeText``` option, after initialization:
```
// getter
var maximizeText = $( ".selector" ).dialog( "option", "maximizeText" );
 
// setter
$( ".selector" ).dialog( "option", "maximizeText", 'maximize' );
```

### minimizable ###
 - Type: boolean
 - Default: true

If set to "true", the dialog will be minimizable by the tittle bar minimize button.

**Code examples:**
Initialize the dialog with the minimizable option specified:

```
$( ".selector" ).dialog({ minimizable: true });
```

Get or set the ```minimizable``` option, after initialization:
```
// getter
var minimizable = $( ".selector" ).dialog( "option", "minimizable" );
 
// setter
$( ".selector" ).dialog( "option", "minimizable", false );
```

### minimizeIcon ###
 - Type: string
 - Default: ui-icon-minus

Specifies the icon for the minimize button. Note that the default icon is part of the Jquery UI Framework icons.

**Code examples:**
Initialize the dialog with the minimizeIcon option specified:

```
$( ".selector" ).dialog({ minimizeIcon: 'ui-icon-minus' });
```

Get or set the ```minimizeIcon``` option, after initialization:
```
// getter
var minimizeIcon = $( ".selector" ).dialog( "option", "minimizeIcon" );
 
// setter
$( ".selector" ).dialog( "option", "minimizeIcon", 'ui-icon-minus' );
```

### minimizeText ###
 - Type: string
 - Default: minimize

Specifies the text for the minimize button. Note that the minimize text is visibly hidden when using a standard theme.

**Code examples:**
Initialize the dialog with the minimizeText option specified:

```
$( ".selector" ).dialog({ minimizeText: 'minimize' });
```

Get or set the ```minimizeText``` option, after initialization:
```
// getter
var minimizeText = $( ".selector" ).dialog( "option", "minimizeText" );
 
// setter
$( ".selector" ).dialog( "option", "minimizeText", 'minimize' );
```

### resizeOnDlbclick ###
 - Type: boolean
 - Default: true

If set to "true", the dialog will be resized by a tittle bar double click.

**Code examples:**
Initialize the dialog with the resizeOnDlbclick option specified:

```
$( ".selector" ).dialog({ resizeOnDlbclick: true });
```

Get or set the ```resizeOnDlbclick``` option, after initialization:
```
// getter
var resizeOnDlbclick = $( ".selector" ).dialog( "option", "resizeOnDlbclick" );
 
// setter
$( ".selector" ).dialog( "option", "resizeOnDlbclick", false );
```

### restoreIcon ###
 - Type: string
 - Default: ui-icon-newwin

Specifies the icon for the restore button. Note that the default icon is part of the Jquery UI Framework icons.

**Code examples:**
Initialize the dialog with the restoreIcon option specified:

```
$( ".selector" ).dialog({ restoreIcon: 'ui-icon-newwin' });
```

Get or set the ```restoreIcon``` option, after initialization:
```
// getter
var restoreIcon = $( ".selector" ).dialog( "option", "restoreIcon" );
 
// setter
$( ".selector" ).dialog( "option", "restoreIcon", 'ui-icon-newwin' );
```

### restoreText ###
 - Type: string
 - Default: restore

Specifies the text for the restore button. Note that the restore text is visibly hidden when using a standard theme.

**Code examples:**
Initialize the dialog with the restoreText option specified:

```
$( ".selector" ).dialog({ restoreText: 'restore' });
```

Get or set the ```restoreText``` option, after initialization:
```
// getter
var restoreText = $( ".selector" ).dialog( "option", "restoreText" );
 
// setter
$( ".selector" ).dialog( "option", "restoreText", 'restore' );
```

## Methods ##
### maximize() ###
 - Returns: jQuery (plugin only)

Maximizes the dialog
 - This method does not accept any arguments.

**Code examples:**
Invoke the maximize method:

```
$( ".selector" ).dialog('maximize');
```

### minimize() ###
 - Returns: jQuery (plugin only)

Minimizes the dialog
 - This method does not accept any arguments.

**Code examples:**
Invoke the minimize method:

```
$( ".selector" ).dialog('minimize');
```

### restore() ###
 - Returns: jQuery (plugin only)

Restores the dialog
 - This method does not accept any arguments.

**Code examples:**
Invoke the restore method:

```
$( ".selector" ).dialog('restore');
```

## Events ##
### beforeMaximize(event, ui) ###
 - Type: extendeddialogbeforemaximize

Triggered when a dialog is about to maximize. If canceled, the dialog will not maximize.
 - event:
  - Type: event
 - ui:
  - Type: Object 

**Code examples:**
Initialize the dialog with the beforeMaximize callback specified:

```
$( ".selector" ).dialog({
  beforeMaximize: function( event, ui ) {}
});
```
Bind an event listener to the extendeddialogbeforemaximize event:

```
$( ".selector" ).on( "extendeddialogbeforemaximize", function( event, ui ) {} );
```

### beforeMinimize(event, ui) ###
 - Type: extendeddialogbeforeminimize

Triggered when a dialog is about to minimize. If canceled, the dialog will not minimize.
 - event:
  - Type: event
 - ui:
  - Type: Object 

**Code examples:**
Initialize the dialog with the beforeMinimize callback specified:

```
$( ".selector" ).dialog({
  beforeMinimize: function( event, ui ) {}
});
```
Bind an event listener to the extendeddialogbeforeminimize event:

```
$( ".selector" ).on( "extendeddialogbeforeminimize", function( event, ui ) {} );
```

### beforeRestore(event, ui) ###
 - Type: extendeddialogbeforerestore

Triggered when a dialog is about to restore. If canceled, the dialog will not restore.
 - event:
  - Type: event
 - ui:
  - Type: Object 

**Code examples:**
Initialize the dialog with the beforeRestore callback specified:

```
$( ".selector" ).dialog({
  beforeRestore: function( event, ui ) {}
});
```
Bind an event listener to the extendeddialogbeforerestore event:

```
$( ".selector" ).on( "extendeddialogbeforerestore", function( event, ui ) {} );
```

### maximize(event, ui) ###
 - Type: extendeddialogmaximize

Triggered when the dialog is maximized.
 - event:
  - Type: event
 - ui:
  - Type: Object 

Note: The ui object is empty but included for consistency with other events.

**Code examples:**
Initialize the dialog with the maximize callback specified:

```
$( ".selector" ).dialog({
  maximize: function( event, ui ) {}
});
```
Bind an event listener to the extendeddialogmaximize event:

```
$( ".selector" ).on( "extendeddialogmaximize", function( event, ui ) {} );
```

### minimize(event, ui) ###
 - Type: extendeddialogminimize

Triggered when the dialog is minimized.
 - event:
  - Type: event
 - ui:
  - Type: Object 

Note: The ui object is empty but included for consistency with other events.

**Code examples:**
Initialize the dialog with the minimize callback specified:

```
$( ".selector" ).dialog({
  minimize: function( event, ui ) {}
});
```
Bind an event listener to the extendeddialogminimize event:

```
$( ".selector" ).on( "extendeddialogminimize", function( event, ui ) {} );
```

### restore(event, ui) ###
 - Type: extendeddialogrestore

Triggered when the dialog is restored.
 - event:
  - Type: event
 - ui:
  - Type: Object 

Note: The ui object is empty but included for consistency with other events.

**Code examples:**
Initialize the dialog with the restore callback specified:

```
$( ".selector" ).dialog({
  restore: function( event, ui ) {}
});
```
Bind an event listener to the extendeddialogrestore event:

```
$( ".selector" ).on( "extendeddialogrestore", function( event, ui ) {} );
```
