import styled from "styled-components";
import {CardTable} from "../CardTable/CardTable";
import type {Table} from "../../hooks/useTables";

interface CardsListProps {
    tables: Table[];
    selectedIds: string[];
    onToggleSelect: (id: string) => void;
    isAuthenticated: boolean;
}

export const CardsList = ({
                              tables,
                              selectedIds,
                              onToggleSelect,
                              isAuthenticated,
                          }: CardsListProps) => {
    return (
        <Container>
            {[...tables].reverse().map((table) => (
                <CardTable
                    key={table.id}
                    table={table}
                    isSelected={selectedIds.includes(table.id)}
                    onToggle={onToggleSelect}
                    isAuthenticated={isAuthenticated}
                />
            ))}
        </Container>
    );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  gap: 20px;
  padding: 20px 0;
`;
