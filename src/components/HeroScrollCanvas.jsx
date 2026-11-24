import { useEffect, useRef } from 'react';
import { DEFAULT_FRAME_COUNT, FLAVOR_ORDER, FLAVORS } from '../data/flavors';

const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
const mapRange = (v, inMin, inMax, outMin = 0, outMax = 1) => {
  const t = clamp((v - inMin) / (inMax - inMin), 0, 1);
  return outMin + t * (outMax - outMin);
};
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

function frameUrl(flavorId, indexZeroBased) {
  const num = String(indexZeroBased + 1).padStart(4, '0');
  return `/frames/${flavorId}/frame_${num}.webp`;
}

export default function HeroScrollCanvas({
  activeFlavor,
  resetSignal,
  onSelectFlavor,
  onHeaderScrolledChange,
}) {
  const heroTrackRef = useRef(null);
  const heroStageRef = useRef(null);
  const canvasRef = useRef(null);
  const titleLockupRef = useRef(null);
  const subheadingRef = useRef(null);
  const scrollCueRef = useRef(null);
  const scrollRailThumbRef = useRef(null);
  const loaderBarRef = useRef(null);
  const loaderBarFillRef = useRef(null);

  const activeFlavorRef = useRef(activeFlavor);
  const scrolledStateRef = useRef(false);
  const engineRef = useRef({
    frameCounts: {
      'peanut-butter-fudge': DEFAULT_FRAME_COUNT,
      'red-velvet': DEFAULT_FRAME_COUNT,
      'triple-chocolate': DEFAULT_FRAME_COUNT,
    },
    cache: {},
    targetProgress: 0,
    currentProgress: 0,
    lastDrawnFlavor: null,
    lastDrawnIndex: -1,
    canvasWidth: 0,
    canvasHeight: 0,
    dpr: 1,
    rafId: null,
    lastTime: 0,
    needsRender: true,
    preloadFlavor: null,
    scheduleLoop: null,
    updateOverlay: null,
  });

  // Initialize high-DPI canvas scrubbing engine once
  useEffect(() => {
    const heroTrack = heroTrackRef.current;
    const heroStage = heroStageRef.current;
    const canvas = canvasRef.current;
    if (!heroTrack || !heroStage || !canvas) return undefined;

    const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const state = engineRef.current;

    const getCache = (flavorId) => {
      if (!state.cache[flavorId]) {
        const count = state.frameCounts[flavorId] || DEFAULT_FRAME_COUNT;
        state.cache[flavorId] = {
          images: new Array(count).fill(null),
          loadedCount: 0,
          started: false,
        };
      }
      return state.cache[flavorId];
    };

    const updateLoaderProgress = (ratio) => {
      const pct = Math.min(100, Math.round(ratio * 100));
      if (loaderBarFillRef.current) {
        loaderBarFillRef.current.style.width = `${pct}%`;
      }
      if (pct >= 98 && loaderBarRef.current) {
        loaderBarRef.current.style.opacity = '0';
      }
    };

    const getBestAvailableFrame = (flavorId, targetIdx) => {
      const entry = getCache(flavorId);
      const images = entry.images;
      if (images[targetIdx]) return { img: images[targetIdx], index: targetIdx };
      const count = images.length;
      for (let offset = 1; offset < count; offset++) {
        if (targetIdx - offset >= 0 && images[targetIdx - offset]) {
          return { img: images[targetIdx - offset], index: targetIdx - offset };
        }
        if (targetIdx + offset < count && images[targetIdx + offset]) {
          return { img: images[targetIdx + offset], index: targetIdx + offset };
        }
      }
      return null;
    };

    const drawCoverFrame = (img, focalX = 0.5, focalY = 0.5) => {
      const cw = state.canvasWidth;
      const ch = state.canvasHeight;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      if (!cw || !ch || !iw || !ih) return;

      const imgRatio = iw / ih;
      const canvasRatio = cw / ch;

      let drawW;
      let drawH;
      let offsetX;
      let offsetY;
      if (canvasRatio > imgRatio) {
        drawW = cw;
        drawH = cw / imgRatio;
        offsetX = 0;
        offsetY = (ch - drawH) * focalY;
      } else {
        drawH = ch;
        drawW = ch * imgRatio;
        offsetX = (cw - drawW) * focalX;
        offsetY = 0;
      }
      ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
    };

    const computeScrollProgress = () => {
      const rect = heroTrack.getBoundingClientRect();
      const maxScroll = Math.max(
        1,
        heroTrack.offsetHeight - heroStage.offsetHeight
      );
      return clamp(-rect.top / maxScroll, 0, 1);
    };

    const updateOverlayChoreography = (p) => {
      const nextScrolled = p > 0.006 || window.scrollY > 10;
      if (nextScrolled !== scrolledStateRef.current) {
        scrolledStateRef.current = nextScrolled;
        onHeaderScrolledChange(nextScrolled);
      }

      if (scrollCueRef.current) {
        const cueOut = easeOutCubic(mapRange(p, 0.0, 0.08));
        scrollCueRef.current.style.opacity = (1 - cueOut).toFixed(3);
        scrollCueRef.current.style.transform = `translate3d(0, ${(-cueOut * 14).toFixed(1)}px, 0)`;
      }

      const titleOut = easeInOutCubic(mapRange(p, 0.0, 0.13));
      const subOut = easeInOutCubic(mapRange(p, 0.0, 0.1));

      if (titleLockupRef.current) {
        const titleOpacity = 1 - titleOut;
        const titleY = -titleOut * 28;
        const titleScale = 1 - titleOut * 0.04;
        const blurPx = prefersReducedMotion ? 0 : titleOut * 6;
        titleLockupRef.current.style.opacity = titleOpacity.toFixed(3);
        titleLockupRef.current.style.transform = `translate3d(0, ${titleY.toFixed(2)}px, 0) scale(${titleScale.toFixed(4)})`;
        titleLockupRef.current.style.filter =
          blurPx > 0.05 ? `blur(${blurPx.toFixed(2)}px)` : 'none';
      }

      if (subheadingRef.current) {
        subheadingRef.current.style.opacity = (1 - subOut).toFixed(3);
        subheadingRef.current.style.transform = `translate3d(0, ${(-subOut * 14).toFixed(2)}px, 0)`;
      }

      if (scrollRailThumbRef.current) {
        scrollRailThumbRef.current.style.transform = `translateY(${(p * 257).toFixed(1)}%)`;
      }
    };

    const renderLoop = (now) => {
      state.rafId = null;

      const dt = state.lastTime
        ? Math.min((now - state.lastTime) / 1000, 0.1)
        : 1 / 60;
      state.lastTime = now;

      const diff = state.targetProgress - state.currentProgress;
      if (prefersReducedMotion || Math.abs(diff) < 0.00035) {
        state.currentProgress = state.targetProgress;
      } else {
        const smoothFactor = 1 - Math.exp(-dt * 14);
        state.currentProgress += diff * smoothFactor;
        state.needsRender = true;
      }

      const curFlavorId = activeFlavorRef.current;
      const flavor = FLAVORS[curFlavorId];
      const count = state.frameCounts[curFlavorId] || DEFAULT_FRAME_COUNT;
      const startFrame = flavor.startFrame || 0;

      const videoProgress = mapRange(state.currentProgress, 0.08, 1.0, 0, 1);
      const targetFrameIdx = clamp(
        Math.round(startFrame + videoProgress * (count - 1 - startFrame)),
        startFrame,
        count - 1
      );

      if (
        state.needsRender ||
        state.lastDrawnFlavor !== curFlavorId ||
        state.lastDrawnIndex !== targetFrameIdx
      ) {
        const best = getBestAvailableFrame(curFlavorId, targetFrameIdx);
        if (best) {
          drawCoverFrame(best.img, flavor.focalX, flavor.focalY);
          state.lastDrawnFlavor = curFlavorId;
          state.lastDrawnIndex = best.index;
        }
        updateOverlayChoreography(state.currentProgress);
        state.needsRender = false;
      }

      if (Math.abs(state.targetProgress - state.currentProgress) >= 0.00035) {
        scheduleLoop();
      } else {
        state.lastTime = 0;
      }
    };

    const scheduleLoop = () => {
      if (state.rafId === null) {
        state.rafId = requestAnimationFrame(renderLoop);
      }
    };

    const preloadFlavor = (flavorId, isPrimary = false) => {
      const entry = getCache(flavorId);
      if (entry.started) return;
      entry.started = true;

      const count = state.frameCounts[flavorId] || DEFAULT_FRAME_COUNT;
      const startFrame = FLAVORS[flavorId]?.startFrame || 0;
      const order = [];
      const added = new Set();

      const pushIdx = (idx) => {
        if (idx >= 0 && idx < count && !added.has(idx)) {
          added.add(idx);
          order.push(idx);
        }
      };

      pushIdx(startFrame);
      pushIdx(count - 1);
      for (let i = startFrame; i < count; i += 8) pushIdx(i);
      for (let i = startFrame; i < count; i += 4) pushIdx(i);
      for (let i = startFrame; i < count; i += 2) pushIdx(i);
      for (let i = startFrame; i < count; i += 1) pushIdx(i);

      const concurrency = isPrimary ? 8 : 4;
      let cursor = 0;

      const loadNext = () => {
        if (cursor >= order.length) return;
        const idx = order[cursor++];
        const img = new Image();
        img.decoding = 'async';
        img.onload = () => {
          entry.images[idx] = img;
          entry.loadedCount += 1;
          if (flavorId === activeFlavorRef.current) {
            updateLoaderProgress(entry.loadedCount / count);
            state.needsRender = true;
            scheduleLoop();
          }
          loadNext();
        };
        img.onerror = loadNext;
        img.src = frameUrl(flavorId, idx);
      };

      for (let c = 0; c < concurrency; c++) loadNext();
    };

    const resizeCanvas = () => {
      const rect = heroStage.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.round(rect.width));
      const height = Math.max(1, Math.round(rect.height));

      if (
        width !== state.canvasWidth ||
        height !== state.canvasHeight ||
        dpr !== state.dpr
      ) {
        state.canvasWidth = width;
        state.canvasHeight = height;
        state.dpr = dpr;

        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        state.lastDrawnIndex = -1;
        state.needsRender = true;
        scheduleLoop();
      }
    };

    state.preloadFlavor = preloadFlavor;
    state.scheduleLoop = scheduleLoop;
    state.updateOverlay = updateOverlayChoreography;

    const onScroll = () => {
      state.targetProgress = computeScrollProgress();
      state.needsRender = true;
      scheduleLoop();
    };

    const onOrientationChange = () => setTimeout(resizeCanvas, 120);

    const onKeyDown = (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      if (
        document.activeElement &&
        ['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)
      ) {
        return;
      }
      const rect = heroTrack.getBoundingClientRect();
      if (rect.bottom <= 0) return;

      const idx = FLAVOR_ORDER.indexOf(activeFlavorRef.current);
      const nextIdx =
        e.key === 'ArrowRight'
          ? (idx + 1) % FLAVOR_ORDER.length
          : (idx - 1 + FLAVOR_ORDER.length) % FLAVOR_ORDER.length;
      onSelectFlavor(FLAVOR_ORDER[nextIdx], { resetScroll: true });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', resizeCanvas, { passive: true });
    window.addEventListener('orientationchange', onOrientationChange);
    window.addEventListener('keydown', onKeyDown);
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', resizeCanvas, {
        passive: true,
      });
    }

    let bgPreloadTimer;
    (async () => {
      try {
        const res = await fetch('/frames/manifest.json');
        if (res.ok) {
          const manifest = await res.json();
          for (const [id, info] of Object.entries(manifest.flavors || {})) {
            if (info && info.count) state.frameCounts[id] = info.count;
          }
        }
      } catch {
        // Fallback to DEFAULT_FRAME_COUNT
      }

      resizeCanvas();
      state.targetProgress = computeScrollProgress();
      state.currentProgress = state.targetProgress;
      preloadFlavor(activeFlavorRef.current, true);
      updateOverlayChoreography(state.currentProgress);
      scheduleLoop();

      bgPreloadTimer = setTimeout(() => {
        FLAVOR_ORDER.forEach((id) => {
          if (id !== activeFlavorRef.current) {
            preloadFlavor(id, false);
          }
        });
      }, 1000);
    })();

    return () => {
      clearTimeout(bgPreloadTimer);
      if (state.rafId !== null) cancelAnimationFrame(state.rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('orientationchange', onOrientationChange);
      window.removeEventListener('keydown', onKeyDown);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', resizeCanvas);
      }
    };
  }, [onHeaderScrolledChange, onSelectFlavor]);

  // React to flavor switch & hero scroll reset signal
  useEffect(() => {
    const prevFlavor = activeFlavorRef.current;
    activeFlavorRef.current = activeFlavor;
    const state = engineRef.current;

    if (state.preloadFlavor) {
      state.preloadFlavor(activeFlavor, true);
    }

    if (resetSignal > 0) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      state.targetProgress = 0;
      state.currentProgress = 0;
      state.lastTime = 0;
    }

    if (prevFlavor !== activeFlavor || resetSignal > 0) {
      const canvas = canvasRef.current;
      if (canvas) canvas.style.opacity = '0.78';
      requestAnimationFrame(() => {
        state.lastDrawnFlavor = null;
        state.lastDrawnIndex = -1;
        state.needsRender = true;
        if (state.updateOverlay) state.updateOverlay(state.currentProgress);
        if (state.scheduleLoop) state.scheduleLoop();
        requestAnimationFrame(() => {
          if (canvas) canvas.style.opacity = '1';
        });
      });
    }
  }, [activeFlavor, resetSignal]);

  return (
    <section
      id="hero"
      ref={heroTrackRef}
      aria-label="Power Crunch interactive scroll showcase"
      className="relative h-[310svh] w-full bg-[var(--bg-deep)] md:h-[360svh]"
    >
      <div
        id="heroStage"
        ref={heroStageRef}
        className="sticky top-0 isolate h-[100dvh] w-full overflow-hidden bg-[var(--bg-deep)] transition-colors duration-500"
      >
        {/* Full-Screen Cover WebP Canvas */}
        <canvas
          id="heroCanvas"
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 z-[1] block h-full w-full object-cover transition-opacity duration-220 will-change-[contents,opacity]"
        />

        {/* Subtle Atmospheric Vignette Scrim */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(180deg,rgba(8,4,3,0.46)_0%,rgba(8,4,3,0.08)_24%,rgba(8,4,3,0)_52%,rgba(8,4,3,0.12)_78%,rgba(8,4,3,0.62)_100%)]"
        />

        {/* Subtle Top Frame Preload Progress Bar */}
        <div
          ref={loaderBarRef}
          aria-hidden="true"
          className="pointer-events-none fixed top-0 right-0 left-0 z-60 h-[2px] opacity-100 transition-opacity duration-500"
        >
          <div
            ref={loaderBarFillRef}
            className="h-full w-0 bg-[var(--accent)] transition-[width] duration-200 ease-linear"
          />
        </div>

        {/* Hero Typography: Visible at scroll 0, smoothly fades out on scroll */}
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-6 text-center md:px-[clamp(24px,8vw,96px)]">
          <div
            id="heroTitleLockup"
            ref={titleLockupRef}
            className="flex max-w-[min(760px,88vw)] flex-col items-center justify-center opacity-100 will-change-[transform,opacity,filter]"
          >
            <h1 className="whitespace-nowrap font-display text-[clamp(1.85rem,8.8vw,2.9rem)] font-black uppercase leading-[0.98] tracking-[-0.02em] text-white [text-shadow:0_6px_26px_rgba(0,0,0,0.5),0_2px_8px_rgba(0,0,0,0.42)] md:text-[clamp(1.95rem,5.4vw,4.65rem)] md:tracking-[-0.025em]">
              POWER CRUNCH
            </h1>
            <p
              id="heroSubheading"
              ref={subheadingRef}
              className="mt-[clamp(10px,1.4vh,15px)] pl-[0.22em] font-sans text-[clamp(0.68rem,2.8vw,0.92rem)] font-semibold uppercase tracking-[0.22em] text-[#fff8f2]/92 [text-shadow:0_3px_14px_rgba(0,0,0,0.58),0_1px_4px_rgba(0,0,0,0.45)] will-change-[transform,opacity] md:pl-[0.3em] md:text-[clamp(0.74rem,1.28vw,1.05rem)] md:tracking-[0.3em]"
            >
              Protein Energy Bar
            </p>
          </div>
        </div>

        {/* Scroll Cue */}
        <div
          id="scrollCue"
          ref={scrollCueRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-[calc(max(14px,env(safe-area-inset-bottom))+88px)] z-12 flex flex-col items-center gap-2 will-change-[opacity,transform] md:bottom-[calc(max(16px,env(safe-area-inset-bottom))+92px)]"
        >
          <span className="pl-[0.22em] text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white/85 [text-shadow:0_2px_10px_rgba(0,0,0,0.5)]">
            Scroll to unleash
          </span>
          <span className="flex h-[33px] w-[21px] justify-center rounded-full border-[1.5px] border-white/62 bg-black/16 pt-1.5 backdrop-blur-sm">
            <span className="animate-scroll-wheel h-1.5 w-[3px] rounded-full bg-white" />
          </span>
        </div>

        {/* Bottom 3-Flavor Switcher Dock */}
        <div className="pointer-events-none absolute right-0 bottom-[max(16px,env(safe-area-inset-bottom))] left-0 z-20 flex flex-col items-center gap-2 px-3">
          <span className="pl-[0.24em] text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-white/68 [text-shadow:0_2px_8px_rgba(0,0,0,0.55)]">
            SELECT FLAVOR
          </span>
          <div
            role="tablist"
            aria-label="Choose Power Crunch flavor"
            className="no-scrollbar pointer-events-auto inline-flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] p-1 shadow-[0_14px_36px_rgba(0,0,0,0.42)] backdrop-blur-xl md:gap-1.5 md:p-[5px]"
          >
            {FLAVOR_ORDER.map((id) => {
              const flavor = FLAVORS[id];
              const isActive = activeFlavor === id;
              return (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  data-flavor-id={id}
                  onClick={() => onSelectFlavor(id, { resetScroll: true })}
                  onPointerEnter={() =>
                    engineRef.current.preloadFlavor &&
                    engineRef.current.preloadFlavor(id, false)
                  }
                  className={[
                    'inline-flex min-h-[38px] shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-2 text-[0.68rem] font-semibold tracking-[0.01em] transition-[background-color,border-color,color,transform] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] min-[391px]:px-2.5 min-[391px]:text-[0.72rem] md:gap-2 md:px-[clamp(12px,1.8vw,18px)] md:py-[9px] md:text-[clamp(0.74rem,1.25vw,0.85rem)]',
                    isActive
                      ? 'is-active border-transparent bg-[var(--accent)] text-[var(--accent-cta-text)] shadow-[0_4px_18px_rgba(var(--accent-rgb),0.35)]'
                      : 'border-transparent bg-transparent text-white/80 hover:bg-white/8 hover:text-white',
                  ].join(' ')}
                >
                  <span
                    aria-hidden="true"
                    className={[
                      'h-[7px] w-[7px] shrink-0 rounded-full min-[391px]:h-[9px] min-[391px]:w-[9px]',
                      flavor.swatchClass,
                      isActive
                        ? 'shadow-[0_0_0_2px_rgba(0,0,0,0.25)]'
                        : 'shadow-[0_0_0_2px_rgba(255,255,255,0.22)]',
                    ].join(' ')}
                  />
                  <span>{flavor.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Minimal Right-Side Scroll Progress Rail */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-[clamp(14px,2.5vw,32px)] z-15 hidden -translate-y-1/2 md:block"
        >
          <div className="h-[112px] w-[3px] overflow-hidden rounded-full bg-white/16">
            <div
              ref={scrollRailThumbRef}
              className="h-[28%] w-full rounded-full bg-[var(--accent)] transition-colors duration-450 will-change-transform"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
