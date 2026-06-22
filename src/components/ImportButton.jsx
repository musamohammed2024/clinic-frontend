function ImportButton({ setContacts }) {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const text = e.target.result;

      const rows = text.split("\n").slice(1);

      const contacts = rows
        .filter(row => row.trim() !== "")
        .map((row) => {
          const [
            name,
            phone,
            email,
            category,
            department
          ] = row.split(",");

          return {
            id: Date.now() + Math.random(),
            name,
            phone,
            email,
            category,
            department
          };
        });

      setContacts(contacts);
    };

    reader.readAsText(file);
  };

  return (
    <label style={{ marginLeft: "10px" }}>
      <span
        style={{
          padding: "6px 10px",
          background: "#007bff",
          color: "white",
          cursor: "pointer",
          borderRadius: "4px"
        }}
      >
        Import CSV
      </span>

      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        style={{ display: "none" }}
      />
    </label>
  );
}

export default ImportButton;