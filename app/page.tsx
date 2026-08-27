import Link from "next/link";

export default function IntroPage() {
  return (
    <main className="intro">
      <div className="intro-copy">
        <p className="eyebrow">KIM SEHAN · AI ENGINEER</p>
        <h1>
          I build AI that
          <br />
          understands <em>context.</em>
        </h1>
        <p className="intro-sub">사람과 맥락을 이해하는 AI를 연구하고, 서비스로 구현합니다.</p>
        <Link className="enter-link" href="/main">
          ENTER PORTFOLIO <span>↗</span>
        </Link>
      </div>
      <div className="aurora" aria-hidden="true"><span /><span /><span /></div>
      <p className="intro-index">SELECTED WORKS — 2025</p>
    </main>
  );
}
