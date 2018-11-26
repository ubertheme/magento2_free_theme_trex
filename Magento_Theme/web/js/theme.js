/**
 * Copyright © 2016 Magento. All rights reserved.
 * See COPYING.txt for license details.
 */
define([
    'jquery',
    'mage/smart-keyboard-handler',
    'mage/mage',
    'mage/ie-class-fixer',
    'domReady!'
], function ($, keyboardHandler) {
    'use strict';

    if ($('body').hasClass('checkout-cart-index')) {
        if ($('#co-shipping-method-form .fieldset.rates').length > 0 && $('#co-shipping-method-form .fieldset.rates :checked').length === 0) {
            $('#block-shipping').on('collapsiblecreate', function () {
                $('#block-shipping').collapsible('forceActivate');
            });
        }
    }

    /* Load More Products On Home Page */
    $(document).on('click', 'a.load-more-products', function (evt) {
        evt.preventDefault();

        if ($(this).hasClass('disabled')) {
            return false;
        }

        var $loading = $('<div id="infscr-loading" class="link-shop-now" style="">Loading...</div>');

        var $nextPage = $(this).data('next-page'),
            $pageParam = $(this).data('page_var_name'),
            $wrapper = $(this).data('wrapper'),
            $productsCount = $(this).data('products_count'),
            $button = $(this);

        if ( !$nextPage) {
            $nextPage = 2;
        }

        var $nextRequestUrl = window.location + '?' +$pageParam+ '=' + $nextPage;

        $button.parent().prepend($loading);
        $button.hide();

        // load next content
        $.get($nextRequestUrl, function (data) {
            var $newContent = $(data).find($wrapper + ' ol.product-items');
            var $hasData = false;
            if ($newContent.length) {

                $hasData = true;
                if ( !$button.data('show_pager')) {
                    $($wrapper).find('ol.product-items').append($newContent.html());

                    // check end list
                    if ($(data).find($wrapper + ' ol.product-items li').length < $productsCount) {
                        $hasData = false;
                    }

                } else {
                    $(data).find($wrapper + ' ol.product-items li').each(function() {
                        $($wrapper + ' ol.product-items').append($(this));
                        if ($($wrapper + ' ol.product-items li').length >= $productsCount) {
                            $hasData = false;
                            return false;
                        }
                    });

                    if ($(data).find($wrapper + ' ol.product-items li').length < $button.data('products_per_page')) {
                        $hasData = false;
                    }
                }

                // add next page data
                $button.data('next-page', $nextPage + 1);
                
                //re-initial quickview functions
                if ($('body').UBQuickView && ubQuickViewOptions !== undefined) {
                    $.ub.UBQuickView(ubQuickViewOptions);
                }

            }

            if ( !$hasData) {
                $button.addClass('disabled');
                $button.html("THAT\'S ALL WE HAVE FOR NOW");
            }

            // hide loading
            $loading.remove();
            $button.show();
        });
    });

    $('.cart-summary').mage('sticky', {
        container: '#maincontent'
    });

   

    $('.panel.header > .header.links').clone().appendTo('#store\\.links');

    var $dvElement = $('.page-product-bundle');
    if (!$dvElement.length) {
        $(".product-addto-links").appendTo(".box-tocart .actions").after($("#instant-purchase")); 
    } else {
        $(".product-addto-links").appendTo(".bundle-actions").after(); 
    }
    
    $(".sections.nav-sections").mouseenter(function (){
        $(".magnify-lens").css("display", "none");
        $(".magnifier-preview").css("display", "none");
        
    }).mouseleave(function (){
        $(".magnify-lens").css("display", "");
        $(".magnifier-preview").css("display", "");
    });
    
    $('#qty').on('blur', function() {
        if (!$(this).val().length) {
            $(this).val(1);
        }
    });
    (function(){
        // Really basic check for the ios platform
        // https://stackoverflow.com/questions/9038625/detect-if-device-is-ios
        var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

        // Get the device pixel ratio
        var ratio = window.devicePixelRatio || 1;

        // Define the users device screen dimensions
        var screen = {
            width : window.screen.width * ratio,
            height : window.screen.height * ratio
        };
        

        // iPhone X  Vertical Detection
        if (iOS && screen.width == 1125 && screen.height === 2436) {
            $('body').addClass('iphoneX');
        }
        // Samsum A7  Vertical landscape
        if (screen.width == 2220.75) {
            $('body').addClass('iphoneX iphoneX-landscape');
        }
        // iPhone X Detection
        if (iOS && screen.width == 2436 && screen.height === 1125) {
            $('body').addClass('iphoneX iphoneX-landscape');
        }
        
        // iPhone Xs - Max Detection
        if (iOS && screen.width == 1242 && screen.height === 2688) {
            $('body').addClass('iphoneXs-Max');
        }

        // iPhone Xr Detection
        if (iOS && screen.width == 828 && screen.height === 1792) {
            $('body').addClass('iphoneXr');
        }


    })();

    function detectmob() { 
     if( navigator.userAgent.match(/Android/i)
     || navigator.userAgent.match(/webOS/i)
     || navigator.userAgent.match(/iPhone/i)
     || navigator.userAgent.match(/iPad/i)
     || navigator.userAgent.match(/iPod/i)
     || navigator.userAgent.match(/BlackBerry/i)
     || navigator.userAgent.match(/Windows Phone/i)
     ){
        return true;
      }
     else {
        return false;
      }
    }
    if(detectmob()){
        
        $('.has-toggle').on('click', function(e){
            if ($(e.target).hasClass('btn-toggle')) {
                $(this).toggleClass('active');
                if ($(this).hasClass('active')) {
                    $(this).children().addClass('active');
                } else {
                    $(this).children().removeClass('active');
                }
                $(this).siblings('.has-toggle').each(function() {
                    if ($(this).hasClass('active')) {
                        $(this).removeClass('active').children().removeClass('active');
                    }
                });
            }
        });

        $('.reviews-actions .action.add').on('click', function(e){
            //$('#tab-label-reviews').addClass('active');
            $('#reviews').addClass('active');
            $('#reviews').children().addClass('active');
            $('html,body').animate({
                scrollTop: $("#review-form").offset().top
            }, 'slow');
        });

        $('.overview').on('click', function(e){
            if ($(e.target).hasClass('.overview-title')) {
                $(this).toggleClass('active');
                if ($(this).hasClass('active')) {
                    $(this).children().addClass('active');
                } else {
                    $(this).children().removeClass('active');
                }
            }
        });

        $('.btn-sidebar').on('click', function(e){
            $('.sidebar').children().toggleClass('active');
        });

        $('.tab-content-item').on('click', function(e){
            if ($(e.target).hasClass('title')) {
                $(this).toggleClass('active');
                if ($(this).hasClass('active')) {
                    $(this).children().addClass('active');
                } else {
                    $(this).children().removeClass('active');
                }
                $(this).siblings('.content').each(function() {
                    if ($(this).hasClass('active')) {
                        $(this).removeClass('active').children().removeClass('active');
                    }
                });
            }
        });
    } else {
        $("#quick-settings, #quick-search, #quick-access, #minicart").mouseenter(function (){
            $(this).children().addClass("active");
            
        }).mouseleave(function (){
            $(this).children().removeClass("active");
        });
    }

    $(function(){
        var isUbTouch = 'ontouchstart' in window && !(/hp-tablet/gi).test(navigator.appVersion);
        $('html').addClass(isUbTouch ? 'touch' : 'no-touch');
        if (isUbTouch) {
            $(document).on('click touchstart', function (e) {
                if (!$(e.target).closest('.has-toggle.active').length) {
                    if ($('.has-toggle.active').length) {
                        $('.has-toggle.active').removeClass('active').children().removeClass('active');
                    }
                }
            });
        }
    });
    
    keyboardHandler.apply();



});
