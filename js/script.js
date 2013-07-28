//Written by Alan Mooiman, April 2013.
//General algorithm is that when an item is clicked on to be opened, its closing function is added to
//the 'open_elements' queue. When escape is pressed, body is clicked, or another openable element is clicked
//a function runs to check what needs to be closed and acts on it. There's a lot of edge cases based around
//screen resizing, so that's why I check the size and run .removeAttr("style") frequently, as the stylesheet
//needs to be effective. I wanted to stay away from using a window.onresize function for performance reasons.

//Tell JSLint that Modernizr is already included
/*global bootstrap:true, Modernizr:true */

(function ($){
    var deviceCheck = {
        eventCheck: function(){
            if ("ontouchstart" in document.documentElement)
            {
                return "touchstart";
            } else{
                return "click";
            }
        },
        eventTrigger: ''
    };
    var settings = {
        breakpoint1: 600,
        breakpoint2: 985,
        globalNav: '.wcmc-links',
        globalFunctions: '.global-functions-container',
        emblem: '.wcmc-emblem',
        globalNavTrigger: '.wcmc-links-expander, .wcmc-emblem',
        menuButton: '.menu-button',
        mobileLevel2Expander: '.expand-menu',
        primaryNav: '#primary-nav',
        secondLevelNav: '#active-second-level-nav',
        thirdLevelNav: '#active-third-level-nav',
        bodyNav: '#mobile-sub-nav',
        primaryNavElements: '.level-1',
        topNav: '#top-nav',
        bodyNavItems: '#body-nav li',
        globalSearch: '.global-search',
        drawer: '#drawer-nav'
    };
    var wcmc_header = {

        init: function() {
            deviceCheck.eventTrigger = deviceCheck.eventCheck();
            wcmc_header.$drawer = $(settings.drawer);
            wcmc_header.globalSearch = settings.globalSearch;
            // wcmc_header.$bodyNavItems = $(settings.bodyNavItems);
            wcmc_header.$topNav = $(settings.topNav);
            wcmc_header.primaryNavElements = settings.primaryNavElements;
            wcmc_header.$thirdLevelNav = $(settings.thirdLevelNav);
            // wcmc_header.$bodyNav = $(settings.bodyNav);
            wcmc_header.$secondLevelNav = $(settings.secondLevelNav);
            wcmc_header.$primaryNav = $(settings.primaryNav);
            wcmc_header.$document = $(document);
            wcmc_header.$mobileLevel2Expander = $(settings.mobileLevel2Expander);
            wcmc_header.$menuButton = $(settings.menuButton);
            wcmc_header.$globalNavTrigger = $(settings.globalNavTrigger);
            wcmc_header.$body = $('body');
            wcmc_header.$emblem = $(settings.emblem);
            wcmc_header.$globalFunctions = $(settings.globalFunctions);
            wcmc_header.$globalNav = $(settings.globalNav);
            wcmc_header.breakpoint1 = settings.breakpoint1;
            wcmc_header.breakpoint2 = settings.breakpoint2;
            // wcmc_header.$secondAndThirdNavs = wcmc_header.$secondLevelNav.add(wcmc_header.$thirdLevelNav);

            this.bindUIActions();
            this.watch_for_escape();
        },

        open_elements: [],
        bindUIActions: function() {
            $("#mobile-sub-nav a").on(deviceCheck.eventTrigger, function(){event.stopPropagation();});
            wcmc_header.$globalNavTrigger.on(deviceCheck.eventTrigger, this.show_global_nav);
            wcmc_header.$menuButton.on(deviceCheck.eventTrigger, this.show_mobile_nav);
            wcmc_header.$mobileLevel2Expander.on(deviceCheck.eventTrigger, this.toggle_mobile_drawer_nav);
            wcmc_header.$primaryNav.on(deviceCheck.eventTrigger, '.level-1', this.toggle_level2);
            var secondLevelString = settings.secondLevelNav + ' li';
            wcmc_header.$topNav.on(deviceCheck.eventTrigger, secondLevelString, this.second_level_nav_open);
            $('#mobile-sub-nav').on(deviceCheck.eventTrigger, this.show_interior_nav);
            wcmc_header.$topNav.find(settings.globalSearch).on(deviceCheck.eventTrigger, wcmc_header.stopProp);
            wcmc_header.$drawer.find('a').on(deviceCheck.eventTrigger, wcmc_header.stopProp);
            $("#active-second-level-nav li a").not(".active-trail").on(deviceCheck.eventTrigger, wcmc_header.stopProp);
        },

        stopProp: function(event){
            event.stopPropagation();
        },
        watch_for_escape: function(event){
            $(document).on({
                keydown: function(event){
                    if (event.keyCode === 27) {
                        wcmc_header.closeEverything();
                    }
                },
                touchstart: function(event){
                    // wcmc_header.closeEverything();
                    return;
                },
                click: function(event){
                    if(deviceCheck.eventTrigger==="click"){
                        wcmc_header.closeEverything();
                    }
                }
            });
        },

        closeEverything: function(){
            if(wcmc_header.open_elements.length > 0){
                var fn= wcmc_header.open_elements.shift();
                fn();
                return fn;
            }
        },
        show_global_nav: function(event){
            event.stopPropagation();
            //Prevent event with IE support, removed when disabling emblem from being link
             if (event.preventDefault) { event.preventDefault(); } else { event.returnValue = false; }

            var justClosed = wcmc_header.closeEverything();
            if (justClosed === wcmc_header.hide_desktop_global_nav){
                if(wcmc_header.$document.width() >= wcmc_header.breakpoint2 ){
                    return;
                }
            } else if(justClosed === wcmc_header.hide_global_nav){
                if(wcmc_header.$document.width() < wcmc_header.breakpoint2){
                    return;
                }
            }
             if(wcmc_header.$document.width() >= wcmc_header.breakpoint2){
                //Reset inline styles in case window was resized. Edge case fix.
                wcmc_header.$globalNav.removeAttr("style").addClass("is-expanded");
                wcmc_header.open_elements.push(wcmc_header.hide_desktop_global_nav);
                wcmc_header.$globalFunctions.addClass('is-collapsed');
            } else{
                //Mobile toggling of global links
                wcmc_header.$globalNav.slideDown();
                wcmc_header.open_elements.push(wcmc_header.hide_global_nav);
                wcmc_header.$emblem.addClass('full-logo');
            }
        },
        hide_desktop_global_nav: function(event){
            wcmc_header.$globalNav.removeClass("is-expanded");
            //This next line might need to be in toggle_global_nav too
            wcmc_header.$globalFunctions.removeClass('is-collapsed');
            wcmc_header.$emblem.removeClass('full-logo');
        },
        hide_global_nav: function(event){
            wcmc_header.$emblem.removeClass('full-logo');
            if(wcmc_header.$document.width()< wcmc_header.breakpoint2){
                wcmc_header.$globalNav.slideUp();
            }else{
                wcmc_header.$globalNav.removeAttr("style");
            }
        },
        globalSearch_toggleSize: function(event){
            wcmc_header.$globalFunctions.toggleClass('is-collapsed');
        },
        second_level_nav_open: function(event){
            // window.console.log(this);
            if ($(this).hasClass('active-trail')){
                event.stopPropagation();
                if (event.preventDefault) { event.preventDefault(); } else { event.returnValue = false; }
            } else {
                // $(this).addClass("active-trail").siblings().removeClass("active-trail");
            }
            if(wcmc_header.closeEverything() === wcmc_header.second_level_nav_close) {return;}
            $(settings.secondLevelNav).find('li:not(".active-trail")').slideDown(function(){
                $(this).parent().addClass("is-expanded");
            });
            wcmc_header.open_elements.push(wcmc_header.second_level_nav_close);
        },
        second_level_nav_close: function(event){
            $('#active-second-level-nav .level-2').not(".active-trail").slideUp().parent().removeClass("is-expanded");
                // function(){
                    // $(this).parent().removeClass("is-expanded");
                // }
                // );
        },
        show_mobile_nav: function(event){
            event.stopImmediatePropagation();
            event.preventDefault();
            if(wcmc_header.closeEverything() === wcmc_header.hide_mobile_nav){return;}
            wcmc_header.$topNav.slideDown();
            $(this).addClass("is-expanded ss-delete").removeClass("ss-rows");
            $('#drawer-nav .level-1').removeAttr("style");
            wcmc_header.open_elements.push(wcmc_header.hide_mobile_nav);
        },
        hide_mobile_nav: function(event){
            if(wcmc_header.$document.width() < wcmc_header.breakpoint1){
                wcmc_header.$topNav.slideUp(function(){
                    wcmc_header.$topNav.removeAttr("style");
                });
            }else{
                wcmc_header.$topNav.removeAttr('style');
            }
            wcmc_header.$menuButton.removeClass("is-expanded ss-delete").addClass('ss-rows');
        },
        toggle_mobile_drawer_nav: function(event){
            var $this = $(this);
            event.preventDefault();
            event.stopPropagation();
            wcmc_header.accordion($this.siblings(".menu"), $("#drawer-nav .level-1>.menu"));
            if($this.text() === '–'){
                $this.text('+');
            } else {
                $('.expand-menu').text('+');
                $this.text('–');
            }
        },
        toggle_level2: function(event){
            event.stopPropagation();
            //IE7 support
            if (event.preventDefault) { event.preventDefault(); } else { event.returnValue = false; }

            var $clicked = $(this),
                selector,
                mlid,
                classes= $clicked.attr('class').split(' '),
                level2_block = '#drawer-nav',
                $allPanels = $(level2_block).find('.level-1');

            // wcmc_header.parse_for_menuID(this);

            //get the class name on 'this' that starts with menu-mlid-
            mlid = $.grep(classes, function(element){
                return element.match("^menu-mlid");
            });
            //convert array to string. Results in 'menu-mlid-xxx'
            mlid=mlid[0];

            //Find the element in #drawer-nav that has that class name
            selector = level2_block + ' .' + mlid;
            var $selector = $(selector);

            // //Makes sure the second and third levels show and hide only when appropriate
            //Happens if this nav menu is already open
            if($selector.hasClass("is-expanded")){
                wcmc_header.closeEverything();
                return;
            }
            //Happens if another nav menu is already open
            else if($("#primary-nav .level-1").hasClass("is-open")){
                $("#primary-nav .level-1").removeClass("is-open");
                $clicked.addClass("is-open");
                 wcmc_header.accordion($selector, $allPanels);
                return;
            }
            //No nav menus are already open
            else{
                wcmc_header.closeEverything();
                $("#primary-nav .active-trail").addClass("temp-inactive");
                $clicked.toggleClass("is-open");
                wcmc_header.accordion($selector, $allPanels);
                $(settings.secondLevelNav).add($(settings.thirdLevelNav)).slideUp();
                wcmc_header.open_elements.push(wcmc_header.hide_level2);
            }
        },
        parse_for_menuID: function(navLi){

        },
        hide_level2: function(event){
            // window.console.log("hidelevel2");
            var $secondAndThirdNavs = $(settings.secondLevelNav).add($(settings.thirdLevelNav));
            if(wcmc_header.$document.width() >= wcmc_header.breakpoint1){
                wcmc_header.accordion($('.level-1.is-expanded'), $('#drawer-nav .level-1'));
                $secondAndThirdNavs.slideDown( function(){
                    $secondAndThirdNavs.removeAttr('style');
                });
            }else {
                $secondAndThirdNavs.removeAttr('style');
            }
            $("#primary-nav .level-1").removeClass("is-open");
            $(".temp-inactive").removeClass("temp-inactive");
        },
        show_interior_nav: function(event){
            event.stopPropagation();
            if(wcmc_header.closeEverything() === wcmc_header.hide_interior_nav) {return;}
            $(settings.bodyNavItems).slideToggle();
            $("#mobile-sub-nav").toggleClass("is-expanded");
            wcmc_header.open_elements.push(wcmc_header.hide_interior_nav);
        },
        hide_interior_nav: function(){
            var $bodyNavItems = $(settings.bodyNavItems);
            $("#mobile-sub-nav").removeClass("is-expanded");
            $bodyNavItems.not(':first').slideUp();
            $bodyNavItems.first().slideDown();
        },
        accordion: function($clicked, $elementsToToggle){
            if($clicked.hasClass("is-expanded")){
                $clicked.slideUp(function(){$(this).removeClass("is-expanded").removeAttr("style");});
                return;
            }
            $elementsToToggle.slideUp(function(){$(this).removeClass("is-expanded").removeAttr("style");});
            $clicked.slideDown().addClass("is-expanded");
            return;
        }
    };

    var wcmc_smoothNav = {

        loadContent: function(href) {
            var $mainContent    = $("#main"),
            $pageWrap       = $(".body-wrap"),
            baseHeight      = 0,
            $primaryNav = $(settings.primaryNav),
            $thirdLevelNav = $(settings.thirdLevelNav),
            $secondLevelNav = $(settings.secondLevelNav);
            // calculate wrapper heights to prevent jumping when loading new content
            $pageWrap.height($pageWrap.height());
            baseHeight = $pageWrap.height() - $mainContent.height();
            $mainContent.fadeOut(200, function() { // fade out the content of the current page
                $.get(href, function(data) { // load the contents of whatever href is
                    var $data = $(data),
                    $content = $data.find("#main"),
                    $level1Links = $data.find(settings.primaryNav),
                    $level2Links = $data.find(settings.secondLevelNav),
                    $level3Links = $data.find(settings.thirdLevelNav);
                    // window.console.log($level3Links[0]);
                    $mainContent.html($content.html());
                    $primaryNav.html($level1Links.html());
                    //If secondLevel is visible on page, simply change content
                    if($secondLevelNav.length>0){
                        if ($secondLevelNav.find(".active-trail").length>0){
                            $secondLevelNav.html($level2Links.html());
                        }else{
                            //Hide an invisible element so that it doesn't pop in
                            $secondLevelNav.hide().html($level2Links.html()).slideDown();
                        }
                    }
                    else{
                        $level2Links.hide();
                        wcmc_header.$drawer.after($level2Links);
                        $secondLevelNav = $(settings.secondLevelNav).slideDown();
                    }
                    if($thirdLevelNav.length>0){
                        if($level3Links.length > 0){
                            $thirdLevelNav.html($level3Links.html());
                        }
                        else{
                            $thirdLevelNav.slideUp(function(){ $thirdLevelNav.remove();});
                        }
                    }
                    else{
                        $level3Links.hide();
                        $secondLevelNav.after($level3Links);
                        $(settings.thirdLevelNav).slideDown();
                    }
                    $mainContent.fadeIn(200);
                    $pageWrap.animate({
                        height: baseHeight + $mainContent.height()
                    }, function(){
                        $pageWrap.removeAttr("style");
                    });

                });

            });

        },

        updatePageTitle: function(pageTitle){
            //Split page title at vertical pipe, change the first part of the title based on the link clicked on.
            var oldTitle = document.title,
                splitTitle = oldTitle.split('|');
            //Keep a space, re-add the pipe
            document.title= pageTitle + ' |' + splitTitle[1];
        },

        init: function(){
            if (Modernizr.history){
                var everPushedSomething = false;
                $("nav").on("click", "a:not(.active-trail)", function(event){
                    var _href = $(this).attr("href");
                    wcmc_smoothNav.loadContent(_href);
                    wcmc_smoothNav.updatePageTitle($(this).text());
                    history.pushState(null, null, _href);
                    event.preventDefault();
                    everPushedSomething = true;
                });
                $(window).bind("popstate", function() {
                    //This if statement is to prevent extra http requests. Disabling it makes the back button
                    //work properly when navigating away from the search page
                    // if (everPushedSomething){
                        event.preventDefault();
                        var link = location.pathname.replace(/^.*[\\/]/, ""); // get filename only
                        wcmc_smoothNav.loadContent(link);
                    // }
                    everPushedSomething = true;
                });
            }
        }
    };
    var jump_to_top={
        init:function(){
            if($(document).height() > (2*window.innerHeight)){
                    $(".jump-to-top").show().click(function() {
                        event.preventDefault();
                             $('html,body').animate({
                                 scrollTop: 0
                            }, 500);
                        });
                }
        }
    };

    $(document).ready(function(){
        wcmc_header.init();
        jump_to_top.init();
        //wcmc_smoothNav.init();
    });
})(jQuery);

var wcmc_layout_functions = {
    //Pass the element selector, element that has the same top
    moveScroller: function(el, top, bottom) {
        var move = function() {
            var scrollTop = jQuery(window).scrollTop(),
                $top = jQuery(top),
                $top_offset = $top.offset().top, //fixed per page
                $el = jQuery(el),
                max_offset = jQuery(bottom).offset().top - $el.height(),
                $el_width = $el.width();
            //I could add a debounced resize handler to make sure there isn't weirdness when
            //resizing, but the problem fixes itself if scrolling up, limited edge use case.
            if(scrollTop > $top_offset) {
              if(scrollTop < max_offset){
                $el.addClass("sticky").removeClass("bottom").css("width", $el_width);
              } else{
                $el.addClass("bottom").removeClass("sticky");
              }
            } else {
                if(scrollTop <= $top_offset) {
                    $el.removeClass("sticky").removeAttr("style");
                }
            }
        };
        //Uses jQuery plugin to slow down the execution of scroll event.
        //Improves browser performance, sticky might not respond immediately though.
        jQuery(window).scroll(jQuery.throttle( 100, move));
        move();
    }
};