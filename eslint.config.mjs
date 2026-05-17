import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    // React 19/Next 16 신규 룰 — useEffect 안 setState 는 본래 안티패턴이나
    // localStorage 하이드레이트, matchMedia, IntersectionObserver 등 외부 시스템
    // 동기화는 React 공식 권장 패턴(=정당한 사용). 에러로 차단하면 19건 false
    // positive. warn 으로 두면 진짜 안티패턴(예: prop 변화 시 derived state
    // setState)이 새로 들어올 때 surface 되지만 빌드는 막지 않음.
    rules: {
      "react-hooks/set-state-in-effect": "warn",
    },
  },
]);

export default eslintConfig;
