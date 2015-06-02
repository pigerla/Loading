/**
 * Created by spy on 15-6-2.
 */

// create a closure to wrap our code
;(function(){

  // Define our constructor
  this.Loading = function () {

    // Create global element reference
    this.loading = null;

    // Define option defaults
    var defaults = {
      className: 'fade-in',
      content: '',
      maxWidth: 50,
      maxHeight: 50
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
//    this.loading.addEventListener(this.transitionEnd, function() {
    _.loading.parentNode.removeChild(_.loading);
//    });

  };



  // Utility method to extend defaults with user options
  function extendDefaults (source, properties) {
    var property;
    for (property in properties) {
      if ( source.hasOwnProperty( property ) ) {
        source[property] = properties[property];
      }
    }
    console.log('source:',source);
    return source;
  }

  // Building a Loading
  function buildOut () {
    var content, contentHolder, docFrag;
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
    this.loading.style.maxWidth = this.options.maxWidth + 'px';
    this.loading.style.maxHeight = this.options.maxHeight + 'px';

    // Create content area and append to loading
    contentHolder = document.createElement('div');
    if (this.options.content) {
      contentHolder.className = 'Loading-content';
      contentHolder.innerHTML = content;
    } else {
      contentHolder.className =  'circle';
      contentHolder.innerHTML = '';
    }
    this.loading.appendChild(contentHolder);

    // Append loading to DocumentFragment
    docFrag.appendChild(this.loading);

    // Append DocumentFragment to body
    document.body.appendChild(docFrag);

  }

  function initializeEvents () {
    this.loading.addEventListener('click', this.hide.bind(this));
  }

}());

