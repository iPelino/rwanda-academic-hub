/**
 * Academia Rwanda — Shared Tailwind Design Token Configuration
 * Single source of truth. Loaded before the Tailwind CDN script on every page.
 * DO NOT duplicate this config inside individual HTML files.
 *
 * Key corrections vs. original per-page inline configs:
 *   - primary: #1A3D2B (spec) not #022717 (was incorrectly forest-dark)
 *   - borderRadius DEFAULT: 0.5rem (spec) not 0.25rem
 *   - background: #F5F7F2 (spec) not #f9f9f6 (surface)
 *   - Added: success, success-bg, accent-light tokens
 *   - Removed: orphan btn-amber-text token (now use text-[#3B2800] inline where needed)
 */
tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        /* ─── Brand ─────────────────────────────────────────── */
        "primary":                "#1A3D2B",
        "primary-dark":           "#0F2318",
        "primary-container":      "#1a3d2b",
        "primary-fixed":          "#c4ecd2",
        "primary-fixed-dim":      "#a9d0b6",
        "on-primary":             "#ffffff",
        "on-primary-container":   "#82a890",
        "on-primary-fixed":       "#002112",
        "on-primary-fixed-variant":"#2b4e3b",
        "inverse-primary":        "#a9d0b6",

        /* ─── Forest Scale ───────────────────────────────────── */
        "forest-dark":            "#0F2318",
        "forest-mid":             "#2D6645",
        "forest-light":           "#4A8C63",

        /* ─── Sage Scale ─────────────────────────────────────── */
        "sage-elevated":          "#EEF2E8",
        "sage-dim":               "#E4EAD8",

        /* ─── Accent ─────────────────────────────────────────── */
        "accent-amber":           "#E8A020",
        "accent-light":           "#FDF3DC",

        /* ─── Success (for confirmed/positive states) ─────────── */
        "success":                "#2D7A4F",
        "success-bg":             "#D4F0E0",

        /* ─── Text ───────────────────────────────────────────── */
        "text-primary":           "#0F1E17",
        "text-secondary":         "#3D5A47",

        /* ─── Border ─────────────────────────────────────────── */
        "border-sage":            "#C8D9BE",

        /* ─── Surface Scale ──────────────────────────────────── */
        "background":             "#F5F7F2",
        "surface":                "#f9f9f6",
        "surface-bright":         "#f9f9f6",
        "surface-dim":            "#dadad7",
        "surface-variant":        "#e2e3df",
        "surface-tint":           "#426651",
        "surface-container-lowest":"#ffffff",
        "surface-container-low":  "#f4f4f0",
        "surface-container":      "#eeeeeb",
        "surface-container-high": "#e8e8e5",
        "surface-container-highest":"#e2e3df",
        "on-surface":             "#1a1c1a",
        "on-surface-variant":     "#414843",
        "on-background":          "#1a1c1a",
        "inverse-surface":        "#2f312f",
        "inverse-on-surface":     "#f1f1ed",

        /* ─── Secondary ──────────────────────────────────────── */
        "secondary":              "#5c5f5c",
        "secondary-container":    "#dee0db",
        "secondary-fixed":        "#e1e3de",
        "secondary-fixed-dim":    "#c5c7c3",
        "on-secondary":           "#ffffff",
        "on-secondary-container": "#606360",
        "on-secondary-fixed":     "#191c1a",
        "on-secondary-fixed-variant":"#444844",

        /* ─── Tertiary ───────────────────────────────────────── */
        "tertiary":               "#391619",
        "tertiary-container":     "#522b2d",
        "tertiary-fixed":         "#ffdada",
        "tertiary-fixed-dim":     "#f3b8b9",
        "on-tertiary":            "#ffffff",
        "on-tertiary-container":  "#c89193",
        "on-tertiary-fixed":      "#321113",
        "on-tertiary-fixed-variant":"#653b3d",

        /* ─── Error ──────────────────────────────────────────── */
        "error":                  "#ba1a1a",
        "error-container":        "#ffdad6",
        "on-error":               "#ffffff",
        "on-error-container":     "#93000a",

        /* ─── Outline ────────────────────────────────────────── */
        "outline":                "#727973",
        "outline-variant":        "#c1c8c1",
      },

      borderRadius: {
        DEFAULT: "0.5rem",   /* 8px — primary CTA rounding per spec */
        lg:      "1rem",     /* 16px */
        xl:      "1.5rem",   /* 24px */
        full:    "9999px",
      },

      spacing: {
        "base":                  "8px",
        "gutter":                "20px",
        "card-padding":          "20px",
        "margin-sm":             "16px",
        "margin-md":             "24px",
        "margin-lg":             "40px",
        "container-padding-sm":  "16px",
        "container-padding-md":  "24px",
        "container-padding-lg":  "40px",
        "container-max":         "1200px",
        "max-width":             "1200px",
        "section-sm":            "32px",
        "section-md":            "56px",
        "section-lg":            "80px",
        "section-gap-sm":        "32px",
        "section-gap-md":        "56px",
        "section-gap-lg":        "80px",
      },

      fontFamily: {
        "display-xl":        ["DM Serif Display"],
        "display-xl-mobile": ["DM Serif Display"],
        "display-lg":        ["DM Serif Display"],
        "headline-lg":       ["Plus Jakarta Sans"],
        "headline-md":       ["Plus Jakarta Sans"],
        "headline-sm":       ["Plus Jakarta Sans"],
        "body-lg":           ["Plus Jakarta Sans"],
        "body-base":         ["Plus Jakarta Sans"],
        "body-sm":           ["Plus Jakarta Sans"],
      },

      fontSize: {
        "display-xl":        ["48px", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "400" }],
        "display-xl-mobile": ["32px", { lineHeight: "1.2",  fontWeight: "400" }],
        "display-lg":        ["36px", { lineHeight: "1.2",  letterSpacing: "-0.015em", fontWeight: "400" }],
        "headline-lg":       ["28px", { lineHeight: "1.25", letterSpacing: "-0.01em",  fontWeight: "700" }],
        "headline-md":       ["22px", { lineHeight: "1.3",  fontWeight: "600" }],
        "headline-sm":       ["18px", { lineHeight: "1.35", fontWeight: "600" }],
        "body-lg":           ["17px", { lineHeight: "1.65", fontWeight: "400" }],
        "body-base":         ["15px", { lineHeight: "1.6",  fontWeight: "400" }],
        "body-sm":           ["13px", { lineHeight: "1.55", fontWeight: "400" }],
      },
    },
  },
};
