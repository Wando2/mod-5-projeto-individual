import inquirer from 'inquirer'
import fs from 'fs'

let cssRules = [];

try {
  const data = fs.readFileSync("cssRules.json");
  cssRules = JSON.parse(data);
} catch (err) {
  console.log("Não foi encontrada nenhuma regra");
}

const addCSSRule = async () => {
  const { rule } = await inquirer.prompt([
    {
      type: "input",
      name: "rule",
      message: "Adicione uma propiedade do CSS:",
    },
  ]);

  if (cssRules.includes(rule)) {
    console.log("Essa propiedade já existe");
  } else {
    cssRules.push(rule);
    fs.writeFileSync("cssRules.json", JSON.stringify(cssRules));
    console.log("Propiedade adicionada com sucesso!");
  }
};

const removeCSSRule = async () => {
  const { rule } = await inquirer.prompt([
    {
      type: "input",
      name: "rule",
      message: "Escolhe a propiedade que deseja remover:",
    },
  ]);

  const index = cssRules.indexOf(rule);
  if (index === -1) {
    console.log("Propiedade não encontrada");
  } else {
    cssRules.splice(index, 1);
    fs.writeFileSync("cssRules.json", JSON.stringify(cssRules));
    console.log("Propiedade removida com sucesso!");
  }
};

const showCSSRules = () => {
  console.log("CSS rules:", cssRules.join("\n"));
};

const checkCSSRule = async () => {
  const { rule } = await inquirer.prompt([
    {
      type: "input",
      name: "rule",
      message: "Insira uma propiedade do css para verificar!:",
    },
  ]);

  console.log(
    cssRules.includes(rule) ? "CSS rule exists" : "CSS rule does not exist"
  );
};

const main = async () => {
  const { action } = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "O que você gostaria de fazer?",
      choices: [
        { name: "Adicionar Propiedade do CSS", value: addCSSRule },
        { name: "Remover propiedade do CSS", value: removeCSSRule },
        { name: "Exibir propiedades do CSS", value: showCSSRules },
        { name: "Buscar propiedade do CSS", value: checkCSSRule },
        { name: "Sair", value: () => {} },
      ],
    },
  ]);

  await action();

  if (action !== "Exit") {
    main();
  }
};

main();
