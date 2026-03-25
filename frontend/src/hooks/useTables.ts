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

const STORAGE_KEY = "inventory_tables";

const DEFAULT_TABLE: Table = {
    id: "71d61424-b4f8-45dd-97ce-cd85fab7bf57",
    title: "Table test 1",
    author: "Aliaksandr",
    isPublished: true,
    category: "category1",
    like: 15,
    description: "Description",
    rows: [],
};

function loadTablesFromStorage(): Table[] {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [DEFAULT_TABLE];

        const parsed = JSON.parse(raw);
        return Array.isArray(parsed)
            ? parsed.map((table: Table) => ({...table, rows: table.rows || []}))
            : [];
    } catch (error) {
        console.error("Error parsing tables from localStorage:", error);
        return [];
    }
}

export const useTables = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [tables, setTables] = useState<Table[]>(loadTablesFromStorage);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tables));
    }, [tables]);

    const addTable = () => {
        const newTable: Table = {
            id: crypto.randomUUID(),
            title: "New Table",
            author: "Author",
            isPublished: true,
            category: "new",
            like: 0,
            rows: [],
        };
        setTables((prev) => [...prev, newTable]);
    };

    const deleteTables = (idsToDelete: string[]) => {
        setTables((prev) =>
            prev.filter((table) => !idsToDelete.includes(table.id))
        );
    };

    const updateTable = (id: string, updatedFields: Partial<Table>) => {
        setTables((prev) =>
            prev.map((table) =>
                table.id === id ? {...table, ...updatedFields} : table
            )
        );
    };

    const normalizedQuery = searchQuery.trim().toLowerCase();
    const filteredTables =
        normalizedQuery.length > 0
            ? tables.filter((table) =>
                table.title.toLowerCase().includes(normalizedQuery)
            )
            : null;

    const addRow = (tableId: string) => {
        const newRow: TableRow = {
            id: crypto.randomUUID().slice(0, 8).toUpperCase(),
            equipment: "New Equipment",
            year: "2026",
        };
        setTables((prev) =>
            prev.map((table) =>
                table.id === tableId
                    ? {...table, rows: [...table.rows, newRow]}
                    : table
            )
        );
    };

    const updateRow = (
        tableId: string,
        rowId: string,
        updatedFields: Partial<TableRow>
    ) => {
        setTables((prev) =>
            prev.map((table) => {
                if (table.id !== tableId) return table;
                return {
                    ...table,
                    rows: table.rows.map((row) =>
                        row.id === rowId ? {...row, ...updatedFields} : row
                    ),
                };
            })
        );
    };

    const deleteRows = (tableId: string, rowIdsToDelete: string[]) => {
        setTables((prev) =>
            prev.map((table) => {
                if (table.id !== tableId) return table;
                return {
                    ...table,
                    rows: table.rows.filter(
                        (row) => !rowIdsToDelete.includes(row.id)
                    ),
                };
            })
        );
    };

    return {
        tables,
        addTable,
        deleteTables,
        updateTable,
        filteredTables,
        searchQuery,
        setSearchQuery,
        addRow,
        updateRow,
        deleteRows,
    };
};
