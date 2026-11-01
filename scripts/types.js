"use strict";
var InductionLab;
(function (InductionLab) {
    InductionLab.PORT = [-1.45, 2.42, 0];
    InductionLab.TRAY = [.72, .35, .62];
    InductionLab.LABELS = {
        ready: '조립 전', holding: '클램프 선택됨', inserted: '나사 조임 전', fixed: '고정 완료'
    };
    function initialState() { return { stage: 'ready', view: 'angled', clampPosition: [...InductionLab.TRAY] }; }
    InductionLab.initialState = initialState;
})(InductionLab || (InductionLab = {}));
