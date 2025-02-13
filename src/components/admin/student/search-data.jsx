"use client";

export default function SearchInput({ value, onChange }) {
    return (
        <input
            type="text"
            placeholder="Cari berdasarkan NIS..."
            className="border p-2 rounded w-1/2 mb-6"
            value={value}
            onChange={onChange}
        />
    );
}
