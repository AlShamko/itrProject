import styled from "styled-components";
import {useLogto} from "@logto/react";
import {useUserData} from "../hooks/user-data.ts";
import {useTables} from "../hooks/useTables.ts";
import {useState} from "react";
import { CardsBar } from "../components/CardsBar/CardsBar.tsx";
import {CardsList} from "../components/CardsList/CardsList.tsx";

export const HomePage = () => {
    const {isAuthenticated} = useLogto();
    const {userId, userScopes} = useUserData();
    const {tables, addTable, deleteTables} = useTables();
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    console.log(isAuthenticated);
    console.log(userScopes);
    console.log(userId);

    const toggleSelect = (id: string) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
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
                table={tables}
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
`