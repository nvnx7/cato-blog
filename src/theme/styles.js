// Global style overrides
import colors from "./colors"

const brandColor = colors.brand[500]
const spacing0 = "0"
const spacing1 = "0.25rem"
const spacing4 = "1rem"
const spacing6 = "1.5rem"
const spacing8 = "2rem"
const lineHeightRelaxed = 1.625

const styles = {
  global: {
    html: {
      "-webkit-font-smoothing": "antialiased",
      "-moz-osx-font-smoothing": "grayscale",
    },
    body: {
      color: "#1A202C",
      bg: "white",
    },

    "*, :after, :before": {
      boxSizing: "border-box",
    },

    p: {
      lineHeight: lineHeightRelaxed,
      marginBottom: spacing4,
    },

    "ol, ul": {
      listStylePosition: "inside",
      listStyleImage: "none",
      marginBottom: spacing8,
    },
    "ol li, ul li": {
      marginBottom: spacing4,
    },
    "li > p": {
      display: "inline-block",
      marginBottom: spacing0,
    },
    "li > ul": {
      marginLeft: spacing8,
      marginTop: spacing4,
      marginBottom: spacing4,
    },
    "li *:last-child": {
      marginBottom: spacing0,
    },

    blockquote: {
      marginLeft: spacing8,
      marginRight: spacing8,
      marginBottom: spacing8,
      fontStyle: "italic",
      padding: `${spacing0} ${spacing0} ${spacing0} ${spacing6}`,
      borderLeft: `${spacing1} solid ${brandColor}`,
    },
    "blockquote > ul, blockquote > ol,": {
      listStylePosition: "inside",
    },

    a: {
      color: brandColor,
    },
    "a:hover, a:focus": {
      textDecoration: "none",
    },

    table: {
      width: "100%",
      marginBottom: spacing8,
      borderCollapse: "collapse",
      borderSpacing: spacing1,
    },
    "table thead tr th": {
      borderBottom: `1px solid ${brandColor}`,
    },
  },
}

export default styles
