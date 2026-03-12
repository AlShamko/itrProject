import {useState, useEffect} from "react";

export interface Table {
    id: string;
    title: string;
    author: string;
    isPublished: boolean;
    category: string;
    like: number;
    description?: string;
    rows: TableRow[];
}

export interface TableRow {
    id: string;
    equipment: string;
    year: string;
}

export const useTables = () => {
    const [tables, setTables] = useState<Table[]>(() => {
        const saved = localStorage.getItem("inventory_tables");
        if (saved) {
            const parsed = JSON.parse(saved);
            return parsed.map((t: Table) => ({...t, rows: t.rows || []}));
        }
        return saved ? JSON.parse(saved) : [
            {
                id: "71d61424-b4f8-45dd-97ce-cd85fab7bf57",
                title: "Table test 1",
                author: "Aliaksandr",
                isPublished: true,
                category: "category1",
                like: 15,
                description: "Description",
                rows: []
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
            description: "Description",
            rows: []
        };
        setTables(prev => [...prev, newTable]);
    };

    const updateTable = (id: string, updatedFields: Partial<Table>) => {
        setTables(prev => prev.map(table =>
            table.id === id ? {...table, ...updatedFields} : table
        ));
    };

    const addRow = (tableId: string) => {
        const newRow: TableRow = {
            id: crypto.randomUUID().slice(0, 8).toUpperCase(),
            equipment: "New Equipment",
            year: "New year"
        };

        setTables(prev => prev.map(t =>
            t.id === tableId ? {...t, rows: [...t.rows, newRow]} : t
        ))
    };

    const updateRow = (tableId: string, rowId: string, updatedRow: Partial<TableRow>) => {
        setTables(prev => prev.map(t => {
            if (t.id !== tableId) return t;
            return {
                ...t,
                rows: t.rows.map(r => r.id === rowId ? {...r, ...updatedRow} : r)
            };
        }));
    };

    const deleteRows = (tableId: string, rowIds: string[]) => {
        setTables(prev => prev.map(t => {
            if (t.id !== tableId) return t;
            return {
                ...t,
                rows: t.rows.filter(r => !rowIds.includes(r.id))
            };
        }));
    };

    return {
        tables,
        addTable,
        updateTable,
        addRow,
        updateRow,
        deleteRows
    }
};