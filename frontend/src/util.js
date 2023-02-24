export const getFormData = (data) => {
    const formDataObj = {};
    data.forEach((value, key) => (formDataObj[key] = value));
    return formDataObj;
}