import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // Make sure to export your Firebase config correctly
import { doc, getDoc, updateDoc, collection, addDoc } from 'firebase/firestore';
import './css/UserForm.css'
  const UserForm = () => {
    const [applicantName, setApplicantName] = useState('');
    const [gender, setGender] = useState('Male'); // Default to Male
    const [district, setDistrict] = useState('');
    const [state, setState] = useState('');
    const [pincode, setPincode] = useState('');
    const [ownership, setOwnership] = useState('INDIVIDUAL'); // Default to INDIVIDUAL
    const [govtIDType, setGovtIDType] = useState('VOTER_ID'); // Default to VOTER_ID
    const [idNumber, setIdNumber] = useState('');
    const [category, setCategory] = useState('Residential'); // Default to Residential
    const [loadApplied, setLoadApplied] = useState('');
    const [dateOfApplication, setDateOfApplication] = useState('');
    const [status, setStatus] = useState('Pending'); // Default to Pending
    const [reviewerName, setReviewerName] = useState('');
    const [reviewerComments, setReviewerComments] = useState('');
    const [id, setId] = useState('');

    useEffect(() => {
      const fetchId = async () => {
        const docRef = doc(db, 'applicationId', 'nVYdv3B12DYkEFezasTb');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setId(docSnap.data().id);
        } else {
          console.log("No such document!");
        }
      };

      fetchId();
    }, []);

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const newUser = {
          ID: id,
          Applicant_Name: applicantName,
          Gender: gender,
          District: district,
          State: state,
          Pincode: pincode,
          Ownership: ownership,
          GovtID_Type: govtIDType,
          ID_Number: idNumber,
          Category: category,
          Load_Applied: loadApplied,
          Date_of_Application: dateOfApplication,
          Status: status,
          Reviewer_Name: reviewerName,
          Reviewer_Comments: reviewerComments,
        };
        if (loadApplied > 200) {
          alert("Load should be less than 200!")
          return;
        }
        // Add the new user to the users collection
        await addDoc(collection(db, 'users'), newUser); 
        
        // Increment the ID in applicationId collection
        const docRef = doc(db, 'applicationId', 'nVYdv3B12DYkEFezasTb'); // Replace with your document ID
        await updateDoc(docRef, { id: id + 1 }); // Increment the ID by 1

        alert('User added successfully!');
        // Reset the form or redirect the user as needed
      } catch (error) {
        console.error('Error adding user:', error);
        alert('Failed to add user. Please try again.');
      }
    };

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID</label>
          <input type="text" value={id} readOnly />
        </div>
        <div>
          <label>Applicant Name</label>
          <input type="text" value={applicantName} onChange={(e) => setApplicantName(e.target.value)} required />
        </div>
        <div>
          <label>Gender</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div>
          <label>District</label>
          <input type="text" value={district} onChange={(e) => setDistrict(e.target.value)} required />
        </div>
        <div>
          <label>State</label>
          <input type="text" value={state} onChange={(e) => setState(e.target.value)} required />
        </div>
        <div>
          <label>Pincode</label>
          <input type="text" value={pincode} onChange={(e) => setPincode(e.target.value)} required />
        </div>
        <div>
          <label>Ownership</label>
          <select value={ownership} onChange={(e) => setOwnership(e.target.value)}>
            <option value="INDIVIDUAL">INDIVIDUAL</option>
            <option value="COMMERCIAL">COMMERCIAL</option>
          </select>
        </div>
        <div>
          <label>GovtID Type</label>
          <select value={govtIDType} onChange={(e) => setGovtIDType(e.target.value)}>
            <option value="VOTER_ID">VOTER_ID</option>
            <option value="AADHAR">AADHAR</option>
            <option value="PAN">PAN</option>
            <option value="PASSPORT">PASSPORT</option>
          </select>
        </div>
        <div>
          <label>ID Number</label>
          <input type="text" value={idNumber} onChange={(e) => setIdNumber(e.target.value)} required />
        </div>
        <div>
          <label>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
          </select>
        </div>
        <div>
          <label>Load Applied</label>
          <input type="number" value={loadApplied} onChange={(e) => setLoadApplied(e.target.value)} required />
        </div>
        <div>
          <label>Date of Application</label>
          <input type="date" value={dateOfApplication} onChange={(e) => setDateOfApplication(e.target.value)} required />
        </div>
        <div>
          <label>Status</label>
          <input type="text" value={status} readOnly />
        </div>
        <div>
          <label>Reviewer Name</label>
          <input type="text" value={reviewerName} onChange={(e) => setReviewerName(e.target.value)} required />
        </div>
        <div>
          <label>Reviewer Comments</label>
          <textarea value={reviewerComments} onChange={(e) => setReviewerComments(e.target.value)}></textarea>
        </div>
        <button type="submit">Add User</button>
      </form>
    );
  };

  export default UserForm;
      