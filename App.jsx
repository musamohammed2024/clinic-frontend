import axios from "axios";
import { useState, useEffect } from "react";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import SearchBar from "./components/SearchBar";
import ExportButton from "./components/ExportButton";
import ImportButton from "./components/ImportButton";

function App() {
  // Backend API
  const API_URL = "https://clinic-backend-0i4l.onrender.com/api/contacts";

  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [editingContact, setEditingContact] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // =========================
  // LOAD CONTACTS
  // =========================
  useEffect(() => {
    fetchContacts();

    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme) {
      setDarkMode(JSON.parse(savedTheme));
    }
  }, []);

  // =========================
  // SAVE THEME
  // =========================
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  // =========================
  // FETCH CONTACTS
  // =========================
  const fetchContacts = async () => {
    try {
      const res = await axios.get(API_URL);

      console.log("GET SUCCESS:", res.data);

      setContacts(res.data.data || []);
    } catch (error) {
      console.error("GET ERROR:", error);

      if (error.response) {
        console.log(error.response.data);
      }
    }
  };

  // =========================
  // ADD CONTACT
  // =========================
  const addContact = async (contact) => {
    try {
      console.log("Sending contact:", contact);

      const res = await axios.post(API_URL, contact);

      console.log("POST SUCCESS:", res.data);

      await fetchContacts();
    } catch (error) {
      console.error("POST ERROR:", error);

      if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Response:", error.response.data);

        alert(
          error.response.data.message ||
            "Server rejected the request."
        );
      } else {
        alert(error.message);
      }
    }
  };

  // =========================
  // UPDATE CONTACT
  // =========================
  const updateContact = async (contact) => {
    try {
      const res = await axios.put(
        `${API_URL}/${contact._id}`,
        contact
      );

      console.log("UPDATE SUCCESS:", res.data);

      setEditingContact(null);

      await fetchContacts();
    } catch (error) {
      console.error("UPDATE ERROR:", error);

      if (error.response) {
        console.log(error.response.data);

        alert(
          error.response.data.message ||
            "Failed to update contact."
        );
      }
    }
  };

  // =========================
  // DELETE CONTACT
  // =========================
  const deleteContact = async (id) => {
    try {
      const res = await axios.delete(`${API_URL}/${id}`);

      console.log("DELETE SUCCESS:", res.data);

      await fetchContacts();
    } catch (error) {
      console.error("DELETE ERROR:", error);

      if (error.response) {
        console.log(error.response.data);

        alert(
          error.response.data.message ||
            "Failed to delete contact."
        );
      }
    }
  };

  // =========================
  // FILTER CONTACTS
  // =========================
  const filteredContacts = contacts.filter((c) => {
    const matchesSearch =
      c.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      c.phone?.toLowerCase().includes(search.toLowerCase()) ||
      c.email?.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      categoryFilter === "All" ||
      c.currentStatus === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  // =========================
  // UI
  // =========================
  return (
    <div className={darkMode ? "container dark" : "container"}>
      <h1>Laboratory Staff List</h1>

      <h3>Total Staff: {contacts.length}</h3>

      <div style={{ marginBottom: "15px" }}>
        <ExportButton contacts={contacts} />

        <ImportButton setContacts={setContacts} />

        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <select
        value={categoryFilter}
        onChange={(e) =>
          setCategoryFilter(e.target.value)
        }
      >
        <option value="All">All</option>
        <option value="Active">Active</option>
        <option value="On Leave">On Leave</option>
        <option value="Inactive">Inactive</option>
      </select>

      <ContactForm
        addContact={addContact}
        editingContact={editingContact}
        updateContact={updateContact}
      />

      <ContactList
        contacts={filteredContacts}
        editContact={setEditingContact}
        deleteContact={deleteContact}
      />
    </div>
  );
}

export default App;
