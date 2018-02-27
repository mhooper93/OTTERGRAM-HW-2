var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var BACK_BUTTON_SELECTOR = '[data-button-title="previous"]';
var FORWARD_BUTTON_SELECTOR = '[data-button-title="next"]'
var curr = 0;
var prev = 6;
var next = 1;
// change the detail image and the detail image title
function setDetails(imageUrl, titleText) {
  // tells the browser that my function conform to the most recent standard
  // version of JavaScript always insert at beginning of functions
  'use strict';

  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  detailImage.setAttribute('src', imageUrl);
  var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
  detailTitle.textContent = titleText;
}

// will retrieve and return the value of the data-image-url attribute
function imageFromThumb(thumbnail) {
  'use strict';
  return thumbnail.getAttribute('data-image-url');
}

// will return the value of the data-image-title attribute
function titleFromThumb(thumbnail) {
  'use strict';
  return thumbnail.getAttribute('data-image-title');
}

// combines all three previous functions to set details of the image shown
function setDetailsFromThumb(thumbnail) {
  'use strict';
  setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}


function addThumbClickHandler(thumb){
  'use strict';
  thumb.addEventListener('click', function (event) {
    event.preventDefault();
    setDetailsFromThumb(thumb);
  });
}

// retrieves all matching elements for THUMBNAIL_LINK_SELECTOR and assigns
// the result to a thumbnails variable
function getThumbnailsArray() {
  'use strict';
  var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);

  //converts a nodelist to an array
  // **RECALL** Methods that return lists of elements do not return arrays
  // Instead, they return NodeLists. that is why we have to do this conversion
  var thumbnailArray = [].slice.call(thumbnails);
  return thumbnailArray;
}

// makes the arrows interactive
function addArrowClickHandler(arr){
  'use strict';
  FORWARD_BUTTON_SELECTOR.addEventListener('click', function (event){
    event.preventDefault();
    // change variables, curr, prev, and next and call setDetails
    if (curr == 0){
      prev = 0;
      curr ++;
      next ++;
      setDetailsFromThumb(arr[curr]);
    }
    else if(curr == 6){
      prev = 6;
      curr = 0;
      next = 1;
      setDetailsFromThumb(arr[curr]);
    }
    else{
      prev ++;
      curr ++;
      next ++;
      setDetailsFromThumb(arr[curr]);
    }
  });
  BACK_BUTTON_SELECTOR.addEventListener('click', function (event){
    event.preventDefault();
    // change variables, curr, prev, and next and call setDetails
    if (curr == 0){
      prev = 5;
      curr = 6;
      next = 0;
      setDetailsFromThumb(arr[curr]);
    }
    else if(curr == 6){
      prev = 4;
      curr = 5;
      next = 6;
      setDetailsFromThumb(arr[curr]);
    }
    else{
      prev --;
      curr --;
      next --;
      setDetailsFromThumb(arr[curr]);
    }
  });
}


// adds the click handler to each thumbnail in the array
function initializeEvents() {
  'use strict';
  var thumbnails = getThumbnailsArray();
  thumbnails.forEach(addThumbClickHandler);
  //addArrowClickHandler(thumbnails);
}

// calling this function to action to make ottergram interactive
initializeEvents();
