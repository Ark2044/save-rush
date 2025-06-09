"use client";
import { useState, useEffect } from "react";
import { FiClock, FiCalendar, FiX, FiCheck } from 'react-icons/fi';

interface ScheduleOrderModalProps {
  open: boolean;
  onClose: () => void;
  onSchedule: (date: string, time: string) => void;
}

export default function ScheduleOrderModal({ open, onClose, onSchedule }: ScheduleOrderModalProps) {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);

  // Generate available dates (next 7 days)
  useEffect(() => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    
    setAvailableDates(dates);
    
    // Set default to tomorrow
    if (dates.length > 1) {
      setSelectedDate(dates[1]);
    }
  }, []);

  // Generate available time slots
  useEffect(() => {
    const times = [];
    const startHour = 8; // 8 AM
    const endHour = 22; // 10 PM
    
    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        times.push(timeString);
      }
    }
    
    setAvailableTimes(times);
    
    // Set default time to 10:00 AM
    setSelectedTime("10:00");
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    if (dateString === today.toISOString().split('T')[0]) {
      return "Today";
    } else if (dateString === tomorrow.toISOString().split('T')[0]) {
      return "Tomorrow";
    } else {
      return date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  const formatTime = (timeString: string) => {
    const [hour, minute] = timeString.split(':');
    const hourNum = parseInt(hour);
    const ampm = hourNum >= 12 ? 'PM' : 'AM';
    const displayHour = hourNum > 12 ? hourNum - 12 : hourNum === 0 ? 12 : hourNum;
    return `${displayHour}:${minute} ${ampm}`;
  };

  const handleSchedule = () => {
    if (selectedDate && selectedTime) {
      onSchedule(selectedDate, selectedTime);
      onClose();
    }
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 transition-opacity"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md mx-auto transform transition-all max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="theme-gradient text-white px-4 sm:px-6 py-3 sm:py-4 rounded-t-xl sm:rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <FiClock className="h-5 w-5 sm:h-6 sm:w-6 text-[#9BF00B]" />
              <h2 className="text-lg sm:text-xl font-semibold">Schedule Order</h2>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-[#9BF00B] transition-colors p-1 btn-touch"
            >
              <FiX className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6">
            <p className="text-gray-600 mb-4 sm:mb-6 text-center text-sm sm:text-base">
              Choose when you'd like your order to be delivered
            </p>

            {/* Date Selection */}
            <div className="mb-4 sm:mb-6">
              <div className="flex items-center gap-2 mb-3">
                <FiCalendar className="h-4 w-4 sm:h-5 sm:w-5 text-[#6B46C1]" />
                <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Select Date</h3>
              </div>
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-2">
                {availableDates.map((date) => (
                  <button
                    key={date}
                    onClick={() => setSelectedDate(date)}
                    className={`p-2.5 sm:p-3 rounded-lg sm:rounded-xl border-2 transition-all text-xs sm:text-sm font-medium btn-touch ${
                      selectedDate === date
                        ? "border-[#6B46C1] bg-purple-50 text-[#6B46C1]"
                        : "border-gray-200 hover:border-[#6B46C1] hover:bg-purple-50"
                    }`}
                  >
                    {formatDate(date)}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Selection */}
            <div className="mb-4 sm:mb-6">
              <div className="flex items-center gap-2 mb-3">
                <FiClock className="h-4 w-4 sm:h-5 sm:w-5 text-[#6B46C1]" />
                <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Select Time</h3>
              </div>
              <div className="grid grid-cols-2 xs:grid-cols-3 gap-1.5 sm:gap-2 max-h-40 sm:max-h-48 overflow-y-auto modal-scrollbar-hide">
                {availableTimes.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`p-1.5 sm:p-2 rounded-md sm:rounded-lg border transition-all text-xs font-medium btn-touch ${
                      selectedTime === time
                        ? "border-[#6B46C1] bg-purple-50 text-[#6B46C1]"
                        : "border-gray-200 hover:border-[#6B46C1] hover:bg-purple-50"
                    }`}
                  >
                    {formatTime(time)}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Summary */}
            {selectedDate && selectedTime && (
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-3 sm:p-4 rounded-lg sm:rounded-xl mb-4 sm:mb-6 border border-purple-200">
                <div className="flex items-center gap-2 text-[#6B46C1]">
                  <FiCheck className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                  <span className="font-medium text-xs sm:text-sm">
                    Scheduled for {formatDate(selectedDate)} at {formatTime(selectedTime)}
                  </span>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col xs:flex-row gap-2 sm:gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-2.5 sm:py-3 px-3 sm:px-4 border border-gray-300 rounded-lg sm:rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors text-sm sm:text-base btn-touch"
              >
                Cancel
              </button>
              <button
                onClick={handleSchedule}
                disabled={!selectedDate || !selectedTime}
                className="flex-1 py-2.5 sm:py-3 px-3 sm:px-4 theme-gradient text-white rounded-lg sm:rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base btn-touch"
              >
                Schedule Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
