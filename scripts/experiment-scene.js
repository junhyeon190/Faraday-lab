"use strict";
var InductionLab;
(function (InductionLab) {
    class ExperimentScene {
        constructor(canvas) {
            this.wirePosition = '';
            this.renderer = new InductionLab.Renderer(canvas);
            const make = (p) => p.map(x => this.renderer.mesh(x));
            this.table = make(InductionLab.tableParts());
            this.stand = make(InductionLab.standParts());
            this.clamp = make(InductionLab.clampParts());
            this.knob = make(InductionLab.knobParts(true));
            this.closedClamp = make(InductionLab.clampParts(true));
            this.hand = make(InductionLab.holdingHandParts());
            this.magnet = make(InductionLab.magnetParts());
            this.coil = make(InductionLab.coilParts());
            this.meter = make(InductionLab.meterParts());
            this.wires = make([InductionLab.wirePart([1, .6, .4], InductionLab.METER_RED, true), InductionLab.wirePart([1, .6, .4], InductionLab.METER_BLACK, false)]);
            this.needle = this.renderer.mesh(InductionLab.needlePart());
            this.cover = this.renderer.mesh({ geometry: InductionLab.box([2.5, .60, .84], [1.09, .65, .025]), color: [.25, .33, .33] });
        }
        axis(mode) { return mode === 'coil' ? .33 : .95; }
        coilPort(mode, y, red) { return [this.axis(mode) + (red ? -.27 : .27), y - .07, .40]; }
        draw(record, frame, mode, view, showNeedle) {
            this.renderer.begin(view);
            const draw = (meshes, offset = [0, 0, 0]) => meshes.forEach(m => this.renderer.draw(m, offset));
            draw(this.table);
            draw(this.stand);
            draw(record.fixStep >= 2 ? this.closedClamp : this.clamp, InductionLab.PORT);
            draw(this.knob, InductionLab.PORT);
            draw(this.meter);
            const x = this.axis(mode), coilY = record.setupStep === 0 ? .30 : frame.coilY;
            draw(this.coil, [record.setupStep === 0 ? 1.3 : x, coilY, record.setupStep === 0 ? 1.2 : 0]);
            draw(this.magnet, [x, frame.magnetY, 0]);
            if (record.fixStep < 2)
                draw(this.hand, [x, frame.magnetY, 0]);
            const position = `${x}:${coilY}`;
            if (position !== this.wirePosition) {
                this.wirePosition = position;
                this.renderer.update(this.wires[0], InductionLab.wirePart(this.coilPort(mode, coilY, true), InductionLab.METER_RED, true));
                this.renderer.update(this.wires[1], InductionLab.wirePart(this.coilPort(mode, coilY, false), InductionLab.METER_BLACK, false));
            }
            if (record.setupStep >= 3)
                this.renderer.draw(this.wires[0]);
            if (record.setupStep >= 5)
                this.renderer.draw(this.wires[1]);
            if (showNeedle)
                this.renderer.draw(this.needle, [2.5, .43, .825], false, -frame.needle);
            else
                this.renderer.draw(this.cover);
        }
    }
    InductionLab.ExperimentScene = ExperimentScene;
})(InductionLab || (InductionLab = {}));
