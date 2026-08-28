import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, type ProjectSectionImage } from "../../data/projects";

function ProjectImages({ images }: { images: ProjectSectionImage[] }) {
  const renderImage = (item: ProjectSectionImage) => {
    const picture = <img src={item.src} alt={item.alt} width={item.width} height={item.height} loading={item.width && item.height ? "lazy" : undefined} />;
    return (
      <figure className={item.className} key={item.src}>
        {item.caption && <figcaption>{item.caption}</figcaption>}
        <div>
          {item.href
            ? <a href={item.href} target="_blank" rel="noreferrer">{picture}</a>
            : picture}
        </div>
      </figure>
    );
  };
  const groups = [...new Set(images.map((item) => item.group ?? "default"))];

  return (
    <div className="project-section-images">
      {images.some((item) => item.group)
        ? groups.map((group) => (
          <div className="project-image-column" data-image-group={group} key={group}>
            {images.filter((item) => (item.group ?? "default") === group).map(renderImage)}
          </div>
        ))
        : images.map(renderImage)}
    </div>
  );
}

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  return (
    <main className={`project-modal-page modal-${project.index}`}>
      <div className="modal-backdrop" aria-hidden="true">
        {projects.map((item) => <span key={item.slug}>{item.title}</span>)}
      </div>
      <Link className="mark mark-dark modal-ks" href="/project" aria-label="프로젝트 목록으로 돌아가기">KS</Link>
      <article className="project-sheet">
        <header className="sheet-meta">
          <span>PROJECT {project.index}</span>
          <span>{project.type}</span>
          <span>{project.period}</span>
        </header>
        <section className="sheet-title">
          <p>KIM SEHAN / SELECTED WORK</p>
          <h1>{project.title}</h1>
        </section>
        <section className="sheet-content">
          <div>
            <p className="sheet-label">OVERVIEW</p>
            <p className="sheet-description">{project.description}</p>
            {project.paper && (
              <a className="sheet-paper" href={project.paper.href} target="_blank" rel="noreferrer">
                {project.paper.label} <span aria-hidden="true">↗</span>
              </a>
            )}
            {project.demo && (
              <a className="sheet-paper sheet-demo" href={project.demo.href} target="_blank" rel="noreferrer" aria-label="YouTube에서 시연 영상 보기">
                {project.demo.label} <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
          <div>
            <p className="sheet-label">MY WORK</p>
            <ul>{project.contributions.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </section>
        {project.sections?.map((section) => (
          <section className={`project-section project-section--${section.layout ?? "standard"}`} key={section.title}>
            <h2>{section.title}</h2>
            <div className="project-section-grid">
              {section.flow && (
                <div className="project-code-flow" role="group" aria-label={section.flow.label}>
                  {section.flow.entry.map((step) => (
                    <div className="code-flow-stage" key={step.eyebrow}>
                      <article className="code-flow-node">
                        <span>{step.eyebrow}</span>
                        <code>{step.file}</code>
                        <h3>{step.title}</h3>
                        <p>{step.detail}</p>
                      </article>
                      <i className="code-flow-arrow" aria-hidden="true">↓</i>
                    </div>
                  ))}
                  <div className="code-flow-branch-label"><span>TOOL BRANCHES</span></div>
                  <div className="code-flow-branches">
                    {section.flow.branches.map((step) => (
                      <article className="code-flow-node code-flow-node--branch" key={step.eyebrow}>
                        <span>{step.eyebrow}</span>
                        <code>{step.file}</code>
                        <h3>{step.title}</h3>
                        <p>{step.detail}</p>
                      </article>
                    ))}
                  </div>
                  <i className="code-flow-arrow code-flow-arrow--merge" aria-hidden="true">↓</i>
                  <article className="code-flow-node code-flow-node--output">
                    <span>{section.flow.output.eyebrow}</span>
                    <code>{section.flow.output.file}</code>
                    <h3>{section.flow.output.title}</h3>
                    <p>{section.flow.output.detail}</p>
                  </article>
                </div>
              )}
              {!section.flow && (
                <div className="project-section-copy">
                  {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {section.bullets && <ul>{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul>}
                  {section.blocks?.map((block) => (
                    <div className="project-section-block" key={block.title}>
                      <h3>{block.title}</h3>
                      <ul>{block.items.map((item) => <li key={item}>{item}</li>)}</ul>
                    </div>
                  ))}
                </div>
              )}
              {!section.flow && section.images && (
                <ProjectImages images={section.images} />
              )}
            </div>
            {section.tables && (
              <div className="project-section-tables">
                {section.tables.map((table) => (
                  <div key={table.title}>
                    <div className="project-table-wrap">
                      <table className="project-table">
                        <caption>{table.title}</caption>
                        <thead>
                          <tr>{table.columns.map((column) => <th scope="col" key={column}>{column}</th>)}</tr>
                        </thead>
                        <tbody>
                          {table.rows.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                              {row.map((cell, columnIndex) => columnIndex === 0
                                ? <th scope="row" key={columnIndex}>{cell}</th>
                                : <td key={columnIndex}>{cell}</td>)}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {table.note && <p className="project-table-note">{table.note}</p>}
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}
        <div className="sheet-tags">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
        {project.presentation && (
          <a className="sheet-presentation" href={project.presentation.href} target="_blank" rel="noreferrer">
            <span>{project.presentation.label}</span><span>OPEN ↗</span>
          </a>
        )}
        <a className="sheet-github" href={project.github} target="_blank" rel="noreferrer">
          <span>GITHUB REPOSITORY</span><span>OPEN ↗</span>
        </a>
      </article>
    </main>
  );
}
