import styled from "styled-components";
import {useParams} from "react-router-dom";
import {useTables} from "../hooks/useTables.ts";
import {EditableField} from "../components/EditableField.tsx";
import {HeaderTablePage} from "../components/TablePage/HeaderTablePage.tsx";
import {useState} from "react";

export const TablePage = () => {
    const {id} = useParams<{ id: string }>();
    const {tables, addRow, updateRow, deleteRows} = useTables();
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const tableData = tables.find(t => t.id === id);

    if (!tableData) {
        return <Container>Table not find</Container>;
    }

    const toggleSelectRow = (rowId: string) => {
        setSelectedRows(prev =>
            prev.includes(rowId)
                ? prev.filter(id => id !== rowId)
                : [...prev, rowId]
        );
    };

    const toggleSelectAll = () => {
        if (selectedRows.length === tableData.rows.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(tableData.rows.map(r => r.id));
        }
    };

    const handleAddRow = () => {
        if (id) addRow(id);
    };

    const handleBulkDelete = () => {
        if (id && selectedRows.length > 0) {
            if (selectedRows.length) {
                deleteRows(id, selectedRows);
                setSelectedRows([]);
            }
        }
    };

    return (
        <Container>
            <HeaderTablePage />
            <TableContainer>
                <ActionBar>
                    <div style={{display: 'flex', gap: '10px'}}>
                        <AddButton onClick={handleAddRow}>Add Row</AddButton>
                        <DeleteButton onClick={handleBulkDelete}>Delete</DeleteButton>
                    </div>
                </ActionBar>

                <StyledTable>
                    <thead>
                        <tr>
                            <th>
                                <input
                                    type="checkbox"
                                    onChange={toggleSelectAll}
                                    checked={tableData.rows.length > 0 && selectedRows.length === tableData.rows.length}
                                />
                            </th>
                            <th>ID</th>
                            <th>Equipment</th>
                            <th>Year</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.rows.map((row) => (
                            <tr
                                key={row.id}
                                className={selectedRows.includes(row.id) ? 'selected' : ''}
                            >
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedRows.includes(row.id)}
                                        onChange={() => toggleSelectRow(row.id)}
                                    />
                                </td>
                                <td>{row.id}</td>
                                <td>
                                    <EditableField
                                        value={row.equipment}
                                        onSave={(val: string) => updateRow(id!, row.id, {equipment: val})}
                                    />
                                </td>
                                <td>
                                    <EditableField
                                        value={row.year}
                                        onSave={(val: string) => updateRow(id!, row.id, {year: val})}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </StyledTable>
            </TableContainer>
        </Container>
    );
};

const Container = styled.div`
    padding: 40px;
    color: ${props => props.theme.text};
    font-family: 'Comic Sans MS', 'Chalkboard SE', sans-serif;
    min-height: 100vh;
`;

const TableContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 100%;
`;

const ActionBar = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
`;

const DeleteButton = styled.button`
    padding: 8px 16px;
    border: 1px solid ${props => props.theme.border};
    background-color: ${props => props.theme.surface};
    color: ${props => props.theme.text};
    border-radius: 4px;
    font-size: 1rem;
    font-family: 'Comic Sans MS', 'Chalkboard SE', sans-serif;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        border-color: ${props => props.theme.secondary};
        background: ${props => props.theme.secondary + '10'};
    }
`;

const AddButton = styled.button`
    padding: 10px 20px;
    background: ${props => props.theme.surface};
    color: ${props => props.theme.text};
    border: 1px solid ${props => props.theme.border};
    border-radius: 8px;
    cursor: pointer;
    font-family: inherit;
    font-size: 16px;
    transition: all 0.2s;

    &:hover {
        border-color: ${props => props.theme.primary};
        background: ${props => props.theme.primary + '10'};
    }
`;

const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    background-color: ${props => props.theme.surface};

    th, td {
        border: 2px solid ${props => props.theme.border};
        padding: 15px;
        text-align: center;
        font-size: 18px;
        color: ${props => props.theme.text};
    }

    th {
        background-color: ${props => props.theme.body};
    }

    tr.selected {
        background-color: ${props => props.theme.primary + '10'}; 
    }

    td, th {
        & > div {
            display: inline-block;
        }

        input[type="checkbox"] {
            width: 20px;
            height: 20px;
            cursor: pointer;
            accent-color: ${props => props.theme.primary + '50'};
        }
    }
    
    tbody td {
        color: ${props => props.theme.secondary}; 
    }
`;