import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';

class RevealOnScroll {
    constructor(element, offset) {
        this.itemsToReveal = element;
        this.offsetPercentage = offset;
        this.hideIntitially();
        this.createWaypoints();
        
    }

    hideIntitially() {
        this.itemsToReveal.addClass("reveal-item");
    }

    createWaypoints() {
        let that = this;
        this.itemsToReveal.each(function() {
            let currentItem = this;
            new Waypoint({
                element: currentItem,
                handler: ()=> {
                    $(currentItem).addClass("reveal-item--is-visible");
                },
                offset: that.offsetPercentage
            });
        });
    }
}



export default RevealOnScroll;