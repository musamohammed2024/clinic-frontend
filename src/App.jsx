import axios from "axios";
import { useState, useEffect, useMemo } from "react";

import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import SearchBar from "./components/SearchBar";
import ExportButton from "./components/ExportButton";
import ImportButton from "./components/ImportButton";

// ✅ API URL (moved outside component)
const API_URL = "https://clinic-backend-0i4l.onrender.com/api/contacts";

function App() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [editingContact, setEditingContact] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // ✅ NEW: loading + error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // =========================
  // LOAD DATA
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
      setLoading(true);
      setError(null);

      const res = await axios.get(API_URL);
      console.log("🔥 API RESPONSE:", res.data);

      setContacts(res.data.data || []);
    } catch (err) {
      setError(err.message || "Failed to fetch contacts");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // ADD CONTACT
  // =========================
  const addContact = async (contact) => {
    try {
      await axios.post(API_URL, contact);
      fetchContacts();
    } catch (err) {
      console.log("POST ERROR:", err.message);
    }
  };

  // =========================
  // UPDATE CONTACT
  // =========================
  const updateContact = async (contact) => {
    try {
      await axios.put(`${API_URL}/${contact._id}`, contact);
      setEditingContact(null);
      fetchContacts();
    } catch (err) {
      console.log("PUT ERROR:", err.message);
    }
  };

  // =========================
  // DELETE CONTACT
  // =========================
  const deleteContact = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchContacts();
    } catch (err) {
      console.log("DELETE ERROR:", err.message);
    }
  };

  // =========================
  // FILTER (OPTIMIZED)
  // =========================
  const filteredContacts = useMemo(() => {
    return contacts.filter((c) => {
      const matchesSearch =
        (c.fullName || "").toLowerCase().includes(search.toLowerCase()) ||
        (c.phone || "").toLowerCase().includes(search.toLowerCase()) ||
        (c.email || "").toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        categoryFilter === "All" || c.currentStatus === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [contacts, search, categoryFilter]);

  // =========================
  // UI
  // =========================
  return (
    <div className={`container ${darkMode ? "dark" : ""}`}>
      <h1>Laboratory Staff List</h1>

      <h3>Total Staff: {contacts.length}</h3>

      {/* ERROR MESSAGE */}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {/* LOADING */}
      {loading && <p>Loading contacts...</p>}

      {/* BUTTONS */}
      <div style={{ marginBottom: "15px" }}>
        <ExportButton contacts={contacts} />
        <ImportButton setContacts={setContacts} />

        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      {/* SEARCH */}
      <SearchBar search={search} setSearch={setSearch} />

      {/* FILTER */}
      <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Active">Active</option>
        <option value="On Leave">On Leave</option>
        <option value="Inactive">Inactive</option>
      </select>

      {/* FORM */}
      <ContactForm
        addContact={addContact}
        editingContact={editingContact}
        updateContact={updateContact}
      />

      {/* LIST */}
      {filteredContacts.length === 0 && !loading ? (
        <p>No contacts found.</p>
      ) : (
        <ContactList
          contacts={filteredContacts}
          editContact={setEditingContact}
          deleteContact={deleteContact}
        />
      )}
    </div>
  );
}

export default App;
