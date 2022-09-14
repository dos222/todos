import { useSetRecoilState } from 'recoil';
import styled from 'styled-components'
import { Categories, IToDo, toDoState } from "../atoms";

const Item = styled.div`
    border : 1px solid black;
    border-radius : 5px;
    height : 100px;
    padding : 10px;
    display : flex;
    flex-direction : column;
    justify-content : center;
`
const Kind = styled.span`
    color: gray;
    font-size : 12px; 
`
const SubTitle = styled.span`
    font-size : 24px;
    font-weight : bold;

`
const BtnDiv = styled.div`
    display :flex; 
    justify-content : right;
`

function ToDo({ text, id, category }: IToDo) {
    const setToDos = useSetRecoilState(toDoState);
    const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const {
            currentTarget: { name },
        } = event;
        setToDos((oldToDos) => {
            const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
            const newToDo = { text, id, category: name as any };
            return [
                ...oldToDos.slice(0, targetIndex),
                newToDo,
                ...oldToDos.slice(targetIndex + 1),
            ];
        });
    };
    return <Item>
        <Kind>{category}</Kind>
        <SubTitle>{text}</SubTitle>
        <BtnDiv>

            {category !== Categories.DOING && (
                <button name={Categories.DOING} onClick={onClick}>
                    Doing
                </button>
            )}
            {category !== Categories.TO_DO && (
                <button name={Categories.TO_DO} onClick={onClick}>
                    To Do
                </button>
            )}
            {category !== Categories.DONE && (
                <button name={Categories.DONE} onClick={onClick}>
                    Done
                </button>
            )}
        </BtnDiv>
    </Item>;
}

export default ToDo;

