// inculde in ts.config
// import module, end with "svg"

declare module "*.svg" {
  // make ReactComponent exportable from svg.file
  import React = require("react");
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  // export as string
  const src: string;
  export default src;
}
