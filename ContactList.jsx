 function ContactList({ contacts, editContact, deleteContact }) {
  return (
    <div>
      <h3>Staff List</h3>

      {contacts.length === 0 ? (
        <p>No staff found</p>
      ) : (
        <table className="contact-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Qualification</th>
              <th>Specialization</th>
              <th>Academic Rank</th>
              <th>Gender</th>
              <th>Status</th>
              <th>Semester Load</th>
              <th>Google Scholar</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {contacts.map((c) => (
              <tr key={c.id}>
                <td>{c.fullName}</td>
                <td>{c.phone}</td>
                <td>{c.email}</td>
                <td>{c.qualification}</td>
                <td>{c.specialization}</td>
                <td>{c.academicRank}</td>
                <td>{c.gender}</td>
                <td>{c.currentStatus}</td>
                <td>{c.semesterLoad}</td>

                <td>
                  {c.googleScholar ? (
                    <a href={c.googleScholar} target="_blank" rel="noreferrer">
                      Link
                    </a>
                  ) : (
                    "-"
                  )}
                </td>

                <td>
                  <button onClick={() => editContact(c)}>Edit</button>
                  <button onClick={() => deleteContact(c.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ContactList;