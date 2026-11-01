"use strict";
var InductionLab;
(function (InductionLab) {
    const copper = [.66, .32, .13], orange = [.93, .46, .12];
    const leadRed = [.72, .12, .14], leadBlack = [.10, .14, .17];
    const component = (geometry, color, shine = .3) => ({ geometry, color, shine });
    InductionLab.METER_RED = [2.17, .15, 1.0], InductionLab.METER_BLACK = [2.82, .15, 1.0];
    function magnetParts() { return [component(InductionLab.box([0, .24, 0], [.24, .48, .22]), [.16, .31, .70]), component(InductionLab.box([0, -.24, 0], [.24, .48, .22]), [.79, .17, .17]), component(InductionLab.box([0, 0, .115], [.24, .02, .01]), [.95, .94, .83])]; }
    InductionLab.magnetParts = magnetParts;
    function holdingHandParts() {
        // 첫 실험에서는 자석 윗부분을 손으로 잡는다. 모형 손도 자석과 같은 프레임을 따라간다.
        const glove = [.89, .88, .80], cuff = [.36, .46, .50];
        const parts = [component(InductionLab.ellipsoid([.39, .27, .015], [.23, .18, .11]), glove, .1),
            component(InductionLab.cylinder([.55, .27, 0], [.78, .27, -.015], .12), cuff, .1)];
        for (const y of [.38, .28, .18])
            parts.push(component(InductionLab.tube([[.36, y, .08], [.20, y, .15], [.04, y, .155], [-.08, y, .13]], .043), glove, .1));
        parts.push(component(InductionLab.tube([[.37, .13, 0], [.20, .10, -.15], [.06, .17, -.15]], .055), glove, .1));
        return parts;
    }
    InductionLab.holdingHandParts = holdingHandParts;
    function coilParts() {
        const points = [];
        for (let i = 0; i <= 480; i++) {
            const a = i / 480 * Math.PI * 2 * 12;
            points.push([.39 * Math.cos(a), -.18 + i / 480 * .36, .39 * Math.sin(a)]);
        }
        return [component(InductionLab.tube(points, .026), copper, .65), component(InductionLab.box([0, -.28, 0], [.90, .14, .76]), [.22, .28, .25]),
            component(InductionLab.cylinder([-.27, -.20, .40], [-.27, -.07, .40], .055), leadRed), component(InductionLab.cylinder([.27, -.20, .40], [.27, -.07, .40], .055), leadBlack)];
    }
    InductionLab.coilParts = coilParts;
    function meterParts() {
        return [component(InductionLab.box([2.5, .49, .51], [1.26, .94, .55]), orange),
            component(InductionLab.box([2.5, .60, .795], [1.07, .62, .025]), [.94, .94, .85]), component(InductionLab.box([2.5, .12, .54], [1.34, .20, .70]), [.18, .24, .25]),
            component(InductionLab.cylinder(InductionLab.METER_RED, InductionLab.add(InductionLab.METER_RED, [0, .14, 0]), .065), leadRed), component(InductionLab.cylinder(InductionLab.METER_BLACK, InductionLab.add(InductionLab.METER_BLACK, [0, .14, 0]), .065), leadBlack),
            component(InductionLab.box([2.5, .82, .82], [.016, .08, .012]), [.15, .22, .20]), component(InductionLab.box([2.11, .62, .82], [.08, .016, .012]), [.15, .22, .20]), component(InductionLab.box([2.89, .62, .82], [.08, .016, .012]), [.15, .22, .20])];
    }
    InductionLab.meterParts = meterParts;
    function wirePart(from, to, red) {
        const points = [from, InductionLab.add(from, [0, -.15, .20]), [from[0] + .3, .15, 1.20], [1.8, .09, 1.40], InductionLab.add(to, [0, -.03, .20]), to];
        return component(InductionLab.tube(points, .024), red ? leadRed : leadBlack, .2);
    }
    InductionLab.wirePart = wirePart;
    function needlePart() { return component(InductionLab.cylinder([0, 0, 0], [0, .37, 0], .014, 8), [.12, .20, .18]); }
    InductionLab.needlePart = needlePart;
})(InductionLab || (InductionLab = {}));
