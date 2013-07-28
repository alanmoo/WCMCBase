//Written by Alan Mooiman, April 2013.
//General algorithm is that when an item is clicked on to be opened, its closing function is added to
//the 'open_elements' queue. When escape is pressed, body is clicked, or another openable element is clicked
//a function runs to check what needs to be closed and acts on it. There's a lot of edge cases based around
//screen resizing, so that's why I check the size and run .removeAttr("style") frequently, as the stylesheet
//needs to be effective. I wanted to stay away from using a window.onresize function for performance reasons.
//Tell JSLint that Modernizr is already included
/*global bootstrap:true, Modernizr:true */(function(e){var t={eventCheck:function(){return"ontouchstart"in document.documentElement?"touchstart":"click"},eventTrigger:""},n={breakpoint1:600,breakpoint2:985,globalNav:".wcmc-links",globalFunctions:".global-functions-container",emblem:".wcmc-emblem",globalNavTrigger:".wcmc-links-expander, .wcmc-emblem",menuButton:".menu-button",mobileLevel2Expander:".expand-menu",primaryNav:"#primary-nav",secondLevelNav:"#active-second-level-nav",thirdLevelNav:"#active-third-level-nav",bodyNav:"#mobile-sub-nav",primaryNavElements:".level-1",topNav:"#top-nav",bodyNavItems:"#body-nav li",globalSearch:".global-search",drawer:"#drawer-nav"},r={init:function(){t.eventTrigger=t.eventCheck(),r.$drawer=e(n.drawer),r.globalSearch=n.globalSearch,r.$topNav=e(n.topNav),r.primaryNavElements=n.primaryNavElements,r.$thirdLevelNav=e(n.thirdLevelNav),r.$secondLevelNav=e(n.secondLevelNav),r.$primaryNav=e(n.primaryNav),r.$document=e(document),r.$mobileLevel2Expander=e(n.mobileLevel2Expander),r.$menuButton=e(n.menuButton),r.$globalNavTrigger=e(n.globalNavTrigger),r.$body=e("body"),r.$emblem=e(n.emblem),r.$globalFunctions=e(n.globalFunctions),r.$globalNav=e(n.globalNav),r.breakpoint1=n.breakpoint1,r.breakpoint2=n.breakpoint2,this.bindUIActions(),this.watch_for_escape()},open_elements:[],bindUIActions:function(){e("#mobile-sub-nav a").on(t.eventTrigger,function(){event.stopPropagation()}),r.$globalNavTrigger.on(t.eventTrigger,this.show_global_nav),r.$menuButton.on(t.eventTrigger,this.show_mobile_nav),r.$mobileLevel2Expander.on(t.eventTrigger,this.toggle_mobile_drawer_nav),r.$primaryNav.on(t.eventTrigger,".level-1",this.toggle_level2);var i=n.secondLevelNav+" li";r.$topNav.on(t.eventTrigger,i,this.second_level_nav_open),e("#mobile-sub-nav").on(t.eventTrigger,this.show_interior_nav),r.$topNav.find(n.globalSearch).on(t.eventTrigger,r.stopProp),r.$drawer.find("a").on(t.eventTrigger,r.stopProp),e("#active-second-level-nav li a").not(".active-trail").on(t.eventTrigger,r.stopProp)},stopProp:function(e){e.stopPropagation()},watch_for_escape:function(n){e(document).on({keydown:function(e){e.keyCode===27&&r.closeEverything()},touchstart:function(e){return},click:function(e){t.eventTrigger==="click"&&r.closeEverything()}})},closeEverything:function(){if(r.open_elements.length>0){var e=r.open_elements.shift();return e(),e}},show_global_nav:function(e){e.stopPropagation(),e.preventDefault?e.preventDefault():e.returnValue=!1;var t=r.closeEverything();if(t===r.hide_desktop_global_nav){if(r.$document.width()>=r.breakpoint2)return}else if(t===r.hide_global_nav&&r.$document.width()<r.breakpoint2)return;r.$document.width()>=r.breakpoint2?(r.$globalNav.removeAttr("style").addClass("is-expanded"),r.open_elements.push(r.hide_desktop_global_nav),r.$globalFunctions.addClass("is-collapsed")):(r.$globalNav.slideDown(),r.open_elements.push(r.hide_global_nav),r.$emblem.addClass("full-logo"))},hide_desktop_global_nav:function(e){r.$globalNav.removeClass("is-expanded"),r.$globalFunctions.removeClass("is-collapsed"),r.$emblem.removeClass("full-logo")},hide_global_nav:function(e){r.$emblem.removeClass("full-logo"),r.$document.width()<r.breakpoint2?r.$globalNav.slideUp():r.$globalNav.removeAttr("style")},globalSearch_toggleSize:function(e){r.$globalFunctions.toggleClass("is-collapsed")},second_level_nav_open:function(t){e(this).hasClass("active-trail")&&(t.stopPropagation(),t.preventDefault?t.preventDefault():t.returnValue=!1);if(r.closeEverything()===r.second_level_nav_close)return;e(n.secondLevelNav).find('li:not(".active-trail")').slideDown(function(){e(this).parent().addClass("is-expanded")}),r.open_elements.push(r.second_level_nav_close)},second_level_nav_close:function(t){e("#active-second-level-nav .level-2").not(".active-trail").slideUp().parent().removeClass("is-expanded")},show_mobile_nav:function(t){t.stopImmediatePropagation(),t.preventDefault();if(r.closeEverything()===r.hide_mobile_nav)return;r.$topNav.slideDown(),e(this).addClass("is-expanded ss-delete").removeClass("ss-rows"),e("#drawer-nav .level-1").removeAttr("style"),r.open_elements.push(r.hide_mobile_nav)},hide_mobile_nav:function(e){r.$document.width()<r.breakpoint1?r.$topNav.slideUp(function(){r.$topNav.removeAttr("style")}):r.$topNav.removeAttr("style"),r.$menuButton.removeClass("is-expanded ss-delete").addClass("ss-rows")},toggle_mobile_drawer_nav:function(t){var n=e(this);t.preventDefault(),t.stopPropagation(),r.accordion(n.siblings(".menu"),e("#drawer-nav .level-1>.menu")),n.text()==="–"?n.text("+"):(e(".expand-menu").text("+"),n.text("–"))},toggle_level2:function(t){t.stopPropagation(),t.preventDefault?t.preventDefault():t.returnValue=!1;var i=e(this),s,o,u=i.attr("class").split(" "),a="#drawer-nav",f=e(a).find(".level-1");o=e.grep(u,function(e){return e.match("^menu-mlid")}),o=o[0],s=a+" ."+o;var l=e(s);if(l.hasClass("is-expanded")){r.closeEverything();return}if(e("#primary-nav .level-1").hasClass("is-open")){e("#primary-nav .level-1").removeClass("is-open"),i.addClass("is-open"),r.accordion(l,f);return}r.closeEverything(),e("#primary-nav .active-trail").addClass("temp-inactive"),i.toggleClass("is-open"),r.accordion(l,f),e(n.secondLevelNav).add(e(n.thirdLevelNav)).slideUp(),r.open_elements.push(r.hide_level2)},parse_for_menuID:function(e){},hide_level2:function(t){var i=e(n.secondLevelNav).add(e(n.thirdLevelNav));r.$document.width()>=r.breakpoint1?(r.accordion(e(".level-1.is-expanded"),e("#drawer-nav .level-1")),i.slideDown(function(){i.removeAttr("style")})):i.removeAttr("style"),e("#primary-nav .level-1").removeClass("is-open"),e(".temp-inactive").removeClass("temp-inactive")},show_interior_nav:function(t){t.stopPropagation();if(r.closeEverything()===r.hide_interior_nav)return;e(n.bodyNavItems).slideToggle(),e("#mobile-sub-nav").toggleClass("is-expanded"),r.open_elements.push(r.hide_interior_nav)},hide_interior_nav:function(){var t=e(n.bodyNavItems);e("#mobile-sub-nav").removeClass("is-expanded"),t.not(":first").slideUp(),t.first().slideDown()},accordion:function(t,n){if(t.hasClass("is-expanded")){t.slideUp(function(){e(this).removeClass("is-expanded").removeAttr("style")});return}n.slideUp(function(){e(this).removeClass("is-expanded").removeAttr("style")}),t.slideDown().addClass("is-expanded");return}},i={loadContent:function(t){var i=e("#main"),s=e(".body-wrap"),o=0,u=e(n.primaryNav),a=e(n.thirdLevelNav),f=e(n.secondLevelNav);s.height(s.height()),o=s.height()-i.height(),i.fadeOut(200,function(){e.get(t,function(t){var l=e(t),c=l.find("#main"),h=l.find(n.primaryNav),p=l.find(n.secondLevelNav),d=l.find(n.thirdLevelNav);i.html(c.html()),u.html(h.html()),f.length>0?f.find(".active-trail").length>0?f.html(p.html()):f.hide().html(p.html()).slideDown():(p.hide(),r.$drawer.after(p),f=e(n.secondLevelNav).slideDown()),a.length>0?d.length>0?a.html(d.html()):a.slideUp(function(){a.remove()}):(d.hide(),f.after(d),e(n.thirdLevelNav).slideDown()),i.fadeIn(200),s.animate({height:o+i.height()},function(){s.removeAttr("style")})})})},updatePageTitle:function(e){var t=document.title,n=t.split("|");document.title=e+" |"+n[1]},init:function(){if(Modernizr.history){var t=!1;e("nav").on("click","a:not(.active-trail)",function(n){var r=e(this).attr("href");i.loadContent(r),i.updatePageTitle(e(this).text()),history.pushState(null,null,r),n.preventDefault(),t=!0}),e(window).bind("popstate",function(){event.preventDefault();var e=location.pathname.replace(/^.*[\\/]/,"");i.loadContent(e),t=!0})}}},s={init:function(){e(document).height()>2*window.innerHeight&&e(".jump-to-top").show().click(function(){event.preventDefault(),e("html,body").animate({scrollTop:0},500)})}};e(document).ready(function(){r.init(),s.init()})})(jQuery);var wcmc_layout_functions={moveScroller:function(e,t,n){var r=function(){var r=jQuery(window).scrollTop(),i=jQuery(t),s=i.offset().top,o=jQuery(e),u=jQuery(n).offset().top-o.height(),a=o.width();r>s?r<u?o.addClass("sticky").removeClass("bottom").css("width",a):o.addClass("bottom").removeClass("sticky"):r<=s&&o.removeClass("sticky").removeAttr("style")};jQuery(window).scroll(jQuery.throttle(100,r)),r()}};