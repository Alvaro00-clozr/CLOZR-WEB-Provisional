import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "../components/LanguageSwitcher";

export default function App() {
  const { t } = useTranslation();

  return (
    <>
      <header style={{ padding: "22px 0" }}>
        <div className="container" style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ letterSpacing: 2, opacity: 0.9 }}>CLOZR</div>

          <nav style={{ display: "flex", gap: 18, marginLeft: 18, color: "var(--text-1)" }}>
            <a href="#product">{t("nav.product")}</a>
            <a href="#revops">{t("nav.revops")}</a>
            <a href="#pricing">{t("nav.pricing")}</a>
            <a href="#contact">{t("nav.contact")}</a>
          </nav>

          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 12 }}>
            <LanguageSwitcher />
            <button className="btn btn--ghost">{t("nav.login")}</button>
          </div>
        </div>
      </header>

      <main>
        <section style={{ padding: "54px 0 32px" }}>
          <div className="container" style={{ textAlign: "center" }}>
            <h1 style={{ margin: 0, fontSize: 54, lineHeight: 1.05, fontWeight: 600, letterSpacing: -1 }}>
              <span style={{ color: "var(--text-0)" }}>{t("hero.headline")} </span>
              <span style={{ color: "var(--primary)" }}>{t("hero.headline2")} </span>
              <span style={{ color: "var(--text-1)" }}>{t("hero.headline3")}</span>
            </h1>

            <p style={{ margin: "22px auto 0", maxWidth: 820, color: "var(--text-1)", fontSize: 16, lineHeight: 1.6 }}>
              {t("hero.sub")} <br />
              {t("hero.sub2")}
            </p>

            <div style={{ marginTop: 26, display: "flex", gap: 12, justifyContent: "center" }}>
              <button className="btn">{t("hero.ctaPrimary")}</button>
              <button className="btn btn--ghost">{t("hero.ctaSecondary")}</button>
            </div>

            <div style={{ marginTop: 34 }} className="glass">
              <div style={{ padding: 18, color: "var(--text-2)" }}>
                Placeholder: aquí irá el “dashboard mock” (la imagen con gráficas).
              </div>
              <div style={{ height: 220, borderTop: "1px solid var(--stroke)" }} />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}