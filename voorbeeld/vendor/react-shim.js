/* ESM-shim voor de globale UMD-build van React (geladen via <script> hierboven).
   Alleen nodig omdat components/core/*.js écht `import React from 'react'` doet;
   dit bestand geeft de browser iets importeerbaars zonder bundler of build-stap. */
export default window.React;
