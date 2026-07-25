const fs = require("fs");
const path = require("path");


const ROOT = path.resolve(__dirname, "../../../..");


function readIfExists(relPath) {

  const fullPath = path.join(ROOT, relPath);

  try {

    return fs.readFileSync(fullPath, "utf8");

  } catch {

    return null;

  }

}


function listComponents() {

  const componentsDir = path.join(ROOT, "frontend/src/components");

  try {

    return fs
      .readdirSync(componentsDir)
      .filter((f) => f.endsWith(".tsx"))
      .sort();

  } catch {

    return [];

  }

}


function designSystemContext() {

  return {

    aviso_status: "Fonte oficial de tokens ainda não formalizada (ADR-002 referenciado no TASK_ROUTER.md §14/consolidação documental como 'Proposed', mas o arquivo não existe em docs/adrs/). Os valores abaixo são os que já estão implementados de fato em frontend/src/index.css e batem com docs/design/stitch-export/DESIGN.md.",

    tokens_stitch_source: "docs/design/stitch-export/DESIGN.md",

    tokens_stitch: readIfExists("docs/design/stitch-export/DESIGN.md"),

    tokens_implementados_css_source: "frontend/src/index.css",

    tokens_implementados_css: readIfExists("frontend/src/index.css"),

    ui_rules_source: "docs/design/UI_RULES.md",

    ui_rules: readIfExists("docs/design/UI_RULES.md"),

    componentes_implementados_dir: "frontend/src/components",

    componentes_implementados: listComponents(),

  };

}


module.exports = {

  designSystemContext,

};
