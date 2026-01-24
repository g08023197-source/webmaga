import { useState } from 'react';
import { CheckCircle2, Edit2, X, Save } from 'lucide-react';

interface ReviewCard {
  id: number;
  company_name: string;
  description: string;
  completed: boolean;
}

const INITIAL_REVIEWS: ReviewCard[] = [
  { id: 1, company_name: 'Global Tech Solutions', description: 'Enterprise SaaS Platform', completed: false },
  { id: 2, company_name: 'Innovation Labs', description: 'AI-Powered Analytics', completed: false },
  { id: 3, company_name: 'Cloud Systems Inc', description: 'Infrastructure Services', completed: true },
  { id: 4, company_name: 'Digital Transform', description: 'Consulting & Strategy', completed: false },
  { id: 5, company_name: 'Data Analytics Pro', description: 'Business Intelligence', completed: true },
  { id: 6, company_name: 'Cyber Security Corp', description: 'Security Solutions', completed: false },
  { id: 7, company_name: 'Mobile First Tech', description: 'App Development', completed: false },
  { id: 8, company_name: 'Platform Ventures', description: 'SaaS Integration', completed: true },
  { id: 9, company_name: 'Smart Automation', description: 'Process Optimization', completed: false },
  { id: 10, company_name: 'Network Systems', description: 'Connectivity Solutions', completed: false },
  { id: 11, company_name: 'Tech Innovators', description: 'R&D Partnership', completed: true },
  { id: 12, company_name: 'Enterprise Solutions', description: 'Digital Transformation', completed: false },
  { id: 13, company_name: 'Quantum Computing', description: 'Advanced Computing', completed: false },
  { id: 14, company_name: 'BlockChain Hub', description: 'Distributed Systems', completed: false },
  { id: 15, company_name: 'IoT Innovations', description: 'Internet of Things', completed: true },
  { id: 16, company_name: 'Virtual Reality Co', description: 'Immersive Tech', completed: false },
  { id: 17, company_name: 'Machine Learning AI', description: 'Deep Learning Platform', completed: false },
  { id: 18, company_name: 'Fintech Solutions', description: 'Financial Technology', completed: false },
];

export const UpcomingReviews = () => {
  const [reviews, setReviews] = useState<ReviewCard[]>(INITIAL_REVIEWS);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<ReviewCard | null>(null);

  const handleEdit = (review: ReviewCard) => {
    setEditingId(review.id);
    setEditForm({ ...review });
  };

  const handleSave = () => {
    if (editForm) {
      setReviews(reviews.map(r => r.id === editForm.id ? editForm : r));
      setEditingId(null);
      setEditForm(null);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm(null);
  };

  const toggleCompleted = (id: number) => {
    setReviews(reviews.map(r =>
      r.id === id ? { ...r, completed: !r.completed } : r
    ));
  };

  return (
    <div className="mb-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Upcoming Reviews & Interviews</h2>
        <p className="text-gray-600">Live review pipeline updated during the event</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className={`relative rounded-lg border-2 transition-all duration-300 ${
              review.completed
                ? 'bg-green-50 border-green-200 hover:shadow-md'
                : 'bg-white border-slate-200 hover:shadow-lg hover:-translate-y-1'
            }`}
          >
            {editingId === review.id && editForm ? (
              <div className="p-4 flex flex-col gap-3 h-full">
                <input
                  type="text"
                  value={editForm.company_name}
                  onChange={(e) => setEditForm({ ...editForm, company_name: e.target.value })}
                  className="text-xs font-semibold text-gray-900 border border-slate-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Company Name"
                />
                <textarea
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  className="text-xs text-gray-600 border border-slate-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none flex-1"
                  placeholder="Description"
                  rows={2}
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 bg-green-600 text-white text-xs font-medium rounded hover:bg-green-700 transition-colors"
                  >
                    <Save className="w-3.5 h-3.5" />
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 bg-gray-200 text-gray-700 text-xs font-medium rounded hover:bg-gray-300 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="p-4 flex flex-col items-center text-center h-full justify-between">
                  <div>
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg flex items-center justify-center mb-3 border border-blue-200">
                      <span className="text-lg font-bold text-blue-600">{review.company_name.charAt(0)}</span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-xs mb-1 line-clamp-2">{review.company_name}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2">{review.description}</p>
                  </div>

                  <div className="w-full flex flex-col gap-2 mt-3 pt-3 border-t border-slate-100">
                    <button
                      onClick={() => toggleCompleted(review.id)}
                      className={`w-full flex items-center justify-center gap-1.5 px-2 py-2 text-xs font-medium rounded transition-colors ${
                        review.completed
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {review.completed ? 'Completed' : 'Mark Complete'}
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => handleEdit(review)}
                  className="absolute top-2 right-2 p-1.5 bg-white rounded-lg shadow-sm border border-slate-200 hover:bg-slate-50 transition-colors opacity-0 hover:opacity-100 group-hover:opacity-100"
                >
                  <Edit2 className="w-3.5 h-3.5 text-slate-600" />
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
