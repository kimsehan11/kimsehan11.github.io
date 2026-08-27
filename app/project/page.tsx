"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { projects } from "../data/projects";

const months = ["JUN", "DEC", "MAR"];

export default function ProjectPage() {
  const pageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;
    const moveSideways = (event: WheelEvent) => {
      if (window.matchMedia("(max-width: 760px)").matches) return;
      event.preventDefault();
      page.scrollLeft += event.deltaY + event.deltaX;
    };
    page.addEventListener("wheel", moveSideways, { passive: false });
    return () => page.removeEventListener("wheel", moveSideways);
  }, []);

  return (
    <main className="album-page" ref={pageRef}>
      <Link className="mark mark-light album-ks" href="/main" aria-label="메인으로 돌아가기">KS</Link>
      <section className="album-grid">
        {projects.map((project, index) => (
          <article className={`album-item album-item-${index + 1}`} key={project.slug}>
            <Link href={`/project/${project.slug}`} aria-label={`${project.title} 상세 보기`}>
              <div className="album-card">
                <div className="album-role">
                  <span>{project.type}</span>
                  <span>/</span>
                  <span>{project.summary}</span>
                </div>
                <h2>{project.title}</h2>
                <div className="album-foot">
                  <span>{months[index]}<br />{project.period}</span>
                  <span>KS<br />AI</span>
                </div>
              </div>
              <div className="album-disc" aria-hidden="true">
                <div className="disc-grooves" />
                <div className="disc-label">
                  <b>{project.index}</b>
                  <span>KS</span>
                </div>
                <div className="disc-hole" />
              </div>
            </Link>
          </article>
        ))}
        <article className="album-item album-item-next">
          <div className="album-card">
            <div className="album-role">
              <span>NEXT PROJECT</span>
              <span>/</span>
              <span>Natural Language to Database Query</span>
            </div>
            <h2>Text-to-SQL</h2>
            <div className="album-foot">
              <span>COMING<br />SOON</span>
              <span>2026<br />WIP</span>
            </div>
          </div>
          <div className="album-disc sql-disc" aria-hidden="true">
            <div className="disc-grooves" />
            <div className="disc-label"><b>SQL</b><span>SELECT *</span></div>
            <div className="disc-hole" />
          </div>
        </article>
      </section>
    </main>
  );
}
