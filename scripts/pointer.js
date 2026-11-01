"use strict";
var InductionLab;
(function (InductionLab) {
    function bindPointer(canvas, scene, hooks) {
        let pointer = null, start = { x: 0, y: 0 }, origin = [...InductionLab.TRAY], moved = false;
        const point = (e) => { const r = canvas.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
        canvas.addEventListener('pointerdown', e => {
            if (e.button !== 0 || pointer !== null)
                return;
            const state = hooks.getState();
            if (state.stage === 'fixed' || state.stage === 'inserted')
                return;
            const pos = point(e), a = scene.clampEnd(state), b = scene.handle(state);
            const vx = b.x - a.x, vy = b.y - a.y, t = InductionLab.clamp(((pos.x - a.x) * vx + (pos.y - a.y) * vy) / (vx * vx + vy * vy || 1), 0, 1);
            if (Math.hypot(pos.x - a.x - t * vx, pos.y - a.y - t * vy) > 48)
                return;
            pointer = e.pointerId;
            start = pos;
            origin = [...state.clampPosition];
            moved = false;
            hooks.select();
            canvas.setPointerCapture(e.pointerId);
            e.preventDefault();
        });
        canvas.addEventListener('pointermove', e => {
            if (pointer !== e.pointerId)
                return;
            const pos = point(e), dx = pos.x - start.x, dy = pos.y - start.y;
            if (Math.hypot(dx, dy) > 6)
                moved = true;
            if (!moved)
                return;
            const d = scene.renderer.dragDelta(dx, dy);
            hooks.move([InductionLab.clamp(origin[0] + d[0], -3.2, 2.4), InductionLab.clamp(origin[1] + d[1], .25, 3.65), origin[2]]);
            e.preventDefault();
        });
        const finish = (e, cancelled) => {
            if (pointer !== e.pointerId)
                return;
            pointer = null;
            if (canvas.hasPointerCapture(e.pointerId))
                canvas.releasePointerCapture(e.pointerId);
            if (cancelled) {
                hooks.drop(false);
                return;
            }
            if (moved) {
                const a = scene.clampEnd(hooks.getState()), b = scene.port();
                hooks.drop(Math.hypot(a.x - b.x, a.y - b.y) < 65);
            }
            else
                hooks.redraw();
        };
        canvas.addEventListener('pointerup', e => finish(e, false));
        canvas.addEventListener('pointercancel', e => finish(e, true));
        canvas.addEventListener('lostpointercapture', () => { if (pointer !== null) {
            pointer = null;
            hooks.drop(false);
        } });
    }
    InductionLab.bindPointer = bindPointer;
})(InductionLab || (InductionLab = {}));
