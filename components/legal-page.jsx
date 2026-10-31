import Link from "next/link";
import { updated } from "../lib/content";
import { Arrow } from "./icons";
export default function LegalPage({ title, english, description, sections }) {
  return (
    <>
      <section className="page-top">
        <div className="container">
          <Link className="breadcrumb" href="/">
            나혼자 힐러 <Arrow />
          </Link>
          <p className="eyebrow">{english}</p>
          <h1>{title}</h1>
          <p>{description}</p>
          <span className="updated">시행·최종 수정일 {updated}</span>
        </div>
      </section>
      <div className="container document-layout">
        <aside className="document-nav">
          <span>이 페이지에서</span>
          <nav aria-label="문서 목차">
            {sections.map(([id, heading]) => (
              <a href={`#${id}`} key={id}>
                {heading}
              </a>
            ))}
          </nav>
          <Link className="aside-help" href="/support/">
            도움이 필요하십니까? <Arrow />
          </Link>
        </aside>
        <article className="document-body">
          {sections.map(([id, heading, content]) => (
            <section id={id} key={id}>
              <h2>{heading}</h2>
              {/* Locally authored content only; never visitor input. */}
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </section>
          ))}
        </article>
      </div>
    </>
  );
}
