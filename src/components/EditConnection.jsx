import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase'; // Import your Firebase configuration
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';

const EditConnection = () => {
  const { applicationID } = useParams(); // ID to identify the user
  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [applicantName, setApplicantName] = useState('');
  const [gender, setGender] = useState('Male');
  const [district, setDistrict] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [ownership, setOwnership] = useState('INDIVIDUAL');
  const [govtIDType, setGovtIDType] = useState('AADHAR'); // Initial state set but disabled
  const [idNumber, setIdNumber] = useState(''); // Initial state set but disabled
  const [category, setCategory] = useState('Residential');
  const [loadApplied, setLoadApplied] = useState(0);
  const [dateOfApplication, setDateOfApplication] = useState(''); // Initial state set but disabled
  const [status, setStatus] = useState(''); // Read-only
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerComments, setReviewerComments] = useState('');

  useEffect(() => {
    const fetchConnection = async () => {
      const q = query(collection(db, 'users'), where('ID', '==', Number(applicationID))); // Query by ID
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const data = querySnapshot.docs[0].data(); // Get the first matching document
        setId(querySnapshot.docs[0].id); // Set the document ID
        setApplicantName(data.Applicant_Name);
        setGender(data.Gender);
        setDistrict(data.District);
        setState(data.State);
        setPincode(data.Pincode);
        setOwnership(data.Ownership);
        setGovtIDType(data.GovtID_Type); // Fetch from db but can't change
        setIdNumber(data.ID_Number); // Fetch from db but can't change
        setCategory(data.Category);
        setLoadApplied(data.Load_Applied);
        setDateOfApplication(data.Date_of_Application); // Fetch from db but can't change
        setStatus(data.Status); // Set status from the database
        setReviewerName(data.Reviewer_Name);
        setReviewerComments(data.Reviewer_Comments);
      } else {
        console.log("No such document!");
      }
    };
    
    fetchConnection();
  }, [applicationID]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate Load Applied
    if (loadApplied > 200) {
      alert("Load Applied cannot exceed 200 KV.");
      return;
    }

    const docRef = doc(db, 'users', id); // Use the document ID
    await updateDoc(docRef, {
      Applicant_Name: applicantName,
      Gender: gender,
      District: district,
      State: state,
      Pincode: pincode,
      Ownership: ownership,
      Category: category,
      Load_Applied: loadApplied,
      Status: status, // Update status
      Reviewer_Name: reviewerName,
      Reviewer_Comments: reviewerComments,
      // Do not update GovtID_Type, ID_Number, or Date_of_Application
    });

    navigate('/'); // Redirect to the main page after saving
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>ID</label>
        <input type="text" value={applicationID} readOnly />
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
        <input type="text" value={govtIDType} readOnly /> {/* Make it read-only */}
      </div>
      <div>
        <label>ID Number</label>
        <input type="text" value={idNumber} readOnly /> {/* Make it read-only */}
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
        <input 
          type="number" 
          value={loadApplied} 
          onChange={(e) => setLoadApplied(Number(e.target.value))} 
          required 
        />
      </div>
      <div>
        <label>Date of Application</label>
        <input type="text" value={dateOfApplication} readOnly /> {/* Make it read-only */}
      </div>
      <div>
        <label>Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Connection Released">Connection Released</option>
          {/* Add other statuses as needed */}
        </select>
      </div>
      <div>
        <label>Reviewer Name</label>
        <input type="text" value={reviewerName} onChange={(e) => setReviewerName(e.target.value)} required />
      </div>
      <div>
        <label>Reviewer Comments</label>
        <textarea value={reviewerComments} onChange={(e) => setReviewerComments(e.target.value)}></textarea>
      </div>
      <button type="submit">Update User</button>
    </form>
  );
};

export default EditConnection;
