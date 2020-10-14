export const addUser = (form) => {
    return `
        mutation {
        addUser(name:"${form.name}",email:"${form.emailid}",password:"${form.pswd}",
            avatarURL:"${form.avatar}"){
            name
            email
        }
    }
    `;
};
