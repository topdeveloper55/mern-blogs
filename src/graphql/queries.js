export const beforeSignup = (form) => {
    return `
        mutation{
            checkExisting(userName:"${form.userName}",email:"${form.emailid}")
        }
    `;
};

export const addUser = (form) => {
    return `
        mutation {
        addUser(name:"${form.name}",userName:"${form.userName}",email:"${form.emailid}",password:"${form.pswd}",
            avatarURL:"${form.avatar}"){
            name
            email
        }
    }
    `;
};

export const createPost = (form) => {
    return `
        mutation {
        createPost(title:"${form.title}",text:"${form.text}",authorEmail:"${form.author.email}"){
            title
            slug
            text
            createdDate
        }
    }
    `;
};

export const deletePost = (id) => {
    return `
        mutation {
            deletePost(id:"${id}")
        }
    `;
};

export const getAllPosts = () => {
    return `
        query {
            posts {
                title
                slug
                text
                createdDate
                _id
                author{
                    name
                    userName
                    avatarURL
                    email
                }
            }
        }
    `;
};
