import { gql } from '@apollo/client';

export const beforeSignup = (form) => {
	return gql`
        query{
            checkExisting(userName:"${form.userName}",email:"${form.emailid}")
        }
    `;
};

export const addUser = (form) => {
	return gql`
        mutation {
        addUser(name:"${form.name}",userName:"${form.userName}",email:"${form.emailid}",password:"${form.pswd}",
            avatarURL:"${form.avatar}"){
            name
            email
        }
    }
    `;
};

export const userLogin = (form) => {
	return gql`
        query{
            userLogin(email:"${form.email}",password:"${form.password}")
        }
    `;
};

export const createPost = (form) => {
	return gql`
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
	return gql`
        mutation {
            deletePost(id:"${id}")
        }
    `;
};

export const getAllPosts = () => {
	return gql`
		query {
			posts {
				title
				slug
				text
				createdDate
				_id
				author {
					name
					userName
					avatarURL
					email
				}
			}
		}
	`;
};
