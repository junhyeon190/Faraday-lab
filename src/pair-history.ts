namespace InductionLab {
  function historySection(number:string,title:string,lead:string,body:string):string{
    return `<details class="history-section"><summary><span class="history-number">${number}</span><span><strong>${title}</strong><span class="history-lead">${lead}</span></span><span class="history-expand" aria-hidden="true">＋</span></summary><div class="history-body">${body}</div></details>`;
  }
  export function pairHistoryView():string{
    return `<div class="history-toolbar"><span class="eyebrow">⑤ 과학사로 정리 · 선생님과 함께 약 3분</span><button class="secondary" data-action="return" type="button">이전 단계 · 탐구 마무리</button></div>
      <article class="history-article" aria-labelledby="historyTitle">
      <header class="history-hero"><div><span class="history-kicker">마이클 패러데이 · 1791–1867</span><h2 id="historyTitle" tabindex="-1">배우고, 발견하고, 나누다</h2><p>성실하게 쌓은 배움은 새로운 발견으로,<br>발견한 과학은 더 많은 사람에게.</p></div><figure><img src="assets/faraday-portrait.jpeg" width="190" height="254" alt="마이클 패러데이의 흑백 초상"><figcaption>실험으로 탐구한 과학자</figcaption></figure></header>
      <section class="history-core" aria-labelledby="historyCore"><h3 id="historyCore">패러데이의 삶에서 만나는 세 가지</h3><div class="history-core-grid">
        <div><span>01 · 성실한 배움</span><strong>읽고, 실험하고,<br>기록하는 일을 이어 가다</strong><p>제본 일을 하며 과학책을 읽고 강연을 기록했습니다. 고급 수학에 익숙하지 않았지만, 실험과 관찰을 강점으로 키웠습니다.</p></div>
        <div><span>02 · 앞선 발견에서 새 질문으로</span><strong>전류가 자기를 만든다면,<br>자기로 전류를 만들 수 있을까?</strong><p>외르스테드의 발견에서 질문을 얻고, 여러 실험으로 전자기 유도의 조건을 찾았습니다. 우리도 앞선 지식으로 가설을 세우고 증거로 판단했지요.</p></div>
        <div><span>03 · 모두를 위한 과학</span><strong>발견한 것을<br>누구나 이해할 수 있도록</strong><p>크리스마스 강연에서 청소년에게 실험을 보여 주었습니다. 익숙한 양초에서도 질문을 찾으며 과학을 사람들과 나누었습니다.</p></div>
      </div></section>
      <section class="history-class-link"><strong>우리의 탐구와 연결해요</strong><p>앞선 발견에서 질문을 얻고 → 실험과 기록으로 가설을 판단하고 → 근거를 들어 서로 설명했어요.</p><p>F의 기록을 보며, 내 생각을 판단하는 데 도움이 된 관찰 한 가지를 짝에게 말해 봅시다.</p></section>
      <div class="history-reading"><p class="history-reading-guide">더 알고 싶은 이야기를 펼쳐 보세요. 새로운 답안을 쓸 필요는 없어요.</p>
      ${historySection('1','성실한 배움 · 제본공에서 실험 연구자로','한계를 인정하고, 배우고 기록하며 자신의 강점을 키우다',`
        <h3>책을 만드는 일이 배움의 기회가 되다</h3>
        <p>패러데이는 1791년 대장장이의 아들로 태어났습니다. 가정 형편 때문에 정규 교육을 충분히 받지 못했습니다. 1805–1812년 제본 일을 배우면서 과학책을 읽고, 강연을 듣고, 직접 실험하며 배움을 이어 갔습니다.</p>
        <p>그는 데이비의 강연 내용을 정리해 책으로 묶어 보내며 연구실에서 일하고 싶다는 뜻을 전했습니다. 1813년 왕립연구소 조수로 일할 기회를 얻었습니다. 그의 성실함은 막연한 마음가짐보다 <strong>읽은 것을 확인하고, 들은 것을 정리하며, 관찰한 것을 기록하는 행동</strong>에서 찾아볼 수 있습니다.</p>
        <h3>모든 것을 잘해야만 과학을 할 수 있을까?</h3>
        <p>패러데이는 고급 수학을 능숙하게 다루지는 못했지만, 정밀한 실험과 기록, 물리적 상상력을 통해 중요한 개념을 발전시켰습니다. 전자기 유도를 발견하고, 보이지 않는 전기·자기의 작용을 역선이라는 생각으로 표현했습니다.</p>
        <p>훗날 맥스웰은 패러데이를 비롯한 여러 연구자의 성과를 수학적 이론으로 발전시켰습니다. 이 사례는 수학이 필요 없다는 뜻이 아니라, <strong>서로 다른 강점과 연구 방법이 함께 과학에 기여한다</strong>는 것을 보여 줍니다.</p>
        <aside class="history-note"><strong>과학의 본성으로 연결하면 · 과학은 사람이 함께 만드는 활동</strong><p>패러데이의 노력과 더불어 책과 강연, 데이비와의 만남, 실험실과 동료가 제공한 기회도 중요했습니다. 과학자의 성장과 연구는 다른 사람 및 사회와 연결되어 있습니다.</p></aside>
        <p class="history-source">자료 바탕: 양승훈, 『물리학과 역사』 106–109, 118–119쪽; 영국 왕립연구소 생애 자료; 오픈대학교의 패러데이·맥스웰 해설. ‘성실한 배움’은 이러한 사례를 연결한 수업용 해석입니다.</p>`)}
      ${historySection('2','앞선 발견에서 새 질문으로 · 전자기 유도의 발견','외르스테드의 발견 → 패러데이의 질문 → 실험과 증거 → 우리의 탐구',`
        <h3>① 알려진 사실에서 새로운 질문을 만들다</h3>
        <p>1820년 외르스테드는 전류가 자기 작용을 한다는 것을 보여 주었습니다. 패러데이를 비롯한 연구자들은 여기서 질문을 얻었습니다. <strong>“전류가 자기 작용을 한다면, 반대로 자기로 전류를 만들 수 있을까?”</strong> 앞선 발견은 새 가설의 근거가 되었지만, 그 가설이 맞는지는 실험으로 확인해야 했습니다.</p>
        <h3>② 원하는 결과가 나타나지 않아도 관찰을 이어 가다</h3>
        <p>교재는 자석을 도선 가까이에 두거나 코일을 이용하는 여러 시도를 소개합니다. 자기 작용이 계속 존재하기만 하면 전류가 흐를 것이라는 기대만으로는 전자기 유도의 조건을 찾기 어려웠습니다.</p>
        <h3>③ 잠깐 나타난 반응에서 변화의 중요성을 찾다</h3>
        <p>1831년 8월 29일, 패러데이는 철고리에 감은 두 코일을 이용했습니다. 한쪽 코일을 전지에 연결하거나 끊을 때 다른 쪽 회로에서 잠깐 전류가 나타났습니다. 일정한 전류를 유지하는 동안에는 그 효과가 지속되지 않았습니다. 이후 자석과 코일의 상대적인 운동으로도 유도를 확인했습니다.</p>
        <aside class="history-note"><strong>오늘 우리 장치와 연결하기</strong><p>첫 발견의 철고리·두 코일 장치는 우리가 쓴 막대자석·코일 장치와 다릅니다. 우리 실험에서는 정지한 때와 가까워지거나 멀어지는 때를 비교했습니다. 서로 다른 장치의 결과를 연결하면, 단순히 자기장이 있는 것보다 <strong>코일을 통과하는 자기장의 변화</strong>가 중요하다는 설명으로 나아갈 수 있습니다.</p></aside>
        <h3>④ 우리가 쓴 가설과 기록도 돌아보다</h3>
        <p>외르스테드의 발견에서 가설을 세운 A, 조건을 비교해 기록한 E, 그 증거로 가설을 유지·수정하거나 판단을 보류한 F를 이어서 봅시다. 처음부터 정답을 쓰는 것보다 <strong>어떤 관찰을 근거로 판단했는지 설명하는 것</strong>이 중요합니다.</p>
        <div class="history-connections"><section><h3>과학의 본성 · 지식은 앞선 연구와 증거를 통해 발전한다</h3><p>새로운 설명은 기존 지식에서 출발하고, 관찰과 실험으로 검토됩니다. 예상과 다른 결과도 설명을 바꿀 단서가 됩니다. “바늘이 잠깐 움직였다”는 관찰과 “어떤 변화로 전류가 생겼다”는 해석은 구분해야 합니다.</p><p class="history-question">우리의 연결 질문 · 어떤 두 조건의 실제 관찰이 내 가설 판단을 뒷받침했나요?</p></section></div>
        <p>가상실험은 정해진 물리 모형을 보여 줍니다. F에서는 E에 기록한 실제 관찰을 판단의 근거로 삼았지요. 실제 과학 연구에서는 질문·실험·해석을 반복해서 오가기도 합니다. 오늘의 순서가 모든 연구에 적용되는 유일한 절차는 아닙니다.</p>
        <h3>발견이 연결한 것들</h3><p>전자기 유도의 발견은 발전기와 변압기의 원리를 이해하는 바탕이 되었습니다. 패러데이는 전자기 회전(1821), 전기 분해 법칙(1830년대 초), 빛과 자기의 관계(1845)도 연구하며 자연의 여러 현상을 연결하려 했습니다.</p>
        <p class="history-source">자료 바탕: 『물리학과 역사』 108, 114–119쪽; 영국 왕립연구소의 철고리 코일 장치·연구 자료. 과학의 본성과 우리 실험의 연결은 수업용 해석입니다.</p>`)}
      ${historySection('3','모두를 위한 과학 · 실험실 밖으로 지식을 나누다','크리스마스 강연과 양초 한 자루에서 시작하는 과학',`
        <h3>청소년이 직접 보고 질문할 수 있게 하다</h3>
        <p>영국 왕립연구소의 크리스마스 강연은 1825년에 시작되었습니다. 패러데이가 처음 직접 맡은 해는 1827년이며, 1860년까지 총 19개 강연 시리즈를 진행했습니다. 한 시리즈는 여러 차례 강연으로 이루어졌습니다.</p>
        <p>그는 실험을 눈앞에서 보여 주어 청소년이 관찰하고 질문할 수 있게 했습니다. 과학을 연구하는 일뿐 아니라, 알아낸 내용을 사람들이 이해하도록 설명하는 일에도 힘썼습니다.</p>
        <h3>평범한 양초에서 깊은 과학을 발견하다</h3>
        <p>양초는 왜 타고, 불꽃에서는 무엇이 일어날까요? 패러데이는 친숙한 양초를 통해 연소 등 여러 현상을 설명했습니다. 이 강연은 『양초의 과학』으로도 알려진 책으로 이어졌습니다. 익숙한 일상도 과학적 질문의 출발점이 됩니다.</p>
        <aside class="history-note"><strong>과학의 본성으로 연결하면 · 과학은 공유하고 소통하는 활동</strong><p>연구자는 관찰과 설명을 공개해 다른 사람이 검토하고 이어서 탐구하게 합니다. 대중을 위한 강연은 더 많은 사람이 과학을 이해하고 질문하는 기회를 넓힙니다. 연구자 사이의 검토와 대중을 위한 설명은 역할은 다르지만, 모두 과학을 나누는 활동입니다.</p></aside>
        <p class="history-question">우리의 연결 질문 · 오늘 실험을 보지 못한 친구에게, 관찰한 사실과 그 까닭을 어떻게 설명할까요?</p>
        <p class="history-source">자료 바탕: 『물리학과 역사』 119쪽; 영국 왕립연구소의 크리스마스 강연사. ‘모두를 위한 과학’은 과학 대중화 활동을 연결한 수업용 표현입니다.</p>`)}
      <section class="history-closing"><span class="history-kicker">오늘의 마무리</span><h3>앞선 발견에서 질문을 얻고,<br>증거로 생각을 살피고,<br>배운 것을 함께 나눕니다.</h3><p>여러분도 오늘 이 과정에 참여했습니다. 선생님의 안내에 따라 학습지 G로 이어갑니다.</p></section>
      <details class="history-section history-sources"><summary><span class="history-number">↗</span><span><strong>자료의 바탕과 출처</strong><span class="history-lead">역사적 사실과 수업에서 연결한 의미를 구분해 읽어요.</span></span><span class="history-expand" aria-hidden="true">＋</span></summary><div class="history-body">
        <ol><li>양승훈, 『물리학과 역사』, 9장 「전자기유도법칙」, 제공된 발췌 106–122쪽. 원문 사진과 전체 글을 게시하지 않고 요약·재구성했습니다.</li>
        <li>영국 왕립연구소, 패러데이의 생애와 연구.<span class="source-url">rigb.org/explore-science/explore/person/michael-faraday-1791-1867</span></li>
        <li>영국 왕립연구소, 1831년 철고리 코일 장치.<span class="source-url">rigb.org/explore-science/explore/collection/michael-faradays-ring-coil-apparatus</span></li>
        <li>영국 왕립연구소, 크리스마스 강연 200년.<span class="source-url">rigb.org/explore-science/explore/blog/200-years-christmas-lectures</span></li>
        <li>오픈대학교, 패러데이와 맥스웰의 연구 관계.<span class="source-url">open.edu/openlearn/science-maths-technology/the-restless-universe/content-section-2.4.2</span></li></ol>
        <p>생애·발견·강연의 연대와 사실은 위 자료를 바탕으로 했습니다. 성실함, 과학의 본성, 우리 탐구와의 연결은 수업용 해석입니다. ‘수학을 전혀 몰랐다’ 대신 ‘고급 수학을 능숙하게 다루지는 못했다’로 표현했습니다. 초상은 수업 PPT에 수록된 이미지를 사용했습니다.</p>
      </div></details>
      </div></article>
      <div class="history-bottom"><button class="secondary" data-action="return" type="button">이전 단계 · 탐구 마무리</button><span>읽기 자료 · 기록을 더 늘리지 않고 오늘의 탐구와 연결해요.</span></div>`;
  }
}
