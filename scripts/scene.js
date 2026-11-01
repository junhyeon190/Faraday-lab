"use strict";
var InductionLab;
(function (InductionLab) {
    class LabScene {
        constructor(canvas) {
            this.renderer = new InductionLab.Renderer(canvas);
            this.table = InductionLab.tableParts().map(p => this.renderer.mesh(p));
            this.stand = InductionLab.standParts().map(p => this.renderer.mesh(p));
            this.clamp = InductionLab.clampParts().map(p => this.renderer.mesh(p));
            this.looseKnob = InductionLab.knobParts(false).map(p => this.renderer.mesh(p));
            this.tightKnob = InductionLab.knobParts(true).map(p => this.renderer.mesh(p));
        }
        draw(state) {
            this.renderer.begin(state.view);
            this.table.forEach(m => this.renderer.draw(m));
            this.stand.forEach(m => this.renderer.draw(m));
            this.clamp.forEach(m => this.renderer.draw(m, state.clampPosition, state.stage === 'holding'));
            (state.stage === 'fixed' ? this.tightKnob : this.looseKnob).forEach(m => this.renderer.draw(m, state.clampPosition, state.stage === 'holding'));
        }
        port() { return this.renderer.project(InductionLab.PORT); }
        handle(state) { return this.renderer.project(InductionLab.add(state.clampPosition, [1.18, 0, 0])); }
        clampEnd(state) { return this.renderer.project(state.clampPosition); }
        standLabel() { return this.renderer.project([-1.45, 3.80, 0]); }
    }
    InductionLab.LabScene = LabScene;
})(InductionLab || (InductionLab = {}));
