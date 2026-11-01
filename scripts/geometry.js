"use strict";
var InductionLab;
(function (InductionLab) {
    function triangle(g, a, b, c, n) {
        const normal = n || InductionLab.unit(InductionLab.cross(InductionLab.sub(b, a), InductionLab.sub(c, a)));
        g.vertices.push(...a, ...b, ...c);
        g.normals.push(...normal, ...normal, ...normal);
    }
    function box(center, size) {
        const g = { vertices: [], normals: [] };
        const p = (x, y, z) => InductionLab.add(center, [x * size[0] / 2, y * size[1] / 2, z * size[2] / 2]);
        const faces = [
            [p(-1, -1, 1), p(1, -1, 1), p(1, 1, 1), p(-1, 1, 1)],
            [p(1, -1, -1), p(-1, -1, -1), p(-1, 1, -1), p(1, 1, -1)],
            [p(-1, -1, -1), p(-1, -1, 1), p(-1, 1, 1), p(-1, 1, -1)],
            [p(1, -1, 1), p(1, -1, -1), p(1, 1, -1), p(1, 1, 1)],
            [p(-1, 1, 1), p(1, 1, 1), p(1, 1, -1), p(-1, 1, -1)],
            [p(-1, -1, -1), p(1, -1, -1), p(1, -1, 1), p(-1, -1, 1)]
        ];
        faces.forEach(([a, b, c, d]) => { triangle(g, a, b, c); triangle(g, a, c, d); });
        return g;
    }
    InductionLab.box = box;
    function cylinder(a, b, r, segments = 24) {
        const g = { vertices: [], normals: [] }, axis = InductionLab.unit(InductionLab.sub(b, a));
        const u = InductionLab.unit(InductionLab.cross(axis, Math.abs(axis[1]) < .9 ? [0, 1, 0] : [1, 0, 0])), v = InductionLab.cross(axis, u);
        const n = (t) => InductionLab.add(InductionLab.scale(u, Math.cos(t)), InductionLab.scale(v, Math.sin(t)));
        for (let i = 0; i < segments; i++) {
            const n0 = n(i * 2 * Math.PI / segments), n1 = n((i + 1) * 2 * Math.PI / segments);
            const a0 = InductionLab.add(a, InductionLab.scale(n0, r)), a1 = InductionLab.add(a, InductionLab.scale(n1, r)), b0 = InductionLab.add(b, InductionLab.scale(n0, r)), b1 = InductionLab.add(b, InductionLab.scale(n1, r));
            g.vertices.push(...a0, ...a1, ...b1, ...a0, ...b1, ...b0);
            g.normals.push(...n0, ...n1, ...n1, ...n0, ...n1, ...n0);
            triangle(g, a, a1, a0, InductionLab.scale(axis, -1));
            triangle(g, b, b0, b1, axis);
        }
        return g;
    }
    InductionLab.cylinder = cylinder;
    function ellipsoid(center, r) {
        const g = { vertices: [], normals: [] };
        const p = (a, b) => [Math.sin(a) * Math.cos(b), Math.cos(a), Math.sin(a) * Math.sin(b)];
        const vertex = (n) => { g.vertices.push(...InductionLab.add(center, [n[0] * r[0], n[1] * r[1], n[2] * r[2]])); g.normals.push(...InductionLab.unit([n[0] / r[0], n[1] / r[1], n[2] / r[2]])); };
        for (let i = 0; i < 12; i++)
            for (let j = 0; j < 24; j++) {
                const a = i * Math.PI / 12, b = j * Math.PI / 12, c = (i + 1) * Math.PI / 12, d = (j + 1) * Math.PI / 12;
                [p(a, b), p(c, b), p(c, d), p(a, b), p(c, d), p(a, d)].forEach(vertex);
            }
        return g;
    }
    InductionLab.ellipsoid = ellipsoid;
    function tube(points, r) {
        const g = { vertices: [], normals: [] };
        for (let i = 1; i < points.length; i++) {
            const s = cylinder(points[i - 1], points[i], r, 12);
            g.vertices.push(...s.vertices);
            g.normals.push(...s.normals);
        }
        return g;
    }
    InductionLab.tube = tube;
})(InductionLab || (InductionLab = {}));
