import styled from "styled-components";
import {Button} from "../Button.tsx";

interface Props {
    onAddTable: () => void;
}

export const CardsBar = ({ onAddTable }: Props) => {
    return (
        <CardsWrap>
            <CardsButton onClick={onAddTable}>Create Table</CardsButton>
        </CardsWrap>
    );
};

const CardsWrap = styled.div`
    display: flex;
    justify-items: end;
    align-items: center;
    gap: 20px;
    margin-top: 20px;
`
const CardsButton = styled(Button)`
    padding: 6px 8px;
`