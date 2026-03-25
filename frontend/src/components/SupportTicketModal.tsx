import React, {useState, useEffect} from "react";
import {useLocation} from "react-router-dom";
import {useLogto} from "@logto/react";
import api from "../api/axios";
import {useTables} from "../hooks/useTables";
import {
    ModalWrapper,
    FloatingAction,
    ModalForm,
    ModalLabel,
    ModalInput,
    ModalSelect,
    ModalTextArea,
    ModalFooter,
    ModalButton,
    ModalPrimaryButton,
} from "./Modal/Modal";

const PRIORITY_OPTIONS = ["High", "Average", "Low"];

export const SupportTicketModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [summary, setSummary] = useState("");
    const [priority, setPriority] = useState("Average");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [userName, setUserName] = useState("Anonymous");

    const location = useLocation();
    const {isAuthenticated, fetchUserInfo} = useLogto();
    const {tables} = useTables();

    useEffect(() => {
        if (isAuthenticated) {
            fetchUserInfo()
                .then((userInfo) => {
                    if (userInfo?.name) setUserName(userInfo.name);
                    else if (userInfo?.email) setUserName(userInfo.email);
                    else if (userInfo?.sub) setUserName(userInfo.sub);
                })
                .catch(() => setUserName("Anonymous"));
        } else {
            setUserName("Anonymous");
        }
    }, [isAuthenticated, fetchUserInfo]);

    const getInventoryTitle = () => {
        const match = location.pathname.match(/\/table\/([^/]+)/);
        if (match?.[1]) {
            const table = tables.find((t) => t.id === match[1]);
            if (table) return table.title;
        }
        return null;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const inventoryTitle = getInventoryTitle();

        try {
            await api.post("/api/support", {
                summary,
                priority,
                reportedBy: userName,
                inventory: inventoryTitle,
                link: window.location.href,
            });
            alert("Support ticket created successfully!");
            setIsOpen(false);
            setSummary("");
            setPriority("Average");
        } catch (error: any) {
            console.error("Failed to create ticket", error);
            const msg =
                error.response?.data?.error ||
                "Failed to create support ticket. Please try again.";
            alert(msg);
        } finally {
            setIsSubmitting(false);
        }
    };

    const inventoryTitle = getInventoryTitle();

    return (
        <>
            <FloatingAction
                onClick={() => setIsOpen(true)}
                label="Help"
                bottom={30}
            />

            <ModalWrapper
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Create Support Ticket"
            >
                <ModalForm onSubmit={handleSubmit}>
                    <ModalLabel>
                        Reported By:
                        <ModalInput
                            disabled
                            value={userName}
                        />
                    </ModalLabel>

                    <ModalLabel>
                        Page Link:
                        <ModalInput
                            disabled
                            value={window.location.href}
                        />
                    </ModalLabel>

                    {inventoryTitle && (
                        <ModalLabel>
                            Inventory:
                            <ModalInput
                                disabled
                                value={inventoryTitle}
                            />
                        </ModalLabel>
                    )}

                    <ModalLabel>
                        Priority:
                        <ModalSelect
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                        >
                            {PRIORITY_OPTIONS.map((opt) => (
                                <option
                                    key={opt}
                                    value={opt}
                                >
                                    {opt}
                                </option>
                            ))}
                        </ModalSelect>
                    </ModalLabel>

                    <ModalLabel>
                        Summary:
                        <ModalTextArea
                            required
                            value={summary}
                            onChange={(e) => setSummary(e.target.value)}
                            placeholder="Describe your issue..."
                        />
                    </ModalLabel>

                    <ModalFooter>
                        <ModalButton
                            type="button"
                            onClick={() => setIsOpen(false)}
                        >
                            Cancel
                        </ModalButton>
                        <ModalPrimaryButton
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Sending..." : "Submit Ticket"}
                        </ModalPrimaryButton>
                    </ModalFooter>
                </ModalForm>
            </ModalWrapper>
        </>
    );
};
