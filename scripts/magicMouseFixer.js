/*
 * Bing Maps Path Drawing Module
 *
 * Copyright (c) 2013      KJRB
 * Released under the MIT License
 */
/**
 * Created with JetBrains WebStorm.
 * User: kjrb
 * Date: 6/3/13
 * Time: 9:09 PM
 * To change this template use File | Settings | File Templates.
 */

function MagicMouseFixer (map, scrollStepSensitivity) {
    var zoomRange = map.getZoomRange(), mouseWheelHandler, MME = Microsoft.Maps.Events;
    mouseWheelHandler  = MME.addHandler(map, 'mousewheel', handleMouseWheel);

    function handleMouseWheel(e) {

        var targetType = e.targetType, scrollStep = scrollStepSensitivity || 10, newZoom, currentZoom, targetZoom, delta;

        if (targetType !== 'map' && targetType != 'pushpin') {
            return false;
        }

        delta = e.wheelDelta;

        if (Math.abs(delta) < scrollStep) {
            e.handled = true;
            return true;
        }

        currentZoom = Math.round(map.getZoom());
        targetZoom = Math.round(map.getTargetZoom());
        newZoom = Math.round(currentZoom + (delta> 0 ? 1 : -1));

        if (newZoom !== targetZoom && newZoom <= zoomRange.max && newZoom >= zoomRange.min ) {
            map.setView({ zoom: newZoom });
            console.log(currentZoom + ' -> ' + newZoom + ', delta: ' + delta);
        }

        e.handled = true;
        return true;
    }

    function removeMouseWheelHandler() {
        if (!mouseWheelHandler) return;

        MME.removeHandler(mouseWheelHandler);
    }

    return { remove: removeMouseWheelHandler }
};

Microsoft.Maps.moduleLoaded('MagicMouseFixerModule');
