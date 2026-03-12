import {EditableField} from "../EditableField.tsx";
import {useParams} from "react-router-dom";
import {type Table, useTables} from "../../hooks/useTables.ts";
import styled from "styled-components";

export const HeaderTablePage = () => {
    const {id} = useParams<{ id: string }>();
    const {tables, updateTable} = useTables();
    const tableData = tables.find(t => t.id === id);

    if (!tableData) {
        return <HeaderSection>Таблица не найдена</HeaderSection>;
    }

    const handleUpdate = (field: keyof Table, value: string) => {
        if (id) {
            updateTable(id, {[field]: value});
        }
    };

    const togglePrivacy = () => {
        if (id && tableData) {
            updateTable(id, {isPublished: !tableData.isPublished});
        }
    };
    return (
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
                    style={{cursor: 'pointer', userSelect: 'none'}}
                >
                    {tableData.isPublished ? 'public' : 'private'}
                </Badge>
            </InfoBlock>

            <DescriptionBox>
                <EditableField
                    value={tableData.description || "Click to add description"}
                    onSave={(val: string) => handleUpdate('description', val)}
                />
            </DescriptionBox>
        </HeaderSection>
    );
};

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

const MetaRow = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 18px;
`;