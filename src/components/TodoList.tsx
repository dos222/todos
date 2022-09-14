import styled from 'styled-components'
import { useRecoilValue, useRecoilState } from 'recoil'
import CreateForm from "./CreateForm";
import ToDo from "./ToDo";
import { Categories, categoryState, toDoSelector } from '../atoms';

const Wrapper = styled.div`
    height : 100%;
    width : 100%;
    display : flex; 
    flex-direction : column;
    justify-content :center;
    align-items : center;

`
const Title = styled.h1`
    font-size : 32px;
    font-weight : bold;
    margin-top : 20px;
`
const Grid = styled.div`
    margin-top : 20px;
    width : 80%;
    display : grid; 
    grid-template-columns : repeat(auto-fill, minmax(250px, 1fr));
    grid-gap : 10px;
    

`
function ToDoList() {
    const toDos = useRecoilValue(toDoSelector);
    const [category, setCategory] = useRecoilState(categoryState);
    const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
        setCategory(event.currentTarget.value as any);
    };

    return (
        <Wrapper>
            <Title>To Dos</Title>
            <div>
                <select value={category} onInput={onInput}>
                    <option value={Categories.TO_DO}>To Do</option>
                    <option value={Categories.DOING}>Doing</option>
                    <option value={Categories.DONE}>Done</option>
                </select>
                <CreateForm />
            </div>
            <Grid>
                {toDos?.map((toDo) => (
                    <ToDo key={toDo.id} {...toDo} />
                ))}

            </Grid>

        </Wrapper>
    );
}

export default ToDoList; 