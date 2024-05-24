import { reactive } from 'vue'
import * as yup from 'yup'

const initialValues = {
    username: '',
    password: ''
}

const initialErrors = {
    username: '',
    password: ''
}

export const useFormValidation = (schema) => {
    const data = reactive({ ...initialValues })
    const errors = reactive({ ...initialErrors })

    const validateField = async (name, value) => {
        try {
            await yup.reach(schema, name).validate(value)
            errors[name] = ''

        }
        catch (err) {
            errors[name] = err.errors[0]
        }

    }

    const onInputChange = (event) => {
        const { name, value } = event.target
        validateField(name, value)
        data[name] = value

    }

    return {
        data,
        errors,
        onInputChange
    }

}