import * as yup from 'yup'

const RegisterSchema = yup.object().shape({
    username: yup.string()
        .trim()
        .required('Please enter a username: minimum of 5 character username')
        .min(5)
    ,
    password: yup.string()
        .trim()
        .required('Please enter a password: minimum of 12 character password')
        .min(12)
})

export default RegisterSchema
