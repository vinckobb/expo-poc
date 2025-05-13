import {useTranslation} from "react-i18next";
import {Link, Outlet} from "react-router";

export default function BaseLayout() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <div className="header">
        <div className="logo">LOGO</div>
        <nav>
          <Link to="/">{t('home.link')}</Link>
          <Link to="/profile">{t('profile.link')}</Link>
          <Link to="/explore">{t('explore.link')}</Link>
        </nav>
        <div className="language-selector">
          <a href="#" onClick={() => changeLanguage('sk')}>
            sk
          </a>
          <a href="#" onClick={() => changeLanguage('en')}>
            en
          </a>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
