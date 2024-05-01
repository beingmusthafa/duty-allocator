function clearForm(formId) {
  let form = document.getElementById(formId);
  for (let element of form.elements) {
    if (["INPUT", "SELECT", "TEXTAREA"].includes(element.tagName)) {
      element.value = "";
    }
  }
}
export default clearForm;
