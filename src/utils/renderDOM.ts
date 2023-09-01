import Block from '../core/Block';

export default function renderDOM(block: Block, selector: string = '#app') {
    const root = document.querySelector(selector);
    //root!.textContent = '';
    root!.appendChild(block.getContent());
    console.log(root); // eslint-disable-line no-console
    return root;
}
