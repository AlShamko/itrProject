import React, {useState, useEffect} from "react";
import {useLogto} from "@logto/react";
import api from "../api/axios";
import {
    ModalWrapper,
    FloatingAction,
    ModalForm,
    ModalLabel,
    ModalInput,
    ModalFooter,
    ModalButton,
    ModalPrimaryButton,
    ModalRow,
} from "./Modal/Modal";

export const SalesforceModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        phone: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {isAuthenticated, fetchUserInfo, getAccessToken} = useLogto();

    useEffect(() => {
        if (isAuthenticated && isOpen) {
            fetchUserInfo().then((userInfo) => {
                setFormData((prev) => ({
                    ...prev,
                    firstName: userInfo?.name?.split(" ")[0] || "",
                    lastName: userInfo?.name?.split(" ").slice(1).join(" ") || "",
                    email: userInfo?.email || "",
                }));
            });
        }
    }, [isAuthenticated, fetchUserInfo, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const token = await getAccessToken(import.meta.env.VITE_LOGTO_RESOURCES);

            await api.post("/api/salesforce/sync", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert("Successfully synced to Salesforce CRM!");
            setIsOpen(false);
            setFormData({firstName: "", lastName: "", email: "", company: "", phone: ""});
        } catch (error: any) {
            console.error("Failed to sync", error);
            const msg =
                error.response?.data?.error || "Failed to sync with Salesforce.";
            alert(msg);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isAuthenticated) return null;

    return (
        <>
            <FloatingAction
                onClick={() => setIsOpen(true)}
                label="Sync CRM"
                bottom={90}
                backgroundColor="var(--theme-secondary, #28a745)"
                zIndex={10000}
            />

            <ModalWrapper
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Salesforce Sync"
                zIndex={10001}
            >
                <ModalForm onSubmit={handleSubmit}>
                    <p style={{fontSize: "14px", color: "#666", margin: 0}}>
                        Create an Account and Contact in our Salesforce CRM.
                    </p>

                    <ModalRow>
                        <ModalLabel>
                            First Name
                            <ModalInput
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </ModalLabel>
                        <ModalLabel>
                            Last Name
                            <ModalInput
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </ModalLabel>
                    </ModalRow>

                    <ModalLabel>
                        Email
                        <ModalInput
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </ModalLabel>

                    <ModalLabel>
                        Company
                        <ModalInput
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            required
                            placeholder="Your Organization Name"
                        />
                    </ModalLabel>

                    <ModalLabel>
                        Phone
                        <ModalInput
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+1 234 567 890"
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
                            $backgroundColor="#28a745"
                        >
                            {isSubmitting ? "Syncing..." : "Sync Data"}
                        </ModalPrimaryButton>
                    </ModalFooter>
                </ModalForm>
            </ModalWrapper>
        </>
    );
};
