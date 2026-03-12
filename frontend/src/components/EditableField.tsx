import {useState} from "react";
import styled from "styled-components";

interface EditableFieldProps {
    value: string;
    onSave: (newValue: string) => void;
    fontSize?: string;
    bold?: boolean;
}

export const EditableField = ({value, onSave, fontSize = "1rem", bold = false}: EditableFieldProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [tempValue, setTempValue] = useState(value);

    const handleBlur = () => {
        setIsEditing(false);
        onSave(tempValue);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleBlur();
    };

    if (isEditing) {
        return (
            <EditInput
                autoFocus
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                $fontSize={fontSize}
                $bold={bold}
            />
        );
    }

    return (
        <ClickableText
            onClick={() => setIsEditing(true)}
            $fontSize={fontSize}
            $bold={bold}
        >
            {value || "Click to edit..."}
        </ClickableText>
    );
};

const EditInput = styled.input<{ $fontSize: string; $bold: boolean }>`
    font-size: ${props => props.$fontSize};
    font-weight: ${props => props.$bold ? 'bold' : 'normal'};
    font-family: inherit;
    border: 1px dashed ${props => props.theme.primary || '#51cf66'};
    outline: none;
    background: transparent;
    padding: 2px 5px;
    width: fit-content;
`;

const ClickableText = styled.div<{ $fontSize: string; $bold: boolean }>`
    font-size: ${props => props.$fontSize};
    font-weight: ${props => props.$bold ? 'bold' : 'normal'};
    cursor: pointer;
    border: 1px solid transparent;
    padding: 2px 5px;
    border-radius: 4px;

    &:hover {
        background: rgba(0, 0, 0, 0.05);
        border-color: #ccc;
    }
`;