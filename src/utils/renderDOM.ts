import Block from "../core/Block";

export default function renderDOM(block: Block, selector: string = "#app") {
    const root = document.querySelector(selector);
    root!.innerHTML = "";
    root!.appendChild(block.getContent());
    console.log(root);
}
  