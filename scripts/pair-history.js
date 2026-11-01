"use strict";
var InductionLab;
(function (InductionLab) {
    function historySection(number, title, lead, body) {
        return `<details class="history-section"><summary><span class="history-number">${number}</span><span><strong>${title}</strong><span class="history-lead">${lead}</span></span><span class="history-expand" aria-hidden="true">＋</span></summary><div class="history-body">${body}</div></details>`;
    }
    function pairHistoryView() {
        return `<div class="history-toolbar"><span class="eyebrow">⑤ 과학사로 정리 · 실제 실험과 F 판단을 마친 뒤</span><button class="secondary" data-action="return" type="button">탐구 마무리로 돌아가기</button></div>
      <article class="history-article" aria-labelledby="historyTitle">
      <header class="history-hero"><div><span class="history-kicker">마이클 패러데이 · 1791–1867</span><h2 id="historyTitle" tabindex="-1">질문에서 발견으로,<br>과학을 모두에게</h2><p>전류가 자기 작용을 한다면, 자석으로 전류를 만들 수 있을까?<br>우리가 던진 질문을 먼저 탐구했던 패러데이를 만나 봅시다.</p></div><figure><img src="assets/faraday-portrait.jpeg" width="190" height="254" alt="마이클 패러데이의 흑백 초상"><figcaption>실험과 설명으로<br>자연을 탐구하다</figcaption></figure></header>
      <section class="history-core" aria-labelledby="historyCore"><h3 id="historyCore">먼저, 세 가지를 기억해요</h3><div class="history-core-grid">
        <div><span>01 · 증거</span><strong>예상과 다른 관찰도 살핀다</strong><p>계속 흐르는 전류를 기대했지만, 잠깐 나타난 반응이 새로운 발견의 단서가 되었습니다.</p></div>
        <div><span>02 · 방법</span><strong>실험·모형·수학을 연결한다</strong><p>패러데이의 실험과 물리적 생각은 다른 과학자들의 연구와 만나 전자기학을 발전시켰습니다.</p></div>
        <div><span>03 · 소통</span><strong>발견을 다른 사람과 나눈다</strong><p>연구 기록과 실험 강연을 통해 과학자뿐 아니라 청소년과 일반인도 과학에 다가가게 했습니다.</p></div>
      </div></section>
      <div class="history-reading"><p class="history-reading-guide">더 알고 싶은 제목을 눌러 펼쳐 보세요.</p>
      ${historySection('1', '생애 · 책을 읽던 제본공에서 실험 연구자로', '독학, 배움의 기회, 실험실에서의 경험이 함께 만든 성장', `
        <ol class="history-timeline">
          <li><strong>1791년 · 런던 근교에서 태어나다</strong><p>대장장이의 아들로 태어났습니다. 가정 형편 때문에 정규 교육을 충분히 받지 못했지만, 배움에 대한 관심을 이어 갔습니다.</p></li>
          <li><strong>1805–1812년 · 제본 일을 하며 과학을 배우다</strong><p>책을 만드는 일을 하며 과학책을 읽고, 강연을 듣고, 직접 실험했습니다. 독서는 단순한 지식 수집을 넘어 “직접 확인하고 싶은 질문”으로 이어졌습니다.</p></li>
          <li><strong>1813년 · 왕립연구소에서 일하다</strong><p>험프리 데이비의 강연 내용을 정리한 노트를 보내며 연구실에서 일하고 싶다는 뜻을 전했습니다. 왕립연구소 조수로 일할 기회를 얻고, 실험 준비와 관찰·기록을 통해 연구 경험을 쌓았습니다.</p></li>
          <li><strong>이후 · 연구와 강연을 함께하다</strong><p>화학과 전기·자기 연구를 이어 가며 많은 성과를 냈습니다. 연구 결과를 사람들에게 설명하는 활동도 중요하게 여겼고, 1867년에 생을 마쳤습니다.</p></li>
        </ol>
        <aside class="history-note"><strong>‘혼자 이룬 천재의 성공’만으로 읽지 않기</strong><p>꾸준한 노력과 함께 책, 강연, 데이비와의 만남, 실험실과 동료가 제공한 기회도 중요했습니다. 과학은 사람과 사회 속에서 이루어집니다.</p></aside>
        <p class="history-source">자료 바탕: 양승훈, 『물리학과 역사』 106–109쪽; 영국 왕립연구소의 생애·연구 자료.</p>`)}
      ${historySection('2', '업적 · 전기와 자기, 화학과 빛을 잇다', '오늘의 중심은 1831년 전자기 유도의 발견', `
        <div class="history-table-wrap"><table class="history-table"><caption>대표적인 연구와 그 의미</caption><thead><tr><th scope="col">시기</th><th scope="col">업적</th><th scope="col">어떤 의미일까?</th></tr></thead><tbody>
        <tr><th scope="row">1821년</th><td>전자기 회전</td><td>전류와 자석의 상호작용으로 지속적인 회전을 구현했습니다. 전동기의 역사와 연결됩니다.</td></tr>
        <tr class="history-highlight"><th scope="row">1831년<br>오늘의 핵심</th><td><strong>전자기 유도</strong></td><td>자기적 조건의 변화로 전기적 효과를 얻을 수 있음을 발견했습니다. 발전기와 변압기의 원리를 이해하는 바탕이 됩니다.</td></tr>
        <tr><th scope="row">1830년대 초</th><td>전기 분해 법칙</td><td>흘려 준 전기량과 전극에서 반응하는 물질의 양 사이의 관계를 연구했습니다.</td></tr>
        <tr><th scope="row">1845년</th><td>빛과 자기의 관계</td><td>자기장이 물질을 통과하는 빛의 편광 방향에 영향을 주는 현상을 발견했습니다.</td></tr>
        </tbody></table></div>
        <aside class="history-note"><strong>서로 다른 현상을 연결하는 질문</strong><p>패러데이는 전기, 자기, 화학, 빛을 서로 연결해 이해하려 했습니다. 이미 알려진 관계에서 새로운 관계를 추측하는 일은 연구의 출발점이 될 수 있습니다. 다만 추측은 실험과 증거로 따져 보아야 합니다.</p></aside>
        <p class="history-source">자료 바탕: 『물리학과 역사』 108쪽; 영국 왕립연구소의 패러데이 연구 자료.</p>`)}
      ${historySection('3', '발견 과정 · 자기장의 존재에서 변화로', '예상하지 못했던 짧은 반응을 발견의 단서로 삼다', `
        <h3>① 외르스테드의 발견에서 새로운 질문으로</h3><p>1820년 외르스테드는 전류가 자기 작용을 한다는 것을 보여 주었습니다. 패러데이를 비롯한 연구자들은 반대로 자기로부터 전류를 얻을 수 있을지 탐구했습니다. 두 현상이 관련 있다는 사실은 연구 질문의 근거였지만, 반대 방향의 현상까지 자동으로 보장하는 증거는 아니었습니다.</p>
        <h3>② 기대한 결과가 나타나지 않다</h3><p>교재는 자석을 도선 가까이에 두거나 코일을 이용하는 여러 시도를 소개합니다. 강한 자기 작용이 계속 존재하면 전류도 계속 생길 것이라는 기대만으로는 전자기 유도의 조건을 알아내기 어려웠습니다.</p>
        <h3>③ 1831년 8월 29일 · 잠깐의 반응에 주목하다</h3><p>패러데이는 철고리에 감은 두 코일을 이용했습니다. 한쪽 코일을 전지에 연결하거나 끊을 때 다른 쪽 회로에서 잠깐 전류가 나타났습니다. 전류를 일정하게 유지하는 동안에는 그 효과가 지속되지 않았습니다. 핵심 단서는 단순히 자기 작용이 있다는 사실보다 <strong>그 상태가 변하는 순간</strong>에 있었습니다.</p>
        <aside class="history-note"><strong>역사 속 장치와 오늘의 장치를 구분해요</strong><p>이 철고리·두 코일 장치는 오늘 우리가 쓴 막대자석·코일 장치와 다릅니다. 패러데이는 이후 자석과 코일의 상대적인 운동으로도 유도를 확인했습니다. 서로 다른 장치에서 얻은 결과를 연결하며 설명의 범위를 넓혔습니다.</p></aside>
        <h3>④ 오늘의 실험을 설명하면</h3><p>자석과 코일이 가까워지거나 멀어질 때처럼, 코일을 통과하는 <strong>자기선속이 변하면 유도 기전력</strong>이 생깁니다. 회로가 닫혀 있으면 유도 전류가 흐를 수 있습니다. 자기선속은 코일의 면을 통과하는 자기장의 정도를 나타내는 양입니다.</p><p>우리 실험에서는 같은 자석을 같은 경로로 더 빠르게 움직일수록 자기선속이 더 빠르게 변합니다. 다른 조건이 같다면 유도 기전력의 크기가 커집니다. 실제 검류계에서는 바늘이 가장 크게 흔들린 폭을 비교했지요.</p>
        <p class="history-source">발견 서술: 『물리학과 역사』 114–118쪽; 왕립연구소의 철고리 코일 장치 자료. 마지막 설명은 오늘날의 물리 개념으로 재구성했습니다.</p>`)}
      ${historySection('4', '과학의 본성 · 우리의 탐구와 연결하기', '과학 지식은 증거, 해석, 창의성, 협력으로 발전한다', `
        <div class="history-connections">
          <section><h3>증거를 바탕으로 설명을 검토한다</h3><p>기대한 결과와 다른 반응도 무시하지 않고 반복해 확인해야 합니다. 오늘 F에서 처음 가설을 유지·수정하거나 판단을 보류한 이유도 실제 관찰에서 찾아야 합니다.</p><p class="history-question">우리의 연결 질문 · 어떤 두 조건을 비교한 관찰이 내 판단의 근거였나요?</p></section>
          <section><h3>관찰과 설명은 같지 않다</h3><p>“바늘이 잠깐 움직였다”는 관찰이고, “어떤 변화 때문에 전류가 생겼다”는 설명입니다. 패러데이는 역선이라는 생각을 통해 보이지 않는 전기·자기의 작용을 이해하려 했습니다. 과학에는 관찰뿐 아니라 창의적인 모형과 해석도 필요합니다.</p><p class="history-question">우리의 연결 질문 · 내가 실제로 본 사실과 그 사실을 설명한 문장을 구분할 수 있나요?</p></section>
          <section><h3>실험·모형·수학은 서로 보완한다</h3><p>패러데이는 고급 수학을 능숙하게 다루지는 못했지만, 정밀한 실험과 기록, 물리적 상상력으로 중요한 개념을 발전시켰습니다. 뒤에 맥스웰은 패러데이와 여러 연구자의 성과를 수학적 이론으로 발전시켰습니다. 이 이야기는 수학이 필요 없다는 뜻이 아니라, 서로 다른 방법과 강점이 함께 기여한다는 뜻입니다.</p><p class="history-question">우리의 연결 질문 · 가상실험과 실제 실험은 각각 무엇을 도왔나요?</p></section>
          <section><h3>과학은 사람들 사이에서 발전한다</h3><p>앞선 연구에서 질문을 얻고, 기록과 설명을 나누며, 다른 연구자가 다시 확인하고 확장합니다. 교실에서도 짝과 관찰을 비교하고 차이가 난 이유를 살피는 과정이 중요합니다.</p><p class="history-question">우리의 연결 질문 · 짝의 관찰이나 설명이 내 판단에 어떤 도움을 주었나요?</p></section>
        </div>
        <aside class="history-note"><strong>가상실험과 실제 증거</strong><p>이 사이트의 가상실험은 정해진 물리 모형이 계산한 결과입니다. 실제 자연에서 새로 얻은 독립적인 관찰 증거와는 구분해야 합니다. 오늘 가설을 판단할 때는 E에 기록한 실제 실험 결과를 근거로 사용했습니다.</p></aside>
        <p>오늘의 가설 검증 순서는 탐구를 배우기 위한 틀입니다. 실제 과학 연구는 언제나 같은 순서를 한 번씩만 거치지는 않습니다. 질문·관찰·설명·실험을 오가며 발전하기도 합니다.</p>
        <p class="history-source">수업을 위한 해석: 『물리학과 역사』 118–119쪽의 발견·역선·탐구 태도 서술과 오픈대학교의 패러데이·맥스웰 해설을 바탕으로 구성했습니다.</p>`)}
      ${historySection('5', '과학 대중화 · 실험실 밖으로 나간 과학', '크리스마스 강연과 양초 한 자루에 담긴 과학', `
        <h3>청소년과 일반인에게 과학을 설명하다</h3><p>영국 왕립연구소의 크리스마스 강연은 1825년에 시작되었습니다. 패러데이가 직접 처음 강연한 해는 1827년이며, 1860년까지 총 <strong>19개 강연 시리즈</strong>를 맡았습니다. 이는 강연을 단지 19번 했다는 뜻은 아닙니다.</p>
        <p>그는 실험을 눈앞에서 보여 주며 사람들이 관찰하고 질문하게 했습니다. 어렵게 얻은 지식도 이해할 수 있게 설명하고 나눌 가치가 있다고 본 것입니다.</p>
        <h3>익숙한 양초에서 시작하는 질문</h3><p>양초는 왜 타고, 불꽃에서는 무엇이 일어날까요? 패러데이는 익숙한 양초를 통해 연소 등 여러 과학 현상을 설명했습니다. 강연을 정리한 책은 『양초의 과학』으로도 알려져 있습니다. 친숙한 소재로 시작하더라도 깊이 있는 과학을 탐구할 수 있습니다.</p>
        <h3>과학자끼리도 이해할 수 있게 소통하다</h3><p>1857년 맥스웰에게 보낸 편지에서 패러데이는 수학으로 얻은 결과를 실험 연구자도 이해할 수 있는 말로 설명해 주기를 요청했습니다. 서로 다른 표현 방식 사이를 연결하는 소통도 과학의 발전에 필요했습니다.</p>
        <aside class="history-note"><strong>우리도 과학을 나누는 사람이 될 수 있어요</strong><p>오늘의 실험을 보지 못한 친구에게, 관찰한 사실과 그 근거를 들어 설명해 보세요. 좋은 설명은 어려운 말을 많이 쓰는 것이 아니라, 상대가 이해하고 다시 따져 볼 수 있게 돕는 설명입니다.</p></aside>
        <p class="history-source">자료 바탕: 『물리학과 역사』 119쪽; 왕립연구소의 크리스마스 강연사; 1857년 11월 13일 패러데이가 맥스웰에게 보낸 편지.</p>`)}
      <section class="history-closing"><span class="history-kicker">짝과 한 문장으로 나누기</span><h3>“오늘 ___라는 관찰을 근거로,<br>내 가설을 ___했다.”</h3><p>이미 쓴 F의 기록을 보며 말해 보세요. 이후 선생님의 안내에 따라 G로 이어갑니다.</p></section>
      <details class="history-section history-sources"><summary><span class="history-number">↗</span><span><strong>자료의 바탕과 출처</strong><span class="history-lead">교재 내용과 역사 자료를 수업용으로 요약·재구성했습니다.</span></span><span class="history-expand" aria-hidden="true">＋</span></summary><div class="history-body">
        <ol><li>양승훈, 『물리학과 역사』, 9장 「전자기유도법칙」, 제공된 발췌 106–122쪽. 생애·발견 과정·과학 대중화 서술을 참고했습니다. 교재 사진과 원문 전체는 게시하지 않았습니다.</li>
        <li>영국 왕립연구소, 패러데이의 생애와 연구.<span class="source-url">rigb.org/explore-science/explore/person/michael-faraday-1791-1867</span><span class="source-url">rigb.org/explore-science/explore/collection/michael-faradays-research-and-work</span></li>
        <li>영국 왕립연구소, 1831년 철고리 코일 장치.<span class="source-url">rigb.org/explore-science/explore/collection/michael-faradays-ring-coil-apparatus</span></li>
        <li>영국 왕립연구소, 크리스마스 강연 200년.<span class="source-url">rigb.org/explore-science/explore/blog/200-years-christmas-lectures</span></li>
        <li>오픈대학교, 패러데이와 맥스웰의 연구 관계.<span class="source-url">open.edu/openlearn/science-maths-technology/the-restless-universe/content-section-2.4.2</span></li>
        <li>패러데이 → 맥스웰, 1857년 11월 13일 편지, 서신 자료 3357.<span class="source-url">epsilon.ac.uk/view/faraday/letters/Faraday3357</span></li></ol>
        <p>연대는 위 자료와 대조했습니다. ‘과학의 본성’과 ‘우리의 연결 질문’은 역사적 사실을 바탕으로 한 수업용 해석입니다. 수학 역량은 ‘고급 수학을 능숙하게 다루지 못함’으로 표현했습니다. 초상은 수업 PPT에 수록된 이미지를 사용했습니다.</p>
      </div></details>
      </div></article>
      <div class="history-bottom"><button class="secondary" data-action="return" type="button">탐구 마무리로 돌아가기</button><span>읽기 자료 · 새로운 답안 작성 없이 F의 기록과 연결해요.</span></div>`;
    }
    InductionLab.pairHistoryView = pairHistoryView;
})(InductionLab || (InductionLab = {}));
