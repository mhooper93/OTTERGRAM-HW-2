var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var BACK_BUTTON_SELECTOR = '[data-button-title="previous"]';
var FORWARD_BUTTON_SELECTOR = '[data-button-title="next"]'

var currImagURL = '[data-image-role="target"]';
var isClicked = false;

/******* functions ********/


// change the detail image and the detail image title
function setDetails(imageUrl, titleText) {
  // tells the browser that my function conform to the most recent standard
  // version of JavaScript always insert at beginning of functions
  'use strict';

  isClicked = true;
  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  detailImage.setAttribute('src', imageUrl);
  var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
  detailTitle.textContent = titleText;
}

// will retrieve and return the value of the data-image-url attribute
function imageFromThumb(thumbnail) {
  'use strict';
  currImagURL = thumbnail.getAttribute('data-image-url');
  //console.log(currImagURL);

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

  //forward button handler
  document.querySelector(FORWARD_BUTTON_SELECTOR).addEventListener('click', function (event){
    event.preventDefault();
    if (isClicked == false){
      setDetailsFromThumb(arr[1]);
    }
    else{
      console.log("starting loop...");
      for(var i=0; i < arr.length; i++){
        console.log(arr[i].getAttribute('data-image-url') + " == " + currImagURL);
        if(arr[i].getAttribute('data-image-url') == currImagURL){
          if (i==6) {
            setDetailsFromThumb(arr[0]);
            console.log("wrapping around...");
          } else {
            setDetailsFromThumb(arr[i+1]);
          }
          console.log("i is " + i);
          break;
        }
      }
    }
  });

  //back button handler
  document.querySelector(BACK_BUTTON_SELECTOR).addEventListener('click', function (event){
    event.preventDefault();
    if (isClicked == false){
      setDetailsFromThumb(arr[6]);
    }
    else{
      for(var i=0; i < arr.length; i++){
        if(arr[i].getAttribute('data-image-url') == currImagURL){
          if (i==0) {
            setDetailsFromThumb(arr[6]);
          } else {
            setDetailsFromThumb(arr[i-1]);
          }
          console.log("i is " + i);
          break;
        }
      }
    }
  });
}


// adds the click handler to each thumbnail in the array
function initializeEvents() {
  'use strict';
  var thumbnails = getThumbnailsArray();
  thumbnails.forEach(addThumbClickHandler);
  addArrowClickHandler(thumbnails);
}

// calling this function to action to make ottergram interactive
initializeEvents();
