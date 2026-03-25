import styled from "styled-components";
import {Button} from "../Button.tsx";

interface CardsBarProps {
    onAddTable: () => void;
    selectedIds: string[];
    onClearSelection: () => void;
    deleteTables: (ids: string[]) => void;
}

export const CardsBar = ({onAddTable, selectedIds, onClearSelection, deleteTables}: CardsBarProps) => {

    const handleDelete = () => {
        if (selectedIds.length > 0) {
            deleteTables(selectedIds);
            onClearSelection();
        }
    };

    return (
        <CardsWrap>
            {selectedIds.length > 0 && (
                <DeleteButton onClick={handleDelete}>
                    Delete ({selectedIds.length})
                </DeleteButton>
            )}
            <CardsButton onClick={onAddTable}>Create Table</CardsButton>
        </CardsWrap>
    );
};

const CardsWrap = styled.div`
    display: flex;
    justify-content: end;
    gap: 20px;
    padding: 1rem 2rem;
    margin-top: 20px;
    width: 100%;
`
const CardsButton = styled(Button)`
    padding: 6px 8px;
`

const DeleteButton = styled(Button)`
    padding: 6px 8px;
    background-color: ${props => props.theme.secondary + '10'};
    color: ${props => props.theme.text};

    &:hover {
        background-color: ${props => props.theme.secondary + '20'};
    }
`