import { useState, useEffect } from "react";

export interface Table {
    id: string;
    title: string;
    author: string;
    isPublished: boolean;
    category: string;
    like: number;
    description?: string;
}

export const useTables = () => {
    const [tables, setTables] = useState<Table[]>(() => {
        const saved = localStorage.getItem("inventory_tables");
        return saved ? JSON.parse(saved) : [
            {
                id: "71d61424-b4f8-45dd-97ce-cd85fab7bf57",
                title: "Table test 1",
                author: "Aliaksandr",
                isPublished: true,
                category: "category1",
                like: 15,
                description: "Description"
            }
        ];
    });

    useEffect(() => {
        localStorage.setItem("inventory_tables", JSON.stringify(tables));
    }, [tables]);

    const addTable = () => {
        const newTable: Table = {
            id: crypto.randomUUID(),
            title: "New Table",
            author: "Admin",
            isPublished: true,
            category: "new",
            like: 0,
            description: "Description"
        };
        setTables(prev => [...prev, newTable]);
    };

    const updateTable = (id: string, updatedFields: Partial<Table>) => {
        setTables(prev => prev.map(table =>
            table.id === id ? { ...table, ...updatedFields } : table
        ));
    };

    return {
        tables,
        addTable,
        updateTable,
    };
};