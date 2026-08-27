import Link from "next/link";

function LegacyProfilePage() {
  return (
    <main className="info-page profile-page">
      <Link className="mark mark-dark" href="/main" aria-label="메인으로 돌아가기">KS</Link>
      <p className="info-index">01 / PROFILE</p>
      <section className="info-hero">
        <h1>Kim<br />Sehan</h1>
        <p>사람과 맥락을 이해하는 AI를 연구하고, 실제 사용 가능한 서비스로 구현하는 AI 엔지니어입니다.</p>
      </section>
      <section className="info-grid">
        <article><small>EDUCATION</small><h2>SK Networks Family AI Camp</h2><p>Python 데이터 분석, 머신러닝·딥러닝, NLP 및 생성형 AI 교육 이수</p></article>
        <article><small>RESEARCH</small><h2>HUMANE Lab</h2><p>숭실대학교 AI융합학부 학부연구생 · ASTUTE RAG 구현 및 AI 논문 분석</p></article>
        <article><small>LINKS</small><h2>Connect</h2><a href="https://github.com/kimsehan11" target="_blank" rel="noreferrer">GitHub ↗</a></article>
      </section>
    </main>
  );
}

export { default } from "./ProfileContent";
