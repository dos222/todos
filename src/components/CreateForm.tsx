import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { useSetRecoilState, useRecoilValue } from 'recoil'
import { categoryState, toDoState } from '../atoms';

interface IForm {
    toDo: string;
}


const Input = styled.input`
    margin-top : 10px;
    font-size : 16px;
    padding: 5px;
     
`
const Btn = styled.button`
    font-size : 16px;
    padding : 5px;
    
`
function CreateForm() {
    const setToDos = useSetRecoilState(toDoState)
    const category = useRecoilValue(categoryState)
    const { register, handleSubmit, setValue } = useForm<IForm>()

    const handleValid = ({ toDo }: IForm) => {
        setToDos((oldToDos) => [
            { text: toDo, id: Date.now(), category },
            ...oldToDos
        ])
        setValue('toDo', "")
    }
    return (
        <form onSubmit={handleSubmit(handleValid)}>
            <Input {...register('toDo', {
                required: "Please Write a To do"
            })} placeholder="write a To do" />
            <Btn> Save </Btn>
        </form>
    )
}

export default CreateForm; 