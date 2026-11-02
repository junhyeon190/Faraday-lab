"use strict";
var InductionLab;
(function (InductionLab) {
    let state = InductionLab.freshPair(), view = 'angled', fault = false, records = [false, false];
    const canvas = InductionLab.el('experimentCanvas'), trials = InductionLab.buildTeacherTrials();
    const apparatus = { ...InductionLab.freshRecord(), setupStep: 5 };
    let scene, frame = { time: 0, magnetY: 2.05, coilY: .7, flux: 0, emf: 0, needle: 0 };
    const player = new InductionLab.ExperimentPlayback(() => { frame = player.current(); draw(); }, () => {
        frame = player.current();
        if (player.status === 'done')
            state = InductionLab.pairTransition(state, { type: 'observed' });
        renderPanel();
        draw();
    });
    function readingVisible() { return !fault && state.stage === 'observe' && player.status !== 'idle'; }
    function position(id, p, dy = 0) { const xy = scene.renderer.project(p); InductionLab.el(id).style.left = `${xy.x}px`; InductionLab.el(id).style.top = `${xy.y + dy}px`; }
    function draw() {
        if (fault || !scene || state.stage === 'history')
            return;
        const actual = ['transfer', 'practical', 'judge', 'finish'].includes(state.stage), mode = actual ? 'coil' : 'magnet';
        apparatus.fixStep = actual ? 2 : 0;
        const show = readingVisible();
        scene.draw(apparatus, frame, mode, view, show);
        const x = scene.axis(mode);
        position('magnetLabel', [x + .93, frame.magnetY + .72, 0], -5);
        InductionLab.el('magnetLabel').textContent = `자석 · ${actual ? '집게로 고정' : '손으로 잡음'}\n위 남극 / 아래 북극`;
        position('coilLabel', [x, frame.coilY, 0], 48);
        position('meterLabel', [2.5, 1.05, .5], -5);
        InductionLab.el('instrumentLock').hidden = show;
        InductionLab.el('instrumentReadout').hidden = !show;
        if (show)
            InductionLab.drawInstrument(player.frames, player.index, player.status);
        InductionLab.el('motionPhase').hidden = state.stage !== 'observe';
        InductionLab.el('motionPhase').textContent = player.status === 'idle' ? '관찰 준비' : player.status === 'paused' ? '재생 일시 정지' : state.condition === 0 ? '두 기구 정지 · 관찰 중' : frame.time >= 3 ? '자석을 멈춘 뒤 · 관찰 중' : '자석을 움직이는 동안';
        if (state.stage === 'observe' && player.status === 'done')
            InductionLab.el('motionPhase').textContent = '관찰 완료 · 각자 B에 기록';
    }
    function renderPanel() {
        const views = { plan: () => InductionLab.pairPlanView(state, records), speed: () => InductionLab.pairSpeedView(state, records), predict: () => InductionLab.pairPredictionView(state, records), observe: () => InductionLab.pairObservationView(state, player.status, records), hypothesis: () => InductionLab.pairHypothesisView(state, records), transfer: () => InductionLab.pairTransferView(state, records), practical: () => InductionLab.pairPracticalView(state, records), judge: () => InductionLab.pairJudgmentView(state, records), finish: InductionLab.pairFinishView, history: () => '' };
        InductionLab.el('flowPanel').innerHTML = views[state.stage]();
        renderNavigation();
    }
    function renderNavigation() {
        const previous = InductionLab.el('previousStep'), next = InductionLab.el('nextStep');
        previous.disabled = fault || state.stage === 'hypothesis';
        next.disabled = fault || !InductionLab.canPairAdvance(state, records);
        previous.title = state.stage === 'hypothesis' ? '첫 단계입니다.' : '확인한 기록을 유지하고 이전 단계로 이동해요.';
        next.title = state.stage === 'history' ? '마지막 단계입니다.' : next.disabled ? '현재 단계의 관찰과 각자의 기록 확인을 마쳐 주세요.' : state.stage === 'finish' ? '패러데이와 과학의 본성 읽기로 이동해요.' : '다음 단계로 이동해요.';
        document.querySelectorAll('#flowPanel [data-action="advance"]').forEach(b => b.disabled = next.disabled);
    }
    function render() {
        const history = state.stage === 'history';
        InductionLab.el('experimentLayout').hidden = history;
        InductionLab.el('historyReader').hidden = !history;
        InductionLab.el('historyReader').innerHTML = history ? InductionLab.pairHistoryView() : '';
        renderPanel();
        const titles = { plan: '같은 가설로 실제 조건 예상하기', speed: '같은 구간 · 느리게와 빠르게 비교', predict: '코일은 고정 · 자석의 세 조건', observe: '코일은 고정 · 자석의 상태 바꾸기', hypothesis: '외르스테드의 발견에서 새로운 질문으로', transfer: '실제 장치 연결·역할 확인', practical: '교실의 장치로 직접 확인하기', judge: '실제 관찰로 내 가설 판단하기', finish: '기록을 가지고 전체 수업으로', history: '패러데이와 과학의 본성' };
        const labels = { plan: '2.2 C · 비교 계획', speed: '2.4 E-2 · 빠르기 비교', predict: '2.2 B · 나의 예측', observe: '2.3 B · 짝과 가상 관찰', hypothesis: '2.1 A · 첫 가설', transfer: '2.4 D · 실제 장치 준비', practical: '2.4 E · 실제 실험', judge: '2.5 F · 가설 판단', finish: '3 · 정리로 연결', history: '3 · 과학사로 정리' };
        InductionLab.el('experimentTitle').textContent = titles[state.stage];
        InductionLab.el('modeLabel').textContent = labels[state.stage];
        InductionLab.el('experimentBadge').textContent = state.stage === 'observe' ? `${state.condition + 1} / 3 조건` : `${state.members}명 함께`;
        InductionLab.el('instrumentLock').textContent = state.stage === 'predict' ? '각자 B의 세 예측을 먼저 기록해요.' : state.stage === 'observe' ? '‘이 조건 관찰하기’를 누르면 검류계를 볼 수 있어요.' : state.stage === 'hypothesis' ? 'A에 가설과 까닭을 먼저 기록해요.' : state.stage === 'plan' ? 'C에 예측과 비교 계획을 먼저 기록해요.' : '실제 장치의 바늘 반응은 E에 새로 기록해요.';
        InductionLab.el('experimentHint').textContent = state.stage === 'observe' ? '같은 극·기울기·직선 경로 · 오른쪽 버튼으로 관찰' : state.stage === 'speed' ? '코일 고정 · 같은 구간에서 자석 넣기' : state.stage === 'transfer' || state.stage === 'practical' ? '④~⑥ 자석 고정 배치 예시 · ①~③은 코일 고정' : '전지 없는 회로 · 같은 자석과 코일';
        const nav = ['finish', 'history'].includes(state.stage) ? 'history' : ['transfer', 'practical', 'speed', 'judge'].includes(state.stage) ? 'transfer' : state.stage === 'plan' ? 'predict' : state.stage;
        document.querySelectorAll('[data-phase]').forEach(x => { if (x.dataset.phase === nav)
            x.setAttribute('aria-current', 'step');
        else
            x.removeAttribute('aria-current'); });
        draw();
    }
    function prepare() {
        player.load(trials[state.stage === 'observe' ? state.condition : 0]);
        frame = state.stage === 'observe' ? player.current() : { time: 0, magnetY: 2.05, coilY: .7, flux: 0, emf: 0, needle: 0 };
        InductionLab.el('traceLine').setAttribute('points', '');
        InductionLab.el('gaugeNeedle').removeAttribute('transform');
        InductionLab.el('gauge').setAttribute('aria-label', '검류계 · 관찰 전');
        InductionLab.el('playStatus').textContent = '관찰 전';
    }
    function go(action) {
        const next = InductionLab.pairTransition(state, action);
        if (next === state)
            return;
        state = next;
        records = InductionLab.pairRecords(state);
        prepare();
        render();
        window.scrollTo(0, 0);
        if (state.stage === 'history') {
            InductionLab.el('historyTitle').focus({ preventScroll: true });
            return;
        }
        InductionLab.el('flowPanel').closest('.flow-guide')?.scrollTo(0, 0);
        InductionLab.el('flowPanel').focus({ preventScroll: true });
    }
    function play() {
        if (fault || state.stage !== 'observe' || !['idle', 'done'].includes(player.status))
            return;
        state = InductionLab.pairTransition(state, { type: 'replay' });
        records = InductionLab.pairRecords(state);
        player.play();
    }
    function act(action) {
        if (fault)
            return;
        if (action === 'history' || action === 'return') {
            go({ type: action });
            return;
        }
        if (action === 'previous') {
            go({ type: 'previous', records });
            return;
        }
        if (action === 'advance')
            go({ type: 'advance', records });
        if (state.stage !== 'observe')
            return;
        if (action === 'play')
            play();
        if (action === 'pause')
            player.pause();
        if (action === 'resume')
            player.resume();
    }
    function showError(message) {
        fault = true;
        player.cancel();
        InductionLab.el('instrumentReadout').hidden = true;
        InductionLab.el('instrumentLock').hidden = false;
        InductionLab.el('instrumentLock').textContent = '실험 화면을 다시 열어 주세요.';
        InductionLab.el('experimentLoading').hidden = true;
        InductionLab.el('experimentError').hidden = false;
        InductionLab.el('experimentErrorText').textContent = message;
        document.querySelectorAll('button,input').forEach(b => b.disabled = true);
    }
    try {
        scene = new InductionLab.ExperimentScene(canvas);
        InductionLab.el('experimentLoading').hidden = true;
        prepare();
        render();
        InductionLab.el('flowPanel').addEventListener('click', e => {
            const b = e.target.closest('button');
            if (!b || b.disabled)
                return;
            if (b.dataset.members)
                go({ type: 'members', count: b.dataset.members === '3' ? 3 : 2 });
            else
                act(b.dataset.action || '');
        });
        InductionLab.el('historyReader').addEventListener('click', e => {
            const b = e.target.closest('button[data-action]');
            if (b && !b.disabled)
                act(b.dataset.action || '');
        });
        InductionLab.el('flowPanel').addEventListener('change', e => {
            const c = e.target;
            if (c.dataset.member === undefined || c.disabled)
                return;
            records[Number(c.dataset.member)] = c.checked;
            renderNavigation();
        });
        InductionLab.el('previousStep').addEventListener('click', () => act('previous'));
        InductionLab.el('nextStep').addEventListener('click', () => act('advance'));
        document.querySelectorAll('[data-camera]').forEach(b => b.addEventListener('click', () => {
            view = b.dataset.camera === 'front' ? 'front' : 'angled';
            document.querySelectorAll('[data-camera]').forEach(c => c.setAttribute('aria-pressed', String(c === b)));
            draw();
        }));
        InductionLab.bindExperimentGesture(canvas, () => scene.renderer.project([scene.axis('magnet'), frame.magnetY, 0]), () => !fault && state.stage === 'observe' && state.condition > 0 && (player.status === 'idle' || player.status === 'done'), play);
        new ResizeObserver(draw).observe(InductionLab.el('experimentViewport'));
        document.addEventListener('visibilitychange', () => { if (document.hidden)
            player.pause(); });
        // 돌아왔을 때 이전 모형 결과가 먼저 보이지 않게 한다.
        window.addEventListener('pagehide', () => go({ type: 'reset' }));
        window.addEventListener('pageshow', e => { if (e.persisted)
            go({ type: 'reset' }); });
        canvas.addEventListener('webglcontextlost', e => { e.preventDefault(); showError('입체 화면이 중단됐습니다. 다시 열면 가설 기록 확인부터 시작해요.'); });
    }
    catch {
        showError('입체 화면을 표시하지 못했습니다. Chrome 또는 Edge에서 다시 열어 주세요.');
    }
})(InductionLab || (InductionLab = {}));
