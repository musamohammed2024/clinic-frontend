 function ExportButton({ contacts }) {
  const exportCSV = () => {
    const headers =
      "Name,Phone,Email,Category,Department\n";

    const rows = contacts.map(
      (contact) =>
        `${contact.name},${contact.phone},${contact.email},${contact.category},${contact.department}`
    );

    const csv =
      headers + rows.join("\n");

    const blob = new Blob([csv], {
      type: "text/csv"
    });

    const url =
      window.URL.createObjectURL(blob);

    const a =
      document.createElement("a");

    a.href = url;
    a.download = "contacts.csv";

    a.click();
  };

  return (
    <button onClick={exportCSV}>
      Export CSV
    </button>
  );
}

export default ExportButton;