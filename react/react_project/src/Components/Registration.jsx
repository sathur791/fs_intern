import { useState } from 'react'

function Registration() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phoneNumber: '',
  })
  const [registrations, setRegistrations] = useState([])
  const [editingIndex, setEditingIndex] = useState(null)
  const [editData, setEditData] = useState({
    username: '',
    email: '',
    phoneNumber: '',
  })

  function handleChange(event) {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    setRegistrations((current) => [
      ...current,
      {
        username: formData.username.trim(),
        email: formData.email.trim(),
        phoneNumber: formData.phoneNumber.trim(),
      },
    ])
    setFormData({ username: '', email: '', phoneNumber: '' })
  }

  function startEditing(index) {
    setEditingIndex(index)
    setEditData({ ...registrations[index] })
  }

  function deleteRegistration(index) {
    setRegistrations((current) =>
      current.filter((_, rowIndex) => rowIndex !== index),
    )
    setEditingIndex((current) => {
      if (current === null || current === index) return null
      return current > index ? current - 1 : current
    })
  }

  function handleEditChange(event) {
    setEditData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }))
  }

  function handleEditSubmit(event, index) {
    event.preventDefault()
    setRegistrations((current) =>
      current.map((registration, rowIndex) =>
        rowIndex === index
          ? {
              username: editData.username.trim(),
              email: editData.email.trim(),
              phoneNumber: editData.phoneNumber.trim(),
            }
          : registration,
      ),
    )
    setEditingIndex(null)
  }

  return (
    <section className="panel demo-panel">
      <p className="eyebrow">Form demo</p>
      <h2>Registration</h2>
      <form className="registration-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          aria-label="Username"
          autoComplete="username"
          required
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          aria-label="Email"
          autoComplete="email"
          required
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="tel"
          name="phoneNumber"
          placeholder="Phone number"
          aria-label="Phone number"
          autoComplete="tel"
          required
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        <button type="submit" className="primary-button">Submit</button>
      </form>
      <div className="registration-table-wrap">
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Phone number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {registrations.length === 0 ? (
              <tr>
                <td colSpan="4">Submitted registrations will appear here.</td>
              </tr>
            ) : (
              registrations.map((registration, index) =>
                editingIndex === index ? (
                  <tr key={index}>
                    <td colSpan="4">
                      <form
                        className="registration-edit-form"
                        onSubmit={(event) => handleEditSubmit(event, index)}
                      >
                        <input
                          type="text"
                          name="username"
                          aria-label="Edit username"
                          required
                          value={editData.username}
                          onChange={handleEditChange}
                        />
                        <input
                          type="email"
                          name="email"
                          aria-label="Edit email"
                          required
                          value={editData.email}
                          onChange={handleEditChange}
                        />
                        <input
                          type="tel"
                          name="phoneNumber"
                          aria-label="Edit phone number"
                          required
                          value={editData.phoneNumber}
                          onChange={handleEditChange}
                        />
                        <button type="submit" className="primary-button">Save</button>
                        <button
                          type="button"
                          className="registration-cancel-button"
                          onClick={() => setEditingIndex(null)}
                        >
                          Cancel
                        </button>
                      </form>
                    </td>
                  </tr>
                ) : (
                  <tr key={index}>
                    <td>{registration.username}</td>
                    <td>{registration.email}</td>
                    <td>{registration.phoneNumber}</td>
                    <td>
                      <button
                        type="button"
                        className="registration-edit-button"
                        onClick={() => startEditing(index)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="registration-delete-button"
                        aria-label={`Delete ${registration.username}`}
                        onClick={() => deleteRegistration(index)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ),
              )
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Registration
