import { useState, useRef, useEffect } from 'react';
import { FormControl, Button } from 'react-bootstrap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { errorToast } from '@/utils/toastMassage';

interface Props {
  selectedRange: string | null;
  onRangeChange: React.Dispatch<React.SetStateAction<string>>;
  customRange: { startDate: string; endDate: string };
  onCustomRangeChange: (range: { startDate: string; endDate: string }) => void;
  onApplyCustomRange: (range: { startDate: string; endDate: string }) => void; 
}

const DateRangeDropdown = ({
  selectedRange,
  onRangeChange,
  customRange,
  onCustomRangeChange,
  onApplyCustomRange,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(selectedRange);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const ranges = ['Today', 'Yesterday', 'This Month', 'Last Month', 'Custom'];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectRange = (range: string) => {
    setSelectedOption(range);
    if (range !== 'Custom') {
      onRangeChange(range);
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  const handleApplyCustomRange = () => {
    if (customRange.startDate && customRange.endDate) {
      onRangeChange('Custom');
      onApplyCustomRange(customRange); 
      setIsOpen(false);
    } else {
      errorToast('Please select both start and end dates.');
    }
  };

  return (
    <div ref={dropdownRef} className="dropdown">
      <button
        className="btn btn-light dropdown-toggle"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        aria-expanded={isOpen}
      >
        <i className="icofont-calendar fs-5" />
        {selectedRange || 'Select Date'}
        <IconifyIcon icon="la:angle-down" />
      </button>

      {isOpen && (
        <div
          className="dropdown-menu show p-3"
          style={{ minWidth: '180px' }}
          onClick={(e) => e.stopPropagation()}
        >
          {ranges.map((range) => (
            <button
              key={range}
              type="button"
              className={`dropdown-item ${selectedOption === range ? 'active' : ''}`}
              onClick={() => handleSelectRange(range)}
            >
              {range}
            </button>
          ))}

          {selectedOption === 'Custom' && (
            <div className="mt-3">
              <label>Start Date:</label>
              <FormControl
                type="date"
                value={customRange.startDate}
                onChange={(e) =>
                  onCustomRangeChange({ ...customRange, startDate: e.target.value })
                }
              />
              <label className="mt-2">End Date:</label>
              <FormControl
                type="date"
                value={customRange.endDate}
                onChange={(e) =>
                  onCustomRangeChange({ ...customRange, endDate: e.target.value })
                }
              />
              <div className="d-flex justify-content-between mt-3">
                <Button variant="primary" size="sm" onClick={handleApplyCustomRange}>
                  Apply
                </Button>
                <Button variant="secondary" size="sm" onClick={() => setIsOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DateRangeDropdown;
