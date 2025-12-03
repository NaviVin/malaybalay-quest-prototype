// Force landscape orientation on mobile devices
(function() {
    // Check if device supports orientation lock
    const isAndroid = /Android/.test(navigator.userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isMobile = isAndroid || isIOS;

    if (isMobile && screen.orientation && screen.orientation.lock) {
        // Try to lock orientation to landscape
        screen.orientation.lock('landscape').catch(err => {
            console.log('Orientation lock not supported or denied:', err);
        });
    }

    // Display warning if in portrait mode on mobile
    function checkOrientation() {
        const isPortrait = window.innerHeight > window.innerWidth;
        const warningEl = document.getElementById('landscape-warning');

        if (isMobile && isPortrait) {
            if (!warningEl) {
                const warning = document.createElement('div');
                warning.id = 'landscape-warning';
                warning.innerHTML = `
                    <div style="
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: rgba(0, 0, 0, 0.9);
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        z-index: 9999;
                        flex-direction: column;
                        text-align: center;
                        color: white;
                        font-family: 'Press Start 2P', monospace;
                        padding: 20px;
                    ">
                        <p style="font-size: 24px; margin-bottom: 20px;">⚠️ ROTATE DEVICE</p>
                        <p style="font-size: 16px; line-height: 1.5;">
                            Please rotate your device to landscape mode<br/>
                            for the best experience!
                        </p>
                    </div>
                `;
                document.body.insertBefore(warning, document.body.firstChild);
                document.body.style.overflow = 'hidden';
            }
        } else if (warningEl) {
            warningEl.remove();
            document.body.style.overflow = 'auto';
        }
    }

    // Check orientation on load and when window resizes
    window.addEventListener('load', checkOrientation);
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    // Initial check
    checkOrientation();
})();
