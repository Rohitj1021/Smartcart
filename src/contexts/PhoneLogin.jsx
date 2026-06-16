import React, { useState } from 'react';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import toast from 'react-hot-toast';

const PhoneLogin = ({ onSuccess }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const auth = getAuth();

  const setUpRecaptcha = () => {
    if (window.recaptchaVerifier) return;
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {}
    });
  };

  const sendOtp = async (e) => {
    e.preventDefault();
    if (!phoneNumber) return toast.error('Please enter a phone number');
    setLoading(true);
    setUpRecaptcha();
    try {
      const appVerifier = window.recaptchaVerifier;
      const result = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setConfirmationResult(result);
      toast.success('OTP sent successfully!');
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) return toast.error('Please enter the OTP');
    setLoading(true);
    try {
      await confirmationResult.confirm(otp);
      toast.success('Phone number verified successfully!');
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error(error);
      toast.error('Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (confirmationResult) {
    return (
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-center">Enter OTP</h3>
        <p className="text-center text-gray-600">We've sent a 6-digit code to {phoneNumber}</p>
        <form onSubmit={verifyOtp} className="space-y-4">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-3 border rounded-lg"
            maxLength="6"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white p-3 rounded-lg font-semibold disabled:opacity-50"
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-center">Sign in with Phone</h3>
      <form onSubmit={sendOtp} className="space-y-4">
        <input
          type="tel"
          placeholder="+91 9876543210"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full p-3 border rounded-lg"
          required
        />
        <button
          id="sign-in-button"
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold disabled:opacity-50"
        >
          {loading ? 'Sending OTP...' : 'Send OTP'}
        </button>
      </form>
      <p className="text-xs text-center text-gray-500 mt-2">
        By continuing, you agree to receive a one-time SMS for verification.
      </p>
    </div>
  );
};

export default PhoneLogin;