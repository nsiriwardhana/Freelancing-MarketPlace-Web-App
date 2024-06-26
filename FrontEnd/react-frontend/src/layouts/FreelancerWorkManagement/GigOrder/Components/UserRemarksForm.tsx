import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import PackageSelection from './PackageSelection';
import { useHistory } from 'react-router-dom';

interface UserRemarksFormProps { }

const UserRemarksForm: React.FC<UserRemarksFormProps> = () => {
  const [remarks, setRemarks] = useState<string>('');
  const [selectedPackage, setSelectedPackage] = useState<{ packageId: number; packageName: string } | null>(null);
  const [selectedPackageName, setSelectedPackageName] = useState<string>('');
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const handleRemarksChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRemarks(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedPackage) {
      window.alert('Please select a package');
      return;
    }
    if (remarks === '') {
      window.alert('Please enter your remarks');
      return;
    }
    try {
      const loggedInUser = getUserInfo();
      const gigData = { freelancerUsername: loggedInUser.username };
      await axios.post('http://localhost:8082/orders', {
        orderGigId: Number(id),
        packageName: selectedPackageName,
        cusRemarks: remarks,
        cusName: loggedInUser.username
      });
      console.log('Order placed successfully');
      window.alert('Order placed successfully');
      history.push('/freelancerMain');
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  const getUserInfo = () => {
    return {
      username: 'lakshan'
    };
  };

  return (
    <Card className="mb-3 shadow">
      <Card.Body>
        <div className='h1 text-center p-3'>Select a Package</div>
        {/* Render PackageSelection component */}
        <PackageSelection setSelectedPackage={(packageId, packageName) => {
          setSelectedPackage({ packageId, packageName });
          setSelectedPackageName(packageName);
        }} />
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="remarks" className="form-label">Customer Remarks:</label>
            <textarea
              className="form-control"
              id="remarks"
              name="remarks"
              rows={5}
              placeholder="Enter your remarks here"
              value={remarks}
              onChange={handleRemarksChange}
            />
          </div>
          <div className="text-center">
            <Button type="submit" variant="primary">Place Order</Button>
          </div>
        </form>
      </Card.Body>
    </Card>
  );
};

export default UserRemarksForm;
