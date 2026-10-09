// Motion for the site: scroll reveals, the hero timer, the stats it fills in and
// the header background. Everything ends in its final state straight away when the
// visitor has asked for reduced motion.
(function () {
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Splits "[00.00]" or "±0.05s" into the text around the number and the number itself.
    var NUMBER = /^(\D*?)(\d+(?:\.\d+)?)(.*)$/;

    function countUp(el, prefix, target, decimals, suffix, duration) {
        var start = null;
        function frame(now) {
            if (start === null) start = now;
            var t = Math.min((now - start) / duration, 1);
            var eased = 1 - Math.pow(1 - t, 3);
            el.textContent = prefix + (target * eased).toFixed(decimals) + suffix;
            if (t < 1) requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
    }

    function startCount(el) {
        var match = el.textContent.trim().match(NUMBER);
        if (!match) return;
        var target = parseFloat(match[2]);
        if (!target) return; // Placeholders like [00] have nothing to count to.
        var decimals = (match[2].split('.')[1] || '').length;
        countUp(el, match[1], target, decimals, match[3], 1400);
    }

    // Stats: each value shows "–" until the hero timer stops, then fills in from
    // data-value (counting up when there's a number to count to).
    function fillStats() {
        var stats = document.querySelector('.stats');
        if (!stats) return;
        stats.classList.add('is-done');
        stats.querySelectorAll('[data-value]').forEach(function (el) {
            el.textContent = el.getAttribute('data-value');
            if (!reduceMotion) startCount(el);
        });
    }

    // Header: solid background once the page has scrolled.
    var header = document.querySelector('.site-header');
    if (header) {
        var onScroll = function () {
            header.classList.toggle('is-scrolled', window.scrollY > 24);
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    // Hero timer: runs like a stopwatch from data-start to data-final seconds, then
    // marks the readout as done (the light stops blinking and the time flashes).
    // Anything other than a plain number (a placeholder) is shown after a short run.
    var timer = document.querySelector('[data-timer]');
    if (timer) {
        var final = timer.getAttribute('data-final') || '';
        var finalNumber = final.match(/^\d+(?:\.\d+)?$/) ? parseFloat(final) : null;
        var startNumber = parseFloat(timer.getAttribute('data-start')) || 0;
        var readout = timer.closest('.readout');
        if (finalNumber !== null) {
            if (reduceMotion) {
                timer.textContent = finalNumber.toFixed(2) + 's';
                readout.classList.add('is-done');
                fillStats();
            } else {
                var began = null;
                var tick = function (now) {
                    if (began === null) began = now;
                    var seconds = Math.min(startNumber + (now - began) / 1000, finalNumber);
                    timer.textContent = seconds.toFixed(2) + 's';
                    if (seconds < finalNumber) requestAnimationFrame(tick);
                    else {
                        readout.classList.add('is-done');
                        fillStats();
                    }
                };
                requestAnimationFrame(tick);
            }
        } else if (reduceMotion) {
            timer.textContent = final;
            fillStats();
        } else {
            setTimeout(function () {
                var start = null;
                function run(now) {
                    if (start === null) start = now;
                    var elapsed = now - start;
                    if (elapsed < 1600) {
                        timer.textContent = (elapsed / 160).toFixed(2).padStart(5, '0');
                        requestAnimationFrame(run);
                    } else {
                        timer.textContent = final;
                        fillStats();
                    }
                }
                requestAnimationFrame(run);
            }, 700);
        }
    }

    // Scroll reveals.
    var revealed = document.querySelectorAll('[data-reveal]');

    if (reduceMotion || !('IntersectionObserver' in window)) {
        revealed.forEach(function (el) { el.classList.add('is-visible'); });
        return;
    }

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            var el = entry.target;
            el.classList.add('is-visible');
            observer.unobserve(el);
        });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.15 });

    revealed.forEach(function (el) { observer.observe(el); });
})();
