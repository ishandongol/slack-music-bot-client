import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { findIconDefinition } from "@fortawesome/fontawesome-svg-core";
import Link from "next/link";
import { useRouter } from "next/router";
import config from "../config";
import { BrandImage } from "./BrandImage";
export const HomeNavbar = () => {
  const { asPath } = useRouter();
  const [expanded, setExpanded] = useState<boolean>(false);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid p-0">
        {asPath !== '/' && <Link href="/">
          <a className="navbar-brand"><BrandImage size="small" alt={config.appName}/></a>
        </Link>
 }
        <button
          className="navbar-toggler ms-auto"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setExpanded(!expanded);
          }}
          aria-expanded={expanded}
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${expanded ? "show" : ""}`}
          id="navbarText"
        >
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link href="/contributors">
                <a
                  className={`nav-link ${
                    asPath.includes("contributors") ? "active" : ""
                  }`}
                >
                  Contributors
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="https://github.com/ishandongol/slack-music-bot-client"
                target="_blank"
                rel="noreferrer noopener"
              >
                <FontAwesomeIcon
                  className="me-1"
                  style={{ fontSize: "24px" }}
                  icon={findIconDefinition({
                    prefix: "fab",
                    iconName: "github",
                  })}
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
