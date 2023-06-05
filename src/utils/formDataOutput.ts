function formDataOutput(formElem: HTMLFormElement, names: Array<string>) {
    const formData = new FormData(formElem);
    const inputsData = names.map((value) => [value, formData.get(value)]);
    console.log('inputsData', inputsData); // eslint-disable-line no-console
}

export default formDataOutput;
