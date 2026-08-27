import Link from "next/link";

export default function MainPage() {
  return (
    <main className="select-page">
      <Link className="mark mark-light main-ks" href="/" aria-label="인트로로 돌아가기">KS</Link>
      <section className="select-intro">
        <small>PORTFOLIO / 2024–2026</small>
        <h1>Selected<br />AI Works</h1>
        <p>언어, 이미지, 지식 검색을 연결해 실제로 작동하는 AI를 만듭니다.</p>
      </section>
      <section className="hex-stage">
        <div className="hex-wheel">
          <Link className="hex-segment hs-1" href="/project"><i /><span>PROJECT</span></Link>
          <a className="hex-segment hs-2" href="https://ssu-humane.github.io/" target="_blank" rel="noreferrer"><i /><span>LAB</span></a>
          <Link className="hex-segment hs-3" href="/profile"><i /><span>PROFILE</span></Link>
          <Link className="hex-segment hs-4" href="/concept"><i /><span>CONCEPT</span></Link>
          <a className="hex-segment hs-5" href="https://github.com/kimsehan11" target="_blank" rel="noreferrer"><i /><span>GITHUB</span></a>
          <div className="hex-core">KS</div>
        </div>
      </section>
      <p className="select-word" aria-hidden="true">SELECT</p>
      <div className="select-caption">
        <span>KIM SEHAN</span>
        <span>AI ENGINEER · SEOUL</span>
      </div>
    </main>
  );
}
