import React from "react";
import styled from "styled-components";

interface ModalWrapperProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    zIndex?: number;
}

export const ModalWrapper = ({
                                 isOpen,
                                 onClose,
                                 title,
                                 children,
                                 zIndex = 10000,
                             }: ModalWrapperProps) => {
    if (!isOpen) return null;

    return (
        <Overlay $zIndex={zIndex}>
            <ModalContainer>
                <ModalHeader>
                    <h3>{title}</h3>
                    <CloseButton onClick={onClose}>&times;</CloseButton>
                </ModalHeader>
                {children}
            </ModalContainer>
        </Overlay>
    );
};

interface FloatingActionProps {
    onClick: () => void;
    label: string;
    bottom: number;
    right?: number;
    left?: number;
    backgroundColor?: string;
    zIndex?: number;
}

export const FloatingAction = ({
                                   onClick,
                                   label,
                                   bottom,
                                   right = 30,
                                   left,
                                   backgroundColor,
                                   zIndex = 9999,
                               }: FloatingActionProps) => (
    <FloatingButton
        onClick={onClick}
        $bottom={bottom}
        $right={right}
        $left={left}
        $backgroundColor={backgroundColor}
        $zIndex={zIndex}
    >
        {label}
    </FloatingButton>
);

const Overlay = styled.div<{ $zIndex: number }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${(props) => props.$zIndex};
`;

const ModalContainer = styled.div`
  background: ${(props) => props.theme.surface || "white"};
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  color: ${(props) => props.theme.text || "black"};
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  h3 {
    margin: 0;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: ${(props) => props.theme.text || "black"};
`;

const FloatingButton = styled.button<{
    $bottom: number;
    $right?: number;
    $left?: number;
    $backgroundColor?: string;
    $zIndex: number;
}>`
  position: fixed;
  bottom: ${(props) => props.$bottom}px;
  ${(props) => (props.$right !== undefined ? `right: ${props.$right}px;` : "")}
  ${(props) => (props.$left !== undefined ? `left: ${props.$left}px;` : "")}
  background-color: ${(props) =>
    props.$backgroundColor || props.theme.primary || "#007bff"};
  color: white;
  border: none;
  border-radius: 30px;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  z-index: ${(props) => props.$zIndex};
  font-family: inherit;

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
`;

export const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const ModalLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 14px;
  font-weight: 500;
`;

export const ModalInput = styled.input`
  padding: 8px;
  border: 1px solid ${(props) => props.theme.border || "#ccc"};
  border-radius: 4px;
  background: ${(props) => props.theme.surface || "#f9f9f9"};
  color: ${(props) => props.theme.text || "black"};
`;

export const ModalSelect = styled.select`
  padding: 8px;
  border: 1px solid ${(props) => props.theme.border || "#ccc"};
  border-radius: 4px;
  background: ${(props) => props.theme.surface || "white"};
  color: ${(props) => props.theme.text || "black"};
`;

export const ModalTextArea = styled.textarea`
  padding: 8px;
  border: 1px solid ${(props) => props.theme.border || "#ccc"};
  border-radius: 4px;
  min-height: 100px;
  resize: vertical;
  background: ${(props) => props.theme.surface || "white"};
  color: ${(props) => props.theme.text || "black"};
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 10px;
`;

export const ModalButton = styled.button`
  padding: 8px 16px;
  border: 1px solid ${(props) => props.theme.border || "#ccc"};
  background: transparent;
  color: ${(props) => props.theme.text || "black"};
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;

export const ModalPrimaryButton = styled(ModalButton)<{
    $backgroundColor?: string;
}>`
  background-color: ${(props) =>
    props.$backgroundColor || props.theme.primary || "#007bff"};
  color: white;
  border: none;

  &:hover {
    opacity: 0.9;
    background: ${(props) =>
    props.$backgroundColor || props.theme.primary || "#007bff"};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const ModalRow = styled.div`
  display: flex;
  gap: 10px;
  > * {
    flex: 1;
  }
`;
