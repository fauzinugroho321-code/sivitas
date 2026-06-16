"use client";

import React from "react";

export default function DeleteButton({ formId }: { formId: string }) {
  function handleClick(e: React.MouseEvent) {
    if (!confirm("Yakin ingin menghapus data warga ini?")) {
      e.preventDefault();
      return;
    }

    const f = document.getElementById(formId) as HTMLFormElement | null;
    if (f) f.submit();
  }

  return (
    <button type="button" onClick={handleClick} className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">
      Hapus
    </button>
  );
}
