import styled from "styled-components";
import {useLogto} from "@logto/react";
import {useTables} from "../hooks/useTables";
import {useState} from "react";
import {CardsBar} from "../components/CardsBar/CardsBar";
import {CardsList} from "../components/CardsList/CardsList";

export const HomePage = () => {
    const {isAuthenticated} = useLogto();
    const {tables, addTable, deleteTables} = useTables();
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const toggleSelect = (id: string) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const clearSelection = () => setSelectedIds([]);

    return (
        <Wrapper>
            {isAuthenticated && (
                <CardsBar
                    onAddTable={addTable}
                    selectedIds={selectedIds}
                    onClearSelection={clearSelection}
                    deleteTables={deleteTables}
                />
            )}
            <CardsList
                tables={tables}
                selectedIds={selectedIds}
                onToggleSelect={toggleSelect}
                isAuthenticated={isAuthenticated}
            />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`;
