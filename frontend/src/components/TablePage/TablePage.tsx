import styled from "styled-components";
import {useParams} from "react-router-dom";
import {type Table, useTables} from "../../hooks/useTables.ts";
import {EditableField} from "../EditableField.tsx";


export const TablePage = () => {
    const {id} = useParams<{ id: string }>();
    const {tables, updateTable} = useTables();
    const tableData = tables.find(t => t.id === id);

    if (!tableData) {
        return <Container>Таблица не найдена</Container>;
    }

    const handleUpdate = (field: keyof Table, value: string) => {
        if (id) {
            updateTable(id, {[field]: value});
        }
    };

    const togglePrivacy = () => {
        if (id && tableData) {
            updateTable(id, { isPublished: !tableData.isPublished });
        }
    };

    return (
        <Container>
            <HeaderSection>
                <InfoBlock>
                    <EditableField
                        value={tableData.title}
                        fontSize="24px"
                        bold
                        onSave={(val: string) => handleUpdate('title', val)}
                    />
                    <EditableField
                        value={tableData.category}
                        fontSize="20px"
                        onSave={(val: string) => handleUpdate('category', val)}
                    />
                    <MetaRow>
                        Author:
                        <EditableField
                            value={tableData.author}
                            onSave={(val: string) => handleUpdate('author', val)}
                        />
                    </MetaRow>
                    <MetaRow>
                        Contact:
                        <EditableField
                            value="email@example.com"
                            onSave={(val: string) => console.log('Email updated', val)}
                        />
                    </MetaRow>
                    <Badge
                        $isPublic={tableData.isPublished}
                        onClick={togglePrivacy}
                        style={{ cursor: 'pointer', userSelect: 'none' }}
                    >
                        {tableData.isPublished ? 'public' : 'private'}
                    </Badge>
                </InfoBlock>

                <DescriptionBox>
                    <EditableField
                        value="Description"
                        onSave={(val: string) => console.log('Desc updated', val)}
                    />
                </DescriptionBox>
            </HeaderSection>

            <StyledTable>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Equipment</th>
                        <th>Year</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>XD_6332</td>
                        <td>Personal laptop</td>
                        <td>2025</td>
                    </tr>
                    <tr>
                        <td>XN_23FA</td>
                        <td>Fax machine</td>
                        <td>2023</td>
                    </tr>
                </tbody>
            </StyledTable>
        </Container>
    );
};

const MetaRow = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 18px;
`;

const Container = styled.div`
    padding: 40px;
    color: #333;
    font-family: 'Comic Sans MS', 'Chalkboard SE', sans-serif;
`;

const HeaderSection = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;
`;

const InfoBlock = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const DescriptionBox = styled.div`
    border: 2px solid #333;
    border-radius: 25px;
    width: 400px;
    min-height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px;
`;

const Badge = styled.div<{ $isPublic: boolean }>`
    background: ${props => props.$isPublic ? props.theme.primary + '20' : props.theme.secondary + '20'};
    color: ${props => props.$isPublic ? props.theme.primary : props.theme.secondary};
    border: 1px solid ${props => props.$isPublic ? props.theme.primary : props.theme.secondary};
    border-radius: 8px;
    padding: 4px 12px;
    width: fit-content;
    font-size: 14px;
    margin-top: 10px;
`;

const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;

    th, td {
        border: 2px solid #333;
        padding: 20px;
        text-align: center;
        font-size: 22px;
        color: #d94141;
    }
`;