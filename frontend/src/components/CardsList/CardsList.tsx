import styled from 'styled-components';
import {CardTable} from "../CardTable/CardTable.tsx";
import type {Table} from "../../hooks/useTables.ts";

interface Props {
    table: Table[];
}

export const CardsList = ({table}: Props) => {

    return (
        <Wrap>
            {table.map(table => (
                <CardTable
                    key={table.id}
                    table={table}
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


