import { useEffect, useState } from "react";

function GoogleTranslate() {
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  useEffect(() => {
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,tl,zh-CN,ja,ko,hi,es,fr,de",
          autoDisplay: false
        },
        "google_translate_element"
      );
    };

    const existingScript = document.querySelector(
      'script[src*="translate.google.com/translate_a/element.js"]'
    );

    if (!existingScript) {
      const script = document.createElement("script");
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    } else if (window.google && window.google.translate) {
      window.googleTranslateElementInit();
    }
  }, []);

  const changeLanguage = (languageCode) => {
    setSelectedLanguage(languageCode);

    const tryTranslate = setInterval(() => {
      const googleSelect = document.querySelector(".goog-te-combo");

      if (googleSelect) {
        googleSelect.value = languageCode;
        googleSelect.dispatchEvent(new Event("change"));
        clearInterval(tryTranslate);
      }
    }, 300);

    setTimeout(() => {
      clearInterval(tryTranslate);
    }, 5000);
  };

  return (
    <div className="translate-wrapper">
      <label className="translate-label" htmlFor="language-select">
        🌐 Language:
      </label>

      <select
        id="language-select"
        className="custom-language-select"
        value={selectedLanguage}
        onChange={(event) => changeLanguage(event.target.value)}
      >
        <option value="en">🇺🇸 English</option>
        <option value="tl">🇵🇭 Tagalog / Filipino</option>
        <option value="zh-CN">🇨🇳 中文</option>
        <option value="ja">🇯🇵 日本語</option>
        <option value="ko">🇰🇷 한국어</option>
        <option value="hi">🇮🇳 हिन्दी</option>
        <option value="es">🇪🇸 Español</option>
        <option value="fr">🇫🇷 Français</option>
        <option value="de">🇩🇪 Deutsch</option>
      </select>

      <div id="google_translate_element"></div>
    </div>
  );
}

export default GoogleTranslate;