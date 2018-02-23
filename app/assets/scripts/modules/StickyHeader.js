import $ from 'jquery';
import smoothScroll from 'jquery-smooth-scroll';

import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';

class StickyHeader {
    constructor() {
        this.lazyImages = $(".lazyload");
        this.siteHeader = $(".site-header");
        this.headertriggerElement = $(".large-hero__title");
        this.pagesSections = $(".page-section");
        this.headerLinks = $(".primary-nav a");


        this.createHeaderWaypoint();
        this.createPageSectionWaypoints();
        this.addSmoothScrolling();
        this.refreshWaypoints();
    }

    refreshWaypoints() {
        this.lazyImages.on('load', () => {
            Waypoint.refreshAll();
        });
    }
    
    createHeaderWaypoint() {
        let that = this;
        new Waypoint({
            element:this.headertriggerElement[0],
            handler: function(direction) {
                if(direction == "down") {
                    that.siteHeader.addClass("site-header--dark");
                }
                else {
                    that.siteHeader.removeClass("site-header--dark");
                    that.headerLinks.removeClass("is-current-link");
                }
                
            }
        });
    }

    addSmoothScrolling(){
        this.headerLinks.smoothScroll();
    }

    createPageSectionWaypoints() {
        let that = this;
        this.pagesSections.each(function() {
            let currentPageSection = this;
            new Waypoint({
                element:currentPageSection,
                handler: (direction) => {
                    if(direction == "down"){
                        let matchingHeaderLink = currentPageSection.getAttribute("data-matching-link");
                        that.headerLinks.removeClass("is-current-link");
                        $(matchingHeaderLink).addClass("is-current-link");
                    }
                },
                offset: "18%"
            });

            new Waypoint({
                element:currentPageSection,
                handler: (direction) => {
                    if(direction == "up"){
                        let matchingHeaderLink = currentPageSection.getAttribute("data-matching-link");
                        that.headerLinks.removeClass("is-current-link");
                        $(matchingHeaderLink).addClass("is-current-link");
                    }
                },
                offset: "-50%"
            });
        });
    }
}

export default StickyHeader;