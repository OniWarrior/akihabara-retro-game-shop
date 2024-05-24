import * as yup from 'yup'


const LoginSchema = yup.object().shape({
    username: yup.string()
        .trim()
        .required("Please enter a username")
    ,
    password: yup.string()
        .trim()
        .required("Please enter a password")
})

export default LoginSchema