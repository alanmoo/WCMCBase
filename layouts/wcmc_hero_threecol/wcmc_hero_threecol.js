(function($){
  $(document).ready(function() {
    if(!Modernizr.csspositionsticky){
      //MoveScroller is in wcmcbase theme script.js
      wcmc_layout_functions.moveScroller("#information-sidebar", "#main-content", "footer");
    }
    //Duplicates the related-content sidebar contents into an area below the fold for smaller screens
    $("#related-content-sidebar").find(".panel-pane").clone().appendTo("#related-content-inline");
  });
})(jQuery);