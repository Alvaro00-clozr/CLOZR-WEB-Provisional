import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { setLanguage, supportedLangs, type Lang } from "../app/i18n";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const current = i18n.language as Lang;

  const options = useMemo(
    () => supportedLangs.map((l) => ({ value: l, label: l.toUpperCase() })),
    []
  );

  return (
    <select
      value={current}
      onChange={(e) => setLanguage(e.target.value as Lang)}
      className="input"
      style={{ width: 96, padding: "10px 12px" }}
      aria-label="Language"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}