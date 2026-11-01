"use strict";
var InductionLab;
(function (InductionLab) {
    InductionLab.add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
    InductionLab.sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
    InductionLab.scale = (a, n) => [a[0] * n, a[1] * n, a[2] * n];
    InductionLab.dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
    InductionLab.cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
    InductionLab.unit = (a) => InductionLab.scale(a, 1 / (Math.hypot(...a) || 1));
    InductionLab.clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
    function multiply(a, b) {
        const out = new Float32Array(16);
        for (let c = 0; c < 4; c++)
            for (let r = 0; r < 4; r++)
                for (let k = 0; k < 4; k++)
                    out[c * 4 + r] += a[k * 4 + r] * b[c * 4 + k];
        return out;
    }
    InductionLab.multiply = multiply;
    function lookAt(eye, target) {
        const z = InductionLab.unit(InductionLab.sub(eye, target)), x = InductionLab.unit(InductionLab.cross([0, 1, 0], z)), y = InductionLab.cross(z, x);
        return new Float32Array([x[0], y[0], z[0], 0, x[1], y[1], z[1], 0, x[2], y[2], z[2], 0, -InductionLab.dot(x, eye), -InductionLab.dot(y, eye), -InductionLab.dot(z, eye), 1]);
    }
    InductionLab.lookAt = lookAt;
    function orthographic(w, h) {
        return new Float32Array([2 / w, 0, 0, 0, 0, 2 / h, 0, 0, 0, 0, -2 / 40, 0, 0, 0, -1, 1]);
    }
    InductionLab.orthographic = orthographic;
})(InductionLab || (InductionLab = {}));
