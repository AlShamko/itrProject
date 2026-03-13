import styled from 'styled-components';
import {CardTable} from "../CardTable/CardTable.tsx";
import type {Table} from "../../hooks/useTables.ts";

interface CardsListProps {
    table: Table[];
    selectedIds: string[];
    onToggleSelect: (id: string) => void;
}

export const CardsList = ({table, selectedIds, onToggleSelect}: CardsListProps) => {

    return (
        <Wrap>
            {table.map(table => (
                <CardTable
                    key={table.id}
                    table={table}
                    isSelected={selectedIds.includes(table.id)}
                    onToggle={onToggleSelect}
                />
            ))}
        </Wrap>
    );
};

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    gap: 20px;
    padding: 20px 0;
`;


