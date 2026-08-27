import Link from "next/link";

export default function ProfileContent() {
  return (
    <main className="resume-page">
      <Link className="mark mark-dark resume-ks" href="/main" aria-label="메인으로 돌아가기">KS</Link>
      <section className="resume-hero">
        <p className="resume-overline">PROFILE / AI ENGINEER</p>
        <h1>KIM SEHAN</h1>
        <div className="resume-intro">
          <p>반갑습니다.</p>
          <p>저는 사람과 맥락을 이해하는 AI를 연구하고, 이를 실제 서비스로 구현하는 AI 엔지니어입니다. 언어·이미지·검색 지식을 연결해 <mark>사용자에게 필요한 경험을 만드는 것</mark>에 관심이 있습니다.</p>
          <p>논문의 방법론을 코드로 재현하는 데서 멈추지 않고, 모델과 데이터 파이프라인을 설계한 뒤 백엔드와 연결하여 <mark>동작하는 AI 서비스로 완성</mark>하는 과정을 경험했습니다.</p>
          <p>결과를 정량적으로 평가하고 문제의 원인을 분석하며, 팀과 함께 <mark>더 신뢰할 수 있는 AI로 개선</mark>하는 것을 중요하게 생각합니다.</p>
        </div>
      </section>
      <section className="resume-section"><h2>EDUCATION</h2><div className="resume-list"><article><time>AI CAMP</time><div><h3>SK Networks Family AI Camp</h3><p>Python 데이터 분석, 머신러닝·딥러닝, 자연어 처리 및 생성형 AI 교육 이수</p></div></article></div></section>
      <section className="resume-section"><h2>RESEARCH EXPERIENCE</h2><div className="resume-list"><article><time>UNDERGRADUATE</time><div><h3>숭실대학교 HUMANE Lab</h3><p>ASTUTE RAG 논문의 핵심 방법론을 구현하고 최신 AI 학술 논문을 분석했습니다.</p></div></article></div></section>
      <section className="resume-section">
        <h2>PROJECT EXPERIENCE</h2>
        <div className="resume-list">
          <article><time>2025</time><div><h3>Hairstyle is All You Need</h3><p>멀티모달 AI 기반 헤어스타일 추천 및 가상 체험 서비스</p></div></article>
          <article><time>DEC 2025</time><div><h3>Knowledge Conflicts in RAG</h3><p>검색 지식과 모델 내부 지식의 충돌을 다루는 ASTUTE RAG 구현 및 분석</p></div></article>
          <article><time>MAR 2025</time><div><h3>Handy Sign Language Detection</h3><p>1D CNN 기반 수어 인식 범위 확장 및 문장 자동완성 기능 구현</p></div></article>
        </div>
      </section>
      <section className="resume-section">
        <h2>SKILLS</h2>
        <div className="resume-skills">
          <div><h3>AI / DATA</h3><p>Python · PyTorch · TensorFlow · Keras · Transformers · LangChain · FAISS</p></div>
          <div><h3>BACKEND</h3><p>Django · FastAPI · MySQL</p></div>
          <div><h3>DEV / DEPLOY</h3><p>Git · Docker · AWS</p></div>
        </div>
      </section>
      <footer className="resume-footer"><span>KIM SEHAN — AI ENGINEER</span><a href="https://github.com/kimsehan11" target="_blank" rel="noreferrer">GITHUB ↗</a></footer>
    </main>
  );
}
