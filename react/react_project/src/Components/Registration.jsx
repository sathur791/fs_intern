import { useState } from 'react'

function Registration() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phoneNumber: '',
  })
  const [errors, setErrors] = useState({})
  const [registrations, setRegistrations] = useState([])

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const username = formData.username.trim()
    const email = formData.email.trim()
    const phoneNumber = formData.phoneNumber.trim()
    const nextErrors = {}

    if (username.length < 3) {
      nextErrors.username = 'Name must contain at least 3 characters.'
    } else if (!/^[A-Za-z ]+$/.test(username)) {
      nextErrors.username = 'Name can contain letters and spaces only.'
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = 'Enter a valid email address.'
    }
    if (!/^\d{10}$/.test(phoneNumber)) {
      nextErrors.phoneNumber = 'Phone number must contain exactly 10 digits.'
    }

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setRegistrations((current) => [
      ...current,
      { username, email, phoneNumber },
    ])
    setFormData({ username: '', email: '', phoneNumber: '' })
  }

  return (
    <section className="panel demo-panel">
      <p className="eyebrow">Registration form</p>
      <h2>Registration</h2>
      <form className="registration-form" noValidate onSubmit={handleSubmit}>
        <div className="registration-field">
          <label htmlFor="username">Name</label>
          <input
            id="username"
            type="text"
            name="username"
            placeholder="Name"
            autoComplete="name"
            value={formData.username}
            onChange={handleChange}
            aria-invalid={Boolean(errors.username)}
            aria-describedby={errors.username ? 'username-error' : undefined}
          />
          {errors.username && (
            <p className="field-error" id="username-error" role="alert">
              {errors.username}
            </p>
          )}
        </div>
        <div className="registration-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <p className="field-error" id="email-error" role="alert">
              {errors.email}
            </p>
          )}
        </div>
        <div className="registration-field">
          <label htmlFor="phoneNumber">Phone number</label>
          <input
            id="phoneNumber"
            type="tel"
            name="phoneNumber"
            placeholder="Phone number"
            autoComplete="tel"
            inputMode="numeric"
            value={formData.phoneNumber}
            onChange={handleChange}
            aria-invalid={Boolean(errors.phoneNumber)}
            aria-describedby={
              errors.phoneNumber ? 'phoneNumber-error' : undefined
            }
          />
          {errors.phoneNumber && (
            <p className="field-error" id="phoneNumber-error" role="alert">
              {errors.phoneNumber}
            </p>
          )}
        </div>
        <button type="submit" className="primary-button">
          Submit
        </button>
      </form>

      <div className="registration-table-wrap">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone number</th>
            </tr>
          </thead>
          <tbody>
            {registrations.length === 0 ? (
              <tr>
                <td colSpan="3">Submitted registrations will appear here.</td>
              </tr>
            ) : (
              registrations.map((registration, index) => (
                <tr key={`${registration.email}-${index}`}>
                  <td>{registration.username}</td>
                  <td>{registration.email}</td>
                  <td>{registration.phoneNumber}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Registration
