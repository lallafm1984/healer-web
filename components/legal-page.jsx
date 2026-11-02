import Link from "next/link";
import { updated } from "../lib/content";
import { Arrow } from "./icons";
import { getLocale } from "../lib/locale-server";
export default async function LegalPage({ title, description, sections }) {
  const { t, href } = await getLocale();
  return (
    <>
      <section className="page-top">
        <div className="container">
          <Link className="breadcrumb" href={href("/")}>
            {t("나혼자 힐러")} <Arrow />
          </Link>
          <h1>{title}</h1>
          <p>{description}</p>
          <span className="updated">{t("시행·최종 수정일")} {t(updated)}</span>
        </div>
      </section>
      <div className="container document-layout">
        <aside className="document-nav">
          <span>{t("이 페이지에서")}</span>
          <nav aria-label={t("문서 목차")}>
            {sections.map(([id, heading]) => (
              <a href={`#${id}`} key={id}>
                {heading}
              </a>
            ))}
          </nav>
          <Link className="aside-help" href={href("/support/")}>
            {t("도움이 필요하십니까?")} <Arrow />
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
