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
        createPost(title:"${form.title}",text:"${form.text}",author:"${form.author}"){
            title
            slug
            text
            createdDate
        }
    }
    `;
};

export const deletePost = (id) => {
    console.log(id);
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
            }
        }
    `;
};
