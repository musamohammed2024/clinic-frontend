import { useState, useEffect } from "react";

function ContactForm({ addContact, editingContact, updateContact }) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    qualification: "",
    specialization: "",
    academicRank: "",
    gender: "",
    currentStatus: "",
    semesterLoad: "",
    googleScholar: "",
  });

  // =========================
  // LOAD DATA WHEN EDITING
  // =========================
  useEffect(() => {
    if (editingContact) {
      setFormData({
        fullName: editingContact.fullName || "",
        phone: editingContact.phone || "",
        email: editingContact.email || "",
        qualification: editingContact.qualification || "",
        specialization: editingContact.specialization || "",
        academicRank: editingContact.academicRank || "",
        gender: editingContact.gender || "",
        currentStatus: editingContact.currentStatus || "",
        semesterLoad: editingContact.semesterLoad || "",
        googleScholar: editingContact.googleScholar || "",
      });
    }
  }, [editingContact]);

  // =========================
  // HANDLE INPUT CHANGE
  // =========================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // SUBMIT FORM
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("🔥 FORM SUBMITTED");
    console.log("DATA SENT:", formData);

    try {
      if (editingContact) {
        await updateContact({
          _id: editingContact._id,
          ...formData,
        });
      } else {
        await addContact(formData);
      }

      // reset form after success
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        qualification: "",
        specialization: "",
        academicRank: "",
        gender: "",
        currentStatus: "",
        semesterLoad: "",
        googleScholar: "",
      });

    } catch (err) {
      console.log("❌ FORM ERROR:", err);
      alert("Failed to save contact");
    }
  };

  // =========================
  // UI (HORIZONTAL FORM)
  // =========================
  return (
    <form
      onSubmit={handleSubmit}
      className="contact-form"
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        marginBottom: "20px",
      }}
    >
      <input name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} />
      <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
      <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
      <input name="qualification" placeholder="Qualification" value={formData.qualification} onChange={handleChange} />
      <input name="specialization" placeholder="Specialization" value={formData.specialization} onChange={handleChange} />
      <input name="academicRank" placeholder="Academic Rank" value={formData.academicRank} onChange={handleChange} />
      <input name="gender" placeholder="Gender" value={formData.gender} onChange={handleChange} />
      <input name="currentStatus" placeholder="Status" value={formData.currentStatus} onChange={handleChange} />
      <input name="semesterLoad" placeholder="Semester Load" value={formData.semesterLoad} onChange={handleChange} />
      <input name="googleScholar" placeholder="Google Scholar" value={formData.googleScholar} onChange={handleChange} />

      <button type="submit">
        {editingContact ? "Update" : "Add"}
      </button>
    </form>
  );
}

export default ContactForm;