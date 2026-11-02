"use strict";
var InductionLab;
(function (InductionLab) {
    InductionLab.PAIR_STEPS = ['hypothesis', 'predict', 'plan', 'observe0', 'observe1', 'observe2', 'transfer', 'practical', 'speed', 'judge', 'finish', 'history'];
    InductionLab.PAIR_CONDITIONS = ['① 가까이에 정지', '② 가까워지는 동안', '③ 멀어지는 동안'];
    function freshPair() { return { stage: 'hypothesis', members: 2, condition: 0, observed: [false, false, false], confirmations: {} }; }
    InductionLab.freshPair = freshPair;
    function pairStep(state) { return state.stage === 'observe' ? ['observe0', 'observe1', 'observe2'][state.condition] : state.stage; }
    InductionLab.pairStep = pairStep;
    function pairRecords(state) { return [...(state.confirmations[pairStep(state)] ?? Array.from({ length: state.members }, () => false))]; }
    InductionLab.pairRecords = pairRecords;
    function allRecorded(state, records) { return records.length === state.members && records.every(Boolean); }
    InductionLab.allRecorded = allRecorded;
    function canPairAdvance(state, records) {
        if (state.stage === 'history')
            return false;
        if (state.stage === 'finish')
            return true;
        return allRecorded(state, records) && (state.stage !== 'observe' || state.observed[state.condition]);
    }
    InductionLab.canPairAdvance = canPairAdvance;
    function movePair(state, direction, records) {
        const index = InductionLab.PAIR_STEPS.indexOf(pairStep(state)), step = InductionLab.PAIR_STEPS[index + direction];
        if (!step)
            return state;
        const confirmations = { ...state.confirmations, [pairStep(state)]: [...records] };
        const condition = ['observe0', 'observe1', 'observe2'].indexOf(step);
        return condition >= 0 ? { ...state, stage: 'observe', condition, confirmations } : { ...state, stage: step, confirmations };
    }
    function pairTransition(state, action) {
        if (action.type === 'reset')
            return freshPair();
        // 실제 증거로 가설을 판단한 뒤에만 발견 조건과 해설을 공개한다.
        if (action.type === 'history')
            return state.stage === 'finish' ? { ...state, stage: 'history' } : state;
        if (action.type === 'return')
            return state.stage === 'history' ? { ...state, stage: 'finish' } : state;
        if (action.type === 'members' && state.stage === 'hypothesis')
            return state.members === action.count ? state : { ...freshPair(), members: action.count };
        if (action.type === 'previous')
            return movePair(state, -1, action.records);
        if (action.type === 'observed' && state.stage === 'observe')
            return { ...state, observed: state.observed.map((v, i) => v || i === state.condition) };
        if (action.type === 'replay' && state.stage === 'observe')
            return { ...state, observed: state.observed.map((v, i) => i === state.condition ? false : v), confirmations: { ...state.confirmations, [pairStep(state)]: Array.from({ length: state.members }, () => false) } };
        if (action.type !== 'advance' || !canPairAdvance(state, action.records))
            return state;
        return movePair(state, 1, action.records);
    }
    InductionLab.pairTransition = pairTransition;
    function pairOperator(state, condition = state.condition) { return condition % state.members + 1; }
    InductionLab.pairOperator = pairOperator;
})(InductionLab || (InductionLab = {}));
