import Link from "next/link";

export default function ConceptPage() {
  return (
    <main className="info-page concept-page">
      <Link className="mark mark-dark" href="/main" aria-label="메인으로 돌아가기">KS</Link>
      <p className="info-index">02 / CONCEPT</p>
      <section className="info-hero">
        <h1>Context<br />before answer.</h1>
        <p>좋은 AI는 답을 생성하기 전에 사용자의 의도와 주어진 지식의 맥락을 먼저 이해해야 한다고 생각합니다.</p>
      </section>
      <section className="concept-bands">
        <div><span>01</span><h2>Understand</h2><p>언어와 이미지에서 사용자의 의도와 조건을 파악합니다.</p></div>
        <div><span>02</span><h2>Retrieve</h2><p>필요한 지식을 정확하게 검색하고 충돌 여부를 검토합니다.</p></div>
        <div><span>03</span><h2>Build</h2><p>모델을 평가 가능한 서비스 형태로 연결하고 개선합니다.</p></div>
      </section>
    </main>
  );
}
