/* Image comparison slider initializer */
/* Designed to be included on addictions.html after the HTML comparison block */

(function () {
    function initComparisons() {
        const containers = document.querySelectorAll('.img-comp-container');
        containers.forEach((container) => {
            // find overlay (top image)
            const overlay = container.querySelector('.img-comp-overlay');
            if (!overlay) return;
            setupOverlay(container, overlay);
            // ensure iframes inside container match container size
            syncIframesToContainer(container);
        });

        window.addEventListener('resize', () => {
            document.querySelectorAll('.img-comp-container').forEach(container => {
                // resync overlay width if not moved
                const ov = container.querySelector('.img-comp-overlay');
                if (ov && !ov.dataset.customMoved) ov.style.width = (container.clientWidth / 2) + 'px';
                // reposition slider
                const slider = container.querySelector('.img-comp-slider');
                if (slider && ov) slider.style.left = (ov.offsetWidth - slider.offsetWidth / 2) + 'px';
                // resync iframe sizes
                syncIframesToContainer(container);
            });
        });
    }

    // new helper: set iframe pixel height = container.clientHeight and width=100%
    function syncIframesToContainer(container) {
        if (!container) return;
        const h = container.clientHeight;
        const iframes = container.querySelectorAll('iframe');
        iframes.forEach(iframe => {
            iframe.style.width = '100%';
            iframe.style.height = h + 'px';
            iframe.style.display = 'block';
            iframe.style.border = '0';
        });
    }

    function setupOverlay(container, overlay) {
        // ensure overlay initial width = 50% in px (accurate)
        overlay.style.width = (container.clientWidth / 2) + 'px';

        // sync iframes (in case container size determined after CSS)
        syncIframesToContainer(container);

        // create slider element
        const slider = document.createElement('div');
        slider.className = 'img-comp-slider';
        container.insertBefore(slider, overlay);

        // position slider centered vertically, horizontally at edge of overlay
        positionSlider(container, overlay, slider);

        let dragging = false;

        function getPosX(e) {
            const evt = (e.changedTouches && e.changedTouches[0]) || e;
            const rect = container.getBoundingClientRect();
            let x = (evt.pageX || evt.clientX) - rect.left - window.pageXOffset;
            if (x < 0) x = 0;
            if (x > rect.width) x = rect.width;
            return x;
        }

        function slideTo(x) {
            overlay.style.width = x + 'px';
            slider.style.left = (overlay.offsetWidth - slider.offsetWidth / 2) + 'px';
        }

        function startDrag(e) {
            e.preventDefault();
            dragging = true;
            overlay.dataset.customMoved = '1';
            document.addEventListener('mousemove', onDrag);
            document.addEventListener('touchmove', onDrag, { passive: false });
            document.addEventListener('mouseup', endDrag);
            document.addEventListener('touchend', endDrag);
        }

        function onDrag(e) {
            if (!dragging) return;
            e.preventDefault();
            const x = getPosX(e);
            slideTo(x);
        }

        function endDrag() {
            dragging = false;
            document.removeEventListener('mousemove', onDrag);
            document.removeEventListener('touchmove', onDrag);
            document.removeEventListener('mouseup', endDrag);
            document.removeEventListener('touchend', endDrag);
        }

        // click on container to move slider
        container.addEventListener('click', function (e) {
            // ignore clicks on slider itself (handled by drag)
            if (e.target === slider) return;
            const x = getPosX(e);
            overlay.dataset.customMoved = '1';
            slideTo(x);
        });

        slider.addEventListener('mousedown', startDrag);
        slider.addEventListener('touchstart', startDrag, { passive: false });

        // small timeout to correctly position slider after iframes load/change
        setTimeout(() => {
            positionSlider(container, overlay, slider);
            syncIframesToContainer(container);
        }, 150);
    }

    function positionSlider(container, overlay, slider) {
        if (!slider) slider = container.querySelector('.img-comp-slider');
        if (!slider) return;
        slider.style.top = (container.clientHeight / 2 - slider.offsetHeight / 2) + 'px';
        slider.style.left = (overlay.offsetWidth - slider.offsetWidth / 2) + 'px';
    }

    // expose initializer
    window.initImageComparisons = initComparisons;
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(initComparisons, 60);
    } else {
        window.addEventListener('load', initComparisons);
    }
})();