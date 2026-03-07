import styled from "styled-components";
import {Button} from "../../components/button/Button.tsx";

export const CardsBar = () => {
    return (
        <CardsWrap>
            <CardsButton>Add</CardsButton>
            <CardsButton>Del</CardsButton>
            <CardsButton>Del All</CardsButton>
        </CardsWrap>
    );
};

const CardsWrap = styled.div`
    display: flex;
    justify-content: end;
    align-items: center;
    width: 90vw;
    margin-top: 20px;
    gap: 20px;
`
const CardsButton = styled(Button)`
    padding: 6px 8px;

    &:hover {
        color: ${props => props.theme.secondary};
    }

`