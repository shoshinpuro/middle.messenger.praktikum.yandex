export function formDataOutput(formElem: HTMLFormElement, names: Array<string>) {
    const formData = new FormData(formElem);  
    const inputsData = names.map((value) => {
        return [value, formData.get(value)]
    })
    console.log('inputsData',inputsData);
}
