
        document.addEventListener("DOMContentLoaded", () => {
        // Skip on touch devices
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice) return; // Skip creating #pixel-cursor

        const pixel = document.createElement("div");
        pixel.id = "pixel-cursor";
        pixel.style.opacity = "0";
        pixel.style.transition = "opacity 0.05s linear, transform 0s";
        document.body.appendChild(pixel);

        let isInside = false;

        // Update position & show cursor
        const updatePos = (x, y) => {
            pixel.style.transform = `translate(${x - pixel.offsetWidth / 2}px, ${y - pixel.offsetHeight / 2}px)`;
            if (!isInside) {
            pixel.style.opacity = "1";
            isInside = true;
            }
        };

        const hide = () => {
            pixel.style.opacity = "0";
            isInside = false;
        };

        // Pointer move — fast & hardware synced
        window.addEventListener("pointermove", e => {
            updatePos(e.clientX, e.clientY);
        }, { passive: true });

        // Flicker on click
        window.addEventListener("pointerdown", () => {
            pixel.classList.add("flicker");
        });
        pixel.addEventListener("animationend", () => {
            pixel.classList.remove("flicker");
        });

        // --- Robust hide logic ---
        // 1. If the pointer leaves window bounds
        window.addEventListener("mouseout", e => {
            if (!e.relatedTarget && !e.toElement) hide();
        });

        // 2. If the document loses focus (alt-tab, click other window)
        window.addEventListener("blur", hide);

        // 3. If tab goes inactive
        document.addEventListener("visibilitychange", () => {
            if (document.hidden) hide();
        });

        // 4. Re-show only when pointer re-enters (next move)
        window.addEventListener("mouseenter", e => {
            updatePos(e.clientX, e.clientY);
        });
        });

        document.addEventListener("DOMContentLoaded", () => {
    const pegasusDivs = [...document.querySelectorAll(".pegasus-arch-subdiv")];
    const imgs = pegasusDivs.map(div => div.querySelector(".pegasus-img"));

    const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    const hoverRadius = isTouch ? Infinity : 100;

    let keyPressed = false;
    let shiftHeld = false;
    let shiftOverride = false;
    let shiftTimeout = null;
    let animatingSequence = false;
    let capsLockActive = false; // initial state, cannot detect on load reliably

    let mouseX = null;
    let mouseY = null;

    const defaultOpacity = () => (capsLockActive ? 1 : 0.5);
    const hoverOpacity = () => (capsLockActive ? 0.5 : 1);

    const setOpacity = (index, value) => imgs[index].style.opacity = value;

    const resetAll = () => {
        if (!keyPressed && !animatingSequence && !shiftOverride) {
            imgs.forEach((img, i) => setOpacity(i, defaultOpacity()));
        }
    };

    const handlePosition = (x, y) => {
        mouseX = x;
        mouseY = y;

        if (keyPressed || shiftOverride || animatingSequence) return;

        let closestIndex = -1;
        let closestDist = Infinity;

        pegasusDivs.forEach((div, i) => {
            const rect = div.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dist = Math.hypot(x - cx, y - cy);
            if (dist < closestDist) {
                closestDist = dist;
                closestIndex = i;
            }
        });

        imgs.forEach((img, i) => {
            if (closestDist <= hoverRadius) {
                setOpacity(i, i === closestIndex ? hoverOpacity() : defaultOpacity());
            } else {
                setOpacity(i, defaultOpacity());
            }
        });
    };

    // Force hover recalculation, even if mouse hasn't moved
    const recalcHover = () => {
        if (mouseX !== null && mouseY !== null) {
            handlePosition(mouseX, mouseY);
            imgs.forEach((img, i) => setOpacity(i, value));
        }
    };

    // Initialize opacity
    imgs.forEach(img => {
        img.style.transition = "opacity 0.3s ease";
        img.style.opacity = defaultOpacity();
    });

    // Mouse events
    window.addEventListener("mousemove", e => handlePosition(e.clientX, e.clientY));
    window.addEventListener("mouseleave", resetAll);

    // Touch events
    window.addEventListener("touchstart", e => {
        if (e.touches.length) handlePosition(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });
    window.addEventListener("touchmove", e => {
        if (e.touches.length) handlePosition(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });
    window.addEventListener("touchend", resetAll);
    window.addEventListener("touchcancel", resetAll);

    // Key press logic
    window.addEventListener("keydown", e => {
        // Detect Caps Lock toggle
        if (e.getModifierState && e.getModifierState("CapsLock")) {
            if (!capsLockActive) {
                capsLockActive = true;
                recalcHover(); // <--- immediately apply hover logic
            }
        }

        if (e.key === "Shift" && !shiftHeld) {
            shiftHeld = true;
            shiftOverride = true;
            const value = capsLockActive ? hoverOpacity() : 1;
            imgs.forEach((img, i) => setOpacity(i, value));
            shiftTimeout = setTimeout(() => {
                shiftOverride = false;
                shiftHeld = false;
                resetAll();
                recalcHover();
            }, 2000);
        } else if (["Control", "Meta", "Alt"].includes(e.key)) {
            animatingSequence = true;
            imgs.forEach((img, i) => setOpacity(i, defaultOpacity()));

            const sequence = [];
            if (shiftHeld) {
                for (let i = imgs.length - 1; i >= 0; i--) sequence.push(i);
            } else {
                for (let i = 0; i < Math.min(5, imgs.length); i++) sequence.push(i);
            }

            let index = 0;
            const sequenceStep = () => {
                if (index > 0) setOpacity(sequence[index - 1], defaultOpacity());
                if (index < sequence.length) {
                    setOpacity(sequence[index], capsLockActive ? hoverOpacity() : 1);
                    index++;
                    setTimeout(sequenceStep, 300);
                } else {
                    animatingSequence = false;
                    resetAll();
                    recalcHover();
                }
            };
            sequenceStep();
        } else if (!keyPressed) {
            keyPressed = true;
            imgs.forEach((img, i) => setOpacity(i, 1));
        }
    });

    window.addEventListener("keyup", e => {
        if (e.key === "Shift") shiftHeld = false;
        if (!["Control", "Meta", "Alt"].includes(e.key)) keyPressed = false;

        // Detect Caps Lock release
        if (e.getModifierState && !e.getModifierState("CapsLock")) {
            if (capsLockActive) {
                capsLockActive = false;
                recalcHover(); // <--- immediately apply hover logic
            }
        }

        resetAll();
    });
});

        document.addEventListener("DOMContentLoaded", () => {
        const pegasusDivs = [...document.querySelectorAll(".pegasus-arch-subdiv")];
        const imgs = pegasusDivs.map(div => div.querySelector(".pegasus-img"));

        // Find nearest Pegasus to a point (same logic as your hover)
        const findNearestIndex = (x, y) => {
            let closestIndex = -1;
            let closestDist = Infinity;

            pegasusDivs.forEach((div, i) => {
            const rect = div.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dist = Math.hypot(x - cx, y - cy);
            if (dist < closestDist) {
                closestDist = dist;
                closestIndex = i;
            }
            });

            return (closestDist <= 100) ? closestIndex : -1;
        };

        const flickerImage = (i) => {
            if (i === -1) return;
            imgs[i].classList.add("flicker");
        };

        imgs.forEach(img => {
            img.addEventListener("animationend", () => {
            img.classList.remove("flicker");
            });
        });

        // Mouse click flicker
        window.addEventListener("mousedown", e => {
            const i = findNearestIndex(e.clientX, e.clientY);
            flickerImage(i);
        });

        // Optional: touch flicker too
        window.addEventListener("touchstart", e => {
            if (e.touches.length) {
            const i = findNearestIndex(e.touches[0].clientX, e.touches[0].clientY);
            flickerImage(i);
            }
        }, { passive: true });
        });

        document.addEventListener("DOMContentLoaded", () => {
            const ROTATION_MS = 100000; // full 360° rotation time (100s) — change to taste
            const SAVE_INTERVAL_MS = 200; // save to localStorage every 2s
            let savedHue = parseFloat(localStorage.getItem("hueStart"));
            if (!Number.isFinite(savedHue)) savedHue = Math.random() * 360;

            // We'll use a moving start time to keep numbers small and allow periodic saves/resets
            let baseHue = savedHue;    // hue at `baseTime`
            let baseTime = performance.now();
            let lastSave = performance.now();

            function tick(now) {
                // elapsed since baseTime
                const elapsed = now - baseTime;
                const deltaDeg = (elapsed / ROTATION_MS) * 360;
                const currentHue = (baseHue + deltaDeg) % 360;

                // update CSS variable (this is what changes the background)
                document.documentElement.style.setProperty("--hueStart", currentHue + "deg");

                // periodically persist and rebase to avoid huge elapsed values
                if (now - lastSave >= SAVE_INTERVAL_MS) {
                localStorage.setItem("hueStart", currentHue.toFixed(3));
                // rebase to reduce elapsed growth and floating point drift
                baseHue = currentHue;
                baseTime = now;
                lastSave = now;
                }

                requestAnimationFrame(tick);
            }

            requestAnimationFrame(tick);
        });