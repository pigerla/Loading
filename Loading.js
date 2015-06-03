/**
 * Created by spy on 15-6-2.
 */

// create a closure to wrap our code
;(function(){

  // Define our constructor
  this.Loading = function () {

    // Create global element reference
    this.loading = null;
    this.overlay = null;
    this.styleSheet = null;

    // Define option defaults
    var defaults = {
      className: '',
      content: '',
      overlay: true
    };

    // Create options by extending defaults with the passed in arguments
    if (arguments[0] && typeof arguments[0] === 'object') {
      this.options = extendDefaults(defaults, arguments[0]);
    } else {
      this.options = defaults;
    }

  };

  // Public Methods
  Loading.prototype.show = function () {
    // Build out our loading
    buildOut.call(this);

    // InitializeEvent our event listeners
    initializeEvents.call(this);

    this.loading.className = this.loading.className + ' loading-show';
    if (this.overlay) {
      this.overlay.className = this.overlay.className + " loading-show";
    }
  };

  // Close loading
  Loading.prototype.hide = function () {
    // Store the value of this
    var _ = this ;

    // Remove the open class name
    this.loading.className = this.loading.className.replace(' loading-show', '');
    /*
     * Listen for CSS transitionend event and then
     * Remove the nodes from the DOM
     */
    _.loading.parentNode.removeChild(_.loading);
    _.overlay.parentNode.removeChild(_.overlay);
    document.head.removeChild(_.styleSheet);

  };

  // Building a Loading
  function buildOut () {
    var content, contentHolder, docFrag;

    var styleString = styleStr();
    this.styleSheet = document.createElement('style');
    this.styleSheet.type = 'text/css';

    if(this.styleSheet.styleSheet){
      this.styleSheet.styleSheet.cssText = styleString;
    }else{
      this.styleSheet.appendChild(document.createTextNode(styleString));
    }
    document.head.appendChild(this.styleSheet);
    /*
     * If content is an HTML string, append the HTML string.
     * If content is a domNode, append its content.
     */
    if (typeof this.options.content === 'string') {
      content = this.options.content;
    } else {
      content = this.options.content.innerHTML;
    }

    // Create a DocumentFragment to build with
    docFrag = document.createDocumentFragment();

    // Create loading element
    this.loading = document.createElement('div');
    this.loading.className = 'Loading ' + this.options.className;

    // If overlay is true, add one
    if (this.options.overlay === true) {
      this.overlay = document.createElement('div');
      this.overlay.className = 'Loading-overlay ' + this.options.className;
      docFrag.appendChild(this.overlay);
    }

    // Create content area and append to loading
    contentHolder = document.createElement('div');
    contentHolder.className = 'Loading-content';
    contentHolder.innerHTML = this.options.content === '' ? '<div class="circle">' : content;
    this.loading.appendChild(contentHolder);

    // Append loading to DocumentFragment
    docFrag.appendChild(this.loading);

    // Append DocumentFragment to body
    document.body.appendChild(docFrag);

  }

  // Utility method to extend defaults with user options
  function extendDefaults (source, properties) {
    var property;
    for (property in properties) {
      if ( source.hasOwnProperty( property ) ) {
        source[property] = properties[property];
      }
    }
    return source;
  }

  function initializeEvents () {
    if (this.overlay) {
      this.overlay.addEventListener('click', this.hide.bind(this));
    } else {
      this.loading.addEventListener('click', this.hide.bind(this));
    }
  }

  function styleStr () {
    return '@-webkit-keyframes spin {100% {-webkit-transform: rotate(360deg);-o-transform: rotate(360deg);-moz-transform: rotate(360deg);transform: rotate(360deg);}}@keyframes spin {100% {-webkit-transform: rotate(360deg);-o-transform: rotate(360deg);-moz-transform: rotate(360deg);transform: rotate(360deg);}}.circle { width: 50px;height: 50px;border-radius: 50%;-webkit-box-sizing: border-box; -o-box-sizing: border-box;box-sizing: border-box;border: solid 5px #ddd;border-top-color: #99aa33;-webkit-animation: spin 1s infinite linear;}.Loading-overlay{position: fixed;z-index: 9998;top: 0;left: 0;display: none;width: 100%;height: 100%;background: rgba(0,0,0,.4);}.Loading{position: absolute; z-index: 9999;top: 50%;left: 50%;display: none; -webkit-transform: translate(-50%, -50%);-moz-transform: translate(-50%, -50%);-ms-transform: translate(-50%, -50%);-o-transform: translate(-50%, -50%);transform: translate(-50%, -50%); background: transparent;}.Loading.loading-show{display: block;}.Loading-overlay.loading-show{display: block;}';
  }


}());

