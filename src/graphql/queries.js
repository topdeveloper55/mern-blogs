export const addUser = (form) => {
    return `
        mutation {
            addUser(name:${form.name},email:${form.email},password:${form.password},
                avatarURL:${form.avatarURL}){
                name
                phoneno
                dob
            }
        }
    `;
};