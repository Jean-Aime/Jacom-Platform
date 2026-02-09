'use client';

interface WorkflowActionsProps {
  currentStatus: string;
  onStatusChange: (status: string, scheduledAt?: Date) => void;
  onSave: () => void;
}

export default function WorkflowActions({ currentStatus, onStatusChange, onSave }: WorkflowActionsProps) {
  const handleSchedule = () => {
    const dateStr = prompt('Schedule publish date and time (YYYY-MM-DD HH:MM):');
    if (dateStr) {
      const scheduledDate = new Date(dateStr);
      if (!isNaN(scheduledDate.getTime())) {
        onStatusChange('scheduled', scheduledDate);
      } else {
        alert('Invalid date format');
      }
    }
  };

  return (
    <div className="flex gap-2 flex-wrap">
      {currentStatus !== 'draft' && (
        <button
          onClick={() => onStatusChange('draft')}
          className="px-4 py-2 border rounded hover:bg-gray-50"
        >
          Save as Draft
        </button>
      )}
      
      {currentStatus === 'draft' && (
        <button
          onClick={() => onStatusChange('review')}
          className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
        >
          Submit for Review
        </button>
      )}
      
      {(currentStatus === 'draft' || currentStatus === 'review') && (
        <button
          onClick={handleSchedule}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Schedule Publish
        </button>
      )}
      
      {(currentStatus === 'draft' || currentStatus === 'review' || currentStatus === 'scheduled') && (
        <button
          onClick={() => onStatusChange('published')}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Publish Now
        </button>
      )}
      
      {currentStatus === 'published' && (
        <button
          onClick={() => onStatusChange('archived')}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Archive
        </button>
      )}
      
      <button
        onClick={onSave}
        className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
      >
        Save Changes
      </button>
    </div>
  );
}
