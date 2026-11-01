"use strict";
var InductionLab;
(function (InductionLab) {
    class ExperimentPlayback {
        constructor(onFrame, onStatus) {
            this.onFrame = onFrame;
            this.onStatus = onStatus;
            this.status = 'idle';
            this.index = 0;
            this.replays = 0;
            this.frames = [];
            this.request = 0;
            this.started = null;
            this.elapsed = 0;
        }
        load(frames) { this.cancel(); this.frames = frames; this.index = 0; this.elapsed = 0; this.replays = 0; this.status = 'idle'; }
        play() {
            if (!this.frames.length || this.status === 'running')
                return;
            if (this.status === 'done')
                this.replays = Math.min(999, this.replays + 1);
            this.index = 0;
            this.elapsed = 0;
            this.start();
        }
        start() { this.started = null; this.status = 'running'; this.onStatus(); this.request = requestAnimationFrame(t => this.tick(t)); }
        tick(time) {
            if (this.status !== 'running')
                return;
            // 첫 화면의 시각을 기준으로 잡는다. 클릭 시각과 섞으면 첫 프레임이 음수가 될 수 있다.
            if (this.started === null)
                this.started = time - this.elapsed;
            this.elapsed = Math.max(this.elapsed, time - this.started, 0);
            this.index = Math.max(0, Math.min(this.frames.length - 1, Math.floor(this.elapsed / 1000 * 60)));
            this.onFrame();
            if (this.index === this.frames.length - 1) {
                this.status = 'done';
                this.onStatus();
                return;
            }
            this.request = requestAnimationFrame(t => this.tick(t));
        }
        pause() { if (this.status !== 'running')
            return; this.cancel(); this.status = 'paused'; this.onStatus(); }
        resume() { if (this.status === 'paused')
            this.start(); }
        cancel() { cancelAnimationFrame(this.request); }
        current() { return this.frames[this.index]; }
    }
    InductionLab.ExperimentPlayback = ExperimentPlayback;
    function bindExperimentGesture(canvas, getPosition, canPlay, start) {
        let origin = null, id = null;
        canvas.addEventListener('pointerdown', e => {
            if (!canPlay() || e.button !== 0 || id !== null)
                return;
            const r = canvas.getBoundingClientRect(), p = getPosition();
            const point = { x: e.clientX - r.left, y: e.clientY - r.top };
            if (Math.hypot(point.x - p.x, point.y - p.y) > 55)
                return;
            origin = point;
            id = e.pointerId;
            canvas.setPointerCapture(id);
            e.preventDefault();
        });
        canvas.addEventListener('pointerup', e => {
            if (id !== e.pointerId || !origin)
                return;
            const r = canvas.getBoundingClientRect(), delta = e.clientY - r.top - origin.y;
            id = null;
            origin = null;
            if (canvas.hasPointerCapture(e.pointerId))
                canvas.releasePointerCapture(e.pointerId);
            if (Math.abs(delta) > 20)
                start();
        });
        const cancel = () => { id = null; origin = null; };
        canvas.addEventListener('pointercancel', cancel);
        canvas.addEventListener('lostpointercapture', cancel);
    }
    InductionLab.bindExperimentGesture = bindExperimentGesture;
})(InductionLab || (InductionLab = {}));
