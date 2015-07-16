# edilastic
---
### What is it ?
**[AngularJS plugin](http://angularjs.org/) :** Use to easily edit your content by switching between ```<div> <span>``` (etc...) and ```<input> or <textarea>```

### How to use ?
1. Add to your module dependency ```var app = angular.module('myApp', ['edilastic'])```
2. Markup your DOM element ```<h1 edilastic="mymodel" onconfirm="confirm(mymodel)">```
3. Enjoy ! click on your DOM element and modify (see [example folder](https://github.com/kamiky/edilastic/tree/master/example))

### Customize
You can modify default settings by 2 ways : 
- adding new attributs to your element ```<div edilastic="content" type="textarea">{{content}}</div>```
- passing a javascript object through the attribut _options_
```
$scope.settings = {
	type:"textarea",
	shut:"button",
	clone:"false",
	textareaTemplate:"<textarea class=\"edilastic-custom\"></textarea>",
};

<div edilastic="content" options="{{settings}}" shut="window"></div>
```
in this example, **shut** is indicated twice, the attribut element got the priority over the settings object

### Configuration
**Some parameters are only accessible through attributs, some others only through options**
- **edilastic : scope model (required)**  
```attrs only```  
the scope model used by the directive to read / modify its content

- **type : "input" (default) / "textarea"**  
```attrs / options```  
switch your DOM element into input or textarea

- **tid : default null**  
```attrs / options```  
define the input/textarea id  

- **shut : "window" (default) / "button"**  
```attrs / options```  
Define the close method : "window" will simply switch back from edilastic input to your element on each outside window click.  
it also proccess to the confirm feature (updating the scope model) or cancel feature if no modification was made.
"button" will append a confirm & cancel button next to the element.  

- **external : default null [String/Array]**  
```attrs / options```  
using shut = "window", it can be usefull to avoid closing the input/textarea when clicking external element(s) :
external property is a String or Array of id.  

- **elastic : true (default) / false**  
```attrs / options```  
enable/disable auto resize when typing. (only available with textarea)  

- **clone : true(default) / false**
```attrs / options```
copy the original element's class names to the edilastic input/textarea

- **onconfirm, onopen, onclose : default null [Function]**  
``` attrs only```  
call the defined function on each evenements  

### Templating (only available through JS object options)
```
{
    // only if "shut" == "button"
    confirmTemplate:"<button type=\"button\" class=\"btn-edilastic btn-confirm\">Confirm</button>",
    cancelTemplate:"<button type=\"button\" class=\"btn-edilastic btn-cancel\">Cancel</button>",

    textareaTemplate:"<textarea class=\"edilastic-open\"></textarea>",
    inputTemplate:"<input class=\"edilastic-open\"/>"
}
```

