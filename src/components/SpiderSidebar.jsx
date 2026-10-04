import { useState } from "react";
import "./SpiderSidebar.css";
import { useExperience } from "./ExperienceContext";

export default function SpiderSidebar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { setSection } = useExperience();

  // =========================================
  // HANDLE NAVIGATION
  // =========================================

  const handleNavigation = (section) => {
    setSection(section);
    setMenuOpen(false);
  };

  return (
    <>
      {/* =====================================
          THREE LINE MENU BUTTON
      ===================================== */}

      <button
        className={`spider-menu ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Open menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* =====================================
          DARK BACKDROP
      ===================================== */}

      <div
        className={`menu-backdrop ${menuOpen ? "show" : ""}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* =====================================
          GLASS SIDEBAR
      ===================================== */}

      <aside
        className={`spider-sidebar ${
          menuOpen ? "open" : ""
        }`}
      >

        {/* CLOSE BUTTON */}

        <button
          className="sidebar-close"
          onClick={() => setMenuOpen(false)}
        >
          ×
        </button>

        {/* =====================================
            LOGO
        ===================================== */}

        <div className="spider-logo">
          SPIDER
        </div>

        {/* =====================================
            NAVIGATION
        ===================================== */}

        <nav className="spider-navigation">

          {/* HOME */}

          <button
            className="sidebar-nav-button"
            onClick={() => handleNavigation("home")}
          >
            <span className="nav-icon">◈</span>
            <span>Home</span>
          </button>

          {/* THE SUIT */}

          <button
            className="sidebar-nav-button"
            onClick={() => handleNavigation("suit")}
          >
            <span className="nav-icon">◉</span>
            <span>The Suit</span>
          </button>

          {/* THE CITY */}

          <button
            className="sidebar-nav-button"
            onClick={() => handleNavigation("city")}
          >
            <span className="nav-icon">◇</span>
            <span>The City</span>
          </button>

          {/* SCENES */}

          <button
            className="sidebar-nav-button"
            onClick={() => handleNavigation("scenes")}
          >
            <span className="nav-icon">♡</span>
            <span>Scenes</span>
          </button>

        </nav>

        {/* =====================================
            ACCOUNT
        ===================================== */}

        <div className="spider-account">

          <div className="account-title">
            ACCOUNT
          </div>

          <div className="profile">

            <div className="profile-avatar red">
              S
            </div>

            <span>Goldwin</span>

          </div>

          <div className="profile">

            <div className="profile-avatar black">
              S
            </div>

            <span>Tziona</span>

          </div>

        </div>

      </aside>
    </>
  );
}